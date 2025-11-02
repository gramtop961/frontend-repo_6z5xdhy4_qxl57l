import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function ActionsBar({ resumeText = '', jobText = '', onOptimized }) {
  const [loading, setLoading] = useState(false);

  const canRun = (resumeText?.trim()?.length || 0) > 0 && (jobText?.trim()?.length || 0) > 0;

  const run = async () => {
    if (!canRun) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, job_text: jobText }),
      });
      if (!res.ok) throw new Error('Failed to optimize');
      const data = await res.json();
      onOptimized?.(data);
    } catch (e) {
      console.error(e);
      alert('There was an error applying AI changes.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-slate-400">
        Click to generate an AI-tailored version with summary, keywords, and quantified bullets.
      </div>
      <button
        onClick={run}
        disabled={!canRun || loading}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition border ${
          canRun && !loading
            ? 'bg-fuchsia-600/90 hover:bg-fuchsia-600 text-white border-fuchsia-500/30'
            : 'bg-slate-800/60 text-slate-400 border-white/10 cursor-not-allowed'
        }`}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
        Apply AI Changes
      </button>
    </div>
  );
}
