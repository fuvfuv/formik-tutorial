import React, { Component } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';

const App = ({ values, errors, touched, isSubmitting }) => {
  return (
    <Form>
      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
      </div>
      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <label>
        <Field type="checkbox" name="newsletter" checked={values.newsletter} />
        Join our newsletter
      </label>
      <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premium</option>
      </Field>
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </Form>
  );
};

export const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || true,
      plan: plan || 'free'
    };
  },
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email('Email no valid')
      .required('Email is required'),
    password: yup
      .string()
      .min(9, 'Password must me 9 charachters or longer')
      .required('Password is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'heyhihello@gmail.com') {
        setErrors({
          email: 'That email is already taken'
        });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(App);
