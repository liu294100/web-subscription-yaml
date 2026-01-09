import yaml from "js-yaml"
import { STREAMING_RULES, type StreamingService } from "./clash-rules"

interface ClashConfig {
  proxies?: Array<{ name: string; [key: string]: unknown }>
  "proxy-groups"?: Array<{
    name: string
    type: string
    proxies?: string[]
    [key: string]: unknown
  }>
  rules?: string[]
  [key: string]: unknown
}

export async function fetchAndConvertClash(subscriptionUrl: string, services: StreamingService[]): Promise<string> {
  // 获取原始订阅
  const response = await fetch(subscriptionUrl, {
    headers: {
      "User-Agent": "clash-verge/1.0",
    },
  })

  if (!response.ok) {
    throw new Error(`获取订阅失败: ${response.status}`)
  }

  const originalYaml = await response.text()

  // 解析 YAML
  let config: ClashConfig
  try {
    config = yaml.load(originalYaml) as ClashConfig
  } catch {
    throw new Error("解析 YAML 失败，请确认订阅格式正确")
  }

  if (!config || typeof config !== "object") {
    throw new Error("无效的 Clash 配置")
  }

  // 获取所有代理名称
  const proxyNames = config.proxies?.map((p) => p.name) || []

  // 添加基础选择
  const baseProxies = ["DIRECT", "REJECT", ...proxyNames]

  // 初始化 proxy-groups
  if (!config["proxy-groups"]) {
    config["proxy-groups"] = []
  }

  // 确保有一个主选择组
  const mainGroupExists = config["proxy-groups"].some((g) => g.name === "🚀 节点选择")
  if (!mainGroupExists) {
    config["proxy-groups"].unshift({
      name: "🚀 节点选择",
      type: "select",
      proxies: baseProxies,
    })
  }

  // 为每个服务创建代理组
  const newGroups: ClashConfig["proxy-groups"] = []
  const newRules: string[] = []

  for (const service of services) {
    const serviceConfig = STREAMING_RULES[service]
    if (!serviceConfig) continue

    const groupName = `📺 ${serviceConfig.name}`

    // 检查是否已存在该组
    const existingGroup = config["proxy-groups"]?.find((g) => g.name === groupName)
    if (!existingGroup) {
      newGroups.push({
        name: groupName,
        type: "select",
        proxies: ["🚀 节点选择", ...baseProxies],
      })
    }

    // 添加规则
    if (serviceConfig.provider) {
      // 使用 Rule Provider
      if (!config["rule-providers"]) {
        config["rule-providers"] = {}
      }

      const providerName = `Provider_${serviceConfig.name.replace(/\s+/g, "")}`
      config["rule-providers"][providerName] = {
        type: "http",
        behavior: serviceConfig.provider.behavior,
        url: serviceConfig.provider.url,
        path: `./ruleset/${serviceConfig.name.replace(/\s+/g, "")}.yaml`,
        interval: 86400,
      }

      newRules.push(`RULE-SET,${providerName},${groupName}`)
    }
    
    // 始终添加本地规则作为降级备份
    if (serviceConfig.rules) {
      for (const rule of serviceConfig.rules) {
        if (rule.endsWith(",no-resolve")) {
          const cleanRule = rule.replace(",no-resolve", "")
          newRules.push(`${cleanRule},${groupName},no-resolve`)
        } else {
          newRules.push(`${rule},${groupName}`)
        }
      }
    }
  }

  // 插入新的代理组（在主选择组之后）
  if (newGroups.length > 0) {
    const mainGroupIndex = config["proxy-groups"].findIndex((g) => g.name === "🚀 节点选择")
    config["proxy-groups"].splice(mainGroupIndex + 1, 0, ...newGroups)
  }

  // 在规则开头插入新规则
  if (!config.rules) {
    config.rules = []
  }
  config.rules = [...newRules, ...config.rules]

  // 确保最后有 MATCH 规则
  const hasMatch = config.rules.some((r) => r.startsWith("MATCH,"))
  if (!hasMatch) {
    config.rules.push("MATCH,🚀 节点选择")
  }

  // 输出 YAML
  return yaml.dump(config, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    quotingType: '"',
  })
}

export function getAvailableServices(): {
  key: StreamingService
  name: string
  rulesCount: number
}[] {
  return Object.entries(STREAMING_RULES).map(([key, value]) => ({
    key: key as StreamingService,
    name: value.name,
    rulesCount: value.rules.length,
  }))
}
