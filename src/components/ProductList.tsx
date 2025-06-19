
import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  classId: string;
  status: 'active' | 'inactive';
}

interface ProductListProps {
  classId: string;
  searchTerm: string;
  filterBy: string;
}

export const ProductList = ({
  classId,
  searchTerm,
  filterBy
}: ProductListProps) => {
  const [products] = useState<Product[]>([
    { id: '0', code: 'RMB 30', name: 'RMB 30', description: 'Marine Residual Fuel - 30 cSt', classId: '0', status: 'active' },
    { id: '1', code: 'RMD 80', name: 'RMD 80', description: 'Marine Residual Fuel - 80 cSt', classId: '0', status: 'active' },
    { id: '2', code: 'RME 180', name: 'RME 180', description: 'Marine Residual Fuel - 180 cSt', classId: '0', status: 'active' },
    { id: '3', code: 'RMG 180', name: 'RMG 180', description: 'Marine Gas Oil - 180 cSt', classId: '3', status: 'active' },
    { id: '4', code: 'RMG 380', name: 'RMG 380', description: 'Marine Gas Oil - 380 cSt', classId: '3', status: 'active' },
    { id: '5', code: 'RMG 500', name: 'RMG 500', description: 'Marine Gas Oil - 500 cSt', classId: '3', status: 'active' },
    { id: '6', code: 'RMG 700', name: 'RMG 700', description: 'Marine Gas Oil - 700 cSt', classId: '3', status: 'active' },
    { id: '7', code: 'RMK 380', name: 'RMK 380', description: 'Marine Diesel Oil - 380 cSt', classId: '4', status: 'active' },
    { id: '8', code: 'RMK 500', name: 'RMK 500', description: 'Marine Diesel Oil - 500 cSt', classId: '4', status: 'active' },
    { id: '9', code: 'RMK 700', name: 'RMK 700', description: 'Marine Diesel Oil - 700 cSt', classId: '4', status: 'inactive' }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesClass = product.classId === classId;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesClass) return false;
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'rmb') return matchesSearch && product.code.includes('RMB');
    if (filterBy === 'rmd') return matchesSearch && product.code.includes('RMD');
    if (filterBy === 'rme') return matchesSearch && product.code.includes('RME');
    if (filterBy === 'rmg') return matchesSearch && product.code.includes('RMG');
    if (filterBy === 'rmk') return matchesSearch && product.code.includes('RMK');
    
    return matchesSearch;
  });

  const getClassName = () => {
    const names = ['RESIDUAL OIL (HFO)', 'RESIDUAL OIL (VLSFO)', 'RESIDUAL OIL (ULSFO)', 'DISTILLATE OIL (MGO)', 'DISTILLATE OIL (MDO)', 'BIO FUEL'];
    return names[parseInt(classId)] || 'Product Class';
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Products under {getClassName()}</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {product.code}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{product.name}</p>
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
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex justify-between items-center">
                <Badge 
                  variant={product.status === 'active' ? 'default' : 'secondary'}
                  className={product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                >
                  {product.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
                <div className="text-xs text-gray-500">
                  ID: {product.code}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No products found</div>
          <div className="text-gray-500">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </div>
  );
};
