import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaCheckCircle, FaClock, FaTools, FaHandshake, FaMoneyBillWave, FaUserTie } from "react-icons/fa";

const accentColor = "#e63946";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const AboutContainer = styled.div`
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

const AboutSection = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  padding: 2rem;
  border-radius: 14px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
  color: #fff;

  h2 {
    color: #fff;
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      color: #fff;
      background: ${accentColor};
      border-radius: 50%;
      padding: 0.4rem;
      font-size: 1.8rem;
      box-shadow: 0 2px 8px rgba(230,57,70,0.10);
    }
  }

  p {
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 1rem;
  }
`;

const AdvantagesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
`;

const AdvantageItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.08rem;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
  }

  svg {
    color: ${accentColor};
    font-size: 1.2rem;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TeamMember = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 2rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`;

const MemberImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  background: ${accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    font-size: 4rem;
    color: #fff;
  }
`;

const MemberName = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

function About() {
  const teamMembers = [
    'Derviş Gürdal',
    'Eyüp Gürdal',
    'Emrah Gürdal'
  ];

  return (
    <AboutContainer>
      <PageTitle>Hakkımızda</PageTitle>
      <PageDescription>
        30 yılı aşkın süredir otomotiv sektöründe kaliteli hizmet sunmanın gururunu yaşıyoruz.
      </PageDescription>

      <AboutSection>
        <h2><FaUsers /> Biz Kimiz?</h2>
        <p>
          Gürdal Oto Kaporta olarak, 30 yılı aşkın süredir otomotiv sektöründe
          hizmet vermekteyiz. Deneyimli ekibimiz ve modern ekipmanlarımızla
          müşterilerimize en kaliteli hizmeti sunmayı hedefliyoruz.
        </p>
        <p>
          Misyonumuz, araç sahiplerinin güvenini kazanarak, en iyi kalitede
          hizmet sunmak ve sektörde öncü olmaktır.
        </p>
      </AboutSection>

      <AboutSection>
        <h2><FaCheckCircle /> Neden Bizi Tercih Etmelisiniz?</h2>
        <AdvantagesList>
          <AdvantageItem><FaClock /> 30+ yıllık sektör deneyimi</AdvantageItem>
          <AdvantageItem><FaUsers /> Uzman ve deneyimli teknik ekip</AdvantageItem>
          <AdvantageItem><FaTools /> Modern ekipman ve teknoloji</AdvantageItem>
          <AdvantageItem><FaHandshake /> Tüm sigortalarla anlaşmalı</AdvantageItem>
          <AdvantageItem><FaCheckCircle /> Müşteri memnuniyeti odaklı</AdvantageItem>
          <AdvantageItem><FaMoneyBillWave /> Uygun fiyat garantisi</AdvantageItem>
        </AdvantagesList>
      </AboutSection>

      <AboutSection>
        <h2><FaUserTie /> Ekibimiz</h2>
        <TeamGrid>
          {teamMembers.map((member) => (
            <TeamMember key={member}>
              <MemberImage>
                <FaUserTie />
              </MemberImage>
              <MemberName>{member}</MemberName>
            </TeamMember>
          ))}
        </TeamGrid>
      </AboutSection>
    </AboutContainer>
  );
}

export default About; 