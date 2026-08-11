import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { LoginModal } from '../components/LoginModal';
import {
  Zap,
  BookOpen,
  BarChart3,
  Shield,
  ArrowRight,
  Headphones
} from 'lucide-react';

export const Home = () => {
  useDocumentTitle('Enterprise IT Support Portal');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLaunchClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="w-100 d-flex align-items-center" style={{ height: 'calc(100vh - 57px)', maxHeight: 'calc(100vh - 57px)', overflow: 'hidden' }}>
      <Container className="px-3 px-md-5">
        <Row className="align-items-center g-4 g-lg-5">
          {/* Left Column: Headline & Action Buttons & Stats */}
          <Col lg={6} className="d-flex flex-column justify-content-center">
            <div className="mb-3">
              <span
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill fw-bold"
                style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.8rem' }}
              >
                <Headphones size={13} /> Enterprise Support
              </span>
            </div>

            <h1
              className="fw-extrabold mb-3 text-white"
              style={{ letterSpacing: '-1px', lineHeight: 1.15, fontSize: '2.8rem' }}
            >
              IT support,<br />
              <span style={{ color: '#10b981' }}>resolved in record time.</span>
            </h1>

            <p className="fs-6 mb-3 text-slate-300" style={{ lineHeight: 1.5, color: '#8b949e' }}>
              ServiceDesk coordinates incidents, requests, and knowledge articles into a clean workspace for high-performance enterprise teams.
            </p>

            {/* CTA Action Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              <Button onClick={handleLaunchClick} className="btn-indigo btn-lg px-4 py-2.5 d-flex align-items-center gap-2" style={{ fontSize: '1rem' }}>
                Enter Service Portal <ArrowRight size={18} />
              </Button>
            </div>

            {/* Bottom Stats Row */}
            <div className="d-flex align-items-center gap-4 flex-wrap pt-3" style={{ borderTop: '1px solid #21262d' }}>
              <div className="small fw-bold" style={{ color: '#8b949e', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
                SLA COMPLIANCE <span style={{ color: '#10b981' }} className="ms-1">98.4%</span>
              </div>
              <div className="small fw-bold" style={{ color: '#8b949e', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
                AVG RESOLUTION <span style={{ color: '#10b981' }} className="ms-1">2.4h</span>
              </div>
              <div className="small fw-bold" style={{ color: '#8b949e', letterSpacing: '0.5px', fontSize: '0.75rem' }}>
                FCR RATE <span style={{ color: '#10b981' }} className="ms-1">86.2%</span>
              </div>
            </div>
          </Col>

          {/* Right Column: Platform Features Vertically Stacked */}
          <Col lg={6}>
            <div className="d-flex flex-column gap-3">
              {/* Incident Queue Card */}
              <Card className="glass-card p-3 border-0">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 d-inline-flex flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white" style={{ fontSize: '1rem' }}>Incident Queue</h5>
                    <p className="small mb-0" style={{ color: '#8b949e', lineHeight: 1.4, fontSize: '0.85rem' }}>
                      Claim and route technical incidents in real-time.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Knowledge Base Card */}
              <Card className="glass-card p-3 border-0">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 d-inline-flex flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white" style={{ fontSize: '1rem' }}>Knowledge Base</h5>
                    <p className="small mb-0" style={{ color: '#8b949e', lineHeight: 1.4, fontSize: '0.85rem' }}>
                      Empower team self-service with hardware & Wi-Fi diagnostics guides.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Analytics & SLA Dashboard Card */}
              <Card className="glass-card p-3 border-0">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 d-inline-flex flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white" style={{ fontSize: '1rem' }}>Analytics & SLA Dashboard</h5>
                    <p className="small mb-0" style={{ color: '#8b949e', lineHeight: 1.4, fontSize: '0.85rem' }}>
                      Track resolution rates, volume levels, and support specialist metrics.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Secure Portal Views Card */}
              <Card className="glass-card p-3 border-0">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 rounded-3 d-inline-flex flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981' }}>
                    <Shield size={20} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1 text-white" style={{ fontSize: '1rem' }}>Secure Portal Views</h5>
                    <p className="small mb-0" style={{ color: '#8b949e', lineHeight: 1.4, fontSize: '0.85rem' }}>
                      Custom interfaces designed for Managers, Specialists, and Employees.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Pop-up Login Modal */}
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
      />
    </div>
  );
};
