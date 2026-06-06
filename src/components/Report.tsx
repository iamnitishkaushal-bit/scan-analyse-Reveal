import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, ChevronRight, Eye, Sparkles, Star, Share2 } from "lucide-react";
import { ScanReport } from "../types";

interface ReportProps {
  report: ScanReport;
  onBack: () => void;
  onRevealPresent: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

// Custom Premium Vector Dial needle gauge
function ArcGauge({ score }: { score: number }) {
  // calculate angle from 180 deg (far left, red) to 0 deg (far right, green)
  const percent = score / 100;
  const angle = 180 - percent * 180;
  const radian = (angle * Math.PI) / 180;
  const pointerX = 50 + 32 * Math.cos(radian);
  const pointerY = 50 - 32 * Math.sin(radian);

  return (
    <div className="relative flex flex-col items-center">
      <svg className="w-28 h-16" viewBox="0 0 100 55">
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
            <stop offset="50%" stopColor="#f59e0b" /> {/* Orange */}
            <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
          </linearGradient>
        </defs>
        
        {/* Background track */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#1e293b"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Dynamic colored arc path */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="126"
          strokeDashoffset={126} // show full spectrum background, needle points to position
        />

        {/* Semicircle center dial base */}
        <line
          x1="50"
          y1="50"
          x2={pointerX}
          y2={pointerY}
          stroke="#ffedd5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="4.5" fill="#f8fafc" stroke="#1e293b" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function Report({ report, onBack, onRevealPresent, isSaved, onToggleSave }: ReportProps) {
  // Report tab states: 
  // "complete" (Screen 4: Analysis Complete summary)
  // "overview" (Screen 5: Product Overview detailed)
  // "ingredients" (Screen 6: Ingredients Breakdown list)
  // "claims" (Screen 7: Claims vs Reality)
  // "health" (Screen 8: Health notable concerns & alternatives)
  const [reportState, setReportState] = useState<"complete" | "overview" | "ingredients" | "claims" | "health">("complete");
  const [ingredientToggle, setIngredientToggle] = useState<"all" | "concerned">("concerned");

  // Determine score colors & face details
  const isHealthy = report.truthScore >= 70;
  const isOk = report.truthScore >= 50 && report.truthScore < 70;
  const scoreText = isHealthy ? "Good Choice" : isOk ? "Mediocre" : "Not Good";
  const scoreEmoji = isHealthy ? "😊" : isOk ? "😐" : "😟";
  const scoreBadgeColor = isHealthy ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : isOk ? "bg-amber-500/20 text-amber-300 border-amber-500/30" : "bg-red-500/20 text-red-300 border-[#f43f5e]/30";

  if (reportState === "complete") {
    // Render Screen 4: Analysis Complete Semicircle Needle Dial Screen
    return (
      <div className="flex flex-col justify-between w-full min-h-full px-5 py-4 bg-black text-white relative font-sans">
        
        {/* Top bar with back and share */}
        <div className="flex items-center justify-between w-full">
          <button
            id="report-complete-back"
            onClick={onBack}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Analysis Complete</span>
          <button className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300">
            <Share2 size={16} />
          </button>
        </div>

        {/* Core summary rating container */}
        <div className="bg-[#11161d] border border-gray-800 rounded-3xl p-4 my-4 flex flex-col gap-3 relative shadow-inner">
          <div className="flex items-center justify-between">
            {/* Left text column score block */}
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 tracking-wider uppercase font-mono block">Truth Score</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-4xl font-extrabold text-[#f43f5e] font-mono">{report.truthScore}</span>
                <span className="text-gray-500 text-xs font-mono">/100</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${scoreBadgeColor}`}>
                  <span>{scoreText}</span>
                  <span>{scoreEmoji}</span>
                </span>
              </div>
            </div>

            {/* Right semicircle needle pointer dial */}
            <div className="pr-1">
              <ArcGauge score={report.truthScore} />
            </div>
          </div>

          <p className="text-[11px] text-gray-300 leading-relaxed font-sans mt-2 border-t border-gray-800/60 pt-3">
            This product contains several ingredients of concern and does not match its wholesome, healthy marketing representation.
          </p>
        </div>

        {/* Detailed parameters scorecard layout table */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl overflow-hidden p-3 divide-y divide-gray-800/60 mt-1 mb-4">
          <div className="flex justify-between items-center py-2 text-xs">
            <span className="text-gray-400 font-sans">Ingredients Quality</span>
            <span className="font-bold text-red-400">Poor</span>
          </div>
          <div className="flex justify-between items-center py-2 text-xs">
            <span className="text-gray-400 font-sans">Additives</span>
            <span className="font-bold text-red-400">High</span>
          </div>
          <div className="flex justify-between items-center py-2 text-xs">
            <span className="text-gray-400 font-sans">Sugar Density</span>
            <span className="font-bold text-red-500">High</span>
          </div>
          <div className="flex justify-between items-center py-2 text-xs">
            <span className="text-gray-400 font-sans">Processing Level</span>
            <span className="font-bold text-red-400">High</span>
          </div>
          <div className="flex justify-between items-center py-2 text-xs text-left">
            <span className="text-gray-400 font-sans">Claim Accuracy</span>
            <span className="font-bold text-orange-400">Low</span>
          </div>
        </div>

        {/* Primary View Full Report Action */}
        <button
          id="btn-trigger-overview"
          onClick={() => setReportState("overview")}
          className="w-full py-3.5 bg-[#bef264] hover:bg-[#bef264]/90 text-black font-sans font-black text-xs tracking-tight rounded-xl shadow-md transition-all active:scale-[0.98] text-center"
        >
          View Full Report
        </button>
      </div>
    );
  }

  // Render Core Screen 5: Product Overview Detailed Dashboard Screen
  if (reportState === "overview") {
    return (
      <div className="flex flex-col justify-between w-full min-h-full px-5 py-4 bg-black text-white relative font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setReportState("complete")}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Product Overview</span>
          <button
            onClick={onToggleSave}
            className={`p-1.5 rounded-full border transition-all ${
              isSaved ? "bg-[#bef264]/10 text-[#bef264] border-[#bef264]/20" : "bg-gray-900/60 border-transparent text-gray-400"
            }`}
          >
            <Star size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Horizontal overview top thumbnail block */}
        <div className="bg-[#11161d] border border-gray-800 rounded-3xl p-4 my-3 space-y-3 relative shadow-inner">
          <div className="flex items-center gap-3">
            {/* Lays Thumbnail Wrapper */}
            <div className="w-16 h-16 rounded-xl bg-orange-400/10 border border-orange-500/20 flex items-center justify-center relative overflow-hidden shrink-0">
              {/* Little custom yellow packet thumbnail */}
              <div className="w-10 h-10 bg-yellow-400 rounded-lg shadow-sm flex items-center justify-center relative">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-0.5">
              <h2 className="font-sans font-black text-base text-white tracking-tight lead-tight">
                {report.productName}
              </h2>
              <div className="flex gap-1">
                <span className="text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/10 px-2 py-0.5 rounded-full">
                  Not Good
                </span>
              </div>
            </div>
          </div>

          {/* Truth score horizontal progress track bar */}
          <div className="border-t border-gray-800/60 pt-3 flex flex-col gap-1.5">
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-gray-500 uppercase tracking-widest text-[9px]">Truth Score Rating</span>
              <span className="text-rose-400 font-extrabold">{report.truthScore}/100</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500" style={{ width: `${report.truthScore}%` }}></div>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal font-sans mt-1">
              This product contains several questionable ingredients and does not match its healthy natural image representation.
            </p>
          </div>
        </div>

        {/* Highlight badge horizontal pills layout */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#11161d] p-2.5 rounded-2xl border border-gray-800/80 text-center">
            <span className="text-[8px] text-gray-500 uppercase block font-mono">Additives</span>
            <span className="text-xs font-bold text-red-400 block mt-0.5">High</span>
          </div>
          <div className="bg-[#11161d] p-2.5 rounded-2xl border border-gray-800/80 text-center">
            <span className="text-[8px] text-gray-500 uppercase block font-mono">Sodium</span>
            <span className="text-xs font-bold text-red-400 block mt-0.5">High</span>
          </div>
          <div className="bg-[#11161d] p-2.5 rounded-2xl border border-gray-800/80 text-center">
            <span className="text-[8px] text-gray-500 uppercase block font-mono">Nutrition</span>
            <span className="text-xs font-bold text-[#bef264] block mt-0.5">Low</span>
          </div>
        </div>

        {/* Drill down option rows with arrow */}
        <div className="bg-[#11161d] border border-gray-800/80 rounded-2xl overflow-hidden divide-y divide-gray-800/50 my-3">
          <div
            onClick={() => setReportState("ingredients")}
            className="flex justify-between items-center px-4 py-3.5 hover:bg-gray-800/30 active:bg-gray-800/60 cursor-pointer transition-all"
          >
            <span className="text-xs text-gray-200 font-sans font-bold">Ingredients Breakdown</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
          <div
            onClick={() => setReportState("ingredients")}
            className="flex justify-between items-center px-4 py-3.5 hover:bg-gray-800/30 active:bg-gray-800/60 cursor-pointer transition-all"
          >
            <span className="text-xs text-gray-200 font-sans font-bold">Nutrition Facts</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
          <div
            onClick={() => setReportState("claims")}
            className="flex justify-between items-center px-4 py-3.5 hover:bg-gray-800/30 active:bg-gray-800/60 cursor-pointer transition-all"
          >
            <span className="text-xs text-gray-200 font-sans font-bold">Claims vs Reality</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
          <div
            onClick={() => setReportState("health")}
            className="flex justify-between items-center px-4 py-3.5 hover:bg-gray-800/30 active:bg-gray-800/60 cursor-pointer transition-all"
          >
            <span className="text-xs text-gray-200 font-sans font-bold">Health Impact</span>
            <ChevronRight size={14} className="text-gray-500" />
          </div>
        </div>

        {/* Present Experience CTA button with Present wrap graphics */}
        <button
          id="btn-overview-reveal-gift"
          onClick={onRevealPresent}
          className="w-full py-4 text-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-[#bef264] font-sans font-black text-xs tracking-tight rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>🎁 Reveal The Present Experience</span>
          <ChevronRight size={14} className="stroke-[3]" />
        </button>
      </div>
    );
  }

  // Render Screen 6: Ingredients Breakdown Screen
  if (reportState === "ingredients") {
    const listToShow = ingredientToggle === "all" ? report.ingredientsBreakdown : report.ingredientsBreakdown.filter(i => i.rating === "Bad");

    return (
      <div className="flex flex-col justify-between w-full min-h-full px-5 py-4 bg-black text-white relative font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setReportState("overview")}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Ingredients Breakdown</span>
          <div className="w-8"></div>
        </div>

        {/* All vs Concerned toggle selector chips */}
        <div className="flex bg-[#11161d] border border-gray-800 p-0.5 rounded-xl my-3">
          <button
            onClick={() => setIngredientToggle("all")}
            className={`flex-1 py-1.5 text-[10px] font-sans font-bold rounded-lg transition-all ${
              ingredientToggle === "all" ? "bg-gray-800 border border-gray-700 text-white" : "text-gray-400"
            }`}
          >
            All Ingredients
          </button>
          <button
            onClick={() => setIngredientToggle("concerned")}
            className={`flex-1 py-1.5 text-[10px] font-sans font-bold rounded-lg transition-all ${
              ingredientToggle === "concerned" ? "bg-red-500/20 border border-red-500/20 text-red-300" : "text-gray-400"
            }`}
          >
            Concerned (6)
          </button>
        </div>

        {/* Scroll list of specific ingredient rows */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 max-h-[295px] mb-3">
          {listToShow.map((ing, idx) => (
            <div key={idx} className="bg-[#11161d] p-3 rounded-xl border border-gray-800/80 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                {/* Colored circle index */}
                <div className={`w-2.5 h-2.5 rounded-full ${
                  ing.rating === "Good" ? "bg-emerald-400" : ing.rating === "Okay" ? "bg-amber-400" : "bg-red-500"
                }`}></div>
                <span className="font-sans font-bold text-xs text-white">{ing.name}</span>
              </div>
              <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                ing.rating === "Good" ? "bg-emerald-500/10 text-emerald-400" : ing.rating === "Okay" ? "bg-amber-500/10 text-amber-300" : "bg-red-500/10 text-red-400"
              }`}>
                {ing.rating}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Legend card section */}
        <div className="bg-[#11161d]/80 border border-gray-800 p-3 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 bg-emerald-400 rounded-full shrink-0"></span>
            <span className="text-gray-400 font-sans"><strong className="text-gray-200">Good:</strong> Safe and natural</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 bg-amber-400 rounded-full shrink-0"></span>
            <span className="text-gray-400 font-sans"><strong className="text-gray-200">Okay:</strong> Generally safe</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 bg-red-400 rounded-full shrink-0"></span>
            <span className="text-gray-400 font-sans"><strong className="text-gray-200">Bad:</strong> Potentially harmful</span>
          </div>
        </div>

        {/* Back page container action */}
        <button
          onClick={() => setReportState("overview")}
          className="w-full mt-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 font-semibold text-xs rounded-xl"
        >
          Return to Overview
        </button>
      </div>
    );
  }

  // Render Screen 7: Claims vs Reality Screen
  if (reportState === "claims") {
    return (
      <div className="flex flex-col justify-between w-full min-h-full px-5 py-4 bg-black text-white relative font-sans">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setReportState("overview")}
            className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Claims vs Reality</span>
          <div className="w-8"></div>
        </div>

        {/* Column of Claims cards */}
        <div className="flex-1 overflow-y-auto space-y-3.5 my-4 pr-1">
          
          <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-4 gap-2 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-emerald-500/20 text-[#bef264] p-1.5 rounded-full">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Claim on Package</span>
            <h3 className="font-sans font-extrabold text-xs text-white leading-snug pr-8 italic">
              "Made with Best Quality Potatoes"
            </h3>
            
            <div className="border-t border-gray-800/80 mt-2.5 pt-2.5">
              <span className="text-[9px] text-rose-400 font-mono uppercase block font-semibold">Reality Verdict: Partially True</span>
              <p className="text-[10px] text-gray-400 leading-normal font-sans mt-1">
                Contains potatoes, but also has multiple additives and flavor enhancers.
              </p>
            </div>
          </div>

          <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-4 gap-2 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 p-1.5 rounded-full">
              <XCircle size={16} />
            </div>
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider block">Claim on Package</span>
            <h3 className="font-sans font-extrabold text-xs text-white leading-snug pr-8 italic">
              "No Artificial Flavors"
            </h3>
            
            <div className="border-t border-gray-800/80 mt-2.5 pt-2.5">
              <span className="text-[9px] text-red-400 font-mono uppercase block font-semibold">Reality Verdict: False</span>
              <p className="text-[10px] text-gray-400 leading-normal font-sans mt-1">
                Contains Artificial Flavor and other additives.
              </p>
            </div>
          </div>

        </div>

        {/* Back page container action */}
        <button
          onClick={() => setReportState("overview")}
          className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 font-semibold text-xs rounded-xl"
        >
          Return to Overview
        </button>
      </div>
    );
  }

  // Render Screen 8: Health Impact Screen (Concerns and alternatives)
  return (
    <div className="flex flex-col justify-between w-full min-h-full px-5 py-4 bg-black text-white relative font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => setReportState("overview")}
          className="p-1.5 rounded-full bg-gray-900/60 hover:bg-gray-800 text-gray-300 transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="font-sans font-black text-xs tracking-wider uppercase text-gray-200">Health Impact</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 my-3 pr-1 max-h-[360px]">
        {/* Possible concerns block */}
        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-4 gap-2 flex flex-col">
          <h4 className="font-sans font-bold text-xs text-rose-400 mb-1">Possible Concerns</h4>
          <div className="flex flex-col gap-2.5">
            <div className="flex gap-2 items-start text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0 animate-ping"></span>
              <span className="text-gray-300 text-[11px] leading-snug font-sans">High sodium may increase blood pressure</span>
            </div>
            <div className="flex gap-2 items-start text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
              <span className="text-gray-300 text-[11px] leading-snug font-sans">Contains additives linked to headaches in some people</span>
            </div>
            <div className="flex gap-2 items-start text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0"></span>
              <span className="text-gray-300 text-[11px] leading-snug font-sans">Palm oil consumption should be limited</span>
            </div>
          </div>
        </div>

        {/* Better alternatives block */}
        <div className="bg-[#11161d] border border-gray-800 rounded-2xl p-4 flex flex-col gap-2.5">
          <h4 className="font-sans font-bold text-xs text-[#bef264]">Better Alternatives</h4>
          
          <div className="flex justify-between items-center py-1 border-b border-gray-800/60 font-sans">
            <span className="text-xs font-medium text-gray-200">Pringles Original</span>
            <span className="font-mono text-[10px] font-bold text-[#bef264] bg-emerald-500/10 px-2 py-0.5 rounded">65/100</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-gray-800/60 font-sans">
            <span className="text-xs font-medium text-gray-200">Too Yumm! Potato Chips</span>
            <span className="font-mono text-[10px] font-bold text-[#bef264] bg-emerald-500/10 px-2 py-0.5 rounded">78/100</span>
          </div>
          <div className="flex justify-between items-center py-1 font-sans">
            <span className="text-xs font-medium text-gray-200">Kettle Cooked Chips</span>
            <span className="font-mono text-[10px] font-bold text-[#bef264] bg-emerald-500/10 px-2 py-0.5 rounded">72/100</span>
          </div>
        </div>
      </div>

      {/* Back page container action */}
      <button
        onClick={() => setReportState("overview")}
        className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-gray-300 font-semibold text-xs rounded-xl"
      >
        Return to Overview
      </button>
    </div>
  );
}
