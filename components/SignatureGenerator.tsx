
import React, { useState, useRef } from 'react';
import { SignatureData } from '../types';
import { EmailSignatureTemplate } from './EmailSignatureTemplate';

interface Props {
  data: SignatureData;
  setData: (data: SignatureData) => void;
}

export const SignatureGenerator: React.FC<Props> = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'social'>('identity');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCopy = async (type: 'rich' | 'html') => {
    if (!signatureRef.current) return;

    try {
      if (type === 'rich') {
        const html = signatureRef.current.innerHTML;
        const blob = new Blob([html], { type: "text/html" });
        await navigator.clipboard.write([new ClipboardItem({ "text/html": blob })]);
        setCopyStatus('Ready to paste!');
      } else {
        await navigator.clipboard.writeText(signatureRef.current.innerHTML);
        setCopyStatus('HTML copied!');
      }
      setTimeout(() => setCopyStatus(null), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Editor Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="flex bg-slate-50 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('identity')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            01. Personal
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'social' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            02. Social & conversion
          </button>
        </div>

        <div className="p-8 space-y-6">
          {activeTab === 'identity' ? (
            <div className="space-y-4">
              <InputGroup label="Full Name" name="fullName" value={data.fullName} onChange={handleChange} />
              <InputGroup label="Job Title" name="jobTitle" value={data.jobTitle} onChange={handleChange} />
              <InputGroup label="Email Address" name="email" value={data.email} onChange={handleChange} />
              <InputGroup label="Tagline" name="tagline" value={data.tagline} onChange={handleChange} />
            </div>
          ) : (
            <div className="space-y-4">
              <InputGroup label="Connect Link (CTA)" name="connectUrl" value={data.connectUrl} onChange={handleChange} />
              <InputGroup label="LinkedIn" name="linkedin" value={data.linkedin} onChange={handleChange} />
              <InputGroup label="Twitter / X" name="twitter" value={data.twitter} onChange={handleChange} />
              <InputGroup label="Instagram" name="instagram" value={data.instagram} onChange={handleChange} />
              <InputGroup label="Website" name="website" value={data.website} onChange={handleChange} />
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-16 shadow-2xl shadow-blue-500/5 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[48px] flex items-center justify-center">
            <span className="text-blue-600 font-black text-sm">^A</span>
          </div>

          <div className="mb-12 w-full flex items-center justify-between">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">High-Fidelity Preview</h3>
            {copyStatus && (
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest animate-pulse">{copyStatus}</span>
            )}
          </div>
          
          <div className="overflow-x-auto w-full flex justify-center">
            <div ref={signatureRef} className="inline-block bg-white p-4">
              <EmailSignatureTemplate data={data} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleCopy('rich')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
          >
            Copy for Email Client
          </button>
          <button
            onClick={() => handleCopy('html')}
            className="flex-1 bg-slate-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
          >
            Copy HTML Code
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange }: any) => (
  <div className="group">
    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    <input
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all text-sm font-semibold text-slate-900"
    />
  </div>
);
