import { useState, useMemo } from 'react';

export const useFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);

  const updateFilter = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filterItems = (items, filterFunction) => {
    return useMemo(() => {
      return items?.filter(item => filterFunction(item, filters)) || [];
    }, [items, filters]);
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    filterItems
  };
}; 