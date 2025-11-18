import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../../services/api';

const CarsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AddCarForm = styled.form`
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

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const CarCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CarInfo = styled.div`
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

function CarsManagement() {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    year: '',
    km: '',
    price: '',
    details: ''
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await api.getCars();
      setCars(response.data);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addCar(formData);
      setFormData({
        title: '',
        image: '',
        year: '',
        km: '',
        price: '',
        details: ''
      });
      loadCars();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu aracı silmek istediğinizden emin misiniz?')) {
      try {
        await api.deleteCar(id);
        loadCars();
      } catch (error) {
        console.error('Error deleting car:', error);
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
    <CarsContainer>
      <h1>Araç Yönetimi</h1>
      
      <AddCarForm onSubmit={handleSubmit}>
        <h2>Yeni Araç Ekle</h2>
        <FormGroup>
          <Label htmlFor="title">Araç Adı</Label>
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
          <Label htmlFor="image">Görsel URL</Label>
          <Input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="year">Yıl</Label>
          <Input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="km">Kilometre</Label>
          <Input
            type="text"
            id="km"
            name="km"
            value={formData.km}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="price">Fiyat</Label>
          <Input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="details">Detaylar</Label>
          <Input
            type="text"
            id="details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <Button type="submit">Araç Ekle</Button>
      </AddCarForm>

      <CarsGrid>
        {cars.map((car) => (
          <CarCard key={car._id}>
            <CarImage src={car.image} alt={car.title} />
            <CarInfo>
              <h3>{car.title}</h3>
              <p>Yıl: {car.year}</p>
              <p>Km: {car.km}</p>
              <p>Fiyat: {car.price}</p>
              <p>{car.details}</p>
              <DeleteButton onClick={() => handleDelete(car._id)}>
                Sil
              </DeleteButton>
            </CarInfo>
          </CarCard>
        ))}
      </CarsGrid>
    </CarsContainer>
  );
}

export default CarsManagement; 