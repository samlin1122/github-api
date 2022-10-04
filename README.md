# [github-api](https://samlin1122.github.io/github-api/)

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### 請先進入到 src/http.js 中修改 Authorization(可以手動輸入 personal token or 新增 .env)

此次使用 GET /orgs/{org}/repos 進行，並使用 Dcard 作為測試的 org.\
使用 type, sort, direction 並以 dropdown 形式進行篩選, 並稍微優化 api 呼叫.\
手工製作 Infinite Scroll, 並搭配簡易 loading layout 與 error message.
