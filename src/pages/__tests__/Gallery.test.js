import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../utils/test-utils';
import Gallery from '../Gallery';
import { api } from '../../services/api';

// Mock the API service
jest.mock('../../services/api', () => ({
  api: {
    getGalleryImages: jest.fn()
  }
}));

// Mock the useApi hook
jest.mock('../../hooks/useApi', () => ({
  useApi: () => ({
    data: [
      {
        _id: '1',
        title: 'Test Image 1',
        description: 'Test Description 1',
        category: 'Kaporta',
        url: 'test-url-1'
      },
      {
        _id: '2',
        title: 'Test Image 2',
        description: 'Test Description 2',
        category: 'Boyama',
        url: 'test-url-2'
      }
    ],
    loading: false,
    error: null,
    execute: jest.fn()
  })
}));

describe('Gallery Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders gallery title and description', () => {
    render(<Gallery />);
    expect(screen.getByText('Galeri')).toBeInTheDocument();
    expect(screen.getByText(/Gürdal Oto Kaporta'da gerçekleştirdiğimiz çalışmalardan örnekler/)).toBeInTheDocument();
  });

  it('renders category filters', () => {
    render(<Gallery />);
    expect(screen.getByText('Tümü')).toBeInTheDocument();
    expect(screen.getByText('Kaporta')).toBeInTheDocument();
    expect(screen.getByText('Boyama')).toBeInTheDocument();
  });

  it('filters images by category', () => {
    render(<Gallery />);
    const kaportaButton = screen.getByText('Kaporta');
    fireEvent.click(kaportaButton);
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Image 2')).not.toBeInTheDocument();
  });

  it('filters images by search term', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Görsel ara...');
    fireEvent.change(searchInput, { target: { value: 'Test Image 1' } });
    expect(screen.getByText('Test Image 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Image 2')).not.toBeInTheDocument();
  });

  it('shows no results message when no images match filters', () => {
    render(<Gallery />);
    const searchInput = screen.getByPlaceholderText('Görsel ara...');
    fireEvent.change(searchInput, { target: { value: 'Non-existent image' } });
    expect(screen.getByText('Sonuç bulunamadı')).toBeInTheDocument();
  });
}); 