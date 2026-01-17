import hashlib
import yaml

def parse_ini(file_path):
    rule_providers = {}
    proxy_groups = []
    rules = []
    
    # Mapping from original INI group name to Safe Stash Name
    group_name_map = {}
    
    # Common conflicting names from subscriptions (with emojis or without)
    # We will rename ALL custom groups to be safe, or just specific ones.
    # To be safe and consistent, let's append " NEW" to ALL groups defined in this INI.
    # This ensures no collision with subscription's own groups.
    SUFFIX = " NEW"
    
    # First Pass: Identify all groups and build mapping
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for line in lines:
        line = line.strip()
        if line.startswith('custom_proxy_group='):
            content = line.split('=', 1)[1]
            parts = content.split('`')
            if len(parts) >= 1:
                original_name = parts[0].strip()
                group_name_map[original_name] = original_name + SUFFIX

    # Second Pass: Process Rules and Groups
    for line in lines:
        line = line.strip()
        if not line or line.startswith(';'):
            continue
            
        if line.startswith('ruleset='):
            content = line.split('=', 1)[1]
            parts = content.split(',', 1)
            if len(parts) == 2:
                group_name = parts[0].strip()
                val_part = parts[1].strip()
                
                # Remap group name
                target_group = group_name_map.get(group_name, group_name) # Default to original if not found (e.g. DIRECT/REJECT)
                
                if "GEOIP" in val_part:
                    geoip_code = val_part.replace('[]', '').replace('GEOIP,', '').strip()
                    rules.append(f"GEOIP,{geoip_code},{target_group}")
                elif "FINAL" in val_part:
                    rules.append(f"MATCH,{target_group}")
                else:
                    provider_url = val_part
                    behavior = 'classical'
                    
                    if val_part.startswith('clash-classic:'):
                        provider_url = val_part.replace('clash-classic:', '')
                    elif val_part.startswith('clash-domain:'):
                         provider_url = val_part.replace('clash-domain:', '')
                         behavior = 'domain'
                    elif val_part.startswith('clash-ipcidr:'):
                         provider_url = val_part.replace('clash-ipcidr:', '')
                         behavior = 'ipcidr'
                    
                    h = hashlib.md5((group_name + provider_url).encode('utf-8')).hexdigest()[:8]
                    safe_group_name = "".join(c for c in group_name if c.isalnum() or c in ('_', '-'))
                    if not safe_group_name: safe_group_name = "Group"
                    provider_id = f"{safe_group_name}_{h}"
                    
                    provider_config = {
                        'type': 'http',
                        'behavior': behavior,
                        'url': provider_url,
                        'interval': 86400
                    }
                    
                    if '.list' in provider_url:
                        provider_config['format'] = 'text'

                    rule_providers[provider_id] = provider_config
                    rules.append(f"RULE-SET,{provider_id},{target_group}")

        elif line.startswith('custom_proxy_group='):
            content = line.split('=', 1)[1]
            parts = content.split('`')
            
            if len(parts) >= 2:
                original_name = parts[0].strip()
                group_name = group_name_map.get(original_name, original_name)
                
                group_type = parts[1].strip()
                proxies = []
                url = "http://www.gstatic.com/generate_204"
                interval = 300
                filter_regex = None
                
                if group_type in ['url-test', 'fallback', 'load-balance']:
                    if len(parts) > 2:
                        filter_regex = parts[2]
                    if len(parts) > 3:
                        url = parts[3]
                    if len(parts) > 4:
                        interval_str = parts[4].split(',')[0]
                        if interval_str.isdigit():
                            interval = int(interval_str)
                    proxies = [] 
                else:
                    raw_content = parts[2:]
                    if len(raw_content) == 1 and ('.*' in raw_content[0] or '(' in raw_content[0]):
                        filter_regex = raw_content[0]
                    else:
                        for p in raw_content:
                            p = p.strip()
                            if not p: continue
                            if p.startswith('[]'):
                                # Remap referenced proxy groups!
                                ref_name = p[2:]
                                mapped_ref = group_name_map.get(ref_name, ref_name)
                                proxies.append(mapped_ref)
                            elif '(' in p or '.*' in p:
                                filter_regex = p
                            else:
                                # Standard proxy or built-in group (DIRECT/REJECT)
                                # Check if it's one of our groups
                                if p in ['DIRECT', 'REJECT', 'no-resolve']:
                                     proxies.append(p)
                                else:
                                     mapped_p = group_name_map.get(p, p)
                                     proxies.append(mapped_p)

                group = {
                    'name': group_name,
                    'type': group_type,
                    'proxies': proxies
                }
                
                # Force include nodes for main groups to ensure they are not empty
                # Logic: If it's a known main group, append the filter even if INI didn't have it
                
                if "国外流量" in original_name:
                    # 国外流量 is a nested group (contains auto select etc), usually it DOES NOT include direct nodes itself
                    # unless specified. 
                    # If we force include-all-proxies, Stash will display ALL nodes + nested groups.
                    # This is usually what we want for "Select Group" if we want to manually pick a node.
                    # BUT, if the user complains "No nodes", it might be because filter didn't match anything 
                    # OR because they expected nested groups to work but they are empty.
                    
                    # Wait, the user's screenshot shows "国外流量 NEW" has "国内流量 NEW", "手动选择 NEW" inside it.
                    # And the count is 4.
                    # But the user says "still has problem, no nodes".
                    # This likely means the 'filter' logic is filtering out everything, OR the nested groups themselves are empty.
                    
                    # If I look at the screenshot, "Spotify NEW" has 5 items.
                    # "Discord NEW" has "国外流量 NEW" selected.
                    # The user seems to want to see NODES inside "Discord NEW" -> "国外流量 NEW".
                    # But "国外流量 NEW" only has 4 items: Domestic, Manual, Manual Backup, Self-built.
                    # It DOES NOT have actual server nodes.
                    
                    # So when the user clicks "国外流量 NEW", they see more groups, not nodes.
                    # If they want nodes, "国外流量 NEW" should ALSO include nodes.
                    
                    group['include-all-proxies'] = True
                    if not filter_regex:
                        # Exclude domestic nodes
                        group['filter'] = "(^(?!.*(电信|联通|移动|Website)).*)"
                    else:
                         group['filter'] = filter_regex

                elif "国内流量" in original_name:
                    group['include-all-proxies'] = True
                    if not filter_regex:
                        group['filter'] = "(电信|联通|移动|Website)"
                    else:
                        group['filter'] = filter_regex

                elif "漏网之鱼" in original_name or "Final" in original_name:
                    group['include-all-proxies'] = True
                    if not filter_regex:
                         group['filter'] = ".*"
                    else:
                         group['filter'] = filter_regex
                
                elif filter_regex:
                    group['include-all-proxies'] = True
                    group['filter'] = filter_regex
                
                # Special handling for "Manual Select" groups - they MUST include nodes
                if "手动选择" in original_name:
                    group['include-all-proxies'] = True
                    if not filter_regex:
                        group['filter'] = ".*"
                    else:
                        group['filter'] = filter_regex
                
                # If a group has NO proxies and NO include-all-proxies, it will be empty.
                if not proxies and 'include-all-proxies' not in group:
                     group['include-all-proxies'] = True
                     group['filter'] = ".*" # Fallback to show everything if empty

                if group_type in ['url-test', 'fallback', 'load-balance']:
                    group['url'] = url
                    group['interval'] = interval
                
                proxy_groups.append(group)

    return rule_providers, proxy_groups, rules

def generate_yaml(rule_providers, proxy_groups, rules, output_path):
    data = {
        'name': 'GeneralClashRule Override',
        'desc': 'Generated from GeneralClashRule.ini',
        'rule-providers': rule_providers,
        'proxy-groups': proxy_groups,
        'rules': rules
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        yaml.safe_dump(data, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

if __name__ == "__main__":
    ini_path = "doc/rule/GeneralClashRule.ini"
    output_path = "doc/GeneralClashRule.stoverride"
    
    try:
        rps, pgs, rs = parse_ini(ini_path)
        generate_yaml(rps, pgs, rs, output_path)
        print(f"Successfully generated {output_path}")
    except Exception as e:
        print(f"Error: {e}")
