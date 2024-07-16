import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { useHttpClient } from '../../../../hooks/useHttpClient';
import { AuthContext } from '../../../../context/auth';
import useForm from '../../../../hooks/useForm';
import {
  editPostForm,
  prefillEditPostForm,
} from '../../../../utils/formFieldConfig';
import { appendData } from '../../../../utils';
import { getPostById } from '../../../../lib/posts';
import styles from '../../../../styles/PostForm.module.css';
import ErrorModal from '../../../../components/Modal/ErrorModal';

export default function EditPost(props) {
  const { sendReq, isLoading, error, setError, clearError } = useHttpClient();
  const router = useRouter();
  const { id, titleURL } = props.post;
  const { renderFormInputs, renderFormValues, setForm, isFormValid } =
    useForm(editPostForm);
  let formValues = renderFormValues();
  let formInputs = renderFormInputs();

  useEffect(() => {
    setError(props.error);
    const updateForm = async () => {
      prefillEditPostForm(props.post);
      await setForm(editPostForm);
    };
    updateForm();
  }, [props, setForm, setError]);

  const handlePostSubmit = async (evt) => {
    evt.preventDefault();
    const formData = appendData(formValues);
    try {
      await sendReq(`/api/posts/${id}`, 'PATCH', formData);
      router.push(`/posts/${titleURL}/${id}`);
    } catch (err) {}
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ErrorModal error={error} onClose={clearError} />
          <div className={styles['container-edit-page']}>
            <form className={styles['form__edit']}>
              <h2>Edit Post</h2>
              {formInputs}
              <button
                type='button'
                onClick={handlePostSubmit}
                className='btn'
                disabled={!isFormValid()}
              >
                Update Post
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { postId } = params;
  const { error, post } = await getPostById(postId);
  const session = await getSession(context);
  if (!session || session?.user.userId !== post.author.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (error || !post) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      session,
    },
  };
}
