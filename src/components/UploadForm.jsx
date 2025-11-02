import { useState } from 'react';
import { Upload, FileText, Briefcase } from 'lucide-react';

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export default function UploadForm({ onUpdate }) {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  const handleFile = async (file) => {
    setResumeFileName(file?.name || '');
    const ext = file?.name?.split('.').pop()?.toLowerCase();
    if (ext === 'txt' || ext === 'md') {
      try {
        const text = await readTextFile(file);
        setResumeText(text);
        onUpdate?.({ resumeText: text, jobText });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur shadow-2xl shadow-black/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
            <FileText size={16} className="text-fuchsia-400" />
            Your resume
          </label>

          <div className="flex items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800/60 transition">
              <Upload size={16} /> Upload (.txt/.md)
              <input
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </label>
            {resumeFileName ? (
              <span className="text-xs text-slate-400 truncate">{resumeFileName}</span>
            ) : null}
          </div>

          <textarea
            className="mt-3 h-48 w-full resize-y rounded-lg border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
            placeholder="Or paste your resume text here..."
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              onUpdate?.({ resumeText: e.target.value, jobText });
            }}
          />

          <p className="mt-2 text-xs text-slate-400/90">
            Tip: For the best results, paste your resume text. PDF/DOCX extraction requires a backend processor and isn't enabled in this preview.
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
            <Briefcase size={16} className="text-cyan-400" />
            Job description
          </label>
          <textarea
            className="h-64 w-full resize-y rounded-lg border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            placeholder="Paste the target job description here..."
            value={jobText}
            onChange={(e) => {
              setJobText(e.target.value);
              onUpdate?.({ resumeText, jobText: e.target.value });
            }}
          />
          <div className="mt-3 text-xs text-slate-400">
            Your text stays in your browser. No files are uploaded.
          </div>
        </div>
      </div>
    </div>
  );
}
