
import { useState } from 'react';
import { ProductHierarchy } from '@/components/ProductHierarchy';
import { Breadcrumb } from '@/components/Breadcrumb';
import { SearchAndFilters } from '@/components/SearchAndFilters';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState<'category' | 'class' | 'product'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  const handleNavigateToClass = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentLevel('class');
  };

  const handleNavigateToProduct = (classId: string) => {
    setSelectedClass(classId);
    setCurrentLevel('product');
  };

  const handleNavigateBack = (level: 'category' | 'class') => {
    if (level === 'category') {
      setCurrentLevel('category');
      setSelectedCategory(null);
      setSelectedClass(null);
    } else if (level === 'class') {
      setCurrentLevel('class');
      setSelectedClass(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Product Master</h1>
            <p className="mt-2 text-gray-600">Manage your product hierarchy efficiently</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          currentLevel={currentLevel}
          selectedCategory={selectedCategory}
          selectedClass={selectedClass}
          onNavigateBack={handleNavigateBack}
        />

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          currentLevel={currentLevel}
        />

        {/* Product Hierarchy */}
        <ProductHierarchy
          currentLevel={currentLevel}
          selectedCategory={selectedCategory}
          selectedClass={selectedClass}
          searchTerm={searchTerm}
          filterBy={filterBy}
          onNavigateToClass={handleNavigateToClass}
          onNavigateToProduct={handleNavigateToProduct}
        />
      </div>
    </div>
  );
};

export default Index;
