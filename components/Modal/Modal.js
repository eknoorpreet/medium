import { GrFormClose } from 'react-icons/gr';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import styles from './Modal.module.css';
import Auth from '../Auth/Auth';

export const ModalWrapper = ({ show, condition, children, onClose }) => {
  const nodeRef = React.useRef(null);

  return condition ? (
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      appear={show}
      mountOnEnter
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
      classNames={{
        enterDone: styles['enter-done'],
        exitActive: styles['exit'],
      }}
    >
      <div ref={nodeRef} className={styles.modal} onClick={onClose}>
        {children}
      </div>
    </CSSTransition>
  ) : (
    children
  );
};

const Modal = (props) => {
  const nodeRef = React.useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  // const content = (
  //   <ModalWrapper
  //     condition={props.auth}
  //     show={props.show}
  //     onClose={props.onClose}
  //   >
  //     <div
  //       className={styles['modal__content']}
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       <>
  //         <div className={styles['modal__header']}>
  //           <h4 className={styles['modal__title']}>{props.title}</h4>
  //           <i>
  //             <GrFormClose size='2.5rem' onClick={props.onClose} />
  //           </i>
  //         </div>
  //         <div className={styles['modal__body']}>{props.children}</div>
  //         <div className={styles['modal__footer']}>{props.footer}</div>
  //       </>
  //     </div>
  //   </ModalWrapper>
  // );

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
        {props.content ? (
          props.content
        ) : (
          <div
            className={styles['modal__content']}
            onClick={(e) => e.stopPropagation()}
          >
            <>
              <div className={styles['modal__header']}>
                <h4 className={styles['modal__title']}>{props.title}</h4>
                <i>
                  <GrFormClose size='2.5rem' onClick={props.onClose} />
                </i>
              </div>
              <div className={styles['modal__body']}>{props.children}</div>
              <div className={styles['modal__footer']}>{props.footer}</div>
            </>
          </div>
        )}
      </div>
    </CSSTransition>
  );

  return mounted
    ? ReactDOM.createPortal(content, document.getElementById('__next'))
    : null;
};

export default Modal;
