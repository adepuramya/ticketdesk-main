import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { Headphones, Mail, Lock, LogIn } from 'lucide-react';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, 'Username or email must be at least 3 characters')
    .required('Username or email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const Login = () => {
  useDocumentTitle('Sign In');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');
  const successMessage = location.state?.message;

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    try {
      const res = await login(values);
      if (res && res.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(res?.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 py-5 position-relative">
      {/* Back to Landing link */}
      <div className="position-absolute top-0 start-0 p-4 mt-2">
        <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 small fw-bold" style={{ color: '#8b949e' }}>
          <span>&larr; Back to Landing</span>
        </Link>
      </div>

      <Card className="glass-card p-4 p-md-5" style={{ maxWidth: '460px', width: '100%', background: 'var(--card-bg)' }}>
        <div className="text-center mb-4">
          <div className="d-inline-flex p-3 rounded-4 mb-3" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Headphones size={36} style={{ color: '#10b981' }} />
          </div>
          <h2 className="fw-bold mb-1 text-white" style={{ letterSpacing: '-0.5px' }}>Welcome to ServiceDesk</h2>
          <p className="fs-6 mb-0" style={{ color: '#8b949e' }}>Enterprise IT Incident & Request Portal</p>
        </div>

        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}

        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email Address</Form.Label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                    <Mail size={18} />
                  </span>
                  <Form.Control
                    type="text"
                    name="usernameOrEmail"
                    placeholder="you@company.com"
                    value={values.usernameOrEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.usernameOrEmail && !!errors.usernameOrEmail}
                    className="form-control-dark ps-5"
                  />
                </div>
                {touched.usernameOrEmail && errors.usernameOrEmail && (
                  <div className="text-danger small fw-semibold mt-1">
                    {errors.usernameOrEmail}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="form-label">Password</Form.Label>
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
                  <div className="text-danger small fw-semibold mt-1">
                    {errors.password}
                  </div>
                )}
              </Form.Group>

              <Button type="submit" disabled={isSubmitting} className="btn-indigo w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3 fs-6">
                <LogIn size={20} /> {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>

              <div className="text-center mt-3">
                <p className="small mb-0" style={{ color: '#8b949e' }}>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#10b981' }}>
                    Register here
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
