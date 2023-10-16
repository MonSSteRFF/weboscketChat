import React, { useEffect, useState } from 'react';

import useActiveUsers, { User } from '@/hooks/useActiveUsers';

import styles from './Chat.module.scss';

enum ChatTab {
  ALL = 'ALL',
  MY = 'MY',
}

const Chat = () => {
  const [activeTab, setActiveTab] = useState(ChatTab.MY);
  const { statusIsLoading, users } = useActiveUsers();

  const [friends, setFrieds] = useState<User[]>([]);

  return (
    <section className={styles.chat}>
      <aside className={styles.aside}>
        <div className={styles.aside_tabs}>
          <button
            className={
              activeTab === ChatTab.ALL
                ? `${styles.aside_btn} ${styles.active}`
                : styles.aside_btn
            }
            onClick={() => setActiveTab(ChatTab.ALL)}
          >
            all chats
          </button>
          <button
            className={
              activeTab === ChatTab.MY
                ? `${styles.aside_btn} ${styles.active}`
                : styles.aside_btn
            }
            onClick={() => setActiveTab(ChatTab.MY)}
          >
            my chats
          </button>
        </div>

        {activeTab === ChatTab.ALL && (
          <div className={styles.aside_wrapper}>
            {statusIsLoading ? (
              'loading...'
            ) : (
              <ul className={styles.aside_list}>
                {users.map((user, index) => (
                  <li key={index} className={styles.aside_list_item}>
                    <p>id: {user.id}</p>
                    <p>{user.username}</p>
                    <p>{new Date(user.created).toDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === ChatTab.MY && (
          <div className={styles.aside_wrapper}>
            <ul className={styles.aside_list}>
              {friends.map((user, index) => (
                <li key={index} className={styles.aside_list_item}>
                  <p>id: {user.id}</p>
                  <p>{user.username}</p>
                  <p>{new Date(user.created).toDateString()}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <div className={styles.chatField}>
        <div className={styles.chatField_messagesWrapper}>
          <div className={`${styles.messageWrapper} ${styles.input}`}>
            <div className={`${styles.messageWrapper_message} ${styles.input}`}>
              message input
            </div>
          </div>
          <div className={`${styles.messageWrapper} ${styles.output}`}>
            <div className={`${styles.messageWrapper_message} ${styles.output}`}>
              message output
            </div>
          </div>
        </div>
        <div className={styles.chatField_textareaWrapper}>
          <textarea
            className={styles.textarea}
            placeholder={'type your message...'}
          ></textarea>
          <button className={styles.textarea_send}>send</button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
