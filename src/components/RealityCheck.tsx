import React, { useState } from "react";
import { ArrowLeft, Share2, Heart, ChevronRight, Check } from "lucide-react";
import { ScanReport } from "../types";

interface RealityCheckProps {
  report: ScanReport;
  onBack: () => void;
}

// Custom Gift Ribbon vector drawing in pure CSS
function BigAnimatedGiftBox() {
  return (
    <div className="relative w-28 h-28 mx-auto my-6 flex items-center justify-center animate-bounce">
      {/* Gift Box container */}
      <div className="absolute w-24 h-24 bg-gradient-to-tr from-red-600 via-rose-500 to-red-500 rounded-2xl shadow-2xl relative border border-rose-300 flex items-center justify-center overflow-hidden">
        {/* Ribbon bands */}
        <div className="absolute inset-y-0 w-4 bg-yellow-400"></div>
        <div className="absolute inset-x-0 h-4 bg-yellow-400"></div>
        
        {/* Shiny highlights */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
      </div>
      
      {/* Box Lid ribbon curl */}
      <div className="absolute -top-3 w-16 h-8 bg-yellow-500 rounded-full border border-yellow-300 flex items-center justify-center shadow-md">
        <div className="w-8 h-4 bg-rose-500 rounded-full"></div>
      </div>
    </div>
  );
}

export default function RealityCheck({ report, onBack }: RealityCheckProps) {
  // Step navigation inside reality views:
  // "intro" (Screen 9: Present box introduce)
  // "dog" (Screen 10: Expectation vs Reality dog)
  // "joey" (Screen 11: Shocked Joey meme face)
  // "cat" (Screen 12: Sad Cat Tom conclusion)
  const [realityStep, setRealityStep] = useState<"intro" | "dog" | "joey" | "cat">("intro");
  
  // Toolbar states
  const [isSaved, setIsSaved] = useState(false);
  const [isSavedJoey, setIsSavedJoey] = useState(false);
  const [isSavedCat, setIsSavedCat] = useState(false);
  
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard.writeText(`Wow, the truth is out! I just scanned "${report.productName}" and discovered the real truth. #RealityCheck`);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Render Screen 9: Present Box Intro
  if (realityStep === "intro") {
    return (
      <div className="flex flex-col justify-between w-full max-w-[380px] min-h-[580px] mx-auto px-5 py-6 bg-black text-white relative rounded-[2.5rem] border-8 border-gray-900 shadow-2xl font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Reality Reveal</span>
          <div className="w-8"></div>
        </div>

        {/* Gift Box Illustration Centered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <BigAnimatedGiftBox />

          {/* Introducing Banner */}
          <div className="space-y-1.5">
            <span className="text-[10px] text-[#bef264] font-mono tracking-widest uppercase font-black block">Introducing...</span>
            <h1 className="font-sans font-black text-2xl tracking-tight text-white uppercase leading-none">
              THE REALITY CHECK!
            </h1>
            <p className="text-gray-400 text-[11px] max-w-[240px] leading-relaxed mx-auto mt-2 text-left font-sans font-light">
              Here is how this product actually makes us feel. No marketing filters, just 100% unfiltered physical reality!
            </p>
          </div>
        </div>

        {/* Primary CTA Reveal Now button */}
        <button
          id="btn-trigger-reality-now"
          onClick={() => setRealityStep("dog")}
          className="w-full py-4 text-black bg-[#bef264] hover:bg-[#bef264]/90 font-sans font-black text-xs tracking-tight rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all block text-center"
        >
          Reveal Now
        </button>
      </div>
    );
  }

  // Render Screen 10: Expectation vs Reality Dog
  if (realityStep === "dog") {
    return (
      <div className="flex flex-col justify-between w-full max-w-[380px] min-h-[580px] mx-auto px-5 py-6 bg-black text-white relative rounded-[2.5rem] border-8 border-gray-900 shadow-2xl font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setRealityStep("intro")}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Reality Reveal</span>
          {/* Progress Indicators dots */}
          <span className="font-mono text-[10px] text-gray-500 font-bold">1/3</span>
        </div>

        {/* Expectation / Reality double layout panels */}
        <div className="flex-1 space-y-3 pt-2 pb-3 overflow-y-auto max-h-[352px] pr-1">
          
          {/* Expectation */}
          <div className="bg-[#11161d] border border-gray-800 rounded-3xl overflow-hidden relative shadow-inner">
            {/* Playful Golden Retriever */}
            <div className="relative h-28 w-full bg-slate-900 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80"
                alt="Happy puppy"
                className="w-full h-full object-cover filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#bef264] text-black text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase">
                Expectation
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] text-white/60 font-mono italic">(What They Show)</span>
            </div>
            {/* Little layout chip packaging image inside expectation to emulate visual mockup */}
            <div className="absolute bottom-2 left-2 w-10 h-10 border border-yellow-400 bg-yellow-400/95 flex items-center justify-center rounded-md scale-75 shadow-md">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            </div>
          </div>

          {/* Reality */}
          <div className="bg-[#11161d] border border-gray-800 rounded-3xl overflow-hidden relative shadow-inner">
            {/* Sad pup */}
            <div className="relative h-28 w-full bg-slate-900 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&auto=format&fit=crop&q=80"
                alt="Sad puppy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#f43f5e] text-white text-[8px] font-black font-mono px-2 py-0.5 rounded uppercase">
                Reality
              </div>
              <span className="absolute bottom-1 right-2 text-[8px] text-white/60 font-mono italic">(What You Get)</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-gray-300 font-sans tracking-tight">
              Looks good on the outside, not so much inside. <span className="text-sm">😟</span>
            </p>
          </div>
        </div>

        {/* Save and Share action toolbar bar */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button
            onClick={handleCopyLink}
            className="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            {copiedLink ? <Check size={12} className="text-[#bef264]" /> : <Share2 size={12} />}
            <span>{copiedLink ? "Copied" : "Share"}</span>
          </button>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`py-2.5 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              isSaved ? "bg-[#bef264]/10 text-[#bef264]" : "bg-neutral-900 hover:bg-neutral-800 text-gray-300"
            }`}
          >
            <Heart size={12} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>

        {/* Go to Next meme card */}
        <button
          onClick={() => setRealityStep("joey")}
          className="w-full mt-4 py-3 text-black bg-[#bef264] hover:bg-[#bef264]/90 font-sans font-black text-xs tracking-tight rounded-xl flex items-center justify-center gap-1 shadow-lg"
        >
          <span>Next Reality Check</span>
          <ChevronRight size={14} className="stroke-[3]" />
        </button>
      </div>
    );
  }

  // Render Screen 11: Shocked Joey Meme Face
  if (realityStep === "joey") {
    return (
      <div className="flex flex-col justify-between w-full max-w-[380px] min-h-[580px] mx-auto px-5 py-6 bg-black text-white relative rounded-[2.5rem] border-8 border-gray-900 shadow-2xl font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full font-sans">
          <button
            onClick={() => setRealityStep("dog")}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Reality Reveal</span>
          <span className="font-mono text-[10px] text-gray-500 font-bold">2/3</span>
        </div>

        {/* Shocked Joey Face Meme container box */}
        <div className="flex-1 flex flex-col justify-center space-y-3.5 pt-2 pb-3">
          
          <div className="bg-[#11161d] border border-gray-800 rounded-3xl overflow-hidden relative shadow-inner p-3 text-center space-y-3">
            
            <div className="relative h-44 w-full bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center">
              {/* Surprised expression actor representing Joey's "That's what I'm eating?!" */}
              <img
                src="https://images.unsplash.com/photo-1541560052-5e137f229371?w=400&auto=format&fit=crop&q=80"
                alt="Surprised reaction face"
                className="w-full h-full object-cover filter contrast-125 brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/75 px-3 py-1.5 rounded-xl border border-gray-800">
                <span className="font-sans font-black text-xs tracking-tight text-white uppercase block">
                  THAT'S WHAT I'M EATING?!
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-300 font-sans font-light leading-relaxed px-2">
              The truth is bitter, but your health matters. <span className="text-sm">😟</span>
            </p>
          </div>

        </div>

        {/* Target Share & Save */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyLink}
            className="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
          >
            <Share2 size={12} />
            <span>Share</span>
          </button>
          
          <button
            onClick={() => setIsSavedJoey(!isSavedJoey)}
            className={`py-2.5 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              isSavedJoey ? "bg-[#bef264]/10 text-[#bef264]" : "bg-neutral-900 hover:bg-neutral-800 text-gray-300"
            }`}
          >
            <Heart size={12} fill={isSavedJoey ? "currentColor" : "none"} />
            <span>{isSavedJoey ? "Saved" : "Save"}</span>
          </button>
        </div>

        {/* Go to cat meme */}
        <button
          onClick={() => setRealityStep("cat")}
          className="w-full mt-4 py-3 text-black bg-[#bef264] hover:bg-[#bef264]/90 font-sans font-black text-xs tracking-tight rounded-xl flex items-center justify-center gap-1 shadow-lg"
        >
          <span>Next Reality Check</span>
          <ChevronRight size={14} className="stroke-[3]" />
        </button>
      </div>
    );
  }

  // Render Screen 12: Sad Crying Cartoon Cat Tom Conclusion Screen
  return (
    <div className="flex flex-col justify-between w-full max-w-[380px] min-h-[580px] mx-auto px-5 py-6 bg-black text-white relative rounded-[2.5rem] border-8 border-gray-900 shadow-2xl font-sans font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between w-full font-sans">
        <button
          onClick={() => setRealityStep("joey")}
          className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200 font-semibold">Reality Reveal</span>
        <span className="font-mono text-[10px] text-gray-500 font-bold">3/3</span>
      </div>

      {/* Cat Crying Cartoon Layout */}
      <div className="flex-1 flex flex-col justify-center space-y-3.5 pt-2 pb-3">
        
        <div className="bg-[#11161d] border border-gray-800 rounded-3xl overflow-hidden relative shadow-inner p-3 text-center space-y-3">
          
          <div className="relative h-44 w-full bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center">
            {/* Sad grey tomcat equivalent from cartoon looking depressed */}
            <img
              src="https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=400&auto=format&fit=crop&q=80"
              alt="Deeply sad cat"
              className="w-full h-full object-cover filter saturate-50 contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 px-3 py-1.5 rounded-xl border border-gray-800">
              <span className="font-sans font-black text-[10px] tracking-wide text-white uppercase block">
                At least now you know the truth.
              </span>
            </div>
          </div>

          <p className="text-[11px] text-gray-300 font-sans tracking-tight">
            Knowledge is power. Choose better alternatives. <span className="text-sm">😏</span>
          </p>
        </div>

      </div>

      {/* Target Share & Save */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleCopyLink}
          className="py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all"
        >
          <Share2 size={12} />
          <span>Share</span>
        </button>
        
        <button
          onClick={() => setIsSavedCat(!isSavedCat)}
          className={`py-2.5 text-[10px] font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            isSavedCat ? "bg-[#bef264]/10 text-[#bef264]" : "bg-neutral-900 hover:bg-neutral-800 text-gray-300"
          }`}
        >
          <Heart size={12} fill={isSavedCat ? "currentColor" : "none"} />
          <span>{isSavedCat ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Close and exit Reality Check */}
      <button
        onClick={onBack}
        className="w-full mt-4 py-3 text-black bg-[#bef264] hover:bg-[#bef264]/90 font-sans font-black text-xs tracking-tight rounded-xl flex items-center justify-center gap-1 shadow-lg"
      >
        <span>Close Reality Check</span>
      </button>
    </div>
  );
}
