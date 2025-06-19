
import { useState } from 'react';
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  classCount: number;
  productCount: number;
}

interface ProductCategoryListProps {
  searchTerm: string;
  filterBy: string;
  onNavigateToClass: (categoryId: string) => void;
}

export const ProductCategoryList = ({
  searchTerm,
  filterBy,
  onNavigateToClass
}: ProductCategoryListProps) => {
  const [categories] = useState<Category[]>([
    { id: '0', code: 'FO', name: 'FUEL OIL', description: 'Marine fuel oil products', classCount: 3, productCount: 15 },
    { id: '1', code: 'LO', name: 'LUBRICATING OIL', description: 'Lubricating oil products', classCount: 2, productCount: 8 },
    { id: '2', code: 'WATER', name: 'WATER', description: 'Water treatment products', classCount: 1, productCount: 3 },
    { id: '3', code: 'CLO', name: 'CLO', description: 'Chemical treatment products', classCount: 2, productCount: 6 },
    { id: '4', code: 'GREASE', name: 'GREASE', description: 'Grease and lubricant products', classCount: 1, productCount: 4 }
  ]);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'fuel') return matchesSearch && category.code.includes('FO');
    if (filterBy === 'oil') return matchesSearch && (category.code.includes('LO') || category.code.includes('CLO'));
    if (filterBy === 'other') return matchesSearch && !category.code.includes('O');
    
    return matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Categories</h2>
          <p className="text-gray-600">Manage your main product categories</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {category.code}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{category.name}</p>
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
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{category.classCount}</div>
                    <div className="text-xs text-gray-500">Classes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{category.productCount}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  Active
                </Badge>
              </div>

              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 hover:border-blue-300"
                onClick={() => onNavigateToClass(category.id)}
              >
                View Classes
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No categories found</div>
          <div className="text-gray-500">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};
