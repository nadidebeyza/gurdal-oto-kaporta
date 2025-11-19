import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPhone, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";

const accentColor = "#e63946";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Poppins', 'Roboto', sans-serif;
`;

const PageTitle = styled.h1`
  color: ${accentColor};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 0.5px;
`;

const PageDescription = styled.p`
  color: #444;
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactSection = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
  color: #fff;
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.02);
  }

  svg {
    color: ${accentColor};
    font-size: 1.5rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #fff;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  transition: background 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  min-height: 150px;
  transition: background 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SubmitButton = styled.button`
  background: ${accentColor};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: #cf1124;
    transform: translateY(-2px);
  }
`;

const MapSection = styled.div`
  margin-top: 3rem;
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
  
  iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 14px;
    box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  }
`;

function Contact() {
  return (
    <ContactContainer>
      <PageTitle>İletişim</PageTitle>
      <PageDescription>
        Bizimle iletişime geçin, aracınızla ilgili tüm sorularınızı yanıtlayalım.
      </PageDescription>

      <ContactGrid>
        <ContactSection>
          <h2>İletişim Bilgileri</h2>
          <ContactInfo>
            <InfoItem>
              <FaPhone /> 0322 436 72 49
            </InfoItem>
            <InfoItem>
              <FaWhatsapp /> 0536 469 66 63
            </InfoItem>
            <InfoItem>
              <FaPhone /> 0546 469 66 63
            </InfoItem>
            <InfoItem>
              <FaMapMarkerAlt /> Obalar Cad. No: 371 Seyhan/ADANA
            </InfoItem>
            <InfoItem>
              <FaClock /> Pazartesi - Cumartesi: 08:30 - 18:30
            </InfoItem>
          </ContactInfo>
        </ContactSection>

        <ContactSection>
          <h2>Mesaj Gönderin</h2>
          <ContactForm
            action="https://formsubmit.co/gurdalotokaporta@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_language" value="tr" />
            <FormGroup>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Adınız Soyadınız"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">E-posta</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="E-posta adresiniz"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="Telefon numaranız"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Mesajınız</Label>
              <TextArea
                id="message"
                name="message"
                required
                placeholder="Mesajınızı yazın..."
              />
            </FormGroup>

            <SubmitButton type="submit">Mesaj Gönder</SubmitButton>
          </ContactForm>
        </ContactSection>
      </ContactGrid>

      <MapSection>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.1647766029444!2d35.3288!3d36.9891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDU5JzIwLjgiTiAzNcKwMTknNDMuNyJF!5e0!3m2!1str!2str!4v1629789845781!5m2!1str!2str"
          allowFullScreen=""
          loading="lazy"
          title="Gürdal Oto Kaporta Konum"
        />
      </MapSection>
    </ContactContainer>
  );
}

export default Contact; 