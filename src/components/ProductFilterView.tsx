
import React, { useState } from 'react';
import { Search, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from '@/components/ui/drawer';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  classId: string;
  className: string;
  categoryId: string;
  categoryName: string;
  status: 'active' | 'inactive';
}

export const ProductFilterView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Mock data - flattened for easy filtering
  const [products] = useState<Product[]>([
    {
      id: '0',
      code: 'RMB 30',
      name: 'RMB 30',
      description: 'Marine Residual Fuel - 30 cSt',
      classId: '0',
      className: 'RESIDUAL OIL (HFO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '1',
      code: 'RMD 80',
      name: 'RMD 80',
      description: 'Marine Residual Fuel - 80 cSt',
      classId: '0',
      className: 'RESIDUAL OIL (HFO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '2',
      code: 'RME 180',
      name: 'RME 180',
      description: 'Marine Residual Fuel - 180 cSt',
      classId: '0',
      className: 'RESIDUAL OIL (HFO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '3',
      code: 'VLSFO 180',
      name: 'VLSFO 180',
      description: 'Very Low Sulphur Fuel Oil - 180 cSt',
      classId: '1',
      className: 'RESIDUAL OIL (VLSFO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '4',
      code: 'VLSFO 380',
      name: 'VLSFO 380',
      description: 'Very Low Sulphur Fuel Oil - 380 cSt',
      classId: '1',
      className: 'RESIDUAL OIL (VLSFO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '5',
      code: 'RMG 180',
      name: 'RMG 180',
      description: 'Marine Gas Oil - 180 cSt',
      classId: '3',
      className: 'DISTILLATE OIL (MGO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '6',
      code: 'RMG 380',
      name: 'RMG 380',
      description: 'Marine Gas Oil - 380 cSt',
      classId: '3',
      className: 'DISTILLATE OIL (MGO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '7',
      code: 'RMG 500',
      name: 'RMG 500',
      description: 'Marine Gas Oil - 500 cSt',
      classId: '3',
      className: 'DISTILLATE OIL (MGO)',
      categoryId: '0',
      categoryName: 'FUEL OIL',
      status: 'active'
    },
    {
      id: '8',
      code: 'MLO 40',
      name: 'Marine Lube Oil 40',
      description: 'Marine Engine Oil - SAE 40',
      classId: '4',
      className: 'MARINE LUBRICATING OIL',
      categoryId: '1',
      categoryName: 'LUBRICATING OIL',
      status: 'active'
    },
    {
      id: '9',
      code: 'MLO 50',
      name: 'Marine Lube Oil 50',
      description: 'Marine Engine Oil - SAE 50',
      classId: '4',
      className: 'MARINE LUBRICATING OIL',
      categoryId: '1',
      categoryName: 'LUBRICATING OIL',
      status: 'inactive'
    }
  ]);

  // Get unique categories and classes for filters
  const categories = Array.from(new Set(products.map(p => ({ id: p.categoryId, name: p.categoryName }))))
    .sort((a, b) => a.name.localeCompare(b.name));
  
  const classes = Array.from(new Set(products.map(p => ({ id: p.classId, name: p.className, categoryId: p.categoryId }))))
    .filter(c => categoryFilter === 'all' || c.categoryId === categoryFilter)
    .sort((a, b) => a.name.localeCompare(b.name));

  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.className.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
    const matchesClass = classFilter === 'all' || product.classId === classFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesClass && matchesStatus;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Master</h1>
          <p className="text-gray-600">Find and manage products with advanced filtering</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Advanced Filter Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
          <CardDescription>Use filters to quickly find the products you need</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Global Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, codes, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={(value) => {
              setCategoryFilter(value);
              setClassFilter('all'); // Reset class filter when category changes
            }}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Class Filter */}
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
              {searchTerm && <span className="ml-2 text-blue-600">for "{searchTerm}"</span>}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Code</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow 
                key={product.id} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleProductClick(product)}
              >
                <TableCell className="font-semibold">{product.code}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {product.categoryName}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {product.className}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      product.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }
                  >
                    {product.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No products found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </Card>

      {/* Product Preview Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle className="text-xl font-bold">
                  {selectedProduct?.name}
                </DrawerTitle>
                <DrawerDescription className="text-gray-600">
                  Product Code: {selectedProduct?.code}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" onClick={handleCloseDrawer}>
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="px-6 pb-6">
            {selectedProduct && (
              <div className="space-y-6">
                {/* Product Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Product Code</label>
                        <p className="text-lg font-semibold">{selectedProduct.code}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Product Name</label>
                        <p className="text-lg font-semibold">{selectedProduct.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="text-gray-700">{selectedProduct.description}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="mt-1">
                          <Badge
                            className={
                              selectedProduct.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-600'
                            }
                          >
                            {selectedProduct.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Hierarchy Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <div className="mt-1">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {selectedProduct.categoryName}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Class</label>
                        <div className="mt-1">
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {selectedProduct.className}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Product ID</label>
                        <p className="text-gray-700 font-mono text-sm">{selectedProduct.id}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button variant="outline" onClick={handleCloseDrawer}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Product
                  </Button>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Product
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
