import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Auth from '../Auth/Auth';
import Modal from './Modal';
import styles from './Modal.module.css';

const AuthModal = (props) => {
  const nodeRef = React.useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      appear={props.show}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      classNames={{
        enterDone: styles['enter-done'],
        exitActive: styles['exit'],
      }}
    >
      <div ref={nodeRef} className={styles.modal} onClick={props.onClose}>
        <div className={`${styles['modal__content']} ${styles['modal-auth']}`}>
          <Auth asModal show={props.show} onClose={props.onClose} />
        </div>
      </div>
    </CSSTransition>
  );

  return (
    <Modal
      show={props.show}
      onClose={props.onClose}
      content={
        <div
          className={`${styles['modal__content']} ${styles['modal-auth']}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Auth asModal />
        </div>
      }
    />
  );

  // return mounted
  //   ? ReactDOM.createPortal(content, document.getElementById('__next'))
  //   : null;
};

export default AuthModal;
