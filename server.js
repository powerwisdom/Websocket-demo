// imports the websocket library
const WebSocket = require('ws')

// creates a websocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 })

console.log(' WebSocket server is running on ws://localhost:8080')

// sets up event handlers for connections, messages, and disconnections
wss.on('connection', (ws) => {
  console.log(' New client connected')

  // sends a welcome message to the user
  ws.send('Welcome to my WebSocket server!')

  // message event handler
  ws.on('message', (message) => {
    console.log(` Received: ${message}`)
    // echo the message back to *all* connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Echo: ${message}`)
      }
    })
  })

  // closes the event handler once the user disconnects
  ws.on('close', () => {
    console.log(' User disconnected')
  })
})
