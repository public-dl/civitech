# CivITech GitHub Pages移行準備・検証

実施日: 2026-10-04（Asia/Tokyo）
配置先: C:\Users\user\Documents\CivITech\civitech
公開先予定: public-dl/civitech
公開URL予定: https://public-dl.github.io/civitech/
原本ZIP SHA-256: 6529c6c6ddbc630a6df8af694c7fb1dc0a3d8780883582c5164a9b4c9b64e258

## 変更ファイル
- index.html: Web3Formsフォーム、canonical、OGP、Twitter Card、favicon、送信状況表示。
- future-vision.html: canonical、OGP、Twitter Card、favicon。
- script.js: 診断DOM存在時のみ診断を初期化。採点ロジックは原本と同一。
- README.md: Pages／Web3Formsの設定手順。
- contact-config.js、contact.js: キー設定、送信処理、二重送信防止、成功・失敗・タイムアウト表示。
- sitemap.xml、robots.txt、.nojekyll、.gitignore、.github/workflows/pages.yml: 公開用設定。
- MIGRATION_REPORT.md: 本報告。

styles.css、画像6点、Google所有権確認HTMLはバイト一致で保持。
内部リンクはZIPの相対パスを維持。Netlifyのフォーム属性・フォーム識別子を削除。
Git初期化・remote設定・commit・push・本番公開は未実施。Health Data Vaultには変更なし。

## 検証結果
ローカルで /civitech/ 配下を静的配信し、ヘッドレスEdgeで検証。
- PC: 1440×1000、iPhone相当: 390×844（タッチ・モバイルエミュレーション）。実機Safariでは未検証。
- トップ／Future Vision: ページ表示・タイトル・横はみ出しなし。
- 診断: 12問、各領域および総合50点、最良100点、最悪0点、再診断。
- 画像拡大: トップ3図とFuture Vision、閉じる／Escape。
- 内部リンク／ローカルリソース: 404なし。外部出典サイトの到達性は検証対象外。
- console error: 両画面0件。
- フォーム: キー未設定時は通信しない。模擬成功、API拒否、通信失敗を確認。失敗時入力保持、成功時リセット。
- JavaScript構文検査、sitemap XML構文検査、原本とのCSS・画像・所有権HTMLバイト一致、採点コード一致。
- スクリーンショットを目視確認。

検証コード・JSON・画像は verification/ に保存（Git除外・公開対象外）。

## 残る注意点
1. Web3Formsアクセスキー未提供。contact-config.jsに設定後、実送信・メール受信確認が必要。
2. pages.ymlはworkflow_dispatchのみ。キー未設定では失敗し、公開しない。GitHub側のPages設定とActions実行は未検証。
3. robots.txtはプロジェクト配下。ホスト全体のrobots制御はpublic-dl.github.io直下で管理。sitemapはSearch Consoleへ直接登録する。
4. Google所有権確認HTMLは原本を維持。新しいURLプレフィックスでの所有権確認は未実施。
5. 旧Netlifyからの転送は未実施。公開後に旧ホスト側で対応。
6. OGP画像は既存hero-photo.pngを使用。SNSの実際のプレビュー・キャッシュは公開後に確認。
7. Web3Forms側のスパム対策・送信先・個人情報取扱いを公開前に確認。botcheckだけで完全な防御を保証しない。


## 公開依頼への対応
ユーザー指示によりWeb3Forms未設定でも公開可能に変更。mainへのpushでPagesをデプロイ。問い合わせボタンはキー未設定時に無効化し、送信準備中と表示。過去の公開停止に関する記載は変更前の検証記録。
