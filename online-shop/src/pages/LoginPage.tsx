// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  });

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await login(values.email, values.password);
            alert('Login Success!');
            navigate('/cart'); // Redirect to cart page
          } catch (error: any) {
            if (error.message === 'User not found') {
              alert('User not found, redirecting to registration page...');
              navigate('/register'); // Redirect to register page
            } else {
              alert('Invalid email or password');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
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
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Form>
        )}
      </Formik>
      <button 
        onClick={() => navigate('/register')}
        className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Register for new user
      </button>
    </div>
  );
};

export default LoginPage;
