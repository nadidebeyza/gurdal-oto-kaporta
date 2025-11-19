import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const accentColor = "#e63946";

const Nav = styled.nav`
  background-color: #1a1a1a;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoLink = styled(NavLink)`
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

  @media (max-width: 768px) {
    height: 64px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    position: absolute;
    top: calc(100% + 0.25rem);
    right: -0.9rem;
    width: 130px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 1.25rem;
    gap: 0.4rem;
    background: ${props => (props.$open ? '#fff' : 'rgba(255,255,255,0.95)')};
    border-radius: 18px;
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.2);
    transform-origin: top right;
    transform: scale(${props => (props.$open ? 1 : 0.8)});
    opacity: ${props => (props.$open ? 1 : 0)};
    pointer-events: ${props => (props.$open ? 'auto' : 'none')};
    transition: opacity 0.18s ease, transform 0.18s ease;
  }
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

  @media (max-width: 768px) {
    color: #1a1a1a;
    width: 100%;
    padding: 0.3rem 0;
    border-radius: 0;

    &:hover {
      background: rgba(230,57,70,0.08);
      color: ${accentColor};
    }

    &.active {
      background: transparent;
      color: ${accentColor};
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background 0.2s ease, border-color 0.2s ease;

  @media (max-width: 768px) {
    display: grid;
  }
`;

const HamburgerIcon = styled.span`
  position: relative;
  width: 22px;
  height: 2px;
  background: ${props => (props.$open ? 'transparent' : '#fff')};
  transition: background 0.2s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 22px;
    height: 2px;
    background: #fff;
    transition: transform 0.2s ease, top 0.2s ease, bottom 0.2s ease;
  }

  &::before {
    top: ${props => (props.$open ? '0' : '-7px')};
    transform: ${props => (props.$open ? 'rotate(45deg)' : 'none')};
  }

  &::after {
    bottom: ${props => (props.$open ? '0' : '-7px')};
    transform: ${props => (props.$open ? 'rotate(-45deg)' : 'none')};
  }
`;

function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(() => window.innerWidth <= 768);
  const navLinksRef = React.useRef(null);
  const toggleButtonRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (!navLinksRef.current) return;
      if (
        navLinksRef.current.contains(event.target) ||
        toggleButtonRef.current?.contains(event.target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setMenuOpen(prev => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <Nav>
      <NavContainer>
        <LogoLink to="/" aria-label="Ana sayfa" onClick={() => setMenuOpen(false)}>
          <LogoImage 
            src="/gurdal-oto-logo-dark.png" 
            alt="Gürdal Oto Kaporta Logo"
          />
        </LogoLink>
        {isMobile && (
          <HamburgerButton
            ref={toggleButtonRef}
            onClick={handleToggle}
            aria-label="Menüyü aç/kapat"
            aria-expanded={menuOpen}
          >
            <HamburgerIcon $open={menuOpen} />
          </HamburgerButton>
        )}
        <NavLinks ref={navLinksRef} $open={isMobile ? menuOpen : true}>
          <NavLinkStyled to="/" end onClick={handleLinkClick}>Ana Sayfa</NavLinkStyled>
          <NavLinkStyled to="/hizmetlerimiz" onClick={handleLinkClick}>Hizmetlerimiz</NavLinkStyled>
          <NavLinkStyled to="/satilik-araclar" onClick={handleLinkClick}>Satılık Araçlar</NavLinkStyled>
          <NavLinkStyled to="/galeri" onClick={handleLinkClick}>Galeri</NavLinkStyled>
          <NavLinkStyled to="/sigorta-kasko" onClick={handleLinkClick}>Sigorta & Kasko</NavLinkStyled>
          <NavLinkStyled to="/hakkimizda" onClick={handleLinkClick}>Hakkımızda</NavLinkStyled>
          <NavLinkStyled to="/iletisim" onClick={handleLinkClick}>İletişim</NavLinkStyled>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar; 