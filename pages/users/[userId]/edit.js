import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { AuthContext } from '../../../context/auth';
import useForm from '../../../hooks/useForm';
import {
  editProfileForm,
  prefillEditProfileForm,
} from '../../../utils/formFieldConfig';
import { appendData } from '../../../utils';
import { getUserById } from '../../../lib/users';
import { getSession } from 'next-auth/react';
import ErrorModal from '../../../components/Modal/ErrorModal';
import { connectDB } from '../../../lib/connectDB';

const EditUserProfile = (props) => {
  const { renderFormInputs, renderFormValues, setForm, isFormValid } =
    useForm(editProfileForm);
  const { sendReq, isLoading, error, setError, clearError } = useHttpClient();
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  let formValues = renderFormValues();
  let formInputs = renderFormInputs();

  useEffect(() => {
    setError(props.error);
    const updateForm = async () => {
      prefillEditProfileForm(props.user);
      await setForm(editProfileForm);
    };
    updateForm();
  }, [props, setForm, setError]);

  const infoSubmitHandle = async (evt) => {
    evt.preventDefault(); //otherwise, there will be a reload
    const formData = appendData(formValues);
    try {
      const responseData = await sendReq(
        `/api/users/${props.user.id}`,
        'PATCH',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      const { name, bio, email, profilePic } = responseData.user;
      const { setUser: setAppUser } = auth;
      setAppUser({ ...currentUser, name, bio, email, profilePic });
      router.push(`/users/${props.user.id}`);
    } catch (err) {}
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ErrorModal error={error} onClose={clearError} />
          <div className='container-edit-page'>
            <form className='form form__edit' onSubmit={infoSubmitHandle}>
              <h2>Edit Post</h2>
              {!isLoading && formInputs}
              <button onClick={infoSubmitHandle} className='btn'>
                Update Profile
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditUserProfile;

export async function getServerSideProps(context) {
  await connectDB();
  const { params } = context;
  const { userId } = params;
  const { error, user } = await getUserById(userId);

  if (error || !user) {
    return {
      props: {
        error: error.message,
      },
    };
  }

  const session = await getSession(context);
  if (!session || session?.user.userId !== user.id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      session,
    },
  };
}
