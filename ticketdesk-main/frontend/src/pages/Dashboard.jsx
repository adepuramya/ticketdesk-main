import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dashboardApi } from '../api/dashboardApi';
import { ticketApi } from '../api/ticketApi';
import { useDocumentTitle } from '../utils/useDocumentTitle';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { PlusCircle, ArrowRight } from 'lucide-react';

const COLORS = ['#10b981', '#34d399', '#f59e0b', '#3b82f6', '#ef4444'];

export const Dashboard = () => {
  useDocumentTitle('Support Dashboard');
  const [stats, setStats] = useState(null);
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ticketsRes] = await Promise.all([
          dashboardApi.getStats(),
          ticketApi.getTickets({ page: 0, size: 5, sortBy: 'createdAt', sortDir: 'DESC' }),
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (ticketsRes.success && ticketsRes.data) setRecentTickets(ticketsRes.data.content || []);
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard metrics..." />;

  const statusChartData = stats?.statusDistribution
    ? Object.entries(stats.statusDistribution).map(([name, value]) => ({ name: name.replace('_', ' '), value }))
    : [];

  const priorityChartData = stats?.priorityDistribution
    ? Object.entries(stats.priorityDistribution).map(([name, value]) => ({ name, value }))
    : [];

  // Robust calculation for urgent tickets count from priority distribution
  const urgentTicketsCount = stats?.priorityDistribution
    ? (stats.priorityDistribution.URGENT || stats.priorityDistribution.urgent || stats.priorityDistribution.Urgent || 0)
    : 0;

  return (
    <div className="p-3 p-md-4">
      {/* Dashboard Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h2 className="fw-bold text-white mb-1">ServiceDesk Dashboard</h2>
          <p className="small mb-0" style={{ color: '#8b949e' }}>Manage incoming IT incidents, service requests, and priority queues.</p>
        </div>
        <Link to="/tickets/create" className="btn btn-indigo d-flex align-items-center gap-2">
          <PlusCircle size={18} /> New Request
        </Link>
      </div>

      {/* Metrics Cards Grid - 5 columns */}
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mb-4">
        {/* Total Tickets */}
        <Col>
          <Card className="glass-card p-3 h-100 border-0">
            <span className="small fw-bold d-block mb-2" style={{ color: '#8b949e', fontSize: '0.75rem', letterSpacing: '0.5px' }}>TOTAL TICKETS</span>
            <span className="fs-2 fw-extrabold" style={{ color: '#10b981' }}>{stats?.totalTickets || 0}</span>
          </Card>
        </Col>

        {/* Open & Unassigned */}
        <Col>
          <Card className="glass-card p-3 h-100 border-0">
            <span className="small fw-bold d-block mb-2" style={{ color: '#8b949e', fontSize: '0.75rem', letterSpacing: '0.5px' }}>OPEN & UNASSIGNED</span>
            <span className="fs-2 fw-extrabold" style={{ color: '#10b981' }}>{stats?.openTickets || 0}</span>
          </Card>
        </Col>

        {/* In Progress */}
        <Col>
          <Card className="glass-card p-3 h-100 border-0">
            <span className="small fw-bold d-block mb-2" style={{ color: '#8b949e', fontSize: '0.75rem', letterSpacing: '0.5px' }}>IN PROGRESS</span>
            <span className="fs-2 fw-extrabold" style={{ color: '#f59e0b' }}>{stats?.inProgressTickets || 0}</span>
          </Card>
        </Col>

        {/* Resolved */}
        <Col>
          <Card className="glass-card p-3 h-100 border-0">
            <span className="small fw-bold d-block mb-2" style={{ color: '#8b949e', fontSize: '0.75rem', letterSpacing: '0.5px' }}>RESOLVED</span>
            <span className="fs-2 fw-extrabold" style={{ color: '#10b981' }}>{stats?.resolvedTickets || 0}</span>
          </Card>
        </Col>

        {/* Urgent Queue */}
        <Col>
          <Card className="glass-card p-3 h-100 border-0">
            <span className="small fw-bold d-block mb-2" style={{ color: '#8b949e', fontSize: '0.75rem', letterSpacing: '0.5px' }}>URGENT QUEUE</span>
            <span className="fs-2 fw-extrabold" style={{ color: '#ef4444' }}>{urgentTicketsCount}</span>
          </Card>
        </Col>
      </Row>

      {/* Analytics Charts Row */}
      <Row className="g-3 mb-4">
        <Col lg={6}>
          <Card className="glass-card p-4 h-100 border-0">
            <Card.Title className="text-white fw-bold fs-5 mb-3">Ticket Status Breakdown</Card.Title>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#161b22', borderColor: '#30363d', borderRadius: 12, color: '#f0f6fc', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} />
                  <Legend wrapperStyle={{ color: '#8b949e', fontWeight: '600' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="glass-card p-4 h-100 border-0">
            <Card.Title className="text-white fw-bold fs-5 mb-3">Priority Distribution (SLA Target)</Card.Title>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={priorityChartData}>
                  <XAxis dataKey="name" stroke="#8b949e" fontWeight="600" />
                  <YAxis stroke="#8b949e" fontWeight="600" />
                  <Tooltip contentStyle={{ background: '#161b22', borderColor: '#30363d', borderRadius: 12, color: '#f0f6fc', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }} />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Tickets Table */}
      <Card className="glass-card p-4 border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-white fw-bold mb-0">Recent Support Requests</h5>
          <Link to="/tickets" className="d-flex align-items-center gap-1 text-decoration-none small fw-bold" style={{ color: '#10b981' }}>
            View All Tickets <ArrowRight size={14} />
          </Link>
        </div>

        <Table responsive className="table-custom mb-0">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Category</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentTickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-muted border-0">
                  No tickets recorded yet.
                </td>
              </tr>
            ) : (
              recentTickets.map((t) => (
                <tr key={t.id}>
                  <td className="fw-mono text-muted">{t.ticketNumber}</td>
                  <td className="fw-semibold text-white">{t.title}</td>
                  <td>
                    <span className={`badge badge-status-${t.status.toLowerCase()}`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-prio-${t.priority?.name?.toLowerCase() || 'low'}`}>
                      {t.priority?.name || 'LOW'}
                    </span>
                  </td>
                  <td>{t.category?.name || 'N/A'}</td>
                  <td className="text-muted">{new Date(t.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/tickets/${t.id}`} className="btn btn-outline-indigo btn-sm py-1 px-3">
                      Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
