'use client';

import { useState, useMemo } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FeedGrid } from '@/components/FeedGrid';
import { RightPanel } from '@/components/RightPanel';
import { MOCK_ARTICLES } from '@/lib/mock-data';
import type { FilterType } from '@/types';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    let articles = [...MOCK_ARTICLES];

    if (activeCategory) {
      articles = articles.filter((a) => a.category === activeCategory);
    }

    switch (activeFilter) {
      case 'today': {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        articles = articles.filter(
          (a) => new Date(a.publishedAt) >= today
        );
        break;
      }
      case 'week': {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        articles = articles.filter(
          (a) => new Date(a.publishedAt) >= weekAgo
        );
        break;
      }
      case 'popular':
        articles.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'bookmarked':
        articles = articles.filter((a) => a.bookmarked);
        break;
    }

    return articles;
  }, [activeFilter, activeCategory]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-6">
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter bar */}
          <div className="lg:hidden mb-4 flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {(['all', 'today', 'popular', 'bookmarked'] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 px-3 py-1.5 text-[12px] rounded-lg transition-colors ${
                  activeFilter === filter
                    ? 'text-brand bg-brand-subtle font-medium'
                    : 'text-text-secondary bg-bg-surface border border-border'
                }`}
              >
                {filter === 'all' ? 'Tumu' : filter === 'today' ? 'Bugun' : filter === 'popular' ? 'Populer' : 'Kaydedilenler'}
              </button>
            ))}
          </div>

          <FeedGrid articles={filteredArticles} />
        </div>

        {/* Right Panel */}
        <RightPanel articles={MOCK_ARTICLES} />
      </div>
    </div>
  );
}
