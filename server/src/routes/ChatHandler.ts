import { Server, WebSocket, WebSocketServer } from "ws";
import generateId from "../tools/generateId";
import { IncomingMessage } from "http";
import { ServerModel } from "@/index";

interface ChatMessage_innerConnection {
  type: "innerConnection";
  data: { username: string };
}

type ChatMessage = ChatMessage_innerConnection;

interface Session {
  socket: WebSocket;
  data: { username: string };
}

class ChatHandler {
  sessions: { [key: string]: Session } = {};
  server!: Server<typeof WebSocket, typeof IncomingMessage>;
  serverModel!: ServerModel;

  constructor(serverModel: ServerModel) {
    this.serverModel = serverModel;

    this.server = new WebSocketServer({ noServer: true });

    this.server.on("connection", (socket) => {
      socket.on("message", (msg) => {
        try {
          const obj: ChatMessage = JSON.parse(msg.toString("utf-8"));

          switch (obj.type) {
            case "innerConnection": {
              this.addSession(socket, obj.data.username);
              break;
            }
          }
        } catch (e: any) {
          socket.send(
            `ChatHandler - ${(typeof e === "object" ? e : "Error").toString()}`,
          );
        }
      });
    });
  }

  private addSession = (socket: WebSocket, username: string) => {
    const id = generateId("Chat");
    this.sessions[id] = {
      socket,
      data: { username },
    };
    this.loginHandler("login", username);

    socket.on("close", () => {
      this.loginHandler("logout", username);
      delete this.sessions[id];
    });
  };

  private loginHandler = (method: "login" | "logout", username: string) => {
    this.serverModel.activeUsers.sendToAll(
      JSON.stringify({
        type: method,
        data: { username: username },
      }),
    );
  };
}

export default ChatHandler;
