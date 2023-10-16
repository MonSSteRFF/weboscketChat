import { makeAutoObservable, runInAction } from 'mobx';

import { url } from '@/settings';
import { RootModel } from '@/store/RootModel';

class WebsocketConnectionService {
  socket!: WebSocket;
  isConnected = false;
  rootModel!: RootModel;

  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;

    makeAutoObservable(this);
  }

  private wsHandler = () => {
    this.socket.onerror = (ev: Event) => {
      console.log('connection is error: ', ev);
      runInAction(() => {
        this.isConnected = false;
      });
    };
    this.socket.onclose = (ev: CloseEvent) => {
      console.log('connection is closed: ', ev.reason);
      runInAction(() => {
        this.isConnected = false;
      });
    };
  };

  connect = (username: string, onOpen: () => void) => {
    this.socket = new WebSocket(`${url}/chat`);
    this.wsHandler();
    this.messageHandler();

    this.socket.addEventListener('open', (ev) => {
      this.socket.send(
        JSON.stringify({
          type: 'innerConnection',
          data: { username: username },
        }),
      );

      runInAction(() => {
        this.isConnected = true;
      });
      onOpen();
    });
  };

  messageHandler = () => {
    this.socket.addEventListener('message', (event) => {
      const data = event.data;

      console.log('data: ', data);

      this.rootModel.chatModel.chatModelMessageHandler(event);
    });
  };
}

export default WebsocketConnectionService;
