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
3. 準備 google email api 的 REFRESH_TOKEN, ACCESS_TOKEN, CLIENT_SECRET, CLIENT_ID 
4. 進入 .env 檔修改以下參數，並以上述的資料替代之
```shell
vi .env
```
```toml
REFRESH_TOKEN = "test_refresh_token"
ACCESS_TOKEN =  "test_access_token"
CLIENT_SECRET = "test_client_secret"
CLIENT_ID = "test_client_id" 
```
5. 啟動伺服器
```
npm run start
```
6. 測試
```
curl -X GET http://localhost:3000/api/v1/chinasun/programlist/

```
確認有回傳節目表 表示成功

# How to run the api?
1. 確保 [http://localhost:3000/](http://localhost:3000/) 並未被佔有
2. 執行以下的 command
```
＃執行 npm run build:nest 並將其編譯到 dist 中
npm run build:nest

＃執行 npm run start 來執行 node server 
npm run start
```
3. 進入 [http://localhost:3000/api/v1](http://localhost:3000/api/v1) 即進入 api
4. 使用 api 的規則請詳閱 wiki
