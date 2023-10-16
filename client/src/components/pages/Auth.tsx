import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRootModel } from '@/store/RootModel';

import styles from './Auth.module.scss';

const Auth = observer(() => {
  const [usernameValue, setUsernameValue] = useState('');

  const { websocketConnectionService } = useRootModel((root) => ({
    websocketConnectionService: root.websocketConnectionService,
  }));

  const navigate = useNavigate();
  const authClick = () => {
    websocketConnectionService.connect(usernameValue, () => {
      navigate('/');
    });
  };

  return (
    <section className={styles.section}>
      <form className={styles.authField} onSubmit={(e) => e.preventDefault()}>
        <input
          className={styles.input}
          type="text"
          placeholder={'username'}
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
        <button onClick={authClick} className={styles.button}>
          connect
        </button>
      </form>
    </section>
  );
});

export default Auth;
