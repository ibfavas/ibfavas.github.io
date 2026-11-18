import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { initialProjects, initialWriteups, initialProfile } from '../data/portfolioData';
import { Writeup, Profile } from '../types/portfolio';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Lock, LogOut, Plus, Save, Upload, Eye, Edit3, ShieldAlert } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Data states
  const [activeTab, setActiveTab] = useState<'writeups' | 'projects' | 'profile'>('writeups');
  const [writeups, setWriteups] = useState<Writeup[]>(initialWriteups);
  const [projects] = useState(initialProjects);
  const [profile, setProfile] = useState<Profile>(initialProfile);

  // Selected for editing
  const [selectedWriteup, setSelectedWriteup] = useState<Writeup | null>(initialWriteups[0] || null);
  const [previewMode, setPreviewMode] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthChecked(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!supabase) {
      setAuthError('Supabase is not configured yet. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedWriteup) return;

    if (!supabase) {
      alert('Supabase storage requires VITE_SUPABASE_URL and key to be configured.');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `writeups/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      const markdownImage = `\n\n![${file.name}](${publicUrl})\n\n`;
      setSelectedWriteup({
        ...selectedWriteup,
        body: selectedWriteup.body + markdownImage
      });
      showStatus('Image uploaded and inserted into markdown body!');
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    }
  };

  const saveWriteup = async () => {
    if (!selectedWriteup) return;
    if (supabase) {
      try {
        const { error } = await supabase
          .from('writeups')
          .upsert({
            id: selectedWriteup.id,
            slug: selectedWriteup.slug,
            title: selectedWriteup.title,
            summary: selectedWriteup.summary,
            body: selectedWriteup.body,
            cover_image_url: selectedWriteup.coverImage,
            tags: selectedWriteup.tags,
            published: selectedWriteup.published,
            display_order: selectedWriteup.displayOrder
          });
        if (error) throw error;
      } catch (err: any) {
        console.warn('Supabase sync skipped/failed:', err.message);
      }
    }
    setWriteups(writeups.map(w => w.id === selectedWriteup.id ? selectedWriteup : w));
    showStatus('Writeup saved successfully!');
  };

  if (!authChecked) {
    return <div className="min-h-screen bg-bg flex items-center justify-center font-mono text-xs text-ink-muted">Initializing secure console...</div>;
  }

  // Unauthenticated view
  if (!session) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-mono text-xs">
        <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-lime font-bold mb-6">
            <Lock size={18} />
            <span>SECURITY COMMAND CONSOLE</span>
          </div>

          {authError && (
            <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 rounded text-red-400 text-[11px] leading-relaxed flex items-center gap-2">
              <ShieldAlert size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-ink-muted uppercase mb-1 text-[10px]">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-lime"
              />
            </div>
            <div>
              <label className="block text-ink-muted uppercase mb-1 text-[10px]">Passphrase</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#141414] border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-lime"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-lime text-black font-bold py-2.5 rounded uppercase mt-4 hover:bg-[#b8dd00] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#070707] text-[#ECE8E1] font-mono text-xs">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white uppercase text-sm">CONSOLE // ADMIN</span>
          <span className="text-[11px] text-lime">[ LIVE SUPABASE BACKEND ]</span>
        </div>
        <div className="flex items-center gap-4">
          {statusMsg && (
            <span className="bg-lime/10 text-lime border border-lime/30 px-3 py-1 rounded text-[11px]">
              {statusMsg}
            </span>
          )}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-ink-muted hover:text-white px-3 py-1.5 rounded border border-white/10 bg-[#121212]"
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <div className="border-b border-white/10 bg-[#0C0C0C] px-6 flex gap-6 text-[11px] uppercase tracking-wider">
        <button 
          onClick={() => setActiveTab('writeups')}
          className={`py-3 border-b-2 font-bold transition-colors ${activeTab === 'writeups' ? 'border-lime text-lime' : 'border-transparent text-ink-muted hover:text-white'}`}
        >
          Writeups ({writeups.length})
        </button>
        <button 
          onClick={() => setActiveTab('projects')}
          className={`py-3 border-b-2 font-bold transition-colors ${activeTab === 'projects' ? 'border-lime text-lime' : 'border-transparent text-ink-muted hover:text-white'}`}
        >
          Projects ({projects.length})
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`py-3 border-b-2 font-bold transition-colors ${activeTab === 'profile' ? 'border-lime text-lime' : 'border-transparent text-ink-muted hover:text-white'}`}
        >
          Profile &amp; Hero
        </button>
      </div>

      <div className="p-6">
        {/* Writeups Tab */}
        {activeTab === 'writeups' && (
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar list */}
            <div className="col-span-12 md:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-2">
                <span className="text-white font-bold uppercase text-[11px]">Disclosures &amp; Papers</span>
                <button 
                  onClick={() => {
                    const newW: Writeup = {
                      id: `writeup-${Date.now()}`,
                      slug: 'new-vulnerability-writeup',
                      title: 'New Research Writeup',
                      date: new Date().toISOString().split('T')[0],
                      summary: 'Executive summary of research.',
                      body: '## Executive Summary\n\nWrite your findings here...',
                      tags: ['VAPT', 'Security'],
                      readingTime: 3,
                      displayOrder: writeups.length + 1,
                      published: true
                    };
                    setWriteups([newW, ...writeups]);
                    setSelectedWriteup(newW);
                  }}
                  className="flex items-center gap-1 bg-lime text-black px-2 py-1 rounded text-[10px] font-bold"
                >
                  <Plus size={12} />
                  <span>New</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
                {writeups.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWriteup(w)}
                    className={`w-full text-left p-3 rounded border transition-colors ${selectedWriteup?.id === w.id ? 'bg-[#181818] border-lime text-white' : 'bg-[#111111] border-white/5 text-ink-muted hover:text-white'}`}
                  >
                    <div className="font-bold truncate text-xs">{w.title}</div>
                    <div className="text-[10px] text-ink-faint mt-1 flex justify-between">
                      <span>/{w.slug}</span>
                      <span>{w.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Editor & Preview Area */}
            <div className="col-span-12 md:col-span-8 bg-[#0A0A0A] border border-white/10 rounded-lg p-6 space-y-4">
              {selectedWriteup ? (
                <>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setPreviewMode(!previewMode)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] border border-white/10 text-ink-muted hover:text-white"
                      >
                        {previewMode ? <Edit3 size={13} /> : <Eye size={13} />}
                        <span>{previewMode ? 'Editor' : 'Preview'}</span>
                      </button>

                      <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#141414] border border-white/10 text-ink-muted hover:text-white cursor-pointer">
                        <Upload size={13} />
                        <span>Upload Image</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={saveWriteup}
                        className="flex items-center gap-1.5 bg-lime text-black font-bold px-4 py-1.5 rounded"
                      >
                        <Save size={14} />
                        <span>Save Live</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-ink-muted uppercase block mb-1">Title</label>
                      <input 
                        type="text" 
                        value={selectedWriteup.title}
                        onChange={(e) => setSelectedWriteup({ ...selectedWriteup, title: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-ink-muted uppercase block mb-1">Slug</label>
                      <input 
                        type="text" 
                        value={selectedWriteup.slug}
                        onChange={(e) => setSelectedWriteup({ ...selectedWriteup, slug: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-ink-muted uppercase block mb-1">Summary</label>
                    <textarea 
                      rows={2}
                      value={selectedWriteup.summary}
                      onChange={(e) => setSelectedWriteup({ ...selectedWriteup, summary: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white text-xs"
                    />
                  </div>

                  {previewMode ? (
                    <div className="bg-[#050505] border border-white/10 rounded p-6 min-h-[400px]">
                      <MarkdownRenderer content={selectedWriteup.body} />
                    </div>
                  ) : (
                    <div>
                      <label className="text-[10px] text-ink-muted uppercase block mb-1">Markdown Content Body</label>
                      <textarea 
                        rows={16}
                        value={selectedWriteup.body}
                        onChange={(e) => setSelectedWriteup({ ...selectedWriteup, body: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded p-3 text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-lime"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 text-ink-faint">Select a writeup to inspect or edit.</div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-lg p-6 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase border-b border-white/10 pb-3">Edit Profile &amp; Hero</h3>
            <div>
              <label className="text-[10px] text-ink-muted uppercase block mb-1">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted uppercase block mb-1">Role Positioning</label>
              <input 
                type="text" 
                value={profile.role}
                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted uppercase block mb-1">Hero Tagline</label>
              <input 
                type="text" 
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-ink-muted uppercase block mb-1">Hero Verified Summary</label>
              <textarea 
                rows={5}
                value={profile.summary}
                onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                className="w-full bg-[#141414] border border-white/10 rounded p-2 text-white text-xs"
              />
            </div>
            <button 
              onClick={() => showStatus('Profile settings saved locally!')}
              className="bg-lime text-black font-bold px-4 py-2 rounded"
            >
              Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
