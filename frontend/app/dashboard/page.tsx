"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import DarkModeToggle from "../../components/DarkModeToggle";

// Format a date string nicely e.g. "April 7, 2025"
function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Returns initials from a full name
function getInitials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f7f5f2] dark:bg-[#0e0d0b]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#f7f5f2] dark:bg-[#0e0d0b] flex flex-col items-center justify-center overflow-hidden px-4">

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-[0.08] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Warm radial glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-amber-400/20 dark:border-amber-400/15 rounded-tl-sm" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-400/20 dark:border-amber-400/15 rounded-br-sm" />

      {/* Top bar */}
      <div className="absolute top-6 left-0 right-0 px-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L7.5 4.5H11.5L8.5 6.8L9.8 10.5L6 8.2L2.2 10.5L3.5 6.8L0.5 4.5H4.5L6 1Z" fill="white" />
            </svg>
          </div>
          <span
            className="text-sm font-semibold tracking-tight text-stone-700 dark:text-stone-300"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Pramyan
          </span>
        </div>
        <DarkModeToggle />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-[420px]">
        <div
          className="
            bg-white/80 dark:bg-[#161512]/80
            backdrop-blur-xl
            border border-stone-200/80 dark:border-stone-800/60
            rounded-3xl
            shadow-[0_8px_60px_-12px_rgba(0,0,0,0.12)]
            dark:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5)]
            p-8
          "
        >
          {/* Avatar + Status */}
          <div className="flex flex-col items-center mb-7">
            <div className="relative mb-4">
              {/* Halo ring */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-amber-300/50 to-amber-500/20 dark:from-amber-400/30 dark:to-amber-600/10 blur-[6px]" />
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.name ?? "User"}
                  className="relative w-20 h-20 rounded-full border-2 border-white dark:border-stone-800 object-cover shadow-lg"
                />
              ) : (
                <div className="relative w-20 h-20 rounded-full border-2 border-white dark:border-stone-800 shadow-lg bg-amber-400 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white" style={{ fontFamily: "'DM Serif Display', serif" }}>
                    {getInitials(user?.name)}
                  </span>
                </div>
              )}
              {/* Online dot */}
              <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white dark:border-stone-900 shadow-sm" />
            </div>

            <h1
              className="text-[1.75rem] leading-tight text-stone-900 dark:text-stone-50 text-center"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {user?.name ?? "—"}
            </h1>
            <p className="text-[13px] text-stone-400 dark:text-stone-500 mt-0.5">
              Active account
            </p>
          </div>

          {/* ─── User Info: as required by PDF ─── */}
          <div className="rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-100 dark:border-stone-800/50 divide-y divide-stone-100 dark:divide-stone-800/50 mb-6 overflow-hidden">

            {/* Name */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400/10 dark:bg-amber-400/8 shrink-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 8c-3.31 0-6 1.34-6 3v.5h12V12.5c0-1.66-2.69-3-6-3z" fill="#f59e0b" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-medium">
                  Full Name
                </span>
                <span className="text-sm text-stone-800 dark:text-stone-200 font-medium truncate">
                  {user?.name ?? "—"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400/10 dark:bg-amber-400/8 shrink-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M1 3.5A.5.5 0 0 1 1.5 3h12a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-12a.5.5 0 0 1-.5-.5v-8zm1 .5v7h11V4H2zm5.5 3.29L3.35 4h8.3L7.5 7.29zM2 4.71l5 3.54a.5.5 0 0 0 .5 0L12.5 4.7V11H2V4.71z" fill="#f59e0b" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-medium">
                  Email Address
                </span>
                <span className="text-sm text-stone-800 dark:text-stone-200 font-medium truncate">
                  {user?.email ?? "—"}
                </span>
              </div>
            </div>

            {/* Account Created Date — required by PDF */}
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400/10 dark:bg-amber-400/8 shrink-0">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M4.5 1a.5.5 0 0 1 .5.5V2h5v-.5a.5.5 0 0 1 1 0V2h1.5A1.5 1.5 0 0 1 14 3.5v9A1.5 1.5 0 0 1 12.5 14h-10A1.5 1.5 0 0 1 1 12.5v-9A1.5 1.5 0 0 1 2.5 2H4v-.5a.5.5 0 0 1 .5-.5zM2.5 3A.5.5 0 0 0 2 3.5V5h11V3.5A.5.5 0 0 0 12.5 3h-10zM13 6H2v6.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V6z"
                    fill="#f59e0b"
                  />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-medium">
                  Account Created
                </span>
                <span className="text-sm text-stone-800 dark:text-stone-200 font-medium">
                  {/* user.createdAt should be populated from DB in your AuthContext/API */}
                  {formatDate(user?.createdAt)}
                </span>
              </div>
            </div>

          </div>

          {/* Logout button */}
          <button
            onClick={async () => {
              await logout();
              router.push("/login");
            }}
            className="
              group w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              border border-stone-200 dark:border-stone-700/60
              bg-stone-50 dark:bg-stone-900/40
              text-stone-500 dark:text-stone-400
              text-sm font-medium
              hover:border-red-300 dark:hover:border-red-800/70
              hover:text-red-500 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-950/20
              transition-all duration-200
            "
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 15 15"
              fill="none"
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            >
              <path
                d="M3 1H12C12.5523 1 13 1.44772 13 2V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V10H3V13H12V2H3V5H2V2C2 1.44772 2.44772 1 3 1ZM5.35355 4.64645L2.85355 7.14645C2.65829 7.34171 2.65829 7.65829 2.85355 7.85355L5.35355 10.3536L6.06066 9.64645L4.06066 7.64645H9V6.64645H4.06066L6.06066 4.64645L5.35355 4.64645Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            Sign out
          </button>
        </div>

        <p className="text-center text-[11px] text-stone-300 dark:text-stone-700 mt-5">
          Session secured with JWT
        </p>
      </div>
    </div>
  );
}