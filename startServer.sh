#!/bin/bash

PORT=8080
HTTP_PORT=3000
HTML_PATH="$PWD/index.html"

# Install dependencies
npm install

# Check Node version
node -v

# Kill any process using the port
PID=$(netstat -ano | grep ":$PORT " | awk '{print $5}' | tr -d '\r')
if [ -n "$PID" ]; then
    echo " Port $PORT is in use by PID $PID. Killing..."
    taskkill //F //PID $PID
fi

# Start server in background
echo " Starting WebSocket server..."
node server.js &
SERVER_PID=$!

# Start HTTP server
echo " Starting HTTP server on http://localhost:$HTTP_PORT"
npx http-server . -p $HTTP_PORT &
HTTP_PID=$!

sleep 1

# Open browser to the served HTML page
start "" "http://localhost:$HTTP_PORT/index.html"

# Run CLI client interactively in this terminal
echo " Launching CLI client..."
node client.js

# Kill server when client exits
kill $SERVER_PID
