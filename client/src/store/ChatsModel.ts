import { RootModel } from '@/store/RootModel';

class ChatsModel {
  rootModel!: RootModel;

  constructor(rootModel: RootModel) {
    this.rootModel = rootModel;
  }

  chatModelMessageHandler = (event: MessageEvent) => {};
}

export default ChatsModel;
