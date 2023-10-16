import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRootModel } from '@/store/RootModel';

import { routes, RouteTypes } from '../AppRouter';
import styles from './Header.module.scss';

const Header = observer(() => {
  const { websocketConnectionService } = useRootModel((root) => ({
    websocketConnectionService: root.websocketConnectionService,
  }));

  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <ul className={styles.list}>
          {(Object.keys(routes) as Array<keyof typeof routes>).map((routeKey) => {
            const route = routes[routeKey];

            if (
              (websocketConnectionService.isConnected &&
                route.type !== RouteTypes.beforeAuth) ||
              (!websocketConnectionService.isConnected &&
                route.type !== RouteTypes.afterAuth)
            ) {
              return (
                <li key={routeKey} className={styles.list_item}>
                  <Link to={routeKey} className={styles.list_item_link}>
                    {route.name}
                  </Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </nav>
    </header>
  );
});

export default Header;
