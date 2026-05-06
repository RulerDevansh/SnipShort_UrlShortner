import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';
import { useToast } from '../context/ToastContext';
import Loader from './Loader';
import { copyToClipboard } from '../utils/helpers';

export default function GuestShortenForm() {
  const { toast } = useToast();
  const [url, setUrl]         = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [guestLink, setGuestLink] = useState(null);

  // Load existing guest link from local storage
  useEffect(() => {
    const saved = localStorage.getItem('snip_guest_link');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Check if it's still valid (24h)
        if (new Date(parsed.expires_at) > new Date()) {
          setGuestLink(parsed);
        } else {
          localStorage.removeItem('snip_guest_link');
        }
      } catch (e) {
        localStorage.removeItem('snip_guest_link');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!url.trim()) { setError('Please enter a URL.'); return; }

    setLoading(true);
    try {
      const res = await linkService.createPublic({ original_url: url.trim() });
      const newLink = res.data.link;
      
      setGuestLink(newLink);
      localStorage.setItem('snip_guest_link', JSON.stringify(newLink));
      toast.success('Temporary link created!');
      setUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(guestLink.short_url);
    toast.success('Copied!');
  };

  if (guestLink) {
    return (
      <div className="animate-slide-up">
        <div className="card p-5 border-brand-500/30 bg-brand-500/5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-0 text-left w-full">
              <p className="text-[10px] uppercase tracking-widest text-brand-400 font-bold mb-1">Your Temporary Link (Valid 24h)</p>
              <a
                href={guestLink.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold text-lg hover:text-brand-400 transition-colors break-all"
              >
                {guestLink.short_url.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={handleCopy} className="btn-primary flex-1 sm:flex-initial py-2.5">
                Copy
              </button>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-3 text-center sm:text-left">
            Guest limit reached. <span className="text-gray-400">Sign in to create unlimited permanent links.</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-in">
      <div className="card p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            className={`input flex-1 ${error ? 'input-error' : ''}`}
            placeholder="Paste a link to shorten temporarily..."
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(''); }}
            required
          />
          <button type="submit" className="btn-primary px-8 py-3 shrink-0" disabled={loading}>
            {loading ? <Loader size="sm" /> : 'Shorten'}
          </button>
        </div>
        
        {error && (
          <p className="text-xs text-red-400 text-left ml-1 flex items-center gap-1.5">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>
            </svg>
            {error}
          </p>
        )}

        <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-medium">
          No account needed · Valid for 24 hours · Limit 1 per guest
        </p>
      </div>
    </form>
  );
}
