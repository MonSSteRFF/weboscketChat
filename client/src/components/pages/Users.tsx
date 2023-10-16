import React from 'react';

import useActiveUsers from '@/hooks/useActiveUsers';

import styles from './Users.module.scss';

const Users = () => {
  const { statusIsLoading, users } = useActiveUsers();

  return (
    <section className={styles.users}>
      <h2 className={styles.title}>list of all connected users: </h2>

      {statusIsLoading ? (
        'loading...'
      ) : (
        <>
          {users.length === 0 ? (
            <p>no users has connected :c</p>
          ) : (
            <ul className={styles.list}>
              {users.map((item, index) => (
                <li key={index} className={styles.list_item}>
                  <p>id: {item.id}</p>
                  <p>username: {item.username}</p>
                  <p>created: {new Date(item.created).toDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
};

export default Users;
