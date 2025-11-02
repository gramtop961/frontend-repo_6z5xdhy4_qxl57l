import { Download } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

async function downloadFile({ format, optimizedText, filename = 'optimized_resume' }) {
  const res = await fetch(`${API_BASE}/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ format, optimized_text: optimizedText, filename }),
  });
  if (!res.ok) throw new Error('Download failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Downloads({ optimizedText = '' }) {
  const disabled = (optimizedText?.trim()?.length || 0) === 0;

  const btn = (fmt, label) => (
    <button
      key={fmt}
      disabled={disabled}
      onClick={() => downloadFile({ format: fmt, optimizedText })}
      className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition ${
        disabled
          ? 'bg-slate-800/60 text-slate-400 border-white/10 cursor-not-allowed'
          : 'bg-slate-900/60 hover:bg-slate-800/60 text-slate-200 border-white/10'
      }`}
    >
      <Download className="h-4 w-4" /> {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-200">Download your tailored resume</div>
        <div className="flex flex-wrap gap-2">
          {btn('txt', 'TXT')}
          {btn('md', 'Markdown')}
          {btn('pdf', 'PDF')}
          {btn('docx', 'DOCX')}
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-400">Generate with AI first, then export to your preferred format.</p>
    </div>
  );
}
