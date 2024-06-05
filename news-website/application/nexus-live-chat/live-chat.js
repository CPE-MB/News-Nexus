document.addEventListener("DOMContentLoaded", function () {
    const app = document.querySelector(".chat-application");
    let uname;
    let socket;

    function sendMessage() {
        let messageInput = app.querySelector("#message-input");
        let message = messageInput.value.trim();
        if (message.length === 0) {
            return;
        }

        let data = {
            type: "chat",
            username: uname,
            text: message
        };
        socket.send(JSON.stringify(data));

        renderMessage("my", data);

        messageInput.value = "";
    }

    app.querySelector("#send-message").addEventListener("click", sendMessage);

    app.querySelector("#message-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    app.querySelector("#join-user").addEventListener("click", function () {
        let username = app.querySelector("#username").value.trim();

        if (username.length === 0) {
            alert("Please enter a username.");
            return;
        }

        socket = new WebSocket("ws://localhost:8080");
        uname = username;

        socket.addEventListener("open", function (event) {
            let data = {
                type: "newuser",
                username: uname
            };
            socket.send(JSON.stringify(data));

            app.querySelector(".join-screen").classList.remove("active");
            app.querySelector(".chat-screen").classList.add("active");
        });

        socket.addEventListener("message", function (event) {
            try {
                let data = JSON.parse(event.data);
                renderMessage(data.type, data);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                console.log("Non-JSON message received:", event.data);
            }
        });
    });

    app.querySelector("#exit-room").addEventListener("click", function () {
        let data = {
            type: "exituser",
            username: uname
        };
        socket.send(JSON.stringify(data));

        window.location.href = window.location.href;
    });

    app.querySelector("#return-home").addEventListener("click", function () {
        window.location.href = "app.html#home";
    });

    function renderMessage(type, message) {
        let messageContainer = app.querySelector(".chat-screen .messages");
        let doc = document.createElement("div");
        doc.classList.add("message");
    
        let timestamp = "";
        if (message.timestamp) {
            timestamp = `<div class="timestamp">${message.timestamp}</div>`;
        }
    
        if (type === "my") {
            doc.classList.add("my-message");
            doc.innerHTML = `
                <div>
                    <div class="name">You</div>
                    ${timestamp}
                    <div class="text">${message.text}</div>
                </div>
            `;
        } else if (type === "chat") {
            if (message.username !== uname) {
                doc.classList.add("another-user-message");
                doc.innerHTML = `
                    <div>
                        <div class="name">${message.username}</div>
                        ${timestamp}
                        <div class="text">${message.text}</div>
                    </div>
                `;
            }
        } else if (type === "update") {
            doc.classList.add("update");
            doc.style.textAlign = "center";
            doc.style.display = "block";
            doc.innerText = message.text;
        }
    
        messageContainer.appendChild(doc);
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
});