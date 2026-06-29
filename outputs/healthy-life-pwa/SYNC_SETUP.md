# 健康生活 PWA 同步設定

這個 PWA 已經支援多人手機同步，但需要一個 Firebase Realtime Database 專案。

1. 到 Firebase 建立專案，新增一個 Web App。
2. 啟用 Realtime Database。
3. 把 Web App 的設定貼到 `firebase-config.js`，取代 `null`。
4. 部署整個資料夾到 HTTPS 網址，大家用同一個網址打開。
5. App 裡輸入同一個房間碼，例如 `healthy-life`。

同一個 Firebase 設定和房間碼會共用同一份排行榜與紀錄；每個人手機目前選到的成員會各自保存。
