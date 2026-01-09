# Clash Subscription Converter

A modern web tool designed to easily add streaming routing rules to your Clash subscription links.

[中文](README.zh-CN.md) | [日本語](README.ja.md)

![Project Preview](public/placeholder-logo.png)

## ✨ Features

- **Modern UI**: Built with Next.js and Shadcn UI, featuring Dark/Light mode support and smooth animations.
- **Smart Routing**: Supports adding routing rules for major services like Netflix, Disney+, Spotify, YouTube, OpenAI, and more.
- **Regional Services**: Special support for regional services like **Bilibili (HK/MO/TW)** and **Bahamut Anime**.
- **Rule-Set Support**: Prioritizes remote Rule Providers (Rule-Sets) to ensure rules are auto-updated and always current.
- **Fallback Protection**: Built-in core rules act as a fallback, ensuring basic service availability even if remote rules fail to load.
- **One-Click Conversion**: Simple and intuitive workflow—enter your subscription URL, select desired services, and generate your new config.

### 🌐 Supported Services

Currently supports routing rules for the following services. You can select specific services to generate a custom rule set tailored to your needs:

| Category             | Services                                                                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Streaming**  | 🎬 Netflix, 📺 Disney+, 🎵 Spotify, 📺 YouTube, 🎵 TikTok, 🎮 Twitch, 📺 Prime Video, 🎭 HBO Max, 🎬 Emby, 🐉 Bahamut, 📺 Bilibili (HK/MO/TW), 🎬 Foreign Streaming (General) |
| **AI & Tools** | 🤖 OpenAI (ChatGPT), ✈️ Telegram, 🔍 Google, 🐙 GitHub, 💼 LinkedIn                                                                                                         |
| **Ecosystem**  | 🍎 Apple, 🪟 Microsoft, 🎮 Steam                                                                                                                                              |
| **Others**     | 🏛️ Foreign Gov, 🧱 GFW List, 🌐 Foreign Traffic (General)                                                                                                                   |

## 🚀 Quick Start

### Deployment

This project can be easily deployed on Vercel or any environment that supports Next.js.

### Local Development

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/web-subscription-yaml.git
   cd web-subscription-yaml
   ```
2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   ```
3. Start the development server

   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## 🔐 Configuration

You can configure the project using environment variables:

- **PASSWORD**: Set an access password. Once set, users must enter the password to access the web interface or use the API.
  - **Vercel**: Add it in Project Settings -> Environment Variables (`PASSWORD)`.
  - **Docker**: Update the `PASSWORD` variable in `docker-compose.yml`.

## 📖 API Usage

Besides the web interface, you can use the API directly:

```
GET /api/convert?url=<Your_Subscription_URL>&services=<Service_List>
```

- **url**: (Required) Your original Clash subscription URL.
- **services**: (Optional) Comma-separated service codes, e.g., `netflix,spotify,openai`. If omitted, all supported services are included.

**Example**:

```
/api/convert?url=https://example.com/sub&services=netflix,disneyplus
```

## 🙏 Acknowledgements

This project leverages rules and inspiration from the following amazing open-source projects. Special thanks to:

- **[cutethotw/ClashRule](https://github.com/cutethotw/ClashRule)**: Provided comprehensive and detailed Clash routing rules covering various streaming services.
- **[youshandefeiyang/sub-web-modify](https://github.com/youshandefeiyang/sub-web-modify)**: An enhanced subscription converter frontend that inspired the functional design of this project.
- **[Johnshall/Shadowrocket-ADBlock-Rules-Forever](https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever)**: Provided powerful ad-blocking rules and maintenance ideas.
- **[blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)**: One of the main rule sources used in this project.
- **[ACL4SSR/ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)**: Provided rule sources for Bilibili and GFW list.

## 📄 License

MIT License
