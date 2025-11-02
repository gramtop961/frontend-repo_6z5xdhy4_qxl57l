import { useMemo } from 'react';
import { Wand2, Copy } from 'lucide-react';

function tokenize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function uniqueWords(words) {
  return Array.from(new Set(words));
}

function deriveSuggestions(resumeText, jobText) {
  const r = new Set(uniqueWords(tokenize(resumeText)));
  const j = uniqueWords(tokenize(jobText));
  const missing = j.filter((w) => w.length > 2 && !r.has(w)).slice(0, 8);

  const bullets = missing.map((kw) => `• Drove ${kw}-focused initiative that improved a key KPI by 12–25% within 2 quarters.`);

  const summary = `Experienced professional aligning to the role with emphasis on ${missing.slice(0,4).join(', ') || 'role-aligned capabilities'}. Proven record of shipping impact with clear metrics.`;

  const skillsLine = missing.length ? `Incorporate these terms naturally: ${missing.join(', ')}.` : 'Highlight core skills and tools relevant to this role.';

  return { bullets, summary, skillsLine };
}

export default function SuggestionsPanel({ resumeText = '', jobText = '' }) {
  const data = useMemo(() => deriveSuggestions(resumeText, jobText), [resumeText, jobText]);

  const copyBlock = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard');
    } catch (e) {
      console.error(e);
    }
  };

  const assembled = `${data.summary}\n\nKey impact bullets:\n${data.bullets.join('\n')}\n\n${data.skillsLine}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
          <Wand2 size={18} className="text-fuchsia-400" /> Tailored rewrite suggestions
        </div>
        <button
          onClick={() => copyBlock(assembled)}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800/60 transition"
        >
          <Copy size={14} /> Copy all
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Professional Summary</div>
          <p className="text-sm text-slate-100/90 leading-relaxed">{data.summary}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Keywords to weave in</div>
          <p className="text-sm text-slate-100/90 leading-relaxed">{data.skillsLine}</p>
        </div>

        <div className="md:col-span-2 rounded-lg border border-white/10 bg-slate-950/40 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">Impact bullets</div>
          <ul className="space-y-1 text-sm text-slate-100/90">
            {data.bullets.length ? data.bullets.map((b, i) => <li key={i}>{b}</li>) : (
              <li>Provide a job description to generate tailored bullet points.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
