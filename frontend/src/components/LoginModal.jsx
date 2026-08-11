import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Headphones, Mail, Lock, LogIn } from 'lucide-react';

const LoginSchema = Yup.object().shape({
  usernameOrEmail: Yup.string()
    .min(3, 'Username or email must be at least 3 characters')
    .required('Username or email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const LoginModal = ({ show, onHide }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage('');
    try {
      const res = await login(values);
      if (res && res.success) {
        onHide();
        navigate('/dashboard');
      } else {
        setErrorMessage(res?.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="modal-dark">
      <Modal.Header closeButton className="px-4 pt-4 pb-2">
        <div className="d-flex align-items-center gap-3">
          <div className="p-2 rounded-4" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <Headphones size={24} style={{ color: '#10b981' }} />
          </div>
          <div>
            <Modal.Title className="fw-bold fs-4 text-white">Sign In to ServiceDesk</Modal.Title>
            <small className="d-block fw-semibold" style={{ color: '#8b949e' }}>Enterprise IT Support Portal</small>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body className="p-4">
        {errorMessage && <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>{errorMessage}</Alert>}

        <Formik
          initialValues={{ usernameOrEmail: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email or Username</Form.Label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ color: '#6e7681' }}>
                    <Mail size={18} />
                  </span>
                  <Form.Control
                    type="text"
                    name="usernameOrEmail"
                    placeholder="you@company.com or admin"
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
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
