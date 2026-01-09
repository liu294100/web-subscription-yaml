# Clash サブスクリプション変換ツール (Clash Subscription Converter)

Clashのサブスクリプションリンクに、ストリーミング配信サービスのルーティングルールを簡単に追加できるモダンなWebツールです。

[English](README.md) | [中文](README.zh-CN.md)

![Project Preview](public/placeholder-logo.png)

## ✨ 特徴

- **モダンなUI**: Next.jsとShadcn UIで構築され、ダークモード/ライトモードの切り替えやスムーズなアニメーションに対応しています。
- **スマートルーティング**: Netflix、Disney+、Spotify、YouTube、OpenAIなどの主要サービスのルール追加に対応。
- **地域限定サービス**: **Bilibili (香港/マカオ/台湾)** や **Bahamut (バハムートアニメ)** などの地域限定サービスも特別にサポート。
- **ルールセット対応**: リモートのルールプロバイダー（Rule-Set）を優先的に使用し、ルールを自動更新して常に最新の状態に保ちます。
- **フォールバック保護**: リモートリストの読み込みに失敗した場合でも、内蔵されたコアルールがバックアップとして機能し、基本サービスの利用を保証します。
- **ワンクリック変換**: サブスクリプションURLを入力し、必要なサービスを選択するだけのシンプルで直感的な操作フロー。

### 🌐 対応サービス

現在、以下のサービスのルーティングルールをサポートしています。ニーズに合わせて必要なサービスを選択すると、生成される設定に自動的に対応するルールが含まれます：

| カテゴリ                 | サービス                                                                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ストリーミング** | 🎬 Netflix, 📺 Disney+, 🎵 Spotify, 📺 YouTube, 🎵 TikTok, 🎮 Twitch, 📺 Prime Video, 🎭 HBO Max, 🎬 Emby, 🐉 Bahamut, 📺 Bilibili (港/澳/台), 🎬 海外ストリーミング (一般) |
| **AI & ツール**    | 🤖 OpenAI (ChatGPT), ✈️ Telegram, 🔍 Google, 🐙 GitHub, 💼 LinkedIn                                                                                                       |
| **エコシステム**   | 🍎 Apple, 🪟 Microsoft, 🎮 Steam                                                                                                                                            |
| **その他**         | 🏛️ 海外政府機関, 🧱 GFW リスト, 🌐 海外トラフィック (一般)                                                                                                                |

## 🚀 クイックスタート

### デプロイ

このプロジェクトは、VercelやNext.jsをサポートする環境に簡単にデプロイできます。

### Docker デプロイ

1. Docker と Docker Compose がインストールされていることを確認してください。
2. デプロイスクリプトを実行します：
   - Windows: `deploy.bat` をダブルクリック
   - Linux/macOS: `sh deploy.sh` を実行
3. `http://localhost:3000` にアクセス

### ローカル開発

1. リポジトリをクローン

   ```bash
   git clone https://github.com/yourusername/web-subscription-yaml.git
   cd web-subscription-yaml
   ```
2. 依存関係をインストール

   ```bash
   npm install
   # または
   pnpm install
   ```
3. 開発サーバーを起動

   ```bash
   npm run dev
   ```
4. ブラウザで `http://localhost:3000` を開きます。

## 🔐 環境変数の設定

環境変数を設定することで、プロジェクトを構成できます：

- **PASSWORD**: アクセスパスワードを設定します。設定すると、WebインターフェースへのアクセスやAPIの使用にパスワードが必要になります。
  - **Vercel**: Project Settings -> Environment Variables で追加してください。
  - **Docker**: `docker-compose.yml` の `PASSWORD` 変数を変更してください。

## 📖 API の使用方法

Webインターフェース以外に、APIを直接利用することも可能です：

```
GET /api/convert?url=<元のサブスクリプションURL>&services=<サービスリスト>
```

- **url**: (必須) 元のClashサブスクリプションURL。
- **services**: (オプション) カンマ区切りのサービスコード（例: `netflix,spotify,openai`）。省略した場合は、サポートされているすべてのサービスが含まれます。

**例**:

```
/api/convert?url=https://example.com/sub&services=netflix,disneyplus
```

## 🙏 謝辞 (Acknowledgements)

本プロジェクトは、以下の素晴らしいオープンソースプロジェクトのルールやアイデアを活用しています。心より感謝いたします。

- **[cutethotw/ClashRule](https://github.com/cutethotw/ClashRule)**: 様々なストリーミングサービスを網羅した包括的かつ詳細なClashルーティングルールを提供していただきました。
- **[youshandefeiyang/sub-web-modify](https://github.com/youshandefeiyang/sub-web-modify)**: 本プロジェクトの機能設計の参考となった、強化版サブスクリプション変換フロントエンドです。
- **[Johnshall/Shadowrocket-ADBlock-Rules-Forever](https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever)**: 強力な広告ブロックルールとメンテナンスのアイデアを提供していただきました。
- **[blackmatrix7/ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)**: 本プロジェクトで使用している主要なルールソースの一つです。
- **[ACL4SSR/ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)**: BilibiliやGFWリストのルールソースを提供していただきました。

## 📄 ライセンス

MIT License
