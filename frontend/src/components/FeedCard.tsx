'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bookmark,
  MessageSquare,
  ArrowUpRight,
  Clock,
  TrendingUp,
  ChevronUp,
} from 'lucide-react';
import type { Article } from '@/types';
import { CATEGORIES } from '@/lib/mock-data';

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'az once';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}dk`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}sa`;
  const days = Math.floor(hours / 24);
  return `${days}g`;
}

function getCategoryColor(categoryId: string): string {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  return category?.color || '#2496ED';
}

function getCategoryName(categoryId: string): string {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  return category?.name || categoryId;
}

interface FeedCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

export function FeedCard({ article, variant = 'default' }: FeedCardProps) {
  const [bookmarked, setBookmarked] = useState(article.bookmarked);
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(article.upvotes);
  const categoryColor = getCategoryColor(article.category);

  const isNew =
    new Date().getTime() - new Date(article.publishedAt).getTime() <
    6 * 60 * 60 * 1000;

  if (variant === 'featured') {
    return (
      <article className="group relative bg-bg-surface border border-border rounded-xl overflow-hidden hover:border-border-hover transition-all duration-200">
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${categoryColor}40, transparent)` }} />
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold"
              style={{ backgroundColor: `${categoryColor}18`, color: categoryColor }}
            >
              {article.source.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium text-text-primary truncate">
                  {article.source}
                </span>
                {isNew && (
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium tracking-wide uppercase text-brand bg-brand-subtle rounded">
                    yeni
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-text-tertiary">{timeAgo(article.publishedAt)}</span>
                <span className="text-text-muted">·</span>
                <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} dk
                </span>
              </div>
            </div>
          </div>

          <Link href={`/article/${article.id}`}>
            <h2 className="font-serif text-2xl leading-tight text-text-primary group-hover:text-brand transition-colors mb-3">
              {article.title}
            </h2>
          </Link>

          <p className="text-sm leading-relaxed text-text-secondary mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-md"
                style={{ backgroundColor: `${categoryColor}14`, color: categoryColor }}
              >
                {getCategoryName(article.category)}
              </span>
              {article.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 text-[11px] text-text-tertiary bg-bg-elevated rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setUpvoted(!upvoted);
                  setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
                }}
                className={`flex items-center gap-1 px-2 py-1 text-[12px] rounded-md transition-colors ${
                  upvoted
                    ? 'text-brand bg-brand-subtle'
                    : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-elevated'
                }`}
              >
                <ChevronUp className="w-3.5 h-3.5" />
                {upvotes}
              </button>
              <button className="flex items-center gap-1 px-2 py-1 text-[12px] text-text-tertiary hover:text-text-secondary hover:bg-bg-elevated rounded-md">
                <MessageSquare className="w-3.5 h-3.5" />
                {article.commentCount}
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-1.5 rounded-md transition-colors ${
                  bookmarked
                    ? 'text-brand bg-brand-subtle'
                    : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-elevated'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
              </button>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-text-tertiary hover:text-text-secondary hover:bg-bg-elevated rounded-md"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="group flex items-start gap-3 p-3 rounded-lg hover:bg-bg-surface-hover transition-colors">
        <button
          onClick={() => {
            setUpvoted(!upvoted);
            setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
          }}
          className={`flex flex-col items-center pt-0.5 min-w-[36px] text-[12px] rounded-md transition-colors ${
            upvoted ? 'text-brand' : 'text-text-muted hover:text-text-tertiary'
          }`}
        >
          <ChevronUp className="w-4 h-4" />
          <span className="font-mono text-[11px]">{upvotes}</span>
        </button>
        <div className="flex-1 min-w-0">
          <Link href={`/article/${article.id}`}>
            <h3 className="text-sm font-medium text-text-primary group-hover:text-brand transition-colors leading-snug line-clamp-2">
              {article.title}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] text-text-tertiary">{article.source}</span>
            <span className="text-text-muted">·</span>
            <span className="text-[11px] text-text-tertiary">{timeAgo(article.publishedAt)}</span>
            <span className="text-text-muted">·</span>
            <span className="text-[11px] text-text-tertiary flex items-center gap-0.5">
              <MessageSquare className="w-3 h-3" />
              {article.commentCount}
            </span>
          </div>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
            bookmarked ? 'text-brand opacity-100' : 'text-text-muted hover:text-text-tertiary'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </article>
    );
  }

  // Default variant
  return (
    <article className="group relative bg-bg-surface border border-border rounded-xl overflow-hidden hover:border-border-hover transition-all duration-200">
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold"
            style={{ backgroundColor: `${categoryColor}18`, color: categoryColor }}
          >
            {article.source.slice(0, 2).toUpperCase()}
          </div>
          <span className="text-[12px] font-medium text-text-secondary truncate">
            {article.source}
          </span>
          <span className="text-text-muted">·</span>
          <span className="text-[11px] text-text-tertiary">{timeAgo(article.publishedAt)}</span>
          {isNew && (
            <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono font-semibold tracking-wide uppercase text-brand bg-brand-subtle rounded ml-auto">
              yeni
            </span>
          )}
        </div>

        <Link href={`/article/${article.id}`}>
          <h3 className="text-[15px] font-semibold leading-snug text-text-primary group-hover:text-brand transition-colors mb-2 line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-[13px] leading-relaxed text-text-secondary mb-3 line-clamp-2">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium rounded"
              style={{ backgroundColor: `${categoryColor}14`, color: categoryColor }}
            >
              {getCategoryName(article.category)}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-text-tertiary">
              <Clock className="w-3 h-3" />
              {article.readTime} dk
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <button
              onClick={() => {
                setUpvoted(!upvoted);
                setUpvotes(upvoted ? upvotes - 1 : upvotes + 1);
              }}
              className={`flex items-center gap-1 px-1.5 py-1 text-[11px] rounded transition-colors ${
                upvoted
                  ? 'text-brand bg-brand-subtle'
                  : 'text-text-muted hover:text-text-tertiary hover:bg-bg-elevated'
              }`}
            >
              <ChevronUp className="w-3 h-3" />
              {upvotes}
            </button>
            <button className="flex items-center gap-1 px-1.5 py-1 text-[11px] text-text-muted hover:text-text-tertiary hover:bg-bg-elevated rounded">
              <MessageSquare className="w-3 h-3" />
              {article.commentCount}
            </button>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1 rounded transition-colors ${
                bookmarked
                  ? 'text-brand'
                  : 'text-text-muted hover:text-text-tertiary hover:bg-bg-elevated'
              }`}
            >
              <Bookmark className="w-3 h-3" fill={bookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
