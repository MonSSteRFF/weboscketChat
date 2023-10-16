import { Server, WebSocket, WebSocketServer } from "ws";
import generateId from "../tools/generateId";
import { IncomingMessage } from "http";
import { ServerModel } from "@/index";

interface Session {
  socket: WebSocket;
}

class ActiveUsersHandler {
  sessions: { [key: string]: Session } = {};
  server!: Server<typeof WebSocket, typeof IncomingMessage>;
  serverModel!: ServerModel;

  constructor(serverModel: ServerModel) {
    this.serverModel = serverModel;

    this.server = new WebSocketServer({ noServer: true });

    this.server.on("connection", (socket) => {
      this.addSession(socket);
    });
  }

  private addSession = (socket: WebSocket) => {
    const id = generateId("ActiveUsers");

    const isLoginUsernames = Object.keys(this.serverModel.chat.sessions).map(
      (key) => this.serverModel.chat.sessions[key].data,
    );
    socket.send(
      JSON.stringify({
        type: "innerConnection",
        data: isLoginUsernames,
      }),
    );

    this.sessions[id] = {
      socket,
    };
    socket.on("close", () => {
      delete this.sessions[id];
    });
  };

  public sendToAll = (data: string) => {
    const keys = Object.keys(this.sessions);
    keys.forEach((key) => {
      this.sessions[key].socket.send(data);
    });
  };
}

export default ActiveUsersHandler;
