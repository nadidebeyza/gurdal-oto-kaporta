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

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Hızlı Erişim</h3>
          <FooterLink to="/">Ana Sayfa</FooterLink>
          <FooterLink to="/hizmetlerimiz">Hizmetlerimiz</FooterLink>
          <FooterLink to="/satilik-araclar">Satılık Araçlar</FooterLink>
          <FooterLink to="/galeri">Galeri</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>İletişim</h3>
          <ContactInfo>Adres: Meydan Mah. Obalar Cad. No: 371 Seyhan/ADANA</ContactInfo>
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
    </FooterContainer>
  );
}

export default Footer; 