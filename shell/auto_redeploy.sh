#!/bin/bash

# 定義要檢查的應用程式名稱
APP_NAME="iSunTV-Live"

# 設定工作目錄
cd /home/ubuntu/workspace/iSunTV-Live

# 檢查是否有更新
git fetch

# 比較本地和遠端分支
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u})

if [ "$LOCAL" != "$REMOTE" ]; then
  echo "New commits detected. Pulling latest changes..."
  git pull
else
  echo "No new commits."
fi

# 檢查應用程式是否已啟動
pm2 list | grep "$APP_NAME" | grep -q "online"
if [ $? -eq 0 ]; then
  echo "PM2 服務 $APP_NAME 已經在運行中。"
else
  echo "PM2 服務 $APP_NAME 沒有運行，正在啟動..."
  pm2 start npm --name "$APP_NAME" -- start
fi
