
import { ProductCategoryList } from './ProductCategoryList';
import { ProductClassList } from './ProductClassList';
import { ProductList } from './ProductList';

interface ProductHierarchyProps {
  currentLevel: 'category' | 'class' | 'product';
  selectedCategory: string | null;
  selectedClass: string | null;
  searchTerm: string;
  filterBy: string;
  onNavigateToClass: (categoryId: string) => void;
  onNavigateToProduct: (classId: string) => void;
}

export const ProductHierarchy = ({
  currentLevel,
  selectedCategory,
  selectedClass,
  searchTerm,
  filterBy,
  onNavigateToClass,
  onNavigateToProduct
}: ProductHierarchyProps) => {
  return (
    <div className="space-y-6">
      {currentLevel === 'category' && (
        <ProductCategoryList
          searchTerm={searchTerm}
          filterBy={filterBy}
          onNavigateToClass={onNavigateToClass}
        />
      )}

      {currentLevel === 'class' && selectedCategory && (
        <ProductClassList
          categoryId={selectedCategory}
          searchTerm={searchTerm}
          filterBy={filterBy}
          onNavigateToProduct={onNavigateToProduct}
        />
      )}

      {currentLevel === 'product' && selectedClass && (
        <ProductList
          classId={selectedClass}
          searchTerm={searchTerm}
          filterBy={filterBy}
        />
      )}
    </div>
  );
};
