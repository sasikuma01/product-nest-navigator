
import { Grid, Table, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  currentView: 'card' | 'table' | 'filter';
  onViewChange: (view: 'card' | 'table' | 'filter') => void;
}

export const ViewToggle = ({ currentView, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white p-1">
      <Button
        variant={currentView === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="h-8 px-3"
      >
        <Grid className="h-4 w-4 mr-2" />
        Cards
      </Button>
      <Button
        variant={currentView === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-8 px-3"
      >
        <Table className="h-4 w-4 mr-2" />
        Table
      </Button>
      <Button
        variant={currentView === 'filter' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('filter')}
        className="h-8 px-3"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};
