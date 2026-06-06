import React, { useState } from "react";
import { Camera, Upload, Keyboard, Zap, Sparkles, HelpCircle, ArrowLeft, Menu, RefreshCw } from "lucide-react";
import { PRESET_OPTIONS } from "../mockData";

interface ScannerProps {
  onScanComplete: (presetId: string, customText?: string, customName?: string) => void;
  isLoading: boolean;
  subStep?: "landing" | "camera";
  setSubStep?: (step: "landing" | "camera") => void;
}

// Reusable CSS Chips bag illustrations that match Lay's representation perfectly
export function ClassicChipsBag({ pulsingLaser = false, redLaser = false }) {
  return (
    <div className="relative w-40 h-52 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded-2xl shadow-xl flex flex-col justify-between p-4 overflow-hidden border border-yellow-200">
      {/* Glossy shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"></div>
      
      {/* Lay's Brand Red Logo Badge */}
      <div className="mx-auto mt-6 w-16 h-16 rounded-full bg-[#f43f5e] border-2 border-yellow-300 shadow-md flex items-center justify-center relative">
        <div className="absolute inset-1.5 rounded-full border border-yellow-200/30"></div>
        <span className="font-sans font-black text-white text-[15px] uppercase tracking-tight italic drop-shadow-md">Lay's</span>
      </div>
      
      {/* Potato crisps label */}
      <div className="flex flex-col items-center">
        <span className="font-sans font-black text-[10px] tracking-widest text-[#78350f] uppercase">
          Classic
        </span>
        <span className="font-sans font-medium text-[8px] text-yellow-900 uppercase tracking-tight">
          Potato Chips
        </span>
      </div>

      {/* Mini crisps drawings */}
      <div className="flex gap-1 justify-center mb-1">
        <div className="w-8 h-5 bg-[#fef08a] rounded-full border border-[#fde047] rotate-12 -mr-1 shadow-sm"></div>
        <div className="w-8 h-5 bg-[#fde047] rounded-full border border-[#facca1] -rotate-12 shadow-sm"></div>
      </div>
      
      {/* Pulsing scanning Laser line */}
      {pulsingLaser && (
        <div className="absolute inset-x-0 h-1 bg-[#4ade80] shadow-[0_0_12px_#22c55e] animate-bounce top-[42%]"></div>
      )}
      {redLaser && (
        <div className="absolute inset-x-0 h-1 bg-red-500 shadow-[0_0_12px_#ef4444] animate-pulse top-1/2"></div>
      )}
    </div>
  );
}

// Mini cans for background illustration
export function MiniBeverageCan({ color = "blue" }) {
  const gradient = color === "blue" 
    ? "from-sky-700 via-blue-500 to-navy-950 border-sky-400" 
    : "from-rose-700 via-red-500 to-amber-950 border-rose-400";
  return (
    <div className={`w-14 h-32 bg-gradient-to-b ${gradient} rounded-xl border opacity-50 shadow-md relative overflow-hidden flex flex-col justify-between p-2`}>
      <div className="w-full h-1 bg-gray-300 rounded-sm opacity-50"></div>
      <div className="font-mono text-[7px] text-white/50 text-center tracking-widest rotate-90 uppercase">
        REFRESHING
      </div>
      <div className="w-full h-1 bg-gray-300 rounded-sm opacity-50"></div>
    </div>
  );
}

export default function Scanner({ onScanComplete, isLoading, subStep: externalSubStep, setSubStep: externalSetSubStep }: ScannerProps) {
  // Scanner state step: "landing" (Screen 1) | "camera" (Screen 2)
  const [localSubStep, setLocalSubStep] = useState<"landing" | "camera">("landing");
  const [useCustomText, setUseCustomText] = useState(false);
  const [ingredientsText, setIngredientsText] = useState("");
  const [customName, setCustomName] = useState("");
  const [flashlight, setFlashlight] = useState(false);

  const subStep = externalSubStep !== undefined ? externalSubStep : localSubStep;
  const setSubStep = externalSetSubStep !== undefined ? externalSetSubStep : setLocalSubStep;

  const handleScanProductBtnClick = () => {
    setSubStep("camera");
  };

  const handleTriggerShutter = () => {
    // Shutter clicks potato chips preset trigger
    onScanComplete("classic-crispy-slices");
  };

  const handlePresetSelect = (presetId: string) => {
    onScanComplete(presetId);
  };

  const handleCustomSubmit = () => {
    if (!ingredientsText.trim()) return;
    onScanComplete("custom", ingredientsText, customName || "Scanned Label Commodity");
  };

  if (subStep === "landing") {
    // Render Screen 1: Scan. Analyze. Reveal. Landing Page
    return (
      <div className="flex flex-col items-center justify-between w-full min-h-full px-5 py-4 bg-black text-white relative">
        
        {/* Top Status Indicators bar */}
        <div className="flex items-center justify-between w-full mb-4 px-1">
          <Menu size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <span className="text-[10px] text-amber-400">👑</span>
            <span className="text-[9px] font-mono tracking-widest text-amber-400">PREMIUM</span>
          </div>
        </div>

        {/* Text Header info */}
        <div className="w-full mt-2 mb-4">
          <h1 className="text-4xl text-left font-extrabold tracking-tight leading-none text-white font-sans flex flex-col gap-0.5">
            <span>Scan.</span>
            <span>Analyze.</span>
            <span className="text-[#bef264] font-black">Reveal.</span>
          </h1>
          <p className="text-gray-400 text-xs mt-3 font-medium">
            The truth is in the ingredients.
          </p>
        </div>

        {/* Product Illustration area with vertical scanning laser */}
        <div className="relative w-full h-56 my-4 flex items-center justify-center gap-4">
          {/* Coca/Beverage Cans on sides to resemble PNG graphic */}
          <div className="absolute left-2 -rotate-12 translate-y-3 scale-90 blur-[1px]">
            <MiniBeverageCan color="blue" />
          </div>

          {/* Central Lay's bag illustrated */}
          <div className="z-10 scale-105 filter drop-shadow-2xl">
            <ClassicChipsBag pulsingLaser={true} />
          </div>

          <div className="absolute right-2 rotate-12 translate-y-3 scale-90 blur-[1px]">
            <MiniBeverageCan color="red" />
          </div>
        </div>

        {/* Action button */}
        <div className="w-full mt-4">
          <button
            id="landing-scan-trigger"
            onClick={handleScanProductBtnClick}
            className="w-full py-4 bg-[#bef264] hover:bg-[#bef264]/90 text-black font-sans font-black text-sm tracking-tight rounded-2xl shadow-xl hover:shadow-[#bef264]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Camera size={16} className="stroke-[2.5]" />
            <span>Scan Product</span>
          </button>
        </div>
      </div>
    );
  }

  // Render Screen 2: Scan Product (Camera Viewfinder)
  return (
    <div className="flex flex-col items-center justify-between w-full min-h-full px-4 py-4 bg-black text-white relative">
      
      {/* Top bar header */}
      <div className="flex items-center justify-between w-full px-1">
        <button
          id="btn-scan-back-landing"
          onClick={() => setSubStep("landing")}
          className="p-1.5 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-300 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="font-sans font-extrabold text-sm text-gray-200 tracking-wide">Scan Product</span>
        <div className="w-8"></div>
      </div>

      {/* Viewfinder Main camera container */}
      <div className="relative w-full aspect-[4/5] bg-neutral-900 rounded-[2rem] overflow-hidden border border-gray-800 flex flex-col justify-between p-4 my-4 shadow-inner">
        
        {/* Floating actions */}
        <div className="flex items-center justify-between w-full z-10">
          <button
            id="btn-flash-toggle"
            onClick={() => setFlashlight(!flashlight)}
            className={`p-2.5 rounded-full transition-all ${
              flashlight ? "bg-amber-400 text-black" : "bg-black/60 text-gray-400 hover:text-white"
            }`}
            title="Toggle Flash"
          >
            <Zap size={16} />
          </button>

          <span className="text-[9px] font-mono tracking-widest text-[#4ade80] bg-black/60 px-2.5 py-1 rounded-full border border-emerald-500/20">
            LENS LIVE
          </span>

          <div className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-gray-400 cursor-pointer">
            <Upload size={16} />
          </div>
        </div>

        {/* Center Framing Corners & Bag illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full h-full rounded-2xl flex items-center justify-center">
            {/* Green corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#22c55e] rounded-tl-md"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#22c55e] rounded-tr-md"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#22c55e] rounded-bl-md"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#22c55e] rounded-br-md"></div>

            {/* Simulated product inside the viewfinder */}
            <div className="scale-95">
              <ClassicChipsBag redLaser={true} />
            </div>
          </div>
        </div>

        {/* Floating guide message */}
        <div className="w-full text-center z-10 text-[10px] font-mono text-gray-500 tracking-wider">
          POINT SHUTTER AT INGREDIENTS STATEMENT
        </div>
      </div>

      {/* Shutter actions and utilities */}
      <div className="w-full flex items-center justify-between px-6 mb-3">
        {/* Gallery picker */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-800 text-gray-400 hover:text-white transition-all">
            <Upload size={16} />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Gallery</span>
        </div>

        {/* Huge glowing green shutter button */}
        <button
          id="btn-shutter-capture"
          onClick={handleTriggerShutter}
          className="w-16 h-16 rounded-full border-4 border-black ring-4 ring-[#bef264] bg-[#bef264] hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg shadow-emerald-500/10"
        >
          <div className="w-6 h-6 rounded-full border border-black/20"></div>
        </button>

        {/* Tips info panel */}
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-11 h-11 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center hover:bg-neutral-800 text-gray-400 hover:text-white transition-all">
            <HelpCircle size={16} />
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Tips</span>
        </div>
      </div>

      {/* Simulator Quick select Presets list under screen */}
      <div className="w-full border-t border-neutral-950 pt-3 flex flex-col gap-1.5">
        <span className="text-[10px] text-gray-500 font-mono text-center uppercase tracking-wider block">Or Select Simulator Presets</span>
        <div className="grid grid-cols-2 gap-1.5 px-2">
          {PRESET_OPTIONS.map((opt) => (
            <button
              key={opt.presetId}
              onClick={() => handlePresetSelect(opt.presetId)}
              className="py-1.5 px-3 bg-[#11161d] border border-gray-800 hover:border-emerald-500/30 text-left rounded-lg text-[10px] flex items-center gap-2 transition-all truncate"
            >
              <span>{opt.emoji}</span>
              <span className="font-sans font-bold text-gray-300 truncate">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom manual label text paste toggle */}
      <div className="w-full mt-3 px-2">
        <button
          onClick={() => setUseCustomText(!useCustomText)}
          className="w-full py-1 text-center font-mono text-[9px] text-[#bef264] hover:underline"
        >
          {useCustomText ? "[ Close Manual Entry ]" : "[ Paste Ingredient Text Directly ]"}
        </button>

        {useCustomText && (
          <div className="mt-2.5 bg-neutral-900 p-3 rounded-2xl border border-neutral-800 space-y-2">
            <input
              type="text"
              placeholder="Product Name (e.g. Candy Brand)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full bg-black border border-neutral-800 rounded-xl py-1.5 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500"
            />
            <textarea
              placeholder="Ingredients String..."
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              rows={2}
              className="w-full bg-black border border-neutral-800 rounded-xl py-1.5 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 resize-none text-left"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!ingredientsText.trim()}
              className="w-full py-2 bg-[#bef264] disabled:bg-gray-800 disabled:text-gray-500 hover:bg-[#bef264]/90 text-black text-[10px] font-extrabold rounded-lg tracking-tight transition-all"
            >
              Simulate Custom Text
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
