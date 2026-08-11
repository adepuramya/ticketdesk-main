import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Ticket, PlusCircle, User, ShieldCheck } from 'lucide-react';

export const Sidebar = () => {
  const { hasRole } = useAuth();

  return (
    <div className="p-3 h-100 d-flex flex-column gap-2" style={{ minWidth: '240px', background: 'var(--card-bg)', borderRight: '1px solid var(--card-border)' }}>
      {/* Submit Ticket Button at top */}
      <NavLink to="/tickets/create" className="btn btn-indigo w-100 mb-3 py-2 fw-bold d-flex align-items-center justify-content-center gap-2">
        <PlusCircle size={18} />
        <span>Submit Ticket</span>
      </NavLink>

      <div className="text-uppercase fw-bold mb-2 px-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-sub)' }}>
        Workspaces
      </div>

      <NavLink to="/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <LayoutDashboard size={18} />
        <span>Dashboard</span>
      </NavLink>

      <NavLink to="/tickets" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <Ticket size={18} />
        <span>My Tickets</span>
      </NavLink>

      <div className="text-uppercase fw-bold my-2 px-3" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--text-sub)' }}>
        Account & System
      </div>

      <NavLink to="/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
        <User size={18} />
        <span>My Profile</span>
      </NavLink>

      {hasRole('ROLE_ADMIN') && (
        <NavLink to="/admin" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <ShieldCheck size={18} />
          <span>Admin Control</span>
        </NavLink>
      )}
    </div>
  );
};
