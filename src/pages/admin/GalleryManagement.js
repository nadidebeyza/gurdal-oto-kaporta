import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AddImageForm = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const ImageCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ImageInfo = styled.div`
  padding: 1.5rem;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #c82333;
  }
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-top: 1rem;
  border-radius: 4px;
`;

function GalleryManagement() {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Diğer',
    image: null
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await api.getGalleryImages();
      setImages(response.data);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file
      });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First upload the image
      const imageFormData = new FormData();
      imageFormData.append('image', formData.image);
      const uploadResponse = await api.uploadImage(imageFormData);

      // Then create the gallery image entry
      const galleryImageData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        url: uploadResponse.data.url
      };

      await api.addGalleryImage(galleryImageData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Diğer',
        image: null
      });
      setPreviewUrl('');
      
      // Reload images
      loadImages();
    } catch (error) {
      console.error('Error adding image:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu görseli silmek istediğinizden emin misiniz?')) {
      try {
        await api.deleteGalleryImage(id);
        loadImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <GalleryContainer>
      <h1>Galeri Yönetimi</h1>
      
      <AddImageForm onSubmit={handleSubmit}>
        <h2>Yeni Görsel Ekle</h2>
        <FormGroup>
          <Label htmlFor="title">Başlık</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Açıklama</Label>
          <Input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="category">Kategori</Label>
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Kaporta">Kaporta</option>
            <option value="Boyama">Boyama</option>
            <option value="Çekici">Çekici</option>
            <option value="Diğer">Diğer</option>
          </Select>
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="image">Görsel</Label>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
          {previewUrl && <ImagePreview src={previewUrl} alt="Preview" />}
        </FormGroup>
        
        <Button type="submit">Görsel Ekle</Button>
      </AddImageForm>

      <GalleryGrid>
        {images.map((image) => (
          <ImageCard key={image._id}>
            <GalleryImage src={image.url} alt={image.title} />
            <ImageInfo>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
              <p>Kategori: {image.category}</p>
              <DeleteButton onClick={() => handleDelete(image._id)}>
                Sil
              </DeleteButton>
            </ImageInfo>
          </ImageCard>
        ))}
      </GalleryGrid>
    </GalleryContainer>
  );
}

export default GalleryManagement; 