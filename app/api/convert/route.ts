import { type NextRequest, NextResponse } from "next/server"
import { fetchAndConvertClash, getAvailableServices } from "@/lib/clash-converter"
import type { StreamingService } from "@/lib/clash-rules"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const subscriptionUrl = searchParams.get("url")
  const servicesParam = searchParams.get("services")
  const passwordParam = searchParams.get("pwd")

  // 鉴权
  const serverPassword = process.env.PASSWORD
  if (serverPassword && passwordParam !== serverPassword) {
    return NextResponse.json({ error: "需要密码或密码错误" }, { status: 401 })
  }

  // 如果没有参数，返回使用说明
  if (!subscriptionUrl) {
    const availableServices = getAvailableServices()
    return NextResponse.json({
      usage: {
        endpoint: "/api/convert",
        params: {
          url: "你的 Clash 订阅地址 (必填)",
          services: "要添加的服务，用逗号分隔 (可选，默认全部)",
        },
        example: "/api/convert?url=https://your-sub.com/clash&services=netflix,spotify,youtube",
      },
      availableServices: availableServices.map((s) => ({
        key: s.key,
        name: s.name,
        rulesCount: s.rulesCount,
      })),
    })
  }

  // 解析服务列表
  let services: StreamingService[]
  if (servicesParam) {
    services = servicesParam.split(",").map((s) => s.trim()) as StreamingService[]
  } else {
    // 默认添加所有服务
    services = getAvailableServices().map((s) => s.key)
  }

  try {
    const convertedYaml = await fetchAndConvertClash(subscriptionUrl, services)

    return new NextResponse(convertedYaml, {
      headers: {
        "Content-Type": "text/yaml; charset=utf-8",
        "Content-Disposition": 'attachment; filename="clash-config.yaml"',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "转换失败" }, { status: 500 })
  }
}
