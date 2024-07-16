import React, { useContext, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiFillFacebook, AiOutlineMail } from 'react-icons/ai';
import styles from './Auth.module.css';
import { loginForm, signupForm } from '../../utils/formFieldConfig';
import { appendData } from '../../utils';
import useForm from '../../hooks/useForm';
import { AuthContext } from '../../context/auth';
import { useRouter } from 'next/router';
import useHttpClient from '../../hooks/useHttpClient';
import { signIn, SessionProvider, useSession } from 'next-auth/react';
import ErrorModal from '../Modal/ErrorModal';
import { ModalWrapper } from '../Modal/Modal';

const Auth = ({ asModal, show, onClose }) => {
  const [newUser, setNewUser] = useState(false);
  const { renderFormInputs, renderFormValues, isFormValid, setForm } =
    useForm(signupForm);

  useEffect(() => {
    if (!newUser) {
      setForm(loginForm);
    } else {
      setForm(signupForm);
    }
  }, [newUser, setForm]);

  const formValues = renderFormValues();
  const formInputs = renderFormInputs();
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const { sendReq, error, setError, clearError } = useHttpClient();

  const handleAuthSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password, avatar } = formValues;
    try {
      let responseData;
      if (newUser) {
        //send a signup req
        const formData = appendData(formValues);
        responseData = await sendReq(`/api/auth/signup`, 'POST', formData);
      }
      //send a login req
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/');
      }
    } catch (err) {}
  };

  const AuthText = () => (
    <p>
      {!newUser ? 'No account ?' : 'Already have an account?'}
      <span>
        <button
          onClick={() => setNewUser((newUser) => !newUser)}
          className={`btn ${styles.switch}`}
        >
          {!newUser ? 'Create one' : 'Sign in'}
        </button>
      </span>
    </p>
  );

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div
        className={
          asModal
            ? `${styles['auth']} ${styles['auth-modal']}`
            : `${styles['auth']}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.welcome}>
          {!newUser ? 'Welcome back.' : 'Join Medium'}
        </h2>
        <div className={styles.options}>
          <button className={`btn ${styles.btn__auth}`}>
            <i>
              <FcGoogle />
            </i>
            <span> Sign in with Google</span>
          </button>

          <button className={`btn ${styles.btn__auth}`}>
            <i>
              <AiFillFacebook color='#375999' />
            </i>
            <span>Sign in with Facebook</span>
          </button>

          <button className={`btn ${styles.btn__auth}`}>
            <i>
              <AiOutlineMail />
            </i>
            <span>Sign in with email</span>
          </button>
          <p>Or</p>
          <p>
            {newUser
              ? 'Create a New Account'
              : 'Log in using an Existing Account'}
          </p>
        </div>
        <form>
          {formInputs}
          <button
            onClick={handleAuthSubmit}
            className={`btn ${styles.btn__auth} ${styles['btn__auth--mode']}`}
            disabled={!isFormValid()}
          >
            {newUser ? 'Create account' : 'Login'}
          </button>
        </form>
        <AuthText />
      </div>
    </>
  );
};

export default Auth;
