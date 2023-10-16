import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRootModel } from '@/store/RootModel';

import styles from './HomePage.module.scss';

const HomePage = observer(() => {
  const { websocketConnectionService } = useRootModel((root) => ({
    websocketConnectionService: root.websocketConnectionService,
  }));

  return (
    <section className={styles.homePage}>
      <h1 className={styles.title}>hello! this is websocket chats</h1>

      <p>
        {'go to '}
        {websocketConnectionService.isConnected ? (
          <Link className={styles.link} to={'/chats'}>
            chats
          </Link>
        ) : (
          <Link className={styles.link} to={'/auth'}>
            auth
          </Link>
        )}
      </p>
    </section>
  );
});

export default HomePage;
