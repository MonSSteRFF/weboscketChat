import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import AppRouter, { routes, RouteTypes } from './components/AppRouter';
import Header from './components/layout/Header';
import { useRootModel } from './store/RootModel';

const App = observer(() => {
  const { websocketConnectionService } = useRootModel((root) => ({
    websocketConnectionService: root.websocketConnectionService,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    if (!websocketConnectionService.isConnected) {
      const beforeLoginRoutes: string[] = (
        Object.keys(routes) as Array<keyof typeof routes>
      ).filter((routeKey) => routes[routeKey].type === RouteTypes.beforeAuth);

      if (beforeLoginRoutes.includes(window.location.pathname)) {
        navigate('/auth');
      }
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/auth');
    }
  }, []);

  return (
    <>
      <Header />

      <main className={styles.containerSection}>
        <AppRouter />
      </main>
    </>
  );
});

export default App;
