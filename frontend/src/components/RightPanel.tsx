'use client';

import { FeedCard } from './FeedCard';
import type { Article } from '@/types';
import {
  Flame,
  BarChart3,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

interface RightPanelProps {
  articles: Article[];
}

export function RightPanel({ articles }: RightPanelProps) {
  const topArticles = articles
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 5);

  return (
    <aside className="hidden xl:block w-72 shrink-0 space-y-6">
      {/* Most Upvoted */}
      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Flame className="w-4 h-4 text-accent-rust" />
          <h3 className="text-[13px] font-semibold text-text-primary">En Cok Okunan</h3>
        </div>
        <div className="divide-y divide-border">
          {topArticles.map((article, index) => (
            <a
              key={article.id}
              href={`/article/${article.id}`}
              className="group flex items-start gap-3 px-4 py-3 hover:bg-bg-surface-hover transition-colors"
            >
              <span className="font-mono text-[13px] font-bold text-text-muted mt-0.5 w-5 text-right shrink-0">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary group-hover:text-brand transition-colors leading-snug line-clamp-2">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-text-tertiary">{article.source}</span>
                  <span className="text-text-muted">·</span>
                  <span className="text-[11px] text-text-tertiary font-mono">{article.upvotes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <BarChart3 className="w-4 h-4 text-brand" />
          <h3 className="text-[13px] font-semibold text-text-primary">Bugunun Ozeti</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-text-secondary">Toplam Haber</span>
            <span className="text-[13px] font-mono font-semibold text-text-primary">247</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-text-secondary">Son Gelisme</span>
            <span className="text-[13px] font-mono font-semibold text-accent-emerald">32</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-text-secondary">Aktif Kaynak</span>
            <span className="text-[13px] font-mono font-semibold text-text-primary">18</span>
          </div>
          <div className="w-full bg-bg-elevated rounded-full h-1.5 mt-2">
            <div className="bg-brand rounded-full h-1.5" style={{ width: '72%' }} />
          </div>
          <p className="text-[11px] text-text-tertiary">Gunun %72'si tamamlandi</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-1 space-y-2">
        <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-text-muted mb-2">
          Hizli Erisim
        </h3>
        {[
          { label: 'RSS Beslemesi', desc: 'Haberleri RSS ile takip edin' },
          { label: 'API Dokumantasyonu', desc: 'Gelistirici kaynaklari' },
          { label: 'Mobil Uygulama', desc: 'Yakinda' },
        ].map((link) => (
          <a
            key={link.label}
            href="#"
            className="group flex items-start gap-2 p-2 rounded-lg hover:bg-bg-surface-hover transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-text-muted mt-0.5 group-hover:text-text-tertiary" />
            <div>
              <p className="text-[12px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                {link.label}
              </p>
              <p className="text-[11px] text-text-muted">{link.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </aside>
  );
}
