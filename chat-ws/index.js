import { WebSocketServer } from "ws";
import express from 'express'

const webserver = express()
    .use((req, res) =>
        res.sendFile('index.html', { root: 'chat-ws/public' })
    )
    .listen(3000, () => console.log(`Escuchando en ${3000}`))

const sockserver = new WebSocketServer({ port: 443 })

sockserver.on('connection', ws => {
    console.log('Nuevo cliente conectado')
    ws.send('Conexion establecida')
    ws.on('close', () => console.log('El cliente se desconecto!'))
    ws.on('message', data => {
        sockserver.clients.forEach(client => {
            console.log(`Reenviando el mensaje: ${data}`)
            client.send(`${data}`)
        })
    })
    ws.on('error', function () {
        console.log('Websocket error')
    })
})