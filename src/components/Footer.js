import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const accentColor = "#e63946";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 3rem 2rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: ${accentColor};
  }
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  &:hover {
    color: ${accentColor};
  }
`;

const ContactInfo = styled.p`
  margin-bottom: 0.5rem;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
`;

const DeveloperInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;

  @media (max-width: 600px) {
    align-items: center;
  }

  small {
    font-size: 0.85rem;
    opacity: 0.7;
    letter-spacing: 0.5px;
  }
`;

const CocobitLogo = styled.a`
  font-family: 'Sacramento', cursive;
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 900px) {
    font-size: 2rem;
  }
`;

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Hızlı Erişim</h3>
          <FooterLink to="/" onClick={scrollToTop}>Ana Sayfa</FooterLink>
          <FooterLink to="/hizmetlerimiz" onClick={scrollToTop}>Hizmetlerimiz</FooterLink>
          <FooterLink to="/satilik-araclar" onClick={scrollToTop}>Satılık Araçlar</FooterLink>
          <FooterLink to="/galeri" onClick={scrollToTop}>Galeri</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>İletişim</h3>
          <ContactInfo>Adres: Obalar Cad. No: 371 Seyhan/ADANA</ContactInfo>
          <ContactInfo>Telefon: 0322 436 72 49</ContactInfo>
          <ContactInfo>Telefon: 0536 469 66 63</ContactInfo>
          <ContactInfo>Telefon: 0546 469 66 63</ContactInfo>
        </FooterSection>
        
        <FooterSection>
          <h3>Çalışma Saatleri</h3>
          <ContactInfo>Pazartesi - Cuma: 09:00 - 18:00</ContactInfo>
          <ContactInfo>Cumartesi: 09:00 - 14:00</ContactInfo>
          <ContactInfo>Pazar: Kapalı</ContactInfo>
        </FooterSection>
      </FooterContent>
      <FooterBottom>
        <p>© {new Date().getFullYear()} Gürdal Oto Kaporta. Tüm hakları saklıdır.</p>
          <DeveloperInfo>
          <small>Bu dijital deneyimi hayata geçiren</small>
          <CocobitLogo
            href="https://cocobitsoftwareworks.com/"
            target="_blank"
            rel="noreferrer"
          >
            Cocobit Software Works
          </CocobitLogo>
        </DeveloperInfo>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer; 