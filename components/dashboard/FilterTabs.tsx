'use client';

import { useProjectStore, FilterType } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { cn } from '../../lib/utils';

const filters: FilterType[] = ['all', 'drafts', 'rendering', 'completed'];

const filterKeys: Record<FilterType, any> = {
  all: 'filter.all',
  drafts: 'filter.drafts',
  rendering: 'filter.rendering',
  completed: 'filter.completed',
};

export default function FilterTabs() {
  const { filter, setFilter } = useProjectStore();
  const { t } = useTranslation();

  return (
    <div className="flex space-x-8 text-sm font-light">
      {filters.map((key) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={cn(
            'hover:text-white transition-colors pb-1',
            filter === key ? 'text-white border-b border-white' : 'text-white/40'
          )}
        >
          {t(filterKeys[key])}
        </button>
      ))}
    </div>
  );
}
