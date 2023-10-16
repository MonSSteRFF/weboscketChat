// import { config } from "dotenv";
// import { PrismaClient } from "prisma/prisma-client";
// config();
//
// const prisma = new PrismaClient();

import ChatHandler from "./routes/ChatHandler";
import ActiveUsersHandler from "./routes/ActiveUsersHandler";
import { createServer, IncomingMessage } from "http";

class ServerModel {
  chat!: ChatHandler;
  activeUsers!: ActiveUsersHandler;

  constructor() {
    const server = createServer();

    this.chat = new ChatHandler(this);
    this.activeUsers = new ActiveUsersHandler(this);

    server.on("upgrade", (request, socket, head) => {
      switch (request.url) {
        case "/chat": {
          this.chat.server.handleUpgrade(request, socket, head, (ws) => {
            this.chat.server.emit("connection", ws, request);
          });
          break;
        }
        case "/active-users": {
          this.activeUsers.server.handleUpgrade(request, socket, head, (ws) => {
            this.activeUsers.server.emit("connection", ws, request);
          });
          break;
        }
        default: {
          socket.destroy();
        }
      }
    });

    server.listen(8080, "127.0.0.1");
  }
}

new ServerModel();
export { ServerModel };
