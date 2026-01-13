
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SignatureData } from '../types';
import { EmailSignatureTemplate } from './EmailSignatureTemplate';

interface Props {
  data: SignatureData;
  setData: (data: SignatureData) => void;
}

export const SignatureGenerator: React.FC<Props> = ({ data, setData }) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'social'>('identity');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackground = async () => {
    if (!data.logoUrl || !data.logoUrl.startsWith('data:')) {
      alert("Please upload an image first to remove its background.");
      return;
    }

    setIsProcessing(true);
    setCopyStatus("Isolating Key Icon...");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = data.logoUrl.split(',')[1];
      const mimeType = data.logoUrl.split(';')[0].split(':')[1];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: "Extract the central keyboard key icon (the square part with '^A'). REMOVE all background pixels. IMPORTANT: DO NOT use a checkerboard, grid, or 'transparency pattern' (gray/white squares). The output must be the isolated icon on a PURE TRANSPARENT background. If true transparency is unavailable, use a SOLID WHITE background. Return only the extracted icon.",
            },
          ],
        },
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const newBase64 = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          setData({ ...data, logoUrl: newBase64 });
          setCopyStatus("Icon Isolated!");
          break;
        }
      }
    } catch (error) {
      console.error("Error removing background:", error);
      setCopyStatus("Failed to process.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => setCopyStatus(null), 3000);
    }
  };

  const handleCopy = async (type: 'rich' | 'html') => {
    if (!signatureRef.current) return;

    try {
      if (type === 'rich') {
        const html = signatureRef.current.innerHTML;
        const blob = new Blob([html], { type: "text/html" });
        await navigator.clipboard.write([new ClipboardItem({ "text/html": blob })]);
        setCopyStatus('Signature Copied!');
      } else {
        await navigator.clipboard.writeText(signatureRef.current.innerHTML);
        setCopyStatus('HTML Source Ready!');
      }
      setTimeout(() => setCopyStatus(null), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Editor Panel */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="flex bg-slate-50 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('identity')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            01. Identity
          </button>
          <button 
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'social' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-slate-400'}`}
          >
            02. Social & Links
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
              <div className="group">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Brand Logo</label>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-slate-100 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Upload Logo
                  </button>
                  <button 
                    onClick={removeBackground}
                    disabled={isProcessing}
                    className={`px-4 py-2 ${isProcessing ? 'bg-blue-100 text-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700'} text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2`}
                  >
                    {isProcessing ? 'Isolating...' : 'Magic Clear'}
                  </button>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>
              <InputGroup label="Website" name="website" value={data.website} onChange={handleChange} />
              <InputGroup label="Connect CTA URL" name="connectUrl" value={data.connectUrl} onChange={handleChange} />
              <InputGroup label="Social Handles (Shared)" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="/bycontrolplusa" />
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 lg:p-10 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] border border-slate-100 shadow-2xl shadow-slate-200/40">
          <div className="absolute top-6 left-8 flex items-center justify-between w-full pr-16">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">Brand Identity Deployment</h3>
            {copyStatus && (
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest animate-pulse">{copyStatus}</span>
            )}
          </div>
          
          <div className="overflow-x-auto w-full max-w-full flex justify-center py-4 px-4">
            <div ref={signatureRef} className="inline-block transform scale-[0.8] sm:scale-90 lg:scale-100 origin-center bg-white shadow-sm p-8 rounded-lg border border-slate-50">
              <EmailSignatureTemplate data={data} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleCopy('rich')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
          >
            Copy For Gmail/Outlook
          </button>
          <button
            onClick={() => handleCopy('html')}
            className="flex-1 bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest"
          >
            Get HTML Source
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, placeholder }: any) => (
  <div className="group">
    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 group-focus-within:text-blue-600 transition-colors">
      {label}
    </label>
    <input
      name={name}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-600 transition-all text-sm font-semibold text-slate-900"
    />
  </div>
);
