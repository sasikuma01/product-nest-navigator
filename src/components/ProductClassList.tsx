
import { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductClass {
  id: string;
  code: string;
  name: string;
  description: string;
  productCount: number;
  categoryId: string;
}

interface ProductClassListProps {
  categoryId: string;
  searchTerm: string;
  filterBy: string;
  onNavigateToProduct: (classId: string) => void;
}

export const ProductClassList = ({
  categoryId,
  searchTerm,
  filterBy,
  onNavigateToProduct
}: ProductClassListProps) => {
  const [classes] = useState<ProductClass[]>([
    { id: '0', code: 'HFO', name: 'RESIDUAL OIL (HFO)', description: 'Heavy Fuel Oil products', productCount: 5, categoryId: '0' },
    { id: '1', code: 'VLSFO', name: 'RESIDUAL OIL (VLSFO)', description: 'Very Low Sulphur Fuel Oil', productCount: 4, categoryId: '0' },
    { id: '2', code: 'ULSFO', name: 'RESIDUAL OIL (ULSFO)', description: 'Ultra Low Sulphur Fuel Oil', productCount: 3, categoryId: '0' },
    { id: '3', code: 'MGO', name: 'DISTILLATE OIL (MGO)', description: 'Marine Gas Oil products', productCount: 6, categoryId: '0' },
    { id: '4', code: 'MDO', name: 'DISTILLATE OIL (MDO)', description: 'Marine Diesel Oil products', productCount: 4, categoryId: '0' },
    { id: '5', code: 'BIO FUEL', name: 'BIO FUEL', description: 'Biodiesel and bio-based fuels', productCount: 3, categoryId: '0' }
  ]);

  const filteredClasses = classes.filter(productClass => {
    const matchesCategory = productClass.categoryId === categoryId;
    const matchesSearch = productClass.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productClass.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         productClass.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesCategory) return false;
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'residual') return matchesSearch && productClass.name.includes('RESIDUAL');
    if (filterBy === 'distillate') return matchesSearch && productClass.name.includes('DISTILLATE');
    if (filterBy === 'bio') return matchesSearch && productClass.name.includes('BIO');
    
    return matchesSearch;
  });

  const getCategoryName = () => {
    const names = ['FUEL OIL', 'LUBRICATING OIL', 'WATER', 'CLO', 'GREASE'];
    return names[parseInt(categoryId)] || 'Category';
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Classes</h2>
          <p className="text-gray-600">Classes under {getCategoryName()}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClasses.map((productClass) => (
          <Card key={productClass.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {productClass.code}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{productClass.name}</p>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50">
                    <Pencil className="h-3 w-3 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                    <Trash2 className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4">{productClass.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <div className="text-lg font-semibold text-green-600">{productClass.productCount}</div>
                  <div className="text-sm text-gray-500">Products</div>
                </div>
                <Badge variant="secondary" className="bg-green-50 text-green-700">
                  {productClass.productCount > 0 ? 'Active' : 'Empty'}
                </Badge>
              </div>

              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 hover:border-blue-300"
                onClick={() => onNavigateToProduct(productClass.id)}
              >
                View Products
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No classes found</div>
          <div className="text-gray-500">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};
