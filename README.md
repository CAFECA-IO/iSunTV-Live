# iSunTV-Live
Live Stream of iSunTV

# Requirements
1. 下載 node.js v14.15.1 版本 至本機端
2. 執行 npm install 指令

# Settings
1. 準備 google email api 的 REFRESH_TOKEN, ACCESS_TOKEN, CLIENT_SECRET, CLIENT_ID 
2. 進入 .env 檔修改以下參數，並以上述的資料替代之
```
REFRESH_TOKEN = "test_refresh_token"
ACCESS_TOKEN =  "test_access_token"
CLIENT_SECRET = "test_client_secret"
CLIENT_ID = "test_client_id" 
```

# How to run the api?
1. 確保 localhost:3000 並未被佔有
2. 執行以下的 command
```
＃執行 api build:nest 並將其編譯到 dist 中
npm run build:nest
＃執行 npm run start 來執行 node server 
npm run start
```
3. 進入 localhost:3000/api/v1 即進入 api
4. 使用 api 的規則請詳閱 wiki
