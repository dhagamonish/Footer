
import React, { useState } from 'react';
import { SignatureGenerator } from './components/SignatureGenerator';
import { SignatureData, INITIAL_DATA } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<SignatureData>(INITIAL_DATA);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative">
      {/* Decorative Brand Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-600 z-50" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1E40AF 1px, transparent 0)', backgroundSize: '48px 48px' }} />

      {/* Modernist Header */}
      <header className="relative z-10 bg-white border-b border-slate-200 py-6 px-10 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-5">
          <div className="bg-slate-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl shadow-slate-900/10">
             <span className="text-white font-black text-xl tracking-tighter">^A</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none flex items-center gap-1">
              CONTROL <span className="text-blue-600">+</span> A
            </h1>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5">Asset Deployment Studio</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
           <div className="text-right">
             <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Protocol Status</p>
             <p className="text-xs font-bold text-green-500 flex items-center gap-2 justify-end">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               OPTIMIZED
             </p>
           </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-6 leading-[0.9]">
            Systems that <span className="text-blue-600">just work.</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Generate and deploy your professional identity with our high-fidelity signature tool. 
            Engineered for performance, designed for clarity.
          </p>
        </div>
        
        <SignatureGenerator data={data} setData={setData} />
      </main>
      
      <footer className="relative z-10 border-t border-slate-200 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} ControlplusA &bull; Systems Intelligence
          </p>
          <div className="flex gap-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-default hover:text-blue-600 transition-colors">Privacy</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-default hover:text-blue-600 transition-colors">Terms</span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-default hover:text-blue-600 transition-colors">Systems</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
