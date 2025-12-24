import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { api } from '../services/api';

const accentColor = "#e63946";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: none;}
`;

const GalleryContainer = styled.div`
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

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CategoryButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.$active ? 'transparent' : accentColor};
  border-radius: 14px;
  background: ${props => props.$active ? `linear-gradient(90deg, #232526 0%, #414345 100%)` : '#fff'};
  color: ${props => props.$active ? '#fff' : accentColor};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 1px 6px rgba(34,34,59,0.10);
  transition: background 0.2s, color 0.2s, transform 0.2s, border 0.2s;

  &:hover {
    background: linear-gradient(90deg, #232526 0%, #414345 100%);
    color: #fff;
    transform: scale(1.04);
    border: 2px solid transparent;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const CategorySelectWrapper = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: block;
    width: 100%;
    position: relative;

    &::after {
      content: '⌄';
      position: absolute;
      right: 1.8rem;
      top: 50%;
      transform: translateY(-50%);
      color: ${accentColor};
      font-size: 1rem;
      pointer-events: none;
    }
  }
`;

const CategorySelect = styled.select`
  display: none;

  @media (max-width: 600px) {
    display: block;
    width: 100%;
    padding: 0.9rem 2.8rem 0.9rem 1rem;
    border-radius: 14px;
    border: 2px solid ${accentColor};
    font-weight: 600;
    font-size: 1rem;
    color: ${accentColor};
    background: #fff;
    box-shadow: 0 1px 6px rgba(34,34,59,0.10);
    appearance: none;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  animation: ${fadeIn} 1.2s cubic-bezier(.39,.575,.565,1) both;
`;

const ImageCard = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    /* Remove transform and box-shadow here */
  }
`;

const ProcessGroup = styled.div`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(34,34,59,0.18);
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  cursor: pointer;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
  transform: translateX(${props => -props.currentIndex * 100}%);
`;

const SliderImage = styled.img`
  min-width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const SliderDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,0.5)'};
  cursor: pointer;
  transition: background 0.2s;
  padding: 0;
`;

const SliderNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.7);
  border: none;
  color: white;
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  
  &:hover {
    background: rgba(0,0,0,0.9);
    transform: translateY(-50%) scale(1.1);
  }
`;

const ProcessBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${accentColor};
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 10;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  transition: transform 0.3s;

  ${ImageCard}:hover & {
    transform: scale(1.08);
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 70px 50px 80px 50px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalImage = styled.img`
  max-width: calc(100vw - 100px);
  max-height: calc(100vh - 180px);
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(230,57,70,0.18);
  flex-shrink: 0;
  margin: 0 auto;
  display: block;
`;

const ModalInfo = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  flex-shrink: 0;
  margin-top: auto;
  
  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${accentColor};
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    opacity: 0.9;
    line-height: 1.6;
  }
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${accentColor};
  border: none;
  color: white;
  font-size: 2rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(230,57,70,0.10);
  transition: background 0.2s, transform 0.2s;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #a4161a;
    transform: scale(1.08);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e63946;
  font-weight: 600;
`;

function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedProcessGroup, setSelectedProcessGroup] = useState(null);
  const [sliderIndices, setSliderIndices] = useState({});
  const [filters, setFilters] = useState({
    category: 'Tümü'
  });

  const categories = ['Tümü', 'Kaporta', 'Boyama', 'Kaporta & Boya Onarım', 'Çekici', 'Diğer'];

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const { data } = await api.getGalleryImages();
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        setError('Galeri yüklenirken hata oluştu.');
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  // Görselleri processId'ye göre grupla
  const groupedImages = useMemo(() => {
    const imageList = Array.isArray(images) ? images : [];
    const groups = {};
    const singles = [];
    
    imageList.forEach(image => {
      if (!image || typeof image !== 'object') return;
      
      const categoryValue = typeof image.category === 'string' ? image.category : '';
      const matchesCategory = filters.category === 'Tümü' || categoryValue === filters.category;
      if (!matchesCategory) return;
      
      if (image.processId && image.processId.startsWith('temp_') === false) {
        // processId varsa grupla
        if (!groups[image.processId]) {
          groups[image.processId] = [];
        }
        groups[image.processId].push(image);
      } else {
        // processId yoksa tekli görsel
        singles.push(image);
      }
    });
    
    return { groups, singles };
  }, [images, filters.category]);

  // Slider index yönetimi
  const handleSliderNext = (processId, maxIndex) => {
    setSliderIndices(prev => ({
      ...prev,
      [processId]: Math.min((prev[processId] || 0) + 1, maxIndex)
    }));
  };

  const handleSliderPrev = (processId) => {
    setSliderIndices(prev => ({
      ...prev,
      [processId]: Math.max((prev[processId] || 0) - 1, 0)
    }));
  };

  const handleDotClick = (processId, index) => {
    setSliderIndices(prev => ({
      ...prev,
      [processId]: index
    }));
  };

  return (
    <>
    <GalleryContainer>
      <PageTitle>Galeri</PageTitle>
      <PageDescription>
        Gürdal Oto Kaporta'da gerçekleştirdiğimiz çalışmalardan örnekler.
        Müşterilerimizin memnuniyeti için en kaliteli hizmeti sunuyoruz.
      </PageDescription>

      <FilterContainer>
        {categories.map(category => (
          <CategoryButton
            key={category}
            $active={filters.category === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </CategoryButton>
        ))}
        <CategorySelectWrapper>
          <CategorySelect
            value={filters.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </CategorySelect>
        </CategorySelectWrapper>
      </FilterContainer>

      {loading ? (
        <p>Galeri yükleniyor...</p>
      ) : error ? (
        <NoResults>
          <h3>Hata</h3>
          <p>{error}</p>
        </NoResults>
      ) : (Object.keys(groupedImages.groups).length === 0 && groupedImages.singles.length === 0) ? (
        <NoResults>
          <h3>Sonuç bulunamadı</h3>
          <p>Lütfen farklı bir arama kriteri deneyin.</p>
        </NoResults>
      ) : (
        <GalleryGrid>
          {/* Gruplanmış görseller (slider ile) */}
          {Object.entries(groupedImages.groups).map(([processId, groupImages]) => {
            const currentIndex = sliderIndices[processId] || 0;
            const hasMultiple = groupImages.length > 1;
            
            return (
              <ProcessGroup 
                key={processId}
                onClick={() => setSelectedProcessGroup({ images: groupImages, currentIndex: currentIndex })}
              >
                {hasMultiple && <ProcessBadge>{groupImages.length} Fotoğraf</ProcessBadge>}
                <SliderContainer>
                  <SliderTrack currentIndex={currentIndex}>
                    {groupImages.map((img, idx) => (
                      <SliderImage
                        key={img._id}
                        src={img.url}
                        alt={img.title}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProcessGroup({ images: groupImages, currentIndex: idx });
                        }}
                      />
                    ))}
                  </SliderTrack>
                  {hasMultiple && (
                    <>
                      {currentIndex > 0 && (
                        <SliderNavButton 
                          style={{ left: '10px' }}
                          onClick={(e) => { e.stopPropagation(); handleSliderPrev(processId); }}
                        >
                          ‹
                        </SliderNavButton>
                      )}
                      {currentIndex < groupImages.length - 1 && (
                        <SliderNavButton 
                          style={{ right: '10px' }}
                          onClick={(e) => { e.stopPropagation(); handleSliderNext(processId, groupImages.length - 1); }}
                        >
                          ›
                        </SliderNavButton>
                      )}
                      <SliderControls>
                        {groupImages.map((_, idx) => (
                          <SliderDot
                            key={idx}
                            $active={currentIndex === idx}
                            onClick={(e) => { e.stopPropagation(); handleDotClick(processId, idx); }}
                          />
                        ))}
                      </SliderControls>
                    </>
                  )}
                </SliderContainer>
              </ProcessGroup>
            );
          })}
          
          {/* Tekli görseller */}
          {groupedImages.singles.map((image) => (
            <ImageCard
              key={image._id}
              onClick={() => setSelectedImage(image)}
            >
              <GalleryImage src={image.url} alt={image.title} />
            </ImageCard>
          ))}
        </GalleryGrid>
      )}

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <ModalImage src={selectedImage.url} alt={selectedImage.title} />
            <ModalInfo>
              <h3>{selectedImage.title}</h3>
              {selectedImage.description && <p>{selectedImage.description}</p>}
            </ModalInfo>
          </ModalContent>
        </Modal>
      )}

      {selectedProcessGroup && (
        <Modal onClick={() => setSelectedProcessGroup(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedProcessGroup(null)}>×</CloseButton>
            <ModalImage 
              src={selectedProcessGroup.images[selectedProcessGroup.currentIndex].url} 
              alt={selectedProcessGroup.images[selectedProcessGroup.currentIndex].title} 
            />
            <ModalInfo>
              <h3>{selectedProcessGroup.images[selectedProcessGroup.currentIndex].title}</h3>
              {selectedProcessGroup.images[selectedProcessGroup.currentIndex].description && (
                <p>{selectedProcessGroup.images[selectedProcessGroup.currentIndex].description}</p>
              )}
            </ModalInfo>
            {selectedProcessGroup.images.length > 1 && (
              <>
                {selectedProcessGroup.currentIndex > 0 && (
                  <SliderNavButton 
                    style={{ 
                      left: '20px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcessGroup(prev => ({
                        ...prev,
                        currentIndex: prev.currentIndex - 1
                      }));
                    }}
                  >
                    ‹
                  </SliderNavButton>
                )}
                {selectedProcessGroup.currentIndex < selectedProcessGroup.images.length - 1 && (
                  <SliderNavButton 
                    style={{ 
                      right: '20px'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProcessGroup(prev => ({
                        ...prev,
                        currentIndex: prev.currentIndex + 1
                      }));
                    }}
                  >
                    ›
                  </SliderNavButton>
                )}
                <div style={{
                  position: 'fixed',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '0.5rem',
                  zIndex: 1001
                }}>
                  {selectedProcessGroup.images.map((_, idx) => (
                    <SliderDot
                      key={idx}
                      $active={selectedProcessGroup.currentIndex === idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProcessGroup(prev => ({
                          ...prev,
                          currentIndex: idx
                        }));
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
    </>
  );
}

export default Gallery; 