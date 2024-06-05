const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = 8080;

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

let chat_history = [];
let messageId = 0;

const eventHandlers = {
    newuser: (wsServer, ws, received) => {
        const userMessage = JSON.stringify({ type: "update", text: "You joined the conversation" });
        ws.send(userMessage);

        // Send chat history to the joining user
        chat_history.forEach(message => {
            ws.send(JSON.stringify(message));
        });

        const updateMessage = JSON.stringify({ type: "update", text: `${received.username} joined the conversation` });
        wsServer.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(updateMessage);
            }
        });
    },
    chat: (wsServer, ws, received) => {
        const currentTime = new Date();
        const chatMessage = {
            type: "chat",
            id: messageId++,
            username: received.username,
            text: received.text,
            timestamp: currentTime.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
        };
        chat_history.push(chatMessage); // Store message in chat history
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(chatMessage));
            }
        });
    },
    exituser: (wsServer, ws, received) => {
        const exitMessage = JSON.stringify({ type: "update", text: `${received.username} left the conversation` });
        wsServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(exitMessage);
            }
        });
    }
};

wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
        try {
            const received = JSON.parse(message);
            const handler = eventHandlers[received.type];
            if (handler) {
                handler(wsServer, ws, received);
            }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`News Nexus is Listening on port ${PORT}`);
});