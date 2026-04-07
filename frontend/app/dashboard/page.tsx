"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import DarkModeToggle from "../../components/DarkModeToggle";

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative h-screen flex flex-col items-center justify-center bg-stone-50 dark:bg-stone-950 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/8 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-5 right-5 z-10">
        <DarkModeToggle />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Avatar */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md scale-110" />
          <img
            src={user?.image}
            alt={user?.name}
            className="relative w-24 h-24 rounded-full border-2 border-white dark:border-stone-800 shadow-xl object-cover"
          />
          <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-stone-900" />
        </div>

        {/* Name & email */}
        <h1
          className="text-4xl text-stone-900 dark:text-stone-50 mb-1"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {user?.name}
        </h1>
        <p className="text-sm text-stone-400 dark:text-stone-500 font-light mb-8">
          {user?.email}
        </p>

        {/* Stats row — placeholder, feel free to wire up real data */}
        <div className="flex gap-6 mb-10">
          {[["Projects", "12"], ["Tasks", "4"], ["Team", "3"]].map(([label, val]) => (
            <div key={label} className="flex flex-col items-center px-5 py-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
              <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">{val}</span>
              <span className="text-xs text-stone-400 dark:text-stone-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={async () => { await logout(); router.push("/login"); }}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-sm font-medium hover:border-red-300 dark:hover:border-red-800 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 shadow-sm"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="transition-transform group-hover:-translate-x-0.5">
            <path d="M3 1H12C12.5523 1 13 1.44772 13 2V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V10H3V13H12V2H3V5H2V2C2 1.44772 2.44772 1 3 1ZM5.35355 4.64645L2.85355 7.14645C2.65829 7.34171 2.65829 7.65829 2.85355 7.85355L5.35355 10.3536L6.06066 9.64645L4.06066 7.64645H9V6.64645H4.06066L6.06066 4.64645L5.35355 4.64645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}