
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterBy: string;
  setFilterBy: (filter: string) => void;
  currentLevel: 'category' | 'class' | 'product';
}

export const SearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  filterBy,
  setFilterBy,
  currentLevel
}: SearchAndFiltersProps) => {
  const getFilterOptions = () => {
    switch (currentLevel) {
      case 'category':
        return [
          { value: 'all', label: 'All Categories' },
          { value: 'fuel', label: 'Fuel Related' },
          { value: 'oil', label: 'Oil Related' },
          { value: 'other', label: 'Other' }
        ];
      case 'class':
        return [
          { value: 'all', label: 'All Classes' },
          { value: 'residual', label: 'Residual Oil' },
          { value: 'distillate', label: 'Distillate Oil' },
          { value: 'bio', label: 'Bio Fuel' }
        ];
      case 'product':
        return [
          { value: 'all', label: 'All Products' },
          { value: 'rmb', label: 'RMB Series' },
          { value: 'rmd', label: 'RMD Series' },
          { value: 'rme', label: 'RME Series' },
          { value: 'rmg', label: 'RMG Series' },
          { value: 'rmk', label: 'RMK Series' }
        ];
      default:
        return [];
    }
  };

  const getPlaceholder = () => {
    switch (currentLevel) {
      case 'category':
        return 'Search categories...';
      case 'class':
        return 'Search classes...';
      case 'product':
        return 'Search products...';
      default:
        return 'Search...';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="sm:w-48">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {getFilterOptions().map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
