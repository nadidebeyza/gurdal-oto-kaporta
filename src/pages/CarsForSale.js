import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useApi } from '../hooks/useApi';
// import { api } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { api } from '../services/api';

const accentColor = "#e63946";

const CarsContainer = styled.div`
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

const CarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CarCard = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  border-radius: 18px;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 4px 18px rgba(34,34,59,0.18);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
`;

const CarInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CarTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
`;

const CarAttributes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 1.5rem;
  margin-bottom: 0.5rem;
`;

const Attribute = styled.span`
  color: #eee;
  font-size: 0.98rem;
  background: rgba(255,255,255,0.07);
  border-radius: 8px;
  padding: 0.2rem 0.7rem;
`;

const CarDetails = styled.p`
  color: #eee;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${accentColor};
  margin-top: 1rem;
`;

const PhotosContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const PhotoThumb = styled.img`
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 1.5px solid #232526;
  background: #232526;
`;

const DetailsButton = styled.button`
  margin-top: auto;
  padding: 0.7rem 1.5rem;
  background: ${accentColor};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #a4161a;
    transform: scale(1.04);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  border-radius: 18px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  color: #fff;
  box-shadow: 0 4px 24px rgba(230,57,70,0.18);
`;

const ModalTitle = styled.h2`
  color: ${accentColor};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ModalImages = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const ModalImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #232526;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const ModalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ModalAttribute = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.1rem;
  & > span:first-child {
    color: ${accentColor};
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${accentColor};
  border: none;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(230,57,70,0.10);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #a4161a;
    transform: scale(1.08);
  }
`;

const FullSizeModal = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.95);
`;

const FullSizeImage = styled.img`
  max-width: calc(100vw - 120px);
  max-height: calc(100vh - 40px);
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(230,57,70,0.18);
  display: block;
  margin: 0 auto;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${accentColor};
  border: none;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(230,57,70,0.10);
  transition: background 0.2s, transform 0.2s;
  z-index: 1001;

  &:hover {
    background: #a4161a;
    transform: translateY(-50%) scale(1.08);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }
`;

const ContactSection = styled.div`
  margin-top: 4rem;
  padding: 3rem 2rem;
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  border-radius: 18px;
  text-align: center;
`;

const ContactTitle = styled.h2`
  color: ${accentColor};
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PhoneNumber = styled.a`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${accentColor};
  }
`;

const ContactText = styled.p`
  color: #eee;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const getPhotoList = (car) => {
  if (!car) return [];
  if (Array.isArray(car.photos) && car.photos.length > 0) {
    return car.photos.filter(Boolean);
  }
  return car.image ? [car.image] : [];
};

function CarsForSale() {
  // const { data: cars, loading, error, execute: loadCars } = useApi(api.getCars);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters] = useState({
    search: '',
    minPrice: '',
    maxPrice: ''
  });
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const { data } = await api.getCars();
        setCars(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError('Araç listesi yüklenirken hata oluştu.');
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const carList = Array.isArray(cars) ? cars : [];

  const safeText = (value) => (typeof value === 'string' ? value : '');

  const filteredCars = carList.filter(car => {
    const title = safeText(car.title).toLowerCase();
    const details = safeText(car.details).toLowerCase();
    const searchTerm = safeText(filters.search).toLowerCase();
    const matchesSearch = title.includes(searchTerm) || details.includes(searchTerm);
    return matchesSearch;
  });

  const selectedCarPhotos = getPhotoList(selectedCar);

  const handleNextImage = () => {
    const totalPhotos = selectedCarPhotos.length;
    if (!selectedCar || totalPhotos === 0) return;
    const nextIndex = (currentImageIndex + 1) % totalPhotos;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(selectedCarPhotos[nextIndex]);
  };

  const handlePrevImage = () => {
    const totalPhotos = selectedCarPhotos.length;
    if (!selectedCar || totalPhotos === 0) return;
    const prevIndex = (currentImageIndex - 1 + totalPhotos) % totalPhotos;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(selectedCarPhotos[prevIndex]);
  };

  const handleImageClick = (photo, index) => {
    if (!photo) return;
    setCurrentImageIndex(index);
    setSelectedImage(photo);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
    <CarsContainer>
      <PageTitle>Satılık Araçlar</PageTitle>
      
      <CarGrid>
        {filteredCars?.map((car) => {
          const carPhotos = getPhotoList(car);
          return (
          <CarCard key={car._id} onClick={() => handleSelectCar(car)}>
            <CarImage src={car.image} alt={car.title} />
            <CarInfo>
              <CarTitle>{car.title}</CarTitle>
              <CarAttributes>
                {car.brand && car.brand !== '0' && <Attribute>Marka: {car.brand}</Attribute>}
                {car.condition && car.condition !== '0' && <Attribute>Durum: {car.condition}</Attribute>}
                {car.year && car.year !== '0' && <Attribute>Yıl: {car.year}</Attribute>}
                {car.km && car.km !== '0' && <Attribute>Km: {car.km}</Attribute>}
                {car.color && car.color !== '0' && <Attribute>Renk: {car.color}</Attribute>}
                {car.fuelType && car.fuelType !== '0' && <Attribute>Yakıt: {car.fuelType}</Attribute>}
                {car.transmission && car.transmission !== '0' && <Attribute>Vites: {car.transmission}</Attribute>}
              </CarAttributes>
              {car.details && <CarDetails>{car.details}</CarDetails>}
              {car.price && car.price !== '0' && car.price !== '0 ₺' && <Price>{car.price}</Price>}
              {carPhotos.length > 1 && (
                <PhotosContainer>
                  {carPhotos.map((photo, idx) => (
                    <PhotoThumb key={idx} src={photo} alt={`Fotoğraf ${idx+1}`} />
                  ))}
                </PhotosContainer>
              )}
              <DetailsButton onClick={(e) => { e.stopPropagation(); handleSelectCar(car); }}>Detayları Gör</DetailsButton>
            </CarInfo>
          </CarCard>
        )})}
      </CarGrid>

      <ContactSection>
        <ContactTitle>Hemen Arayın!</ContactTitle>
        <ContactInfo>
          <PhoneNumber href="tel:+905364696663">
            📞 0536 469 66 63
          </PhoneNumber>
          <PhoneNumber href="tel:+905464696663">
            📞 0546 469 66 63
          </PhoneNumber>
        </ContactInfo>
        <ContactText>
          Satılık araçlarımız hakkında bilgi almak için hemen arayabilirsiniz.
        </ContactText>
      </ContactSection>

      {selectedCar && (
        <Modal onClick={() => setSelectedCar(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{selectedCar.title}</ModalTitle>
            <ModalImages>
              {selectedCarPhotos.map((photo, idx) => (
                <ModalImage 
                  key={idx} 
                  src={photo} 
                  alt={`Fotoğraf ${idx+1}`} 
                  onClick={() => handleImageClick(photo, idx)}
                />
              ))}
            </ModalImages>
            <ModalDetails>
              {selectedCar.brand && selectedCar.brand !== '0' && (
                <ModalAttribute>
                  <span>Marka:</span> {selectedCar.brand}
                </ModalAttribute>
              )}
              {selectedCar.condition && selectedCar.condition !== '0' && (
                <ModalAttribute>
                  <span>Durum:</span> {selectedCar.condition}
                </ModalAttribute>
              )}
              {selectedCar.year && selectedCar.year !== '0' && (
                <ModalAttribute>
                  <span>Yıl:</span> {selectedCar.year}
                </ModalAttribute>
              )}
              {selectedCar.km && selectedCar.km !== '0' && (
                <ModalAttribute>
                  <span>Km:</span> {selectedCar.km}
                </ModalAttribute>
              )}
              {selectedCar.color && selectedCar.color !== '0' && (
                <ModalAttribute>
                  <span>Renk:</span> {selectedCar.color}
                </ModalAttribute>
              )}
              {selectedCar.fuelType && selectedCar.fuelType !== '0' && (
                <ModalAttribute>
                  <span>Yakıt:</span> {selectedCar.fuelType}
                </ModalAttribute>
              )}
              {selectedCar.transmission && selectedCar.transmission !== '0' && (
                <ModalAttribute>
                  <span>Vites:</span> {selectedCar.transmission}
                </ModalAttribute>
              )}
              {selectedCar.price && selectedCar.price !== '0' && selectedCar.price !== '0 ₺' && (
                <ModalAttribute>
                  <span>Fiyat:</span> {selectedCar.price}
                </ModalAttribute>
              )}
              {selectedCar.details && (
                <ModalAttribute>
                  <span>Detaylar:</span> {selectedCar.details}
                </ModalAttribute>
              )}
            </ModalDetails>
            <CloseButton onClick={() => setSelectedCar(null)}>×</CloseButton>
          </ModalContent>
        </Modal>
      )}

      {selectedImage && (
        <FullSizeModal onClick={() => setSelectedImage(null)}>
          <NavButton 
            className="prev" 
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            ‹
          </NavButton>
          <FullSizeImage 
            src={selectedImage} 
            alt="Full size" 
            onClick={(e) => e.stopPropagation()} 
          />
          <NavButton 
            className="next" 
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            ›
          </NavButton>
          <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
        </FullSizeModal>
      )}
    </CarsContainer>
    </>
  );
}

export default CarsForSale; 