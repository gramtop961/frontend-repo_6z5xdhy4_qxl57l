import { useState } from 'react';
import Header from './components/Header.jsx';
import UploadForm from './components/UploadForm.jsx';
import InsightsCards from './components/InsightsCards.jsx';
import SuggestionsPanel from './components/SuggestionsPanel.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        <section className="mt-8">
          <UploadForm
            onUpdate={(data) => {
              if (typeof data.resumeText === 'string') setResumeText(data.resumeText);
              if (typeof data.jobText === 'string') setJobText(data.jobText);
            }}
          />
        </section>

        <section className="mt-10">
          <InsightsCards resumeText={resumeText} jobText={jobText} />
        </section>

        <section className="mt-10">
          <SuggestionsPanel resumeText={resumeText} jobText={jobText} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
