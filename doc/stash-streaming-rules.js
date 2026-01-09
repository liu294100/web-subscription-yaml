/**
 * @name Clash Streaming Rules
 * @description Automatically add streaming rules and proxy groups to your Stash configuration.
 * @version 1.0.0
 * 
 * Usage:
 * 1. Copy the content of this script.
 * 2. In Stash, go to Utilities -> Scripts -> Add Script.
 * 3. Name: "Streaming Rules Override".
 * 4. Paste the content.
 * 5. Go to Settings -> Overrides -> Add -> Script.
 * 6. Select this script.
 */

const STREAMING_RULES = {
  disneyplus: {
    name: "Disney+",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Disney/Disney.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,disneyplus.com",
      "DOMAIN-SUFFIX,disney-plus.net",
      "DOMAIN-SUFFIX,disneystreaming.com",
      "DOMAIN-SUFFIX,dssott.com",
      "DOMAIN-SUFFIX,bamgrid.com",
      "DOMAIN-SUFFIX,execute-api.us-east-1.amazonaws.com",
      "DOMAIN,cdn.registerdisney.go.com",
      "DOMAIN-SUFFIX,starott.com",
      "DOMAIN-SUFFIX,disney.my.sentry.io",
    ],
  },
  spotify: {
    name: "Spotify",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,spotify.com",
      "DOMAIN-SUFFIX,spotifycdn.com",
      "DOMAIN-SUFFIX,scdn.co",
      "DOMAIN-SUFFIX,spoti.fi",
      "DOMAIN-KEYWORD,spotify",
      "DOMAIN-SUFFIX,pscdn.co",
      "DOMAIN-KEYWORD,-spotify-com",
    ],
  },
  netflix: {
    name: "Netflix",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Netflix/Netflix.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,netflix.com",
      "DOMAIN-SUFFIX,netflix.net",
      "DOMAIN-SUFFIX,nflxext.com",
      "DOMAIN-SUFFIX,nflximg.com",
      "DOMAIN-SUFFIX,nflximg.net",
      "DOMAIN-SUFFIX,nflxso.net",
      "DOMAIN-SUFFIX,nflxvideo.net",
      "DOMAIN-KEYWORD,netflix",
      "DOMAIN-SUFFIX,netflixdnstest0.com",
      "DOMAIN-SUFFIX,netflixdnstest1.com",
      "DOMAIN-SUFFIX,netflixdnstest2.com",
      "DOMAIN-SUFFIX,netflixdnstest3.com",
      "DOMAIN-SUFFIX,netflixdnstest4.com",
      "DOMAIN-SUFFIX,netflixdnstest5.com",
      "DOMAIN-SUFFIX,netflixdnstest6.com",
      "DOMAIN-SUFFIX,netflixdnstest7.com",
      "DOMAIN-SUFFIX,netflixdnstest8.com",
      "DOMAIN-SUFFIX,netflixdnstest9.com",
      "IP-CIDR,23.246.0.0/18,no-resolve",
      "IP-CIDR,37.77.184.0/21,no-resolve",
      "IP-CIDR,45.57.0.0/17,no-resolve",
      "IP-CIDR,64.120.128.0/17,no-resolve",
      "IP-CIDR,66.197.128.0/17,no-resolve",
      "IP-CIDR,108.175.32.0/20,no-resolve",
      "IP-CIDR,192.173.64.0/18,no-resolve",
      "IP-CIDR,198.38.96.0/19,no-resolve",
      "IP-CIDR,198.45.48.0/20,no-resolve",
    ],
  },
  youtube: {
    name: "YouTube",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/YouTube/YouTube.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,youtube.com",
      "DOMAIN-SUFFIX,googlevideo.com",
      "DOMAIN-SUFFIX,ytimg.com",
      "DOMAIN-SUFFIX,youtu.be",
      "DOMAIN-SUFFIX,yt.be",
      "DOMAIN-SUFFIX,youtube-nocookie.com",
      "DOMAIN-KEYWORD,youtube",
      "DOMAIN-SUFFIX,youtubei.googleapis.com",
      "DOMAIN-SUFFIX,gvt1.com",
    ],
  },
  tiktok: {
    name: "TikTok",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/TikTok/TikTok.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,tiktok.com",
      "DOMAIN-SUFFIX,tiktokcdn.com",
      "DOMAIN-SUFFIX,tiktokv.com",
      "DOMAIN-SUFFIX,musical.ly",
      "DOMAIN-KEYWORD,tiktok",
    ],
  },
  twitch: {
    name: "Twitch",
    rules: [
        "DOMAIN-SUFFIX,twitch.tv", 
        "DOMAIN-SUFFIX,ttvnw.net", 
        "DOMAIN-SUFFIX,jtvnw.net", 
        "DOMAIN-KEYWORD,twitch",
        "DOMAIN-SUFFIX,twitchcdn.net",
        "DOMAIN-SUFFIX,twitchsvc.net",
    ],
  },
  primevideo: {
    name: "Prime Video",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/AmazonPrimeVideo/AmazonPrimeVideo.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,primevideo.com",
      "DOMAIN-SUFFIX,amazon.com",
      "DOMAIN-SUFFIX,amazonvideo.com",
      "DOMAIN-SUFFIX,media-amazon.com",
      "DOMAIN-SUFFIX,aiv-cdn.net",
      "DOMAIN-SUFFIX,aiv-delivery.net",
      "DOMAIN,avodmp4s3ww-a.akamaihd.net",
      "DOMAIN,d25xi40x97liuc.cloudfront.net",
      "DOMAIN,dmqdd6hw24ucf.cloudfront.net",
      "DOMAIN,d22qjgkvxw22r6.cloudfront.net",
      "DOMAIN,d1v5ir2lpwr8os.cloudfront.net",
      "DOMAIN-KEYWORD,avoddashs",
    ],
  },
  hbo: {
    name: "HBO Max",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/HBO/HBO.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,hbo.com", 
      "DOMAIN-SUFFIX,hbomax.com", 
      "DOMAIN-SUFFIX,hbonow.com", 
      "DOMAIN-SUFFIX,hbogo.com",
      "DOMAIN-SUFFIX,hbogoasia.com",
      "DOMAIN-SUFFIX,hbogoasia.hk",
      "DOMAIN,bcbolthboa-a.akamaihd.net",
      "DOMAIN,players.brightcove.net",
      "DOMAIN,s3-ap-southeast-1.amazonaws.com",
      "DOMAIN,dai3fd1oh325y.cloudfront.net",
      "DOMAIN,44wilhpljf.execute-api.ap-southeast-1.amazonaws.com",
      "DOMAIN,hboasia1-i.akamaihd.net",
      "DOMAIN,hboasia2-i.akamaihd.net",
      "DOMAIN,hboasia3-i.akamaihd.net",
      "DOMAIN,hboasia4-i.akamaihd.net",
      "DOMAIN,hboasia5-i.akamaihd.net",
      "DOMAIN,cf-images.ap-southeast-1.prod.boltdns.net",
    ],
  },
  openai: {
    name: "OpenAI",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/OpenAI/OpenAI.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,openai.com",
      "DOMAIN-SUFFIX,chatgpt.com",
      "DOMAIN-SUFFIX,oaistatic.com",
      "DOMAIN-SUFFIX,oaiusercontent.com",
      "DOMAIN-KEYWORD,openai",
      "DOMAIN-SUFFIX,ai.com",
      "DOMAIN-SUFFIX,arkoselabs.com",
    ],
  },
  telegram: {
    name: "Telegram",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Telegram/Telegram.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,telegram.org",
      "DOMAIN-SUFFIX,telegram.me",
      "DOMAIN-SUFFIX,t.me",
      "DOMAIN-SUFFIX,tdesktop.com",
      "DOMAIN-SUFFIX,telegra.ph",
      "IP-CIDR,91.108.4.0/22,no-resolve",
      "IP-CIDR,91.108.8.0/22,no-resolve",
      "IP-CIDR,91.108.12.0/22,no-resolve",
      "IP-CIDR,91.108.16.0/22,no-resolve",
      "IP-CIDR,91.108.56.0/22,no-resolve",
      "IP-CIDR,149.154.160.0/20,no-resolve",
      "IP-CIDR6,2001:b28:f23d::/48,no-resolve",
      "IP-CIDR6,2001:b28:f23f::/48,no-resolve",
      "IP-CIDR6,2001:67c:4e8::/48,no-resolve",
    ],
  },
  google: {
    name: "Google",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Google/Google.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,google.com",
      "DOMAIN-SUFFIX,googleapis.com",
      "DOMAIN-SUFFIX,gstatic.com",
      "DOMAIN-SUFFIX,abc.xyz",
      "DOMAIN-SUFFIX,android.com",
      "DOMAIN-SUFFIX,androidify.com",
      "DOMAIN-SUFFIX,dialogflow.com",
      "DOMAIN-SUFFIX,autodraw.com",
      "DOMAIN-SUFFIX,capitalg.com",
      "DOMAIN-SUFFIX,certificate-transparency.org",
      "DOMAIN-SUFFIX,chrome.com",
      "DOMAIN-SUFFIX,chromeexperiments.com",
      "DOMAIN-SUFFIX,chromestatus.com",
      "DOMAIN-SUFFIX,chromium.org",
      "DOMAIN-SUFFIX,creativelab5.com",
      "DOMAIN-SUFFIX,debug.com",
      "DOMAIN-SUFFIX,deepmind.com",
      "DOMAIN-SUFFIX,firebaseio.com",
      "DOMAIN-SUFFIX,getmdl.io",
      "DOMAIN-SUFFIX,ggpht.com",
      "DOMAIN-SUFFIX,gmail.com",
      "DOMAIN-SUFFIX,gmodules.com",
      "DOMAIN-SUFFIX,godoc.org",
      "DOMAIN-SUFFIX,golang.org",
      "DOMAIN-SUFFIX,gv.com",
      "DOMAIN-SUFFIX,gwtproject.org",
      "DOMAIN-SUFFIX,itasoftware.com",
      "DOMAIN-SUFFIX,madewithcode.com",
      "DOMAIN-SUFFIX,material.io",
      "DOMAIN-SUFFIX,polymer-project.org",
      "DOMAIN-SUFFIX,admin.recaptcha.net",
      "DOMAIN-SUFFIX,recaptcha.net",
      "DOMAIN-SUFFIX,shattered.io",
      "DOMAIN-SUFFIX,synergyse.com",
      "DOMAIN-SUFFIX,tensorflow.org",
      "DOMAIN-SUFFIX,tfhub.dev",
      "DOMAIN-SUFFIX,tiltbrush.com",
      "DOMAIN-SUFFIX,waveprotocol.org",
      "DOMAIN-SUFFIX,waymo.com",
      "DOMAIN-SUFFIX,webmproject.org",
      "DOMAIN-SUFFIX,webrtc.org",
      "DOMAIN-SUFFIX,whatbrowser.org",
      "DOMAIN-SUFFIX,widevine.com",
      "DOMAIN-SUFFIX,x.company",
      "DOMAIN-KEYWORD,google",
    ],
  },
  github: {
    name: "GitHub",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/GitHub/GitHub.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,github.com",
      "DOMAIN-SUFFIX,github.io",
      "DOMAIN-SUFFIX,githubapp.com",
      "DOMAIN-KEYWORD,github",
    ],
  },
  apple: {
    name: "Apple",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Apple/Apple.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,apple.com",
      "DOMAIN-SUFFIX,icloud.com",
      "DOMAIN-SUFFIX,mzstatic.com",
      "DOMAIN-SUFFIX,aaplimg.com",
      "DOMAIN-SUFFIX,apple.co",
      "DOMAIN-SUFFIX,apple-cloudkit.com",
      "DOMAIN-SUFFIX,appstore.com",
      "DOMAIN-SUFFIX,cdn-apple.com",
      "DOMAIN-SUFFIX,crashlytics.com",
      "DOMAIN-SUFFIX,icloud-content.com",
      "DOMAIN-SUFFIX,me.com",
      "DOMAIN,www-cdn.icloud.com.akadns.net",
    ],
  },
  microsoft: {
    name: "Microsoft",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Microsoft/Microsoft.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,microsoft.com",
      "DOMAIN-SUFFIX,office.com",
      "DOMAIN-SUFFIX,windows.com",
      "DOMAIN-SUFFIX,1drv.com",
      "DOMAIN-SUFFIX,1drv.ms",
      "DOMAIN-SUFFIX,blob.core.windows.net",
      "DOMAIN-SUFFIX,livefilestore.com",
      "DOMAIN-SUFFIX,onedrive.com",
      "DOMAIN-SUFFIX,storage.live.com",
      "DOMAIN-SUFFIX,storage.msn.com",
      "DOMAIN,oneclient.sfx.ms",
      "DOMAIN-SUFFIX,msecnd.net",
      "DOMAIN-SUFFIX,office365.com",
      "DOMAIN-SUFFIX,outlook.com",
      "DOMAIN-SUFFIX,s-microsoft.com",
      "DOMAIN-SUFFIX,visualstudio.com",
      "DOMAIN-SUFFIX,windowsupdate.com",
      "DOMAIN,officecdn-microsoft-com.akamaized.net",
    ],
  },
  steam: {
    name: "Steam",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Steam/Steam.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,steampowered.com",
      "DOMAIN-SUFFIX,steamcommunity.com",
      "DOMAIN-SUFFIX,steam-chat.com",
      "DOMAIN-SUFFIX,steamgames.com",
      "DOMAIN-SUFFIX,steamusercontent.com",
      "DOMAIN-SUFFIX,steamcontent.com",
      "DOMAIN-SUFFIX,steamstatic.com",
      "DOMAIN-SUFFIX,steamcdn-a.akamaihd.net",
      "DOMAIN-SUFFIX,steamstat.us",
      "DOMAIN,api.steampowered.com",
      "DOMAIN,store.steampowered.com",
    ],
  },
  linkedin: {
    name: "LinkedIn",
    rules: [
      "DOMAIN-SUFFIX,linkedin.com",
      "DOMAIN-SUFFIX,licdn.com",
      "DOMAIN-SUFFIX,linkedin.d114.net",
      "DOMAIN-KEYWORD,linkedin",
      "DOMAIN-SUFFIX,slideshare.net",
    ],
  },
  gov: {
    name: "Foreign Gov",
    rules: [
      "DOMAIN-SUFFIX,gov",
      "DOMAIN-SUFFIX,state.gov",
      "DOMAIN-SUFFIX,nasa.gov",
      "DOMAIN-SUFFIX,whitehouse.gov",
      "DOMAIN-SUFFIX,gov.tw",
      "DOMAIN-SUFFIX,gov.hk",
    ],
  },
  gfw: {
    name: "GFW List",
    provider: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/ProxyGFWlist.list",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,twitter.com",
      "DOMAIN-SUFFIX,facebook.com",
      "DOMAIN-SUFFIX,instagram.com",
      "DOMAIN-SUFFIX,google.com",
    ],
  },
  emby: {
    name: "Emby",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Emby/Emby.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-KEYWORD,emby",
      "DOMAIN-SUFFIX,emby.media",
    ],
  },
  bahamut: {
    name: "Bahamut",
    provider: {
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bahamut/Bahamut.yaml",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,bahamut.com.tw",
      "DOMAIN-SUFFIX,gamer.com.tw",
      "DOMAIN-SUFFIX,hinet.net",
      "DOMAIN,gamer-cds.cdn.hinet.net",
      "DOMAIN,gamer2-cds.cdn.hinet.net",
    ],
  },
  bilibili: {
    name: "Bilibili",
    provider: {
      url: "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/Ruleset/BilibiliHMT.list",
      behavior: "classical",
    },
    rules: [
      "DOMAIN-SUFFIX,bilibili.com",
      "DOMAIN-SUFFIX,bilibili.co",
      "DOMAIN-SUFFIX,bilivideo.com",
      "DOMAIN-SUFFIX,hdslb.com",
      "DOMAIN-SUFFIX,biliapi.net",
      "DOMAIN-SUFFIX,biliapi.com",
      "DOMAIN-KEYWORD,bilibili",
      "DOMAIN-SUFFIX,bilibili.tv",
    ],
  },
  foreign_traffic: {
    name: "Foreign Traffic",
    rules: [
      "DOMAIN-SUFFIX,ampproject.org",
      "DOMAIN-SUFFIX,appspot.com",
      "DOMAIN-SUFFIX,blogger.com",
      "DOMAIN-SUFFIX,getoutline.org",
      "DOMAIN-SUFFIX,gvt0.com",
      "DOMAIN-SUFFIX,gvt1.com",
      "DOMAIN-SUFFIX,gvt3.com",
      "DOMAIN-SUFFIX,xn--ngstr-lra8j.com",
      "DOMAIN-KEYWORD,google",
      "DOMAIN-KEYWORD,blogspot",
      "DOMAIN-SUFFIX,onedrive.live.com",
      "DOMAIN-SUFFIX,xboxlive.com",
      "DOMAIN-SUFFIX,cdninstagram.com",
      "DOMAIN-SUFFIX,fb.com",
      "DOMAIN-SUFFIX,fb.me",
      "DOMAIN-SUFFIX,fbaddins.com",
      "DOMAIN-SUFFIX,fbcdn.net",
      "DOMAIN-SUFFIX,fbsbx.com",
      "DOMAIN-SUFFIX,fbworkmail.com",
      "DOMAIN-SUFFIX,instagram.com",
      "DOMAIN-SUFFIX,m.me",
      "DOMAIN-SUFFIX,messenger.com",
      "DOMAIN-SUFFIX,oculus.com",
      "DOMAIN-SUFFIX,oculuscdn.com",
      "DOMAIN-SUFFIX,rocksdb.org",
      "DOMAIN-SUFFIX,whatsapp.com",
      "DOMAIN-SUFFIX,whatsapp.net",
      "DOMAIN-KEYWORD,facebook",
      "IP-CIDR,3.123.36.126/32,no-resolve",
      "IP-CIDR,35.157.215.84/32,no-resolve",
      "IP-CIDR,35.157.217.255/32,no-resolve",
      "IP-CIDR,52.58.209.134/32,no-resolve",
      "IP-CIDR,54.93.124.31/32,no-resolve",
      "IP-CIDR,54.162.243.80/32,no-resolve",
      "IP-CIDR,54.173.34.141/32,no-resolve",
      "IP-CIDR,54.235.23.242/32,no-resolve",
      "IP-CIDR,169.45.248.118/32,no-resolve",
      "DOMAIN-SUFFIX,pscp.tv",
      "DOMAIN-SUFFIX,periscope.tv",
      "DOMAIN-SUFFIX,t.co",
      "DOMAIN-SUFFIX,twimg.co",
      "DOMAIN-SUFFIX,twimg.com",
      "DOMAIN-SUFFIX,twitpic.com",
      "DOMAIN-SUFFIX,vine.co",
      "DOMAIN-KEYWORD,twitter",
      "DOMAIN-SUFFIX,t.me",
      "DOMAIN-SUFFIX,tdesktop.com",
      "DOMAIN-SUFFIX,telegra.ph",
      "DOMAIN-SUFFIX,telegram.me",
      "DOMAIN-SUFFIX,telegram.org",
      "IP-CIDR,91.108.4.0/22,no-resolve",
      "IP-CIDR,91.108.8.0/22,no-resolve",
      "IP-CIDR,91.108.12.0/22,no-resolve",
      "IP-CIDR,91.108.16.0/22,no-resolve",
      "IP-CIDR,91.108.56.0/22,no-resolve",
      "IP-CIDR,149.154.160.0/20,no-resolve",
      "IP-CIDR6,2001:b28:f23d::/48,no-resolve",
      "IP-CIDR6,2001:b28:f23f::/48,no-resolve",
      "IP-CIDR6,2001:67c:4e8::/48,no-resolve",
      "DOMAIN-SUFFIX,line.me",
      "DOMAIN-SUFFIX,line-apps.com",
      "DOMAIN-SUFFIX,line-scdn.net",
      "DOMAIN-SUFFIX,naver.jp",
      "IP-CIDR,103.2.30.0/23,no-resolve",
      "IP-CIDR,125.209.208.0/20,no-resolve",
      "IP-CIDR,147.92.128.0/17,no-resolve",
      "IP-CIDR,203.104.144.0/21,no-resolve",
    ],
  },
  foreign_streaming: {
    name: "Foreign Streaming",
    rules: [
      "DOMAIN-SUFFIX,deezer.com",
      "DOMAIN-SUFFIX,dzcdn.net",
      "DOMAIN-SUFFIX,kkbox.com",
      "DOMAIN-SUFFIX,kkbox.com.tw",
      "DOMAIN-SUFFIX,kfs.io",
      "DOMAIN-SUFFIX,joox.com",
      "DOMAIN-SUFFIX,pandora.com",
      "DOMAIN-SUFFIX,p-cdn.us",
      "DOMAIN-SUFFIX,sndcdn.com",
      "DOMAIN-SUFFIX,soundcloud.com",
      "DOMAIN-SUFFIX,pscdn.co",
      "DOMAIN-SUFFIX,scdn.co",
      "DOMAIN-SUFFIX,spotify.com",
      "DOMAIN-SUFFIX,spoti.fi",
      "DOMAIN-KEYWORD,spotify.com",
      "DOMAIN-KEYWORD,-spotify-com",
      "DOMAIN-SUFFIX,tidal.com",
      "DOMAIN-SUFFIX,c4assets.com",
      "DOMAIN-SUFFIX,channel4.com",
      "DOMAIN-SUFFIX,abema.io",
      "DOMAIN-SUFFIX,ameba.jp",
      "DOMAIN-SUFFIX,abema.tv",
      "DOMAIN-SUFFIX,hayabusa.io",
      "DOMAIN,abematv.akamaized.net",
      "DOMAIN,ds-linear-abematv.akamaized.net",
      "DOMAIN,ds-vod-abematv.akamaized.net",
      "DOMAIN,linear-abematv.akamaized.net",
    ],
  },
}

function main(config) {
  // 1. Ensure proxy-groups exists
  if (!config["proxy-groups"]) {
    config["proxy-groups"] = [];
  }
  
  // 2. Ensure rule-providers exists
  if (!config["rule-providers"]) {
    config["rule-providers"] = {};
  }
  
  // 3. Ensure rules exists
  if (!config["rules"]) {
    config["rules"] = [];
  }

  // 4. Get all proxies for grouping
  const allProxies = config["proxies"] ? config["proxies"].map(p => p.name) : [];
  // Use existing "Select" group if possible, or create a basic list
  // Usually we want to include "DIRECT", "REJECT", and all proxies
  const baseProxies = ["DIRECT", "REJECT", ...allProxies];

  // 5. Ensure Main Selector exists (optional, but good practice)
  let mainGroup = config["proxy-groups"].find(g => g.name === "🚀 节点选择" || g.name === "Proxy" || g.name === "Select");
  if (!mainGroup) {
    // If no main group, we create one or just use the first select group we find
    // Or we just assume "🚀 节点选择" as our base for new groups
    config["proxy-groups"].unshift({
      name: "🚀 节点选择",
      type: "select",
      proxies: baseProxies
    });
    mainGroup = config["proxy-groups"][0];
  }
  
  // 6. Iterate and add rules
  const newGroups = [];
  const newRules = [];

  for (const [key, service] of Object.entries(STREAMING_RULES)) {
    const groupName = `📺 ${service.name}`;
    
    // Check if group exists
    if (!config["proxy-groups"].find(g => g.name === groupName)) {
      newGroups.push({
        name: groupName,
        type: "select",
        proxies: ["🚀 节点选择", ...baseProxies] // Fallback to main selector or direct proxies
      });
    }

    // Add Provider
    if (service.provider) {
      const providerName = `Provider_${service.name.replace(/\s+/g, "")}`;
      config["rule-providers"][providerName] = {
        type: "http",
        behavior: service.provider.behavior,
        url: service.provider.url,
        path: `./ruleset/${service.name.replace(/\s+/g, "")}.yaml`,
        interval: 86400
      };
      
      // Add Rule for Provider
      newRules.push(`RULE-SET,${providerName},${groupName}`);
    }

    // Add Fallback Rules
    if (service.rules) {
      for (const rule of service.rules) {
        if (rule.endsWith(",no-resolve")) {
          const cleanRule = rule.replace(",no-resolve", "");
          newRules.push(`${cleanRule},${groupName},no-resolve`);
        } else {
          newRules.push(`${rule},${groupName}`);
        }
      }
    }
  }

  // Insert new groups
  // Find where to insert (after main group)
  const mainGroupIndex = config["proxy-groups"].findIndex(g => g.name === "🚀 节点选择");
  if (mainGroupIndex !== -1) {
    config["proxy-groups"].splice(mainGroupIndex + 1, 0, ...newGroups);
  } else {
    config["proxy-groups"].push(...newGroups);
  }

  // Insert new rules at the beginning
  config["rules"] = [...newRules, ...config["rules"]];
  
  // Ensure MATCH rule
  if (!config["rules"].some(r => r.startsWith("MATCH,"))) {
    config["rules"].push("MATCH,🚀 节点选择");
  }

  return config;
}
