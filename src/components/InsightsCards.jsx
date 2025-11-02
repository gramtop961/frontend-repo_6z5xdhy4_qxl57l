import { CheckCircle2, AlertTriangle, Hash } from 'lucide-react';

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

function topMissingKeywords(resume, job, limit = 10) {
  const r = new Set(tokenize(resume));
  const j = tokenize(job);
  const freq = {};
  for (const w of j) {
    if (w.length < 3) continue;
    if (!r.has(w)) freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([w]) => w);
}

function matchScore(resume, job) {
  const r = new Set(uniqueWords(tokenize(resume)));
  const j = uniqueWords(tokenize(job));
  if (j.length === 0) return 0;
  const overlap = j.filter((w) => r.has(w)).length;
  return Math.round((overlap / j.length) * 100);
}

function atsTips(resume) {
  const text = (resume || '').toLowerCase();
  const tips = [];
  if (/\t| {2,}/.test(resume) || /\u00A0/.test(resume)) tips.push('Simplify formatting. Avoid tabs or multiple spaces.');
  if (/(jpg|png|svg|gif)/.test(text)) tips.push('Avoid embedding key information inside images.');
  if (!/\bexperience\b|\bwork history\b/.test(text)) tips.push('Add a clear “Experience” or “Work History” section.');
  if (!/\beducation\b/.test(text)) tips.push('Include an “Education” section with degree and institution.');
  if (!/\bskills\b/.test(text)) tips.push('Add a “Skills” section listing your core tools and technologies.');
  if (!/\b(achieved|improved|reduced|increased|optimized|launched|led|built|delivered)\b/.test(text)) tips.push('Use action verbs and quantify outcomes (e.g., “increased conversion by 18%”).');
  return tips.slice(0, 4);
}

export default function InsightsCards({ resumeText = '', jobText = '' }) {
  const score = matchScore(resumeText, jobText);
  const missing = topMissingKeywords(resumeText, jobText, 8);
  const tips = atsTips(resumeText);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="text-sm font-medium text-slate-300 mb-2">Match score</div>
        <div className="flex items-end justify-between">
          <div className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">{score}%</div>
          <CheckCircle2 className={`h-6 w-6 ${score > 60 ? 'text-emerald-400' : 'text-slate-400'}`} />
        </div>
        <p className="mt-3 text-xs text-slate-400">
          This is a rough overlap of keywords between your resume and the job description.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
          <Hash size={16} className="text-cyan-400" /> Missing keywords
        </div>
        {missing.length ? (
          <div className="flex flex-wrap gap-2">
            {missing.map((k) => (
              <span key={k} className="inline-flex items-center rounded-full border border-white/10 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-200">
                {k}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-xs text-slate-400">Add a job description to see suggested keywords.</div>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
          <AlertTriangle size={16} className="text-amber-400" /> ATS tips
        </div>
        <ul className="list-disc list-inside text-xs text-slate-300/90 space-y-1">
          {tips.length ? tips.map((t, i) => <li key={i}>{t}</li>) : (
            <li>Paste your resume to get formatting guidance.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
