import React from 'react';
import styles from './Input.module.css';
import formStyles from '../../../styles/PostForm.module.css';

const Input = (props) => {
  const {
    elementType,
    label,
    type,
    name,
    id,
    rows,
    handleChange,
    errorMessage,
    isValid,
    value,
    touched,
  } = props;

  const element =
    elementType === 'input' ? (
      <>
        <input
          type={type}
          name={name}
          id={id}
          key={label}
          onChange={handleChange}
          value={value}
          placeholder={name}
        />
      </>
    ) : (
      <textarea
        label={label}
        id={id}
        type={type}
        name={name}
        rows={rows || 3}
        onChange={handleChange}
        value={value}
      />
    );
  return (
    <div className={`${styles['form__group']} ${formStyles['form__group']}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {element}
      {!touched && errorMessage && !isValid && (
        <span className={styles.input__error}>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
