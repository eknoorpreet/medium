import React, { useContext } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import useForm from '../../hooks/useForm';
import { useRouter } from 'next/router';
import { newPostForm } from '../../utils/formFieldConfig';
import { appendData } from '../../utils';
import { AuthContext } from '../../context/auth';
import styles from '../../styles/PostForm.module.css';
import ErrorModal from '../../components/Modal/ErrorModal';
import { getSession } from 'next-auth/react';

const NewPost = ({ session }) => {
  const router = useRouter();
  const { user: currentUser } = session;
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { renderFormInputs, renderFormValues, isFormValid } =
    useForm(newPostForm);
  const formValues = renderFormValues();
  const formInputs = renderFormInputs();

  const postSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    formData.append('author', currentUser.userId);
    try {
      await sendReq(
        `/api/posts`,
        'POST',
        formData
        // {
        //   Authorization: `Bearer ${currentUser.token}`,
        // }
      );
      router.push('/');
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className={styles['container-create-page']}>
        <form className={`${styles['form__create']}`}>
          <h2>Publish a New Post</h2>
          {formInputs}
          <button
            onClick={postSubmitHandle}
            className='btn'
            disabled={!isFormValid()}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPost;

//goal is to tell Next about the data
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  return { props: { session } };
}
