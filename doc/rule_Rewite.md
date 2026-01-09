这个脚本可以作为 Stash 的 Script Provider (Override Script) 使用，功能与网页版一致：stash-streaming-rules.js

1. 自动注入分流规则 ：包含了 Netflix, Disney+, YouTube, TikTok, OpenAI 等所有支持的服务规则。
2. 智能分组 ：会自动为每个服务创建 📺 服务名 的策略组。
3. 规则集优先 ：优先配置 rule-providers 远程规则集，并内置了本地规则作为降级备份。

### 如何在 iOS Stash 中使用：

1. 获取脚本内容 ：

   - 将 doc/stash-streaming-rules.js 的内容复制，或者将其托管到 GitHub/Gist 上获取 Raw URL。
   - https://raw.githubusercontent.com/liu294100/web-subscription-yaml/main/doc/stash-streaming-rules.js
2. 配置 Stash ：

   - 打开 Stash -> Utilities (工具) -> Scripts (脚本) 。
   - 点击右上角 + 号添加脚本。
   - Name (名称) : Streaming Rules (或者任意你喜欢的名字)。
   - Content (内容) : 粘贴脚本代码（或填入 URL）。
   - 保存。
3. 应用到订阅 ：

   - 进入 Settings (设置) -> Overrides (覆写) 。
   - 点击右上角 + 号。
   - 选择 Script (脚本) 。
   - 选择刚才添加的 Streaming Rules 脚本。
   - 启用该覆写。
     这样，当你更新订阅时，Stash 会自动运行这个脚本，将最新的分流规则和策略组注入到你的配置中。
