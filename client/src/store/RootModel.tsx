import React, { createContext, useContext } from 'react';

import ChatsModel from '@/store/ChatsModel';

import WebsocketConnectionService from './WebsocketConnectionService';

export class RootModel {
  websocketConnectionService!: WebsocketConnectionService;
  chatModel!: ChatsModel;

  constructor() {
    this.websocketConnectionService = new WebsocketConnectionService(this);
    this.chatModel = new ChatsModel(this);
  }
}

const rootModel = new RootModel();

// export const refreshRootModel = () => {
//   rootModel = new RootModel();
// };

const RootModelContext = createContext<RootModel>(rootModel);

export const RootModelContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RootModelContext.Provider value={rootModel}>{children}</RootModelContext.Provider>
  );
};

export function useRootModel<Result>(selector: (value: RootModel) => Result) {
  const store = useContext(RootModelContext);

  if (store === undefined || store === null) {
    throw new Error('Can not `useFeatures` outside of the `RootModelContextProvider`');
  }

  return selector(store);
}
