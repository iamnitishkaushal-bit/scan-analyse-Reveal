import React, { useState } from "react";
import { Bookmark, Sparkles, ChevronRight, BookmarkCheck, Star, Activity, Trash } from "lucide-react";
import { ScanReport } from "../types";

interface SavedProductsListProps {
  savedReports: ScanReport[];
  onSelectReport: (report: ScanReport) => void;
  onUnsave: (id: string, e: React.MouseEvent) => void;
  isLoading: boolean;
}

export default function SavedProductsList({ savedReports, onSelectReport, onUnsave, isLoading }: SavedProductsListProps) {
  return (
    <div className="w-full max-w-md mx-auto text-white px-4 pb-24">
      {/* Header */}
      <div className="w-full text-center py-6">
        <h1 className="text-2xl font-sans font-bold tracking-tight text-white mb-1">
          Starred Products
        </h1>
        <p className="text-gray-400 text-xs">
          Your curated catalog of clean and flagged essentials.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-500 font-sans text-xs">
          <BookmarkCheck className="animate-pulse text-[#10b981]" size={28} />
          <span>Synchronizing Starred Catalog...</span>
        </div>
      ) : savedReports.length === 0 ? (
        <div className="text-center py-12 bg-[#11161d] rounded-3xl border border-[#1b2530] px-6">
          <div className="w-16 h-16 rounded-full bg-[#1b2530] flex items-center justify-center mx-auto mb-4 border border-[#1b2530]/85">
            <Star className="text-gray-600 fill-gray-700" size={24} />
          </div>
          <h3 className="text-sm text-gray-300 font-bold font-sans">No saved products yet</h3>
          <p className="text-xs text-gray-500 font-sans mt-2 leading-relaxed">
            While viewing scanned results, click the bookmark icon in the top right to save the product profile.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {savedReports.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectReport(item)}
              className="bg-[#11161d] border border-[#1b2530] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-[#10b981]/20 active:bg-emerald-500/5 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-black/40 border border-[#1b2530] flex items-center justify-center text-xl shrink-0">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                  ) : (
                    <span>⭐</span>
                  )}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs tracking-tight text-white mb-0.5 max-w-[170px] truncate">
                    {item.productName}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      item.truthScore >= 70 ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                    }`}>
                      {item.truthScore >= 70 ? "Good Choice" : "Flagged Oil/Sugars"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-mono block">SCORE</span>
                  <span className="font-mono text-sm font-black text-emerald-400">
                    {item.truthScore}
                  </span>
                </div>

                <div className="flex items-center">
                  <button
                    id={`btn-unsave-${item.id}`}
                    onClick={(e) => onUnsave(item.id, e)}
                    className="p-2 hover:bg-emerald-500/10 text-[#10b981] rounded-xl transition-all"
                    title="Starred Product"
                  >
                    <BookmarkCheck size={16} />
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
