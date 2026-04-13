'use client';

import { FeedCard } from './FeedCard';
import type { Article } from '@/types';
import { TrendingUp, Zap } from 'lucide-react';

interface FeedGridProps {
  articles: Article[];
}

export function FeedGrid({ articles }: FeedGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-xl bg-bg-surface border border-border flex items-center justify-center mb-4">
          <Zap className="w-5 h-5 text-text-muted" />
        </div>
        <p className="text-sm text-text-secondary mb-1">Haber bulunamadi</p>
        <p className="text-[12px] text-text-tertiary">Filtreleri degistirmeyi deneyin</p>
      </div>
    );
  }

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand" />
          <h2 className="text-sm font-semibold text-text-primary">Haber Akisi</h2>
          <span className="text-[11px] font-mono text-text-muted bg-bg-surface border border-border px-1.5 py-0.5 rounded">
            {articles.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[12px]">
          <button className="px-2.5 py-1 text-brand bg-brand-subtle rounded-md font-medium">
            En Yeni
          </button>
          <button className="px-2.5 py-1 text-text-tertiary hover:text-text-secondary hover:bg-bg-surface-hover rounded-md">
            Populer
          </button>
          <button className="px-2.5 py-1 text-text-tertiary hover:text-text-secondary hover:bg-bg-surface-hover rounded-md">
            Tartisilan
          </button>
        </div>
      </div>

      {/* Featured article */}
      <FeedCard article={featured} variant="featured" />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {rest.map((article) => (
          <FeedCard key={article.id} article={article} variant="default" />
        ))}
      </div>
    </div>
  );
}
