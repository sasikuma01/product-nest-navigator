
import { useState } from 'react';
import { Table, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  currentView: 'card' | 'table';
  onViewChange: (view: 'card' | 'table') => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <Button
        variant={currentView === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="flex items-center gap-2"
      >
        <Grid3X3 className="h-4 w-4" />
        Card View
      </Button>
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="flex items-center gap-2"
      >
        <Table className="h-4 w-4" />
        Table View
      </Button>
    </div>
  );
};
