import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  classId: string;
  status: 'active' | 'inactive';
}

interface ProductClass {
  id: string;
  code: string;
  name: string;
  description: string;
  categoryId: string;
  products: Product[];
}

interface Category {
  id: string;
  code: string;
  name: string;
  description: string;
  classes: ProductClass[];
}

export const ProductTableView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedClasses, setExpandedClasses] = useState<Set<string>>(new Set());

  // Mock data with full hierarchy
  const [categories] = useState<Category[]>([
    {
      id: '0',
      code: 'FO',
      name: 'FUEL OIL',
      description: 'Marine fuel oil products',
      classes: [
        {
          id: '0',
          code: 'HFO',
          name: 'RESIDUAL OIL (HFO)',
          description: 'Heavy Fuel Oil products',
          categoryId: '0',
          products: [
            { id: '0', code: 'RMB 30', name: 'RMB 30', description: 'Marine Residual Fuel - 30 cSt', classId: '0', status: 'active' },
            { id: '1', code: 'RMD 80', name: 'RMD 80', description: 'Marine Residual Fuel - 80 cSt', classId: '0', status: 'active' },
            { id: '2', code: 'RME 180', name: 'RME 180', description: 'Marine Residual Fuel - 180 cSt', classId: '0', status: 'active' }
          ]
        },
        {
          id: '1',
          code: 'VLSFO',
          name: 'RESIDUAL OIL (VLSFO)',
          description: 'Very Low Sulphur Fuel Oil',
          categoryId: '0',
          products: [
            { id: '3', code: 'VLSFO 180', name: 'VLSFO 180', description: 'Very Low Sulphur Fuel Oil - 180 cSt', classId: '1', status: 'active' },
            { id: '4', code: 'VLSFO 380', name: 'VLSFO 380', description: 'Very Low Sulphur Fuel Oil - 380 cSt', classId: '1', status: 'active' }
          ]
        },
        {
          id: '3',
          code: 'MGO',
          name: 'DISTILLATE OIL (MGO)',
          description: 'Marine Gas Oil products',
          categoryId: '0',
          products: [
            { id: '5', code: 'RMG 180', name: 'RMG 180', description: 'Marine Gas Oil - 180 cSt', classId: '3', status: 'active' },
            { id: '6', code: 'RMG 380', name: 'RMG 380', description: 'Marine Gas Oil - 380 cSt', classId: '3', status: 'active' },
            { id: '7', code: 'RMG 500', name: 'RMG 500', description: 'Marine Gas Oil - 500 cSt', classId: '3', status: 'active' }
          ]
        }
      ]
    },
    {
      id: '1',
      code: 'LO',
      name: 'LUBRICATING OIL',
      description: 'Lubricating oil products',
      classes: [
        {
          id: '4',
          code: 'MARINE LO',
          name: 'MARINE LUBRICATING OIL',
          description: 'Marine engine lubricating oil',
          categoryId: '1',
          products: [
            { id: '8', code: 'MLO 40', name: 'Marine Lube Oil 40', description: 'Marine Engine Oil - SAE 40', classId: '4', status: 'active' },
            { id: '9', code: 'MLO 50', name: 'Marine Lube Oil 50', description: 'Marine Engine Oil - SAE 50', classId: '4', status: 'inactive' }
          ]
        }
      ]
    }
  ]);

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
      // Also collapse all classes in this category
      const categoryClasses = categories.find(c => c.id === categoryId)?.classes || [];
      categoryClasses.forEach(cl => {
        const newExpandedClasses = new Set(expandedClasses);
        newExpandedClasses.delete(cl.id);
        setExpandedClasses(newExpandedClasses);
      });
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleClassExpansion = (classId: string) => {
    const newExpanded = new Set(expandedClasses);
    if (newExpanded.has(classId)) {
      newExpanded.delete(classId);
    } else {
      newExpanded.add(classId);
    }
    setExpandedClasses(newExpanded);
  };

  const filteredCategories = categories.filter(category => {
    if (categoryFilter !== 'all' && category.id !== categoryFilter) return false;
    if (searchTerm) {
      const matchesCategory = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             category.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = category.classes.some(cl => 
        cl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cl.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesProduct = category.classes.some(cl =>
        cl.products.some(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      return matchesCategory || matchesClass || matchesProduct;
    }
    return true;
  });

  const getFilteredClasses = (category: Category) => {
    return category.classes.filter(cl => {
      if (classFilter !== 'all' && cl.id !== classFilter) return false;
      if (searchTerm) {
        const matchesClass = cl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cl.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesProduct = cl.products.some(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesClass || matchesProduct;
      }
      return true;
    });
  };

  const getFilteredProducts = (productClass: ProductClass) => {
    return productClass.products.filter(product => {
      if (statusFilter !== 'all' && product.status !== statusFilter) return false;
      if (searchTerm) {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.description.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Master</h1>
          <p className="text-gray-600">Manage your complete product hierarchy</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Global Search */}
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search categories, classes, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
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
              {categories.flatMap(cat => cat.classes).map(cl => (
                <SelectItem key={cl.id} value={cl.id}>{cl.name}</SelectItem>
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
      </div>

      {/* Expandable Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => {
              const filteredClasses = getFilteredClasses(category);
              const isExpanded = expandedCategories.has(category.id);
              
              return (
                <React.Fragment key={category.id}>
                  {/* Category Row */}
                  <TableRow className="bg-blue-50/50">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCategoryExpansion(category.id)}
                        className="p-1 h-6 w-6"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Category
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{category.code}</TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="text-gray-600">{category.description}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* Classes for this Category */}
                  {isExpanded && filteredClasses.map((productClass) => {
                    const filteredProducts = getFilteredProducts(productClass);
                    const isClassExpanded = expandedClasses.has(productClass.id);
                    
                    return (
                      <React.Fragment key={productClass.id}>
                        {/* Class Row */}
                        <TableRow className="bg-green-50/30">
                          <TableCell className="pl-8">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleClassExpansion(productClass.id)}
                              className="p-1 h-6 w-6"
                            >
                              {isClassExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Class
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{productClass.code}</TableCell>
                          <TableCell className="font-medium">{productClass.name}</TableCell>
                          <TableCell className="text-gray-600">{productClass.description}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        {/* Products for this Class */}
                        {isClassExpanded && filteredProducts.map((product) => (
                          <TableRow key={product.id} className="bg-gray-50/30">
                            <TableCell className="pl-12"></TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-gray-100 text-gray-800">
                                Product
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold">{product.code}</TableCell>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell className="text-gray-600">{product.description}</TableCell>
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
                              <div className="flex space-x-1">
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
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No results found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
};
