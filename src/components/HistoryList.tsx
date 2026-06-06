import React, { useState } from "react";
import { History, Trash2, Calendar, Search, ChevronRight, Activity, Smile, RefreshCw } from "lucide-react";
import { ScanReport } from "../types";

interface HistoryListProps {
  history: ScanReport[];
  onSelectReport: (report: ScanReport) => void;
  onDeleteReport: (id: string, e: React.MouseEvent) => void;
  isLoading: boolean;
}

export default function HistoryList({ history, onSelectReport, onDeleteReport, isLoading }: HistoryListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto text-white px-4 pb-24">
      {/* Header */}
      <div className="w-full text-center py-6">
        <h1 className="text-2xl font-sans font-bold tracking-tight text-white mb-1">
          Scan History
        </h1>
        <p className="text-gray-400 text-xs">
          Your archived ingredient truth scan operations.
        </p>
      </div>

      {/* Analytical counter cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#11161d] p-4 rounded-2xl border border-[#1b2530] flex items-center gap-3">
          <Activity className="text-[#10b981]" size={20} />
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-mono">Archive Count</span>
            <span className="text-sm font-sans font-extrabold">{history.length} Scans</span>
          </div>
        </div>
        <div className="bg-[#11161d] p-4 rounded-2xl border border-[#1b2530] flex items-center gap-3">
          <Smile className="text-emerald-400" size={20} />
          <div>
            <span className="text-[10px] text-gray-500 uppercase block font-mono">Conscious Health</span>
            <span className="text-sm font-sans font-extrabold">Active</span>
          </div>
        </div>
      </div>

      {/* Search Input filter */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-3 text-gray-500" size={16} />
        <input
          id="history-search"
          type="text"
          placeholder="Search processed commodities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#11161d] border border-[#1b2530] rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#10b981]"
        />
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-500 font-sans text-xs">
          <RefreshCw className="animate-spin text-[#10b981]" size={20} />
          <span>Synchronizing with Cloud Firestore...</span>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-12 bg-[#11161d] rounded-3xl border border-[#1b2530] px-4">
          <History className="mx-auto text-gray-600 mb-3" size={36} />
          <p className="text-sm text-gray-400 font-sans font-medium">No archived scans match your search query.</p>
          <p className="text-xs text-gray-500 font-sans mt-1">Archive list will populate dynamically once you complete ingredient label checks.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectReport(item)}
              className="bg-[#11161d] border border-[#1b2530] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-emerald-500/20 active:bg-emerald-500/5 transition-all text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-black/40 border border-[#1b2530] flex items-center justify-center text-xl shrink-0 overflow-hidden">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <span>📦</span>
                  )}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm tracking-tight text-white mb-0.5 max-w-[160px] truncate">
                    {item.productName}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                    <Calendar size={10} />
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-mono uppercase block">Score</span>
                  <span className={`font-mono text-sm font-extrabold ${
                    item.truthScore >= 70 ? "text-[#10b981]" : item.truthScore >= 50 ? "text-amber-400" : "text-red-500"
                  }`}>
                    {item.truthScore}/100
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    id={`btn-del-history-${item.id}`}
                    onClick={(e) => onDeleteReport(item.id, e)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all"
                    title="Delete record"
                  >
                    <Trash2 size={14} />
                  </button>
                  <ChevronRight size={14} className="text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
