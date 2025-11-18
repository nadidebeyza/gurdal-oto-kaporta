import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

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
`;

const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 2px solid ${accentColor};
  background: #fff;
  color: ${accentColor};
  font-weight: 500;
  font-size: 1rem;
  min-width: 220px;
  box-shadow: 0 1px 6px rgba(34,34,59,0.10);
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #a4161a;
    box-shadow: 0 2px 12px rgba(34,34,59,0.18);
  }
`;

const CategoryButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: 2px solid ${props => props.active ? 'transparent' : accentColor};
  border-radius: 14px;
  background: ${props => props.active ? `linear-gradient(90deg, #232526 0%, #414345 100%)` : '#fff'};
  color: ${props => props.active ? '#fff' : accentColor};
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

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(90deg, #232526 0%, #414345 100%);
  color: #fff;
  padding: 1rem;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  transform: translateY(100%);
  transition: transform 0.3s;
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
  h3 {
    margin: 0 0 0.3rem 0;
    font-size: 1.15rem;
    font-weight: 700;
  }
  p {
    margin: 0;
    font-size: 0.98rem;
    opacity: 0.95;
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

const ModalImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(230,57,70,0.18);
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

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e63946;
  font-weight: 600;
`;

function Gallery() {
  // Use your stock images from the public folder
  const images = [
    {
      _id: '1',
      url: '/stock-repair-1.jpg',
      title: 'Kaporta Onarımı',
      description: 'Arka çamurluk düzeltme işlemi',
      category: 'Kaporta'
    },
    {
      _id: '2',
      url: '/stock-repair-2.jpg',
      title: 'Boyama',
      description: 'Tampon boyama işlemi',
      category: 'Boyama'
    },
    {
      _id: '3',
      url: '/stock-repair-3.jpg',
      title: 'Çekici Hizmeti',
      description: 'Aracın servise çekilmesi',
      category: 'Çekici'
    },
    {
      _id: '4',
      url: '/stock-repair-4.jpg',
      title: 'Cam Değişimi',
      description: 'Ön cam değişimi',
      category: 'Diğer'
    },
    {
      _id: '5',
      url: '/stock-repair-5.jpg',
      title: 'Kaporta Onarımı',
      description: 'Kapı göçük düzeltme',
      category: 'Kaporta'
    },
    {
      _id: '6',
      url: '/stock-repair-6.jpg',
      title: 'Boyama',
      description: 'Tavan boyama işlemi',
      category: 'Boyama'
    },
    {
      _id: '7',
      url: '/stock-repair-7.jpg',
      title: 'Çekici Hizmeti',
      description: 'Kaza sonrası çekici hizmeti',
      category: 'Çekici'
    }
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [filters, setFilters] = useState({
    category: 'Tümü',
    search: ''
  });

  const categories = ['Tümü', 'Kaporta', 'Boyama', 'Çekici', 'Diğer'];

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const filteredImages = images.filter(image => {
    const matchesCategory = filters.category === 'Tümü' || image.category === filters.category;
    const matchesSearch = image.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         image.description?.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
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
            active={filters.category === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </CategoryButton>
        ))}
        <SearchInput
          type="text"
          value={filters.search}
          placeholder="Kelime ile ara"
          onChange={handleSearchChange}
        />
      </FilterContainer>

      {filteredImages.length === 0 ? (
        <NoResults>
          <h3>Sonuç bulunamadı</h3>
          <p>Lütfen farklı bir arama kriteri deneyin.</p>
        </NoResults>
      ) : (
        <GalleryGrid>
          {filteredImages.map((image) => (
            <ImageCard
              key={image._id}
              onClick={() => setSelectedImage(image)}
            >
              <GalleryImage src={image.url} alt={image.title} />
              <ImageOverlay>
                <h3>{image.title}</h3>
                {image.description && <p>{image.description}</p>}
                <p>Kategori: {image.category}</p>
              </ImageOverlay>
            </ImageCard>
          ))}
        </GalleryGrid>
      )}

      {selectedImage && (
        <Modal onClick={() => setSelectedImage(null)}>
          <ModalImage src={selectedImage.url} alt={selectedImage.title} />
          <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
        </Modal>
      )}
    </GalleryContainer>
  );
}

export default Gallery; 