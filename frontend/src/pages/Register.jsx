import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { Headphones, Mail, Lock, User, UserPlus } from 'lucide-react';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: Yup.string()
    .required('First name is required'),
  lastName: Yup.string()
    .required('Last name is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const Register = () => {
  useDocumentTitle('Employee Registration');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const payload = {
        username: values.username,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        role: 'ROLE_EMPLOYEE', // Hardcoded as requested so only employees register
      };
      
      const res = await authApi.register(payload);
      if (res && res.success) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        resetForm();
        setTimeout(() => {
          navigate('/login', { state: { registered: true, message: 'Account created! Please log in.' } });
        }, 2000);
      } else {
        setErrorMessage(res?.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'An error occurred during registration. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 py-4 position-relative">
      <div className="position-absolute top-0 start-0 p-4 mt-2">
        <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 small fw-bold" style={{ color: '#8b949e' }}>
          <span>&larr; Back to Landing</span>
        </Link>
      </div>

      <Card className="glass-card p-3 p-md-4" style={{ maxWidth: '640px', width: '100%', background: 'var(--card-bg)' }}>
        <div className="text-center mb-3">
          <div className="d-inline-flex p-2 rounded-4 mb-2" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Headphones size={28} style={{ color: '#10b981' }} />
          </div>
          <h3 className="fw-bold mb-1 text-white" style={{ letterSpacing: '-0.5px' }}>Employee Portal</h3>
          <p className="small mb-0" style={{ color: '#8b949e' }}>Create your TicketDesk account</p>
        </div>

        {successMessage && <Alert variant="success" className="py-2 mb-3 small">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger" className="py-2 mb-3 small" dismissible onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}

        <Formik
          initialValues={{ username: '', email: '', firstName: '', lastName: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <div className="row g-3 mb-3">
                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">First Name</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <User size={18} />
                    </span>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="Jane"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.firstName && !!errors.firstName}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <div className="text-danger small fw-semibold mt-1">{errors.firstName}</div>
                  )}
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">Last Name</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <User size={18} />
                    </span>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.lastName && !!errors.lastName}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.lastName && errors.lastName && (
                    <div className="text-danger small fw-semibold mt-1">{errors.lastName}</div>
                  )}
                </Form.Group>
              </div>

              <div className="row g-3 mb-3">
                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">Username</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <User size={18} />
                    </span>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="janedoe"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.username && !!errors.username}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.username && errors.username && (
                    <div className="text-danger small fw-semibold mt-1">{errors.username}</div>
                  )}
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">Email Address</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <Mail size={18} />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="jane.doe@company.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && !!errors.email}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div className="text-danger small fw-semibold mt-1">{errors.email}</div>
                  )}
                </Form.Group>
              </div>

              <div className="row g-3 mb-4">
                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">Password</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <Lock size={18} />
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.password && !!errors.password}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.password && errors.password && (
                    <div className="text-danger small fw-semibold mt-1">{errors.password}</div>
                  )}
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label className="form-label mb-1">Confirm Password</Form.Label>
                  <div className="position-relative">
                    <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                      <Lock size={18} />
                    </span>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      className="form-control-dark ps-5"
                    />
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-danger small fw-semibold mt-1">{errors.confirmPassword}</div>
                  )}
                </Form.Group>
              </div>

              <Button type="submit" disabled={isSubmitting} className="btn-indigo w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 mb-3 fs-6">
                <UserPlus size={18} /> {isSubmitting ? 'Registering...' : 'Register'}
              </Button>

              <div className="text-center mt-2">
                <p className="small mb-0" style={{ color: '#8b949e' }}>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#10b981' }}>
                    Sign In here
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

