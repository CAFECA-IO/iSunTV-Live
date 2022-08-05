# iSunTV-Live
Live Stream of iSunTV

# Requirements
支援 node.js v 14.15.1 版本以上


# Settings
1. 下載原始檔
```
git clone https://github.com/CAFECA-IO/iSunTV-Live.git
```
2. 安裝函式庫
```
cd iSunTV-Live
npm install
```
3. 準備 google email api 的 GOOGLE_CLIENT_ID, GOOGLE_CLIENT_PASSWORD
4. 進入 .env 檔修改以下參數，並以上述的資料替代之
```shell
vi .env
```
```toml
# google gmail api settings
GOOGLE_CLIENT_ID = "test_client_id"
GOOGLE_CLIENT_PASSWORD = "test_client_password" 

# http and https config
HTTP_ENABLE = true
HTTPS_ENABLE = true

# custom your port
HTTP_PORT = 80
HTTPS_PORT = 443

```
5. 啟動伺服器
```
npm run start
```
6. 測試
```
curl -X GET http://localhost:{config http port}/api/v1/chinasun/programlist/
```
確認有回傳節目表 表示成功

# How to run the api?
1. 確保 [http://localhost:{config http port}/](http://localhost:3000/) 並未被佔有
2. 執行以下的 command
```
＃執行 npm run build:nest 並將其編譯到 dist 中
npm run build:nest

＃執行 npm run start 來執行 node server 
npm run start
```
3. 進入 [http://localhost:{config http port}/api/v1](http://localhost:{config http port}/api/v1) 即進入 api
4. 使用 api 的規則請詳閱 wiki

# Folder structure
## Frontend
- src/ : Frontend
- build/ : 編譯後的 Frontend
- public/ : 靜態檔案存放
## Backend
- server/ : Backend
-  dist/ : 編譯後的 Backend
-  xls/ : 節目表檔案 
