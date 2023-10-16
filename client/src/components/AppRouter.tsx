import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Chat from '@/components/pages/Chat';
import Users from '@/components/pages/Users';

import Auth from './pages/Auth';
import HomePage from './pages/HomePage';

enum RouteTypes {
  beforeAuth = 'beforeAuth',
  afterAuth = 'afterAuth',
  none = 'none',
}

const routes = {
  '/': { element: <HomePage />, name: 'home page', type: RouteTypes.none },
  '/auth': { element: <Auth />, name: 'auth', type: RouteTypes.beforeAuth },
  '/users': { element: <Users />, name: 'users', type: RouteTypes.none },
  '/chat': { element: <Chat />, name: 'chat', type: RouteTypes.none },
};

const AppRouter = () => {
  return (
    <Routes>
      {(Object.keys(routes) as Array<keyof typeof routes>).map((routeKey) => {
        const route = routes[routeKey];

        return <Route key={route.name} path={routeKey} element={route.element} />;
      })}
    </Routes>
  );
};

export { routes, RouteTypes };
export default AppRouter;
