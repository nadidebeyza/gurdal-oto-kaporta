import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTools, FaPaintRoller, FaCarCrash, FaShieldAlt, FaTruck, FaSprayCan } from "react-icons/fa";

const accentColor = "#e63946";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const ServicesContainer = styled.div`
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

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
`;

const ServiceCard = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.03);
  }

  h3 {
    color: #fff;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
      color: #fff;
      background: ${accentColor};
      border-radius: 50%;
      padding: 0.4rem;
      font-size: 1.5rem;
      box-shadow: 0 2px 8px rgba(230,57,70,0.10);
    }
  }

  p {
    color: #fff;
    line-height: 1.6;
    font-size: 1.05rem;
  }
`;

function Services() {
  const services = [
    {
      title: "Kaporta Onarımı",
      description: "Tüm marka ve modellerde kaporta onarımı, boya ve düzeltme işlemleri",
      icon: <FaTools />
    },
    {
      title: "Çekici Hizmeti",
      description: "7/24 acil çekici hizmeti ile aracınızı güvenle servisimize getiriyoruz",
      icon: <FaTruck />
    },
    {
      title: "Sigorta İşlemleri",
      description: "Tüm sigorta şirketleriyle anlaşmalı olarak hizmet veriyoruz",
      icon: <FaShieldAlt />
    },
    {
      title: "Boyama",
      description: "Profesyonel boyama hizmeti ile aracınıza yeni bir görünüm kazandırıyoruz",
      icon: <FaSprayCan />
    },
    {
      title: "Çizik Giderme",
      description: "Hafif çizik ve hasarların profesyonel onarımı",
      icon: <FaPaintRoller />
    },
    {
      title: "Cam Onarımı",
      description: "Ön ve arka cam onarım ve değişim hizmetleri",
      icon: <FaCarCrash />
    }
  ];

  return (
    <ServicesContainer>
      <PageTitle>Hizmetlerimiz</PageTitle>
      <PageDescription>
        Gürdal Oto Kaporta olarak müşterilerimize en kaliteli hizmeti sunmak için
        çalışıyoruz. İşte sunduğumuz profesyonel hizmetler:
      </PageDescription>
      
      <ServiceGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <h3>{service.icon} {service.title}</h3>
            <p>{service.description}</p>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </ServicesContainer>
  );
}

export default Services; 