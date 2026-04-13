'use client';

import { useState } from 'react';
import {
  Flame,
  Clock,
  TrendingUp,
  Bookmark,
  LayoutGrid,
  Hash,
  ArrowRight,
} from 'lucide-react';
import { CATEGORIES, TRENDING_TAGS } from '@/lib/mock-data';
import type { FilterType } from '@/types';

const FILTERS: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Tum Haberler', icon: LayoutGrid },
  { id: 'today', label: 'Bugun', icon: Clock },
  { id: 'popular', label: 'Populer', icon: TrendingUp },
  { id: 'bookmarked', label: 'Kaydedilenler', icon: Bookmark },
];

interface SidebarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function Sidebar({
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Quick Filters */}
      <div>
        <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-text-muted mb-3 px-1">
          Filtrele
        </h3>
        <div className="space-y-0.5">
          {FILTERS.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                  isActive
                    ? 'text-brand bg-brand-subtle font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                }`}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
                {filter.id === 'today' && (
                  <span className="ml-auto text-[10px] font-mono text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded">
                    12
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-text-muted mb-3 px-1">
          Kategoriler
        </h3>
        <div className="space-y-0.5">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(isActive ? null : category.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] rounded-lg transition-colors ${
                  isActive
                    ? 'text-text-primary bg-bg-surface-hover font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
                <span className="ml-auto text-[11px] font-mono text-text-muted">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trending Tags */}
      <div>
        <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-text-muted mb-3 px-1 flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-accent-rust" />
          Trend Konular
        </h3>
        <div className="flex flex-wrap gap-1.5 px-1">
          {TRENDING_TAGS.map((tag) => (
            <button
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 text-[11px] text-text-tertiary hover:text-text-secondary bg-bg-surface hover:bg-bg-surface-hover border border-border hover:border-border-hover rounded-md transition-colors"
            >
              <Hash className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Divider + Footer info */}
      <div className="border-t border-border pt-4">
        <div className="px-1 space-y-2">
          <p className="text-[11px] text-text-muted leading-relaxed">
            GZTLR, Turkiye ve dunya gundemini takip etmenin en verimli yolu.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="text-[11px] text-text-tertiary hover:text-text-secondary transition-colors">Hakkinda</a>
            <a href="#" className="text-[11px] text-text-tertiary hover:text-text-secondary transition-colors">Gizlilik</a>
            <a href="#" className="text-[11px] text-text-tertiary hover:text-text-secondary transition-colors">Iletisim</a>
          </div>
        </div>
      </div>
    </aside>
  );
}
