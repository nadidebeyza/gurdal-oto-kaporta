import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaShieldAlt, FaCarCrash, FaFileContract, FaHandshake, FaClipboardCheck, FaBuilding } from "react-icons/fa";

const accentColor = "#e63946";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const InsuranceContainer = styled.div`
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

const InsuranceCard = styled.div`
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
    margin-bottom: 1.5rem;
  }
`;

const InsuranceList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
`;

const InsuranceItem = styled.li`
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

function Insurance() {
  return (
    <InsuranceContainer>
      <PageTitle>Sigorta & Kasko İşlemleri</PageTitle>
      <PageDescription>
        Gürdal Oto Kaporta olarak tüm sigorta şirketleriyle anlaşmalı çalışıyor,
        hasar sürecinizi profesyonel şekilde yönetiyoruz.
      </PageDescription>
      
      <InsuranceCard>
        <h2><FaFileContract /> Sigorta İşlemlerimiz</h2>
        <p>
          Araç hasarınızda sigorta işlemlerinizi sizin için yönetiyor, 
          sürecin başından sonuna kadar yanınızda oluyoruz.
        </p>
        
        <InsuranceList>
          <InsuranceItem><FaCarCrash /> Kasko hasar işlemleri</InsuranceItem>
          <InsuranceItem><FaShieldAlt /> Trafik sigortası işlemleri</InsuranceItem>
          <InsuranceItem><FaHandshake /> Mini hasar işlemleri</InsuranceItem>
          <InsuranceItem><FaClipboardCheck /> Sigorta ekspertiz işlemleri</InsuranceItem>
          <InsuranceItem><FaClipboardCheck /> Hasar tespit işlemleri</InsuranceItem>
        </InsuranceList>
      </InsuranceCard>

      <InsuranceCard>
        <h2><FaBuilding /> Anlaşmalı Sigorta Şirketleri</h2>
        <p>
          Türkiye'nin önde gelen sigorta şirketleriyle anlaşmalı olarak çalışıyoruz:
        </p>
        
        <InsuranceList>
          <InsuranceItem><FaShieldAlt /> Allianz</InsuranceItem>
          <InsuranceItem><FaShieldAlt /> Anadolu Sigorta</InsuranceItem>
          <InsuranceItem><FaShieldAlt /> Aksigorta</InsuranceItem>
          <InsuranceItem><FaShieldAlt /> Mapfre</InsuranceItem>
          <InsuranceItem><FaShieldAlt /> Sompo Sigorta</InsuranceItem>
        </InsuranceList>
      </InsuranceCard>
    </InsuranceContainer>
  );
}

export default Insurance; 