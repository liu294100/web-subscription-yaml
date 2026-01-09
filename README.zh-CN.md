# Clash 订阅转换器 (Clash Subscription Converter)

一个现代化的 Web 工具，旨在帮助用户轻松地为 Clash 订阅链接添加流媒体分流规则。

![Project Preview](public/placeholder-logo.png)

## ✨ 特性

- **现代化 UI**: 基于 Next.js 和 Shadcn UI 构建，支持明亮/暗黑模式切换，提供流畅的动画体验。
- **智能分流**: 支持为 Netflix, Disney+, Spotify, YouTube, OpenAI 等主流服务添加分流规则。
- **区域限定服务**: 特别支持 **Bilibili (港澳台)** 和 **巴哈姆特动画疯** 等区域性服务。
- **规则集 (Rule-Set) 支持**: 优先使用远程规则集（Rule Providers），确保规则自动更新且保持最新。
- **降级保护**: 内置核心规则作为降级备份，即使远程规则加载失败也能保证基本服务可用。
- **一键转换**: 简单直观的操作流程，输入订阅地址，选择需要的服务，即可生成新的配置链接。

## 🚀 快速开始

### 部署

本项目支持部署在 Vercel 或任何支持 Next.js 的环境中。

### 本地开发

1. 克隆项目
   ```bash
   git clone https://github.com/yourusername/web-subscription-yaml.git
   cd web-subscription-yaml
   ```

2. 安装依赖
   ```bash
   npm install
   # 或
   pnpm install
   ```

3. 启动开发服务器
   ```bash
   npm run dev
   ```

4. 打开浏览器访问 `http://localhost:3000`

## 📖 API 使用

除了网页界面，你也可以直接使用 API 进行转换：

```
GET /api/convert?url=<原始订阅链接>&services=<服务列表>
```

- **url**: (必填) 你的原始 Clash 订阅地址。
- **services**: (可选) 逗号分隔的服务代码，例如 `netflix,spotify,openai`。如果不填则包含所有支持的服务。

**示例**:
```
/api/convert?url=https://example.com/sub&services=netflix,disneyplus
```

## 🙏 致谢 (Acknowledgements)

本项目的规则和灵感来源于以下优秀的开源项目，特此感谢：

- **[cutethotw/ClashRule](https://github.com/cutethotw/ClashRule)**: 提供了极其丰富和详细的 Clash 分流规则，涵盖了各种流媒体服务。
- **[youshandefeiyang/sub-web-modify](https://github.com/youshandefeiyang/sub-web-modify)**: 优秀的订阅转换前端增强版，为本项目的功能设计提供了参考。
- **[Johnshall/Shadowrocket-ADBlock-Rules-Forever](https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever)**: 提供了强大的去广告和规则维护思路。
- **[blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)**: 本项目引用的主要规则源之一。
- **[ACL4SSR/ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)**: 提供了 Bilibili 和 GFW 列表规则源。

## 📄 许可证

MIT License
