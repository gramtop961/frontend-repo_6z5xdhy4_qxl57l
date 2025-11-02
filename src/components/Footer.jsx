export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Built with love for job seekers. This preview runs entirely in your browser.
          </div>
          <div className="text-slate-500">
            Tip: For production, connect a backend to parse PDF/DOCX and use advanced NLP.
          </div>
        </div>
      </div>
    </footer>
  );
}
