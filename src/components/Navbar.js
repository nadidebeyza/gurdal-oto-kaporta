import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const accentColor = "#e63946";

const Nav = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 60px;
  width: auto;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLinkStyled = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &.active {
    color: #fff;
    background: ${accentColor};
  }

  &:hover {
    color: ${accentColor};
    background: rgba(255, 255, 255, 0.1);
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <LogoImage 
            src="/gurdal-oto-logo-dark.png" 
            alt="Gürdal Oto Kaporta Logo"
          />
        </Logo>
        <NavLinks>
          <NavLinkStyled to="/" end>Ana Sayfa</NavLinkStyled>
          <NavLinkStyled to="/hizmetlerimiz">Hizmetlerimiz</NavLinkStyled>
          <NavLinkStyled to="/satilik-araclar">Satılık Araçlar</NavLinkStyled>
          <NavLinkStyled to="/galeri">Galeri</NavLinkStyled>
          <NavLinkStyled to="/sigorta-kasko">Sigorta & Kasko</NavLinkStyled>
          <NavLinkStyled to="/hakkimizda">Hakkımızda</NavLinkStyled>
          <NavLinkStyled to="/iletisim">İletişim</NavLinkStyled>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 