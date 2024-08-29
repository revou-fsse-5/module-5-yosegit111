// src/pages/RegisterPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    birthDate: Yup.date().required('Birth Date is required'),
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          address: '',
          country: '',
          city: '',
          birthDate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          register(values);
          navigate('/login');
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field id="username" name="username" type="text" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <Field id="email" name="email" type="email" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field id="password" name="password" type="password" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <Field id="address" name="address" type="text" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <Field as="select" id="country" name="country" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm">
                <option value="">Select a country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </Field>
              <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <Field id="city" name="city" type="text" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
              <Field id="birthDate" name="birthDate" type="date" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
              <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
