import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTools, FaPaintRoller, FaCarCrash, FaShieldAlt, FaCheckCircle, FaClock, FaStar, FaUserFriends, FaMoneyBillWave } from "react-icons/fa";

const accentColor = "#e63946";
const lightColor = "#fff";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const PageBG = styled.div`
  min-height: 100vh;
  background: ${lightColor};
  padding-top: 1rem;
`;

const HomeContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  font-family: 'Poppins', 'Roboto', sans-serif;
`;

const Hero = styled.div`
  background-image: url('/home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0;
  text-align: left;
  margin: 2rem 0 3rem 0;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(34,34,59,0.06);
  position: relative;
  color: #fff;
  overflow: hidden;
  animation: ${fadeIn} 1s cubic-bezier(.39,.575,.565,1) both;
  transition: box-shadow 0.3s, transform 0.3s;
  display: flex;
  min-height: 500px;

  &:hover {
    box-shadow: 0 4px 24px rgba(34,34,59,0.12);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, #232526 0%, #414345 100%);
    opacity: 0.9;
    border-radius: 18px;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: url('/home.png') no-repeat center center;
    background-size: cover;
    clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
    z-index: 2;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  padding: 3rem 4rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeroImage = styled.div`
  position: relative;
  z-index: 3;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: ${accentColor};
  letter-spacing: 0.5px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.18);
  line-height: 1.2;
  
  @media (min-width: 768px) {
    font-size: 3.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #fff;
  font-weight: 500;
  margin-bottom: 2rem;
  text-shadow: 0 1px 6px rgba(0,0,0,0.18);
  max-width: 90%;
  line-height: 1.5;
`;

const CTAButton = styled.a`
  display: inline-block;
  background: #e63946;
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 2.5rem;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 2px 12px rgba(230,57,70,0.15);
  transition: all 0.3s ease;
  margin-top: 1rem;
  letter-spacing: 0.5px;
  width: fit-content;
  &:hover {
    background: #fff;
    color: #e63946;
    transform: translateY(-2px);
    box-shadow: 0 4px 24px rgba(230,57,70,0.18);
  }
`;

const Section = styled.section`
  background: linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%);
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  padding: 3rem 3rem;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
  text-align: center;
  @media (min-width: 900px) {
    text-align: left;
    padding: 4rem 5rem;
  }
`;

const SectionTitle = styled.h2`
  color: #fff;
  font-size: 2.1rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SectionText = styled.p`
  color: #fff;
  font-size: 1.15rem;
  line-height: 1.7;
  margin-bottom: 0.5rem;
`;

const WelcomeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  @media (min-width: 900px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 4rem;
  }
`;

const WelcomeText = styled.div`
  flex: 2;
`;

const ServicesList = styled.ul`
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ServiceItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-size: 1.08rem;
  color: #fff;
  background: rgba(0,0,0,0.3);
  border-radius: 14px;
  padding: 0.9rem 1.1rem;
  font-weight: 500;
  box-shadow: 0 1px 6px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    background: rgba(0,0,0,0.4);
  }
  svg {
    color: #e63946;
    background: #fff;
    border-radius: 50%;
    padding: 0.4rem;
    font-size: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

const AdvantagesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const AdvantageCard = styled.div`
  background: rgba(0,0,0,0.3);
  border-radius: 14px;
  padding: 1.2rem 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.08rem;
  color: #fff;
  font-weight: 500;
  box-shadow: 0 1px 6px rgba(0,0,0,0.3);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    background: rgba(0,0,0,0.4);
  }
  svg {
    color: #e63946;
    background: #fff;
    border-radius: 50%;
    padding: 0.4rem;
    font-size: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
`;

function Home() {
  return (
    <PageBG>
      <HomeContainer>
        <Hero>
          <HeroContent>
            <Title>Gürdal Oto Kaporta<br />Hasar Onarım Merkezi</Title>
            <Subtitle>
              Aracınızın değerini koruyun, profesyonel ekibimize güvenin.<br />
              Hasar onarımında 30+ yıl tecrübe!
            </Subtitle>
            <CTAButton href="/iletisim">Hemen Teklif Al</CTAButton>
          </HeroContent>
          <HeroImage />
        </Hero>
        <Section>
          <SectionTitle>Kapsamlı Hasar Onarım & Bakım Hizmetleri</SectionTitle>
          <WelcomeGrid>
            <WelcomeText>
              <SectionText>
                Gürdal Oto Kaporta, modern ekipmanlar ve uzman kadrosuyla aracınızın tüm kaporta ve boya işlemlerinde yanınızda. 
                Müşteri memnuniyetini ön planda tutarak, hızlı ve kaliteli hizmet sunuyoruz.
              </SectionText>
              <SectionText>
                <b>Avantajlarımız:</b> Orijinal parça kullanımı, şeffaf fiyatlandırma, ücretsiz ekspertiz ve hızlı teslimat.
              </SectionText>
            </WelcomeText>
            <ServicesList>
              <ServiceItem><FaTools /> Kaporta Onarımı</ServiceItem>
              <ServiceItem><FaPaintRoller /> Boya & Mini Onarım</ServiceItem>
              <ServiceItem><FaCheckCircle /> Hasar Tespiti</ServiceItem>
              <ServiceItem><FaShieldAlt /> Sigorta İşlemleri</ServiceItem>
            </ServicesList>
          </WelcomeGrid>
        </Section>
        <Section>
          <SectionTitle>Neden Bizi Tercih Etmelisiniz?</SectionTitle>
          <AdvantagesGrid>
            <AdvantageCard><FaCheckCircle /> 30+ yıl sektör deneyimi</AdvantageCard>
            <AdvantageCard><FaStar /> Son teknoloji ekipmanlar</AdvantageCard>
            <AdvantageCard><FaShieldAlt /> Sigorta anlaşmalı hizmet</AdvantageCard>
            <AdvantageCard><FaUserFriends /> Müşteri odaklı yaklaşım</AdvantageCard>
            <AdvantageCard><FaClock /> Hızlı ve güvenilir teslimat</AdvantageCard>
            <AdvantageCard><FaMoneyBillWave /> Uygun Fiyat Garantisi</AdvantageCard>
          </AdvantagesGrid>
        </Section>
      </HomeContainer>
    </PageBG>
  );
}

export default Home; 