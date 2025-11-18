import { renderHook, act } from '@testing-library/react';
import { useFilters } from '../useFilters';

describe('useFilters Hook', () => {
  it('initializes with default filters', () => {
    const { result } = renderHook(() => useFilters({ category: 'all', search: '' }));
    expect(result.current.filters).toEqual({ category: 'all', search: '' });
  });

  it('updates filter value', () => {
    const { result } = renderHook(() => useFilters({ category: 'all', search: '' }));
    
    act(() => {
      result.current.updateFilter('category', 'new');
    });

    expect(result.current.filters.category).toBe('new');
  });

  it('resets filters to initial values', () => {
    const initialFilters = { category: 'all', search: '' };
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'new');
      result.current.updateFilter('search', 'test');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual(initialFilters);
  });

  it('filters items correctly', () => {
    const { result } = renderHook(() => useFilters({ category: 'all' }));
    
    const items = [
      { id: 1, category: 'test' },
      { id: 2, category: 'other' }
    ];

    const filterFunction = (item, filters) => 
      filters.category === 'all' || item.category === filters.category;

    const filteredItems = result.current.filterItems(items, filterFunction);
    expect(filteredItems).toHaveLength(2);

    act(() => {
      result.current.updateFilter('category', 'test');
    });

    const newFilteredItems = result.current.filterItems(items, filterFunction);
    expect(newFilteredItems).toHaveLength(1);
    expect(newFilteredItems[0].id).toBe(1);
  });
}); 