'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.auth.login(username, password);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      router.push('/');
    } catch {
      setError('Kullanici adi veya sifre hatali.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-secondary mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Ana Sayfaya Don
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-text-primary mb-2">Giris Yap</h1>
          <p className="text-sm text-text-secondary">
            Hesabiniza giris yapin ve haberleri takip edin.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-3 py-2 text-[13px] text-error bg-error/10 border border-error/20 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-[12px] font-medium text-text-secondary mb-1.5">
              Kullanici Adi
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full h-10 px-3 text-sm bg-bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-0 focus:outline-none transition-colors"
              placeholder="kullaniciadi"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[12px] font-medium text-text-secondary mb-1.5">
              Sifre
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 px-3 pr-10 text-sm bg-bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:border-brand focus:ring-0 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-tertiary"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 flex items-center justify-center gap-2 text-sm font-medium text-bg-primary bg-brand hover:bg-brand-hover disabled:opacity-50 rounded-lg transition-colors"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                Giris Yap
              </>
            )}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-[13px] text-text-tertiary">
          Hesabiniz yok mu?{' '}
          <Link href="/register" className="text-brand hover:text-brand-hover font-medium transition-colors">
            Kayit Olun
          </Link>
        </p>
      </div>
    </div>
  );
}
