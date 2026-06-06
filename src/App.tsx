import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "./firebase";
import { ScanReport, UserProfile, UserStats } from "./types";
import { MOCK_REPORTS } from "./mockData";
import { ChefHat, CheckCircle2 } from "lucide-react";

import Scanner from "./components/Scanner";
import Report from "./components/Report";
import RealityCheck from "./components/RealityCheck";
import BottomNav from "./components/BottomNav";
import HistoryList from "./components/HistoryList";
import SavedProductsList from "./components/SavedProductsList";
import ProfileView from "./components/ProfileView";

export default function App() {
  // Navigation active tab for the main dashboard flow
  const [activeTab, setActiveTab] = useState<"home" | "history" | "saved" | "profile">("home");
  const [user, setUser] = useState<UserProfile | null>(null);

  // Scan and analysis loader states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeAnalysisStep, setActiveAnalysisStep] = useState(0);
  const [currentReport, setCurrentReport] = useState<ScanReport | null>(null);

  // Drilldown visual view triggers
  const [isViewingReport, setIsViewingReport] = useState(false);
  const [isViewingReality, setIsViewingReality] = useState(false);

  // Local state caches (acts as fallback when offline or Firebase handles loading)
  const [historyList, setHistoryList] = useState<ScanReport[]>([]);
  const [savedList, setSavedList] = useState<ScanReport[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);

  const LOCAL_GUEST_UID_KEY = "ingredients_scanner_guest_uid";
  const LOCAL_STORAGE_HISTORY_KEY = "ingredients_scanner_history_v1";
  const LOCAL_STORAGE_SAVED_KEY = "ingredients_scanner_saved_v1";

  // Detailed clinical steps inside the AI Lens Scan sequence
  const analysisSteps = [
    "Detecting Ingredients",
    "Checking Additives",
    "Analyzing Nutrition",
    "Verifying Claims",
    "Calculating Truth Score"
  ];

  const getOrCreateGuestUid = () => {
    let uid = localStorage.getItem(LOCAL_GUEST_UID_KEY);
    if (!uid) {
      uid = "guest-" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem(LOCAL_GUEST_UID_KEY, uid);
    }
    return uid;
  };

  const getLocalHistory = (): ScanReport[] => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const setLocalHistory = (data: ScanReport[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Local storage error", e);
    }
  };

  const getLocalSaved = (): ScanReport[] => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SAVED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const setLocalSaved = (data: ScanReport[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SAVED_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Local storage error", e);
    }
  };

  // Authenticate user anonymously to configure persistent Firestore database records
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName || "Cosmic Reviewer",
          email: currentUser.email || undefined,
          photoURL: currentUser.photoURL || undefined,
          isAnonymous: currentUser.isAnonymous
        });
      } else {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.warn("Using offline memory Guest session.");
          const guestUid = getOrCreateGuestUid();
          setUser({
            uid: guestUid,
            displayName: "Guest Scanner",
            isAnonymous: true
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Synchronize history scan logs with firestore or local cache
  useEffect(() => {
    if (!user) return;
    const isFirebaseOnline = auth.currentUser !== null;
    if (!isFirebaseOnline) {
      setHistoryList(getLocalHistory());
      setLoadingHistory(false);
      return;
    }

    setLoadingHistory(true);
    const q = query(collection(db, "scans"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const scans: ScanReport[] = [];
        snapshot.forEach((doc) => {
          scans.push({ id: doc.id, ...doc.data() } as ScanReport);
        });
        scans.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setHistoryList(scans);
        setLoadingHistory(false);
        setLocalHistory(scans);
      },
      (error) => {
        setHistoryList(getLocalHistory());
        setLoadingHistory(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  // Synchronize starred/saved products
  useEffect(() => {
    if (!user) return;
    const isFirebaseOnline = auth.currentUser !== null;
    if (!isFirebaseOnline) {
      setSavedList(getLocalSaved());
      setLoadingSaved(false);
      return;
    }

    setLoadingSaved(true);
    const q = collection(db, "users", user.uid, "saved_products");
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const savedIds: string[] = [];
        snapshot.forEach((doc) => {
          savedIds.push(doc.data().scanId);
        });
        const savedDetails = historyList.filter(item => savedIds.includes(item.id));
        MOCK_REPORTS.forEach(mockItem => {
          if (savedIds.includes(mockItem.id) && !savedDetails.some(s => s.id === mockItem.id)) {
            savedDetails.push(mockItem);
          }
        });
        setSavedList(savedDetails);
        setLoadingSaved(false);
        setLocalSaved(savedDetails);
      },
      (error) => {
        setSavedList(getLocalSaved());
        setLoadingSaved(false);
      }
    );
    return () => unsubscribe();
  }, [user, historyList]);

  // Calculate user scan statistics for Profile dashboard
  const stats: UserStats = {
    totalScans: historyList.length,
    avgTruthScore: historyList.length > 0
      ? Math.round(historyList.reduce((acc, c) => acc + c.truthScore, 0) / historyList.length)
      : 0,
    totalConsciousRating: historyList.filter(h => h.truthScore >= 70).length,
    redFlagsCaught: historyList.reduce((acc, cur) => acc + cur.ingredientsBreakdown.filter(i => i.rating === "Bad").length, 0)
  };

  // Trigger high-fidelity AI Scanning sequence simulation
  const handleScanOperation = async (presetId: string, customText?: string, customName?: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setActiveAnalysisStep(0);

    let fetchedReport: ScanReport | null = null;
    try {
      if (presetId === "custom" && customText) {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredientsText: customText, productName: customName })
        });
        fetchedReport = await response.json();
      } else {
        fetchedReport = MOCK_REPORTS.find(r => r.id === presetId) || MOCK_REPORTS[0];
      }
    } catch {
      fetchedReport = MOCK_REPORTS[0];
    }

    // Progress bar ticker simulation to make scanning experience highly interactive & visceral
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 5;
        const nextStep = Math.min(Math.floor((next / 100) * analysisSteps.length), analysisSteps.length - 1);
        setActiveAnalysisStep(nextStep);
        return next;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setAnalysisProgress(100);
      if (fetchedReport && user) {
        const finalReport: ScanReport = {
          ...fetchedReport,
          id: `${fetchedReport.id}-${Date.now().toString().slice(-4)}`,
          userId: user.uid,
          timestamp: new Date().toISOString()
        };

        setCurrentReport(finalReport);
        setIsViewingReport(true);
        setIsViewingReality(false);

        const currentLocal = getLocalHistory();
        const updatedLocal = [finalReport, ...currentLocal.filter(h => h.id !== finalReport.id)];
        setLocalHistory(updatedLocal);
        setHistoryList(updatedLocal);
      }
      setIsAnalyzing(false);
    }, 2200);
  };

  // Handle toggling saved stars
  const handleToggleStar = async (reportItem: ScanReport) => {
    if (!user) return;
    const isAlreadySaved = savedList.some(s => s.id === reportItem.id || s.productName === reportItem.productName);
    let updated: ScanReport[];
    if (isAlreadySaved) {
      updated = savedList.filter(s => s.id !== reportItem.id && s.productName !== reportItem.productName);
    } else {
      updated = [reportItem, ...savedList];
    }
    setLocalSaved(updated);
    setSavedList(updated);
  };

  // Delete product scan history logging
  const handleDeleteHistory = async (scanId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedLocal = getLocalHistory().filter(item => item.id !== scanId);
    setLocalHistory(updatedLocal);
    setHistoryList(updatedLocal);
    if (currentReport?.id === scanId) {
      setIsViewingReport(false);
      setIsViewingReality(false);
    }
  };

  const handleBackToScanner = () => {
    setIsViewingReport(false);
    setIsViewingReality(false);
    setActiveTab("home");
  };

  return (
    <div className="min-h-screen bg-[#07090c] text-white select-none selection:bg-[#bef264]/35 selection:text-[#bef264] flex items-center justify-center relative md:p-6 overflow-x-hidden">
      
      {/* Absolute Ambient Neon backdrop glow behind device mockup on desktop layout */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#bef264]/5 blur-[120px] pointer-events-none hidden md:block"></div>

      {/* Main Single Device Container: responsive full-width on mobile, premium iOS mockup frame on desktop */}
      <div className="w-full h-screen md:h-[844px] md:max-w-[390px] md:rounded-[3rem] md:border-8 md:border-gray-800/95 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] md:shadow-emerald-500/5 relative overflow-hidden flex flex-col justify-between bg-[#020304]">
        
        {/* Sleek top status notch pill for smartphone decoration, only visible on desktop layout */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-[18px] bg-black rounded-full z-40 hidden md:flex items-center justify-between px-3 border border-neutral-900">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-900"></span>
          <span className="w-10 h-[3px] bg-neutral-900 rounded-sm"></span>
          <span className="w-2 h-2 rounded-full bg-blue-950 border border-blue-900"></span>
        </div>

        {/* Dynamic AI Analysis / Scanning Progress Overlap inside smartphone view */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center p-6 text-white text-center">
            <div className="absolute top-1/4 flex gap-1.5 items-center bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
              <ChefHat size={14} className="text-[#bef264] rotate-12 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#bef264] font-black">AI Ingredient Lenses Active</span>
            </div>

            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-gray-950 border-t-[#bef264] animate-spin"></div>
              <div className="text-center">
                <span className="font-mono text-4xl font-extrabold text-white">{analysisProgress}%</span>
                <p className="text-[9px] text-gray-500 font-mono tracking-widest mt-1">LENS SCAN</p>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-sans font-black text-lg text-[#bef264]">
                {analysisSteps[activeAnalysisStep]}...
              </h3>
              <p className="text-gray-400 text-xs max-w-xs font-sans leading-relaxed">
                Analyzing core preservatives, bad oils, and matching claims against reality datasets.
              </p>
            </div>
          </div>
        )}

        {/* Main Navigable Core Area inside single mobile frame */}
        <div className="w-full flex-1 overflow-y-auto pb-24 pt-4 relative">
          
          {isViewingReport ? (
            isViewingReality && currentReport ? (
              <RealityCheck
                report={currentReport}
                onBack={() => setIsViewingReality(false)}
              />
            ) : currentReport ? (
              <Report
                report={currentReport}
                onBack={handleBackToScanner}
                onRevealPresent={() => setIsViewingReality(true)}
                isSaved={savedList.some(s => s.id === currentReport.id || s.productName === currentReport.productName)}
                onToggleSave={() => handleToggleStar(currentReport)}
              />
            ) : (
              <div className="text-center pt-24 text-gray-500 font-sans text-xs">Report loaded incorrectly.</div>
            )
          ) : (
            <div className="w-full h-full">
              {activeTab === "home" && (
                <Scanner
                  onScanComplete={handleScanOperation}
                  isLoading={isAnalyzing}
                />
              )}
              {activeTab === "history" && (
                <HistoryList
                  history={historyList}
                  onSelectReport={(report) => {
                    setCurrentReport(report);
                    setIsViewingReport(true);
                    setIsViewingReality(false);
                  }}
                  onDeleteReport={handleDeleteHistory}
                  isLoading={loadingHistory}
                />
              )}
              {activeTab === "saved" && (
                <SavedProductsList
                  savedReports={savedList}
                  onSelectReport={(report) => {
                    setCurrentReport(report);
                    setIsViewingReport(true);
                    setIsViewingReality(false);
                  }}
                  onUnsave={(id, e) => {
                    e.stopPropagation();
                    const targetItem = savedList.find(s => s.id === id);
                    if (targetItem) handleToggleStar(targetItem);
                  }}
                  isLoading={loadingSaved}
                />
              )}
              {activeTab === "profile" && (
                <ProfileView
                  user={user}
                  stats={stats}
                  onRefreshStats={() => {}}
                  isLoading={false}
                />
              )}
            </div>
          )}

        </div>

        {/* Absolute Bottom Navigation bar docked elegantly inside phone chassis */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0c0f14]/95 border-t border-gray-900 z-30">
          <BottomNav
            activeTab={isViewingReport ? "scan" : activeTab}
            setActiveTab={(tab) => {
              setIsViewingReport(false);
              setIsViewingReality(false);
              setActiveTab(tab);
            }}
            onScanClick={handleBackToScanner}
          />
        </div>

      </div>

    </div>
  );
}
