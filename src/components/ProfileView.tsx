import { useState } from "react";
import { User, LogIn, LogOut, ShieldAlert, Award, TrendingDown, Eye, CheckCircle2, RefreshCw } from "lucide-react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, signInAnonymously, signOut } from "firebase/auth";
import { UserProfile, UserStats } from "../types";

interface ProfileViewProps {
  user: UserProfile | null;
  stats: UserStats;
  onRefreshStats: () => void;
  isLoading: boolean;
}

export default function ProfileView({ user, stats, onRefreshStats, isLoading }: ProfileViewProps) {
  const [authLoading, setAuthLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setAuthLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google login failed, trying anonymous fallback:", err);
      try {
        await signInAnonymously(auth);
      } catch (anonErr) {
        console.error("Anonymous authentication failed:", anonErr);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  // Determine user rank based on scans
  const getRank = () => {
    if (stats.totalScans >= 10) return { title: "Conscious Master", percent: 100, badge: "🏆" };
    if (stats.totalScans >= 5) return { title: "Additive Critic", percent: 65, badge: "🔍" };
    if (stats.totalScans >= 2) return { title: "Aware Consumer", percent: 35, badge: "🌱" };
    return { title: "Novice Reviewer", percent: 10, badge: "🥚" };
  };

  const rank = getRank();

  return (
    <div className="w-full max-w-md mx-auto text-white px-4 pb-24">
      {/* Header */}
      <div className="w-full text-center py-6">
        <h1 className="text-2xl font-sans font-bold tracking-tight text-white mb-1">
          Profile Settings
        </h1>
        <p className="text-gray-400 text-xs">
          Manage your cloud identity and health consciousness ranking.
        </p>
      </div>

      {/* Account Info card */}
      <div className="bg-[#11161d] border border-[#1b2530] p-5 rounded-3xl mb-5 text-center shadow-xl relative overflow-hidden">
        {/* BG design badge */}
        <div className="absolute -top-3 right-5 text-3xl opacity-15">{rank.badge}</div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center overflow-hidden shadow-md">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <User size={30} className="text-[#10b981]" />
            )}
          </div>

          <div>
            <h3 className="font-sans font-extrabold text-base tracking-tight text-white">
              {user ? user.displayName : "Anonymous Scanner"}
            </h3>
            <span className="text-[10px] text-gray-500 font-mono tracking-wider block mt-1 uppercase">
              {user?.isAnonymous === false ? user.email : "GUEST MODE (LOCAL SYNC ACTIVE)"}
            </span>
          </div>

          {authLoading ? (
            <div className="py-2">
              <RefreshCw className="animate-spin text-emerald-400" size={18} />
            </div>
          ) : user ? (
            <button
              id="profile-logout-btn"
              onClick={handleLogout}
              className="mt-2 py-1.5 px-4 bg-red-500/20 text-red-300 font-semibold border border-red-500/10 rounded-xl hover:bg-red-500/30 text-xs transition-all"
            >
              Sign Out Account
            </button>
          ) : (
            <button
              id="profile-login-btn"
              onClick={handleGoogleLogin}
              className="mt-2 w-full py-2.5 px-4 bg-[#10b981] hover:bg-emerald-400 text-black font-sans font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={14} />
              <span>Personalize with Google Account</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats Dashboard Bento Grid */}
      <h3 className="font-sans font-semibold text-xs tracking-wider uppercase text-gray-500 mb-2.5">Consciousness Metrics</h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#11161d] p-4 rounded-2xl border border-[#1b2530] text-center">
          <span className="text-[10px] text-gray-400 uppercase font-mono block">Scanned Items</span>
          <span className="text-xl font-sans font-black block mt-1 text-[#10b981]">{stats.totalScans}</span>
        </div>

        <div className="bg-[#11161d] p-4 rounded-2xl border border-[#1b2530] text-center">
          <span className="text-[10px] text-gray-400 uppercase font-mono block">Avg Truth Score</span>
          <span className={`text-xl font-sans font-black block mt-1 ${stats.avgTruthScore >= 60 ? "text-[#10b981]" : "text-amber-400"}`}>
            {stats.avgTruthScore}/100
          </span>
        </div>

        <div className="bg-[#11161d] p-4 rounded-2xl border border-[#1b2530]/80 text-center flex items-center justify-center gap-2 col-span-2">
          <ShieldAlert className="text-red-400 shrink-0" size={16} />
          <div>
            <span className="text-[10px] text-gray-400 uppercase font-mono block text-left">Toxic Dyes & Oil Flagged</span>
            <span className="text-sm font-sans font-bold text-left block text-red-400">
              {stats.redFlagsCaught} High Concerns Blocked
            </span>
          </div>
        </div>
      </div>

      {/* Rank progress card */}
      <div className="bg-[#11161d] p-5 rounded-3xl border border-[#1b2530]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Award className="text-[#10b981]" size={18} />
            <span className="text-xs font-bold text-gray-300">Consumer Status Rank</span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
            {rank.title}
          </span>
        </div>

        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden mb-2.5">
          <div className="h-full bg-gradient-to-r from-amber-400 to-[#10b981] rounded-full" style={{ width: `${rank.percent}%` }}></div>
        </div>

        <p className="text-[10px] text-gray-500 font-sans leading-relaxed">
          Level up your Health Consciousness score card by continuing to scan physical items. Achieve a 10-count scan card to unlock the "Conscious Master" designation badge.
        </p>
      </div>
    </div>
  );
}
