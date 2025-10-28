//imports
const WebSocket = require('ws')
const readline = require('readline')


//readline interface for users input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stout
})

//connets to the web socket server located in server.js
const ws = new WebSocket('ws://localhost:8080')

//connection is opened hopefully
ws.on('open', () => {
    console.log('connected to the web socket server')
    promptForMessage()
})

// listens for a message from the websocket server
ws.on('message', (message) => {
    console.log('server: ${message}')
})

//error handling
ws.on('error', (error) => {
    console.log('websocket error: ${error}')
})

//handler for connection close
ws.on('close', () => {
    console.log('disconnected from websocket server')
    process.exit(0)
})

//function for user input
function promptForMessage() {
    rl.question('enter a message (or "exit" to quit): ', (message) =>{
        if (message.toLowerCase() === 'exit') {
            ws.close()
            rl.close()
            return
        }
        ws.send(message)
        promptForMessage()
    })
}