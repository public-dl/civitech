# CivITech — Web Site

CivITech / IT × Civility の公開用Webサイト一式です。

## ファイル
- index.html
- styles.css
- script.js
- civitech-logo.png
- hero-photo.png
- team-photo.png
- synergy-figure.png

## 主な機能
- CivITechブランド（ロゴはIT部分が緑）
- IT × Civilityのシナジー説明
- Research数値アニメーション
- 働きごこち診断
- 新潟発のAboutストーリー
- Web3Forms対応問い合わせフォーム

## GitHub Pages
公開先: public-dl/civitech
公開URL: https://public-dl.github.io/civitech/


## 表記調整
IT（情報技術）／Civility（礼節・相互尊重）は、英語を主表示、和訳を小さなグレー文字で表示しています。


## 2026-09 update
- Added U.S. Workplace Civility / Global Insight section.
- Added SHRM and U.S. Department of Veterans Affairs CREW source links.
- Clarified CivITech's core outcome as productivity improvement.


## Brand order update
- Unified brand expression to "Civility × IT".
- Japanese gloss changed to "礼節・相互尊重 × 情報技術".
- Reordered core explanatory copy so Civility appears before IT.


## 2026-09-03 fixes
- Updated brand order and hero copy to CIVILITY × IT / Civility × IT.
- Fixed concept heading and explanatory copy.
- Reordered concept cards to Civility -> IT -> Synergy.
- Replaced the synergy section with a corrected infographic image (synergy-figure.png).


## Final polish update
- Performed a full consistency pass for Civility × IT wording.
- Kept hero, concept, synergy, and footer aligned with the Civility-first brand order.
- Updated the service translation to 「職場の礼節・相互尊重分析」.
- Polished the About section heading to show both terms with smaller Japanese glosses.
- Replaced/kept the corrected synergy figure asset.


## Civility introduction update
- Added a WHAT IS CIVILITY? block directly after the hero.
- Explains Civility as 礼節・相互尊重 and, importantly, why it matters as a management issue.
- References SHRM and SOMPO Institute Plus.
- Connects Civility directly to CivITech's productivity proposition.


## 2026-09-04 update
- Replaced the synergy illustration with the selected “ITで減らす。Civilityで深める。” infographic.
- Updated the synergy section copy to align with the integrated Civility × IT concept.
- Added responsive display rules for the large infographic.


## 2026-09-04 update — both figures
- Restored the original synergy figure.
- Kept the newer “ITで減らす。Civilityで深める。” approach figure as a separate second visual.
- Added captions so the two figures have distinct roles.


## 2026-09-04 layout refinement
- Reworked the SYNERGY section so the copy sits above both figures.
- Display both figures in a balanced two-card layout on desktop and stacked on mobile.
- Added framed cards for each figure to improve spacing and readability.


## 2026-09-04 click zoom update
- Added click-to-enlarge lightbox for both SYNERGY figures.
- Matched preview sizes on desktop by using equal-height preview frames.
- Preserved responsive stacking on mobile.


## Added in this update
- `future-vision.html` : Future Vision の単独ページ
- `future-vision-figure.png` : Future Vision のイメージ図
- `index.html` に Future Vision セクションと導線を追加


## 公開前の設定
- contact-config.js の accessKey に Web3Forms のアクセスキーを設定してください。キーは公開フォーム識別子です。管理用APIトークン等を入れないでください。
- Settings → Pages → Source を GitHub Actions に設定します。
- pages.yml は main へのpushまたは手動実行で公開します。キー未設定でもサイトを公開し、問い合わせ送信は無効です。
- robots.txt はプロジェクト配下に置かれます。ホスト全体のrobots制御には https://public-dl.github.io/robots.txt が必要です。Search Consoleにsitemapを直接登録してください。
- Google所有権確認HTMLは原本のまま保持しています。新しいURLプレフィックスで再確認してください。
- 旧Netlifyサイトからの転送は、別途旧ホスト側で設定してください。
- 問い合わせはWeb3Formsへ送信されます。公開前に受信確認と情報取扱いの確認を行ってください。
