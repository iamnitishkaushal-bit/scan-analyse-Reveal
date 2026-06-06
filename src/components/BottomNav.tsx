import React from "react";
import { Home as HomeIcon, History as HistoryIcon, Camera as ScanIcon, Bookmark as SavedIcon, User as ProfileIcon } from "lucide-react";

interface BottomNavProps {
  activeTab: "home" | "history" | "scan" | "saved" | "profile";
  setActiveTab: (tab: "home" | "history" | "saved" | "profile") => void;
  onScanClick: () => void;
}

export default function BottomNav({ activeTab, setActiveTab, onScanClick }: BottomNavProps) {
  return (
    <div className="w-full bg-[#0c0f13]/95 border-t border-gray-900 pt-3.5 pb-[calc(14px+env(safe-area-inset-bottom,0px))] px-3 flex items-center justify-around">
      
      {/* Home Button */}
      <button
        id="nav-btn-home"
        onClick={() => setActiveTab("home")}
        className={`flex flex-col items-center justify-center transition-colors shrink-0 ${
          activeTab === "home" ? "text-[#bef264]" : "text-gray-450 hover:text-white"
        }`}
      >
        <HomeIcon size={18} className="mb-0.5" />
        <span className="text-[10px] font-sans font-black tracking-tight uppercase">Home</span>
      </button>

      {/* History Button */}
      <button
        id="nav-btn-history"
        onClick={() => setActiveTab("history")}
        className={`flex flex-col items-center justify-center transition-colors shrink-0 ${
          activeTab === "history" ? "text-[#bef264]" : "text-gray-450 hover:text-white"
        }`}
      >
        <HistoryIcon size={18} className="mb-0.5" />
        <span className="text-[10px] font-sans font-black tracking-tight uppercase">History</span>
      </button>

      {/* Primary Scan Trigger Button with beautiful neon ring glow */}
      <button
        id="nav-btn-scan-main"
        onClick={onScanClick}
        className="relative -top-4 flex flex-col items-center justify-center group shrink-0"
      >
        <div className="w-13 h-13 rounded-full bg-[#bef264] flex items-center justify-center shadow-lg shadow-lime-500/10 border-4 border-[#0c0f13] hover:scale-105 active:scale-95 transition-all">
          <ScanIcon size={22} className="text-black stroke-[2.5]" />
        </div>
        <span className="text-[10px] font-sans font-black text-[#bef264] tracking-tight mt-0.5 uppercase">Scan</span>
      </button>

      {/* Saved Button */}
      <button
        id="nav-btn-saved"
        onClick={() => setActiveTab("saved")}
        className={`flex flex-col items-center justify-center transition-colors shrink-0 ${
          activeTab === "saved" ? "text-[#bef264]" : "text-gray-450 hover:text-white"
        }`}
      >
        <SavedIcon size={18} className="mb-0.5" />
        <span className="text-[10px] font-sans font-black tracking-tight uppercase">Saved</span>
      </button>

      {/* Profile Button */}
      <button
        id="nav-btn-profile"
        onClick={() => setActiveTab("profile")}
        className={`flex flex-col items-center justify-center transition-colors shrink-0 ${
          activeTab === "profile" ? "text-[#bef264]" : "text-gray-450 hover:text-white"
        }`}
      >
        <ProfileIcon size={18} className="mb-0.5" />
        <span className="text-[10px] font-sans font-black tracking-tight uppercase">Profile</span>
      </button>
    </div>
  );
}
