
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  currentLevel: 'category' | 'class' | 'product';
  selectedCategory: string | null;
  selectedClass: string | null;
  onNavigateBack: (level: 'category' | 'class') => void;
}

export const Breadcrumb = ({ 
  currentLevel, 
  selectedCategory, 
  selectedClass, 
  onNavigateBack 
}: BreadcrumbProps) => {
  const getCategoryName = (id: string | null) => {
    if (!id) return '';
    const categories = ['FUEL OIL', 'LUBRICATING OIL', 'WATER', 'CLO', 'GREASE'];
    return categories[parseInt(id)] || 'Category';
  };

  const getClassName = (id: string | null) => {
    if (!id) return '';
    const classes = ['RESIDUAL OIL (HFO)', 'RESIDUAL OIL (VLSFO)', 'DISTILLATE OIL (MGO)', 'BIO FUEL'];
    return classes[parseInt(id)] || 'Class';
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button
        onClick={() => onNavigateBack('category')}
        className={`hover:text-blue-600 transition-colors ${
          currentLevel === 'category' ? 'text-blue-600 font-medium' : ''
        }`}
      >
        Product Categories
      </button>

      {(currentLevel === 'class' || currentLevel === 'product') && (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <button
            onClick={() => onNavigateBack('class')}
            className={`hover:text-blue-600 transition-colors ${
              currentLevel === 'class' ? 'text-blue-600 font-medium' : ''
            }`}
          >
            {getCategoryName(selectedCategory)}
          </button>
        </>
      )}

      {currentLevel === 'product' && (
        <>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-blue-600 font-medium">
            {getClassName(selectedClass)}
          </span>
        </>
      )}
    </nav>
  );
};
