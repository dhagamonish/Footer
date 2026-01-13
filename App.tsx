
import React, { useState } from 'react';
import { SignatureGenerator } from './components/SignatureGenerator';
import { SignatureData, INITIAL_DATA } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<SignatureData>(INITIAL_DATA);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1E293B] relative font-['Inter'] font-normal">
      {/* Subtle top indicator */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-blue-600 z-50 opacity-50" />

      {/* Modernist Header */}
      <header className="relative z-10 bg-white border-b border-slate-100 py-6 px-10 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-5">
          <div className="bg-slate-900 w-10 h-10 rounded-xl flex items-center justify-center">
             <span className="text-white font-normal text-lg tracking-tighter">^A</span>
          </div>
          <div>
            <h1 className="text-lg font-normal tracking-tighter leading-none flex items-center gap-1">
              CONTROL <span className="text-blue-600">+</span> A
            </h1>
            <p className="text-[9px] text-slate-400 font-normal uppercase tracking-[0.25em] mt-1.5">Asset Deployment Studio</p>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
           <div className="text-right">
             <p className="text-[9px] font-normal text-slate-300 uppercase tracking-widest">Protocol Status</p>
             <p className="text-xs font-normal text-green-500 flex items-center gap-2 justify-end">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 opacity-60" />
               OPTIMIZED
             </p>
           </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl font-normal tracking-tight text-slate-900 mb-6 leading-tight">
            Systems that <span className="text-blue-600">just work.</span>
          </h2>
          <p className="text-base text-slate-500 font-normal leading-relaxed">
            Refine your professional identity with our high-fidelity signature tool. 
            Designed for clarity, engineered for performance.
          </p>
        </div>
        
        <SignatureGenerator data={data} setData={setData} />
      </main>
      
      <footer className="relative z-10 border-t border-slate-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-normal text-slate-400 uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} ControlplusA &bull; Systems Intelligence
          </p>
          <div className="flex gap-10">
            <span className="text-[10px] font-normal text-slate-300 uppercase tracking-widest cursor-default">Privacy</span>
            <span className="text-[10px] font-normal text-slate-300 uppercase tracking-widest cursor-default">Terms</span>
            <span className="text-[10px] font-normal text-slate-300 uppercase tracking-widest cursor-default">Systems</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
