import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { X, Lock, KeyRound, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      setError('Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        onClose();
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#0C0C0C] border border-white/20 rounded-xl p-8 shadow-2xl relative font-mono text-xs"
        role="dialog"
        aria-modal="true"
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-ink-muted hover:text-white p-1"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 text-lime mb-6">
          <KeyRound size={20} />
          <span className="font-bold tracking-wider uppercase text-sm">SECURITY CONSOLE AUTH</span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 rounded text-red-400 flex items-start gap-2.5 text-[11px] leading-relaxed">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-ink-muted uppercase mb-1.5 text-[10px] tracking-wider">
              Operator Identifier (Email)
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="operator@favas.is-a.dev"
              className="w-full bg-[#141414] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          <div>
            <label className="block text-ink-muted uppercase mb-1.5 text-[10px] tracking-wider">
              Passphrase
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full bg-[#141414] border border-white/10 rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-lime transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 bg-lime hover:bg-[#b8dd00] text-black font-bold py-3 rounded uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            <Lock size={14} />
            <span>{loading ? 'Authenticating...' : 'Authenticate'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-[10px] text-ink-faint text-center">
          [ AUTHORIZED ACCESS ONLY · IP LOGGED ]
        </div>
      </div>
    </div>
  );
};
