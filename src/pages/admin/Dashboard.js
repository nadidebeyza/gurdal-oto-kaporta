import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CarsManagement from './CarsManagement';
import GalleryManagement from './GalleryManagement';

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #1a1a1a;
  color: white;
  padding: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const NavLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: #333;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;
  
  &:hover {
    background-color: #c82333;
  }
`;

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/admin/dashboard/cars">Araç Yönetimi</NavLink>
          <NavLink to="/admin/dashboard/gallery">Galeri Yönetimi</NavLink>
        </nav>
        <LogoutButton onClick={handleLogout}>Çıkış Yap</LogoutButton>
      </Sidebar>
      
      <MainContent>
        <Routes>
          <Route path="cars" element={<CarsManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
        </Routes>
      </MainContent>
    </DashboardContainer>
  );
}

export default Dashboard; 