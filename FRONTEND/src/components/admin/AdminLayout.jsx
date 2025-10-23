import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin.css';

function AdminLayout() {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h3>Pannello</h3>
                <nav>
                    <Link to="/admin/gallery">Gestione Galleria</Link>
                    <Link to="/admin/treatments">Gestione Trattamenti</Link>
                    <Link to="/admin/homepage">Gestione Homepage</Link> 
    
                </nav>
            </aside>
            <main className="admin-content">
                <Outlet /> 
            </main>
        </div>
    );
}

export default AdminLayout;