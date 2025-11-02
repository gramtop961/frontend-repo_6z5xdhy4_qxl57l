import { Sparkles, Rocket } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <Sparkles size={14} className="text-fuchsia-400" />
            AI-powered resume tailoring
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-300">
            AI Resume Optimizer
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-slate-300/90">
            Paste your resume and a job description. Get instant, ATS-friendly improvements, keyword suggestions, and quantifiable bullets tailored to the role.
          </p>

          <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
            <div className="inline-flex items-center gap-2"><Rocket size={14} className="text-cyan-400" /> Optimized for ATS</div>
            <span>•</span>
            <div>Private, runs in your browser</div>
          </div>
        </div>
      </div>
    </header>
  );
}
