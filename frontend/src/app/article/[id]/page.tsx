'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChevronUp,
  MessageSquare,
  Bookmark,
  Share2,
  ArrowUpRight,
  Hash,
} from 'lucide-react';
import { MOCK_ARTICLES, CATEGORIES } from '@/lib/mock-data';

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = useMemo(
    () => MOCK_ARTICLES.find((a) => a.id === Number(id)),
    [id]
  );

  if (!article) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-serif text-2xl text-text-primary mb-2">Haber Bulunamadi</h1>
        <p className="text-sm text-text-secondary mb-6">Aradiginiz haber mevcut degil veya kaldirilmis olabilir.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand bg-brand-subtle hover:bg-brand-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Ana Sayfaya Don
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === article.category);
  const relatedArticles = MOCK_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-secondary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Geri
        </Link>
        <span className="text-text-muted">/</span>
        {category && (
          <span
            className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded"
            style={{ backgroundColor: `${category.color}14`, color: category.color }}
          >
            {category.name}
          </span>
        )}
      </div>

      {/* Article Header */}
      <article>
        <header className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight text-text-primary mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-text-secondary">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                style={{
                  backgroundColor: `${category?.color || '#2496ED'}18`,
                  color: category?.color || '#2496ED',
                }}
              >
                {article.source.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium text-text-primary">{article.source}</span>
            </div>
            <span className="text-text-muted">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-text-tertiary" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-text-muted">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-text-tertiary" />
              {article.readTime} dk okuma
            </span>
          </div>
        </header>

        {/* Action bar */}
        <div className="flex items-center justify-between py-3 mb-8 border-y border-border">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-text-secondary hover:text-brand hover:bg-brand-subtle rounded-lg transition-colors">
              <ChevronUp className="w-4 h-4" />
              <span className="font-mono">{article.upvotes}</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>{article.commentCount} yorum</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 text-text-secondary hover:text-brand hover:bg-brand-subtle rounded-lg transition-colors" title="Kaydet">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover rounded-lg transition-colors" title="Paylas">
              <Share2 className="w-4 h-4" />
            </button>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-brand hover:bg-brand-subtle rounded-lg transition-colors"
            >
              Kaynaga Git
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Article Body (mock content) */}
        <div className="prose-custom mb-12">
          <p className="text-[15px] leading-relaxed text-text-secondary mb-4">
            {article.excerpt}
          </p>
          <p className="text-[15px] leading-relaxed text-text-secondary mb-4">
            Bu haberin detayli icerigi kaynak sitede mevcuttur. Haberin tam metnine erisim icin yukaridaki &quot;Kaynaga Git&quot; butonunu kullanabilirsiniz. GZTLR, farkli kaynaklardan haberleri bir araya getirerek size en verimli okuma deneyimini sunar.
          </p>
          <p className="text-[15px] leading-relaxed text-text-secondary">
            Ilgili gelismeler ve benzer konulardaki haberler asagida listelenmistir. Haber akisinizi kisisellestirilmis filtreler ve kategori secenekleri ile yonetebilirsiniz.
          </p>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap mb-12">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[12px] text-text-tertiary bg-bg-surface border border-border hover:border-border-hover rounded-lg cursor-pointer transition-colors"
            >
              <Hash className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border pt-8">
          <h2 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-text-muted mb-4">
            Ilgili Haberler
          </h2>
          <div className="space-y-3">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/article/${related.id}`}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-bg-surface-hover transition-colors"
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                  style={{
                    backgroundColor: `${category?.color || '#2496ED'}18`,
                    color: category?.color || '#2496ED',
                  }}
                >
                  {related.source.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-medium text-text-primary group-hover:text-brand transition-colors leading-snug line-clamp-2">
                    {related.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-text-tertiary">{related.source}</span>
                    <span className="text-text-muted">·</span>
                    <span className="text-[11px] text-text-tertiary">{related.readTime} dk</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
