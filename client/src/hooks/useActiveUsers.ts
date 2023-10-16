import { useEffect, useState } from 'react';

import { url } from '@/settings';

export interface User {
  username: string;
  id: number;
  created: Date;
}
export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
}
interface InnerConnection {
  type: 'innerConnection';
  data: User[];
}
interface LoginLogout {
  type: 'login' | 'logout';
  data: User;
}

const useActiveUsers = () => {
  const [status, setStatus] = useState(Status.LOADING);
  const [users, setUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const usersMessagesHandler = (message: MessageEvent) => {
    const m = JSON.parse(message.data) as InnerConnection | LoginLogout;

    switch (m.type) {
      case 'innerConnection': {
        setUsers(m.data);
        break;
      }
      case 'login': {
        setUsers((prev) => [...prev, m.data]);
        break;
      }
      case 'logout': {
        setUsers((prev) => prev.filter((u) => u.id !== m.data.id));
        break;
      }
    }

    setStatus(Status.SUCCESS);
  };

  const connectToWebsocket = () => {
    setStatus(Status.LOADING);
    socket?.close();
    const _socket = new WebSocket(`${url}/active-users`);
    setSocket(_socket);
    _socket.addEventListener('message', usersMessagesHandler);
  };

  useEffect(() => {
    connectToWebsocket();
    return () => {
      socket?.removeEventListener('message', usersMessagesHandler);
      socket?.close();
    };
  }, []);

  const statusIsLoading = status === Status.LOADING;

  return { users, connectToWebsocket, statusIsLoading };
};

export default useActiveUsers;
