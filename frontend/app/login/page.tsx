"use client";

import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import Spinner from "../../components/Spinner";
import DarkModeToggle from "../../components/DarkModeToggle";

const features = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L8.5 5H13L9.5 7.5L11 12L7 9.5L3 12L4.5 7.5L1 5H5.5L7 1Z" fill="currentColor" />
      </svg>
    ),
    accent: "text-amber-500 dark:text-amber-400",
    text: "Sign in once — stay signed in securely",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7L5.5 11L12 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accent: "text-emerald-500 dark:text-emerald-400",
    text: "No passwords stored, ever",
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2.5" y="6" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 6V4.5a2 2 0 014 0V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    accent: "text-sky-500 dark:text-sky-400",
    text: "CORS-protected API, trusted origins only",
  },
];

export default function LoginPage() {
  const { setUser, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  const handleSuccess = async (res: CredentialResponse) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/google", { credential: res.credential });
      setUser(response.data.user);
      router.push("/dashboard");
    } catch {
      console.log("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <div className="min-h-screen flex bg-stone-50 dark:bg-[#0d0c0a] transition-colors duration-300">

        {/* ── LEFT PANEL ── */}
        <div className="relative hidden lg:flex flex-col flex-1 overflow-hidden bg-stone-50 dark:bg-[#0d0c0a] transition-colors duration-300">

          {/* Dot-grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.18] transition-opacity duration-300"
            style={{
              backgroundImage: "radial-gradient(circle, #c8c4bc 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Warm amber glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 18% 72%, rgba(251,191,36,0.09) 0%, transparent 68%)",
            }}
          />

          <div className="relative flex flex-col justify-between h-full p-14">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 dark:bg-amber-500 flex items-center justify-center shadow-sm transition-colors duration-300">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.8 5.8H15L10.8 8.7L12.5 14L8 11L3.5 14L5.2 8.7L1 5.8H6.2L8 1Z" fill="white" />
                </svg>
              </div>
              <span
                className="text-[19px] tracking-tight text-stone-900 dark:text-stone-100 font-semibold transition-colors duration-300"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Pramyan
              </span>
            </div>

            {/* Hero */}
            <div className="max-w-[460px]">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-wide text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-full px-3.5 py-1.5 mb-8 transition-colors duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                Now with Google Sign-In
              </span>

              <h1
                className="text-[52px] xl:text-[58px] leading-[1.04] tracking-[-2.5px] text-stone-900 dark:text-stone-50 mb-6 transition-colors duration-300"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Your workspace,{" "}
                <em className="not-italic text-amber-600 dark:text-amber-400">beautifully</em>
                <br />secured.
              </h1>

              <p className="text-[15px] leading-[1.8] text-stone-400 dark:text-stone-500 mb-12 max-w-[340px] transition-colors duration-300">
                One click to sign in. Your data stays yours — protected by
                Google OAuth 2.0 and JWT session management.
              </p>

              {/* Feature list */}
              <div className="flex flex-col gap-5 mb-14">
                {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-4">
                    <span className={`${f.accent} flex-shrink-0 transition-colors duration-300`}>
                      {f.icon}
                    </span>
                    <span className="text-[13.5px] text-stone-500 dark:text-stone-400 transition-colors duration-300">
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                {[
                  { num: "100%", label: "Passwordless" },
                  { num: "JWT", label: "HTTP-only cookies" },
                  { num: "0ms", label: "Token exposure" },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-8">
                    {i > 0 && (
                      <div className="w-px h-8 bg-stone-200 dark:bg-stone-700/70 transition-colors duration-300" />
                    )}
                    <div>
                      <p
                        className="text-[22px] text-stone-900 dark:text-stone-100 leading-none mb-1 transition-colors duration-300"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        {s.num}
                      </p>
                      <p className="text-[11px] text-stone-400 dark:text-stone-600 transition-colors duration-300">
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial + footer */}
            <div className="max-w-[360px]">
              <div className="bg-white dark:bg-stone-900/70 border border-stone-100 dark:border-stone-800 rounded-2xl p-5 mb-7 transition-colors duration-300">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="#f59e0b">
                      <path d="M5.5 1L6.6 4H10L7.2 6L8.3 9.5L5.5 7.5L2.7 9.5L3.8 6L1 4H4.4L5.5 1Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[12.5px] text-stone-400 dark:text-stone-500 leading-relaxed mb-4 transition-colors duration-300">
                  "The cleanest auth setup I've seen — signed in with one click and was in my dashboard instantly."
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-800 dark:text-amber-400 text-[10px] font-semibold flex items-center justify-center transition-colors duration-300">
                    SR
                  </div>
                  <div>
                    <p className="text-[11.5px] font-medium text-stone-700 dark:text-stone-300 transition-colors duration-300">Sanya R.</p>
                    <p className="text-[10.5px] text-stone-300 dark:text-stone-600 transition-colors duration-300">Product Designer</p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-300 dark:text-stone-700 transition-colors duration-300">
                © 2025 Pramyan · Built by Anurag Singh
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="relative flex flex-col w-full lg:w-[440px] lg:min-w-[440px] bg-white dark:bg-[#111009] lg:border-l border-stone-100 dark:border-stone-900 min-h-screen transition-colors duration-300">

          {/* Top amber accent line */}
          <div className="h-[2.5px] w-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 dark:from-amber-700 dark:via-amber-500 dark:to-amber-700 opacity-70" />

          {/* Mobile: logo row */}
          <div className="flex lg:hidden items-center justify-between p-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-400 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.8 5.8H15L10.8 8.7L12.5 14L8 11L3.5 14L5.2 8.7L1 5.8H6.2L8 1Z" fill="white" />
                </svg>
              </div>
              <span
                className="text-lg text-stone-900 dark:text-stone-100 font-semibold transition-colors duration-300"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Pramyan
              </span>
            </div>
            <DarkModeToggle />
          </div>

          {/* Desktop: dark mode toggle */}
          <div className="absolute top-5 right-5 hidden lg:block z-10">
            <DarkModeToggle />
          </div>

          {/* Form */}
          <div className="flex-1 flex flex-col justify-center px-10 lg:px-12 py-12">

            {/* Small brand mark (desktop) */}
            <div className="hidden lg:flex items-center gap-2 mb-12">
              <div className="w-7 h-7 bg-amber-400 dark:bg-amber-500 rounded-lg flex items-center justify-center transition-colors duration-300">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L9.8 5.8H15L10.8 8.7L12.5 14L8 11L3.5 14L5.2 8.7L1 5.8H6.2L8 1Z" fill="white" />
                </svg>
              </div>
              <span
                className="text-[15px] text-stone-900 dark:text-stone-100 font-semibold transition-colors duration-300"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                Pramyan
              </span>
            </div>

            <p className="text-[10.5px] font-semibold tracking-[0.18em] text-stone-300 dark:text-stone-600 uppercase mb-4 transition-colors duration-300">
              Welcome back
            </p>
            <h2
              className="text-[34px] leading-[1.06] tracking-[-1.3px] text-stone-900 dark:text-stone-50 mb-3 transition-colors duration-300"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Sign in to your
              <br />
              workspace
            </h2>
            <p className="text-[13.5px] text-stone-400 dark:text-stone-500 leading-relaxed mb-11 transition-colors duration-300">
              No account needed — Google handles everything.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3.5 mb-8">
              <div className="flex-1 h-px bg-stone-100 dark:bg-stone-800 transition-colors duration-300" />
              <span className="text-[10px] tracking-[0.14em] font-semibold text-stone-300 dark:text-stone-600 uppercase whitespace-nowrap transition-colors duration-300">
                Continue with
              </span>
              <div className="flex-1 h-px bg-stone-100 dark:bg-stone-800 transition-colors duration-300" />
            </div>

            {/* Google button */}
            <div className="flex justify-center mb-8">
              {loading ? (
                <Spinner />
              ) : (
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {}}
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="300"
                />
              )}
            </div>

            {/* Security pill */}
            <div className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-stone-100 dark:border-stone-800/70 transition-colors duration-300">
              <svg width="11" height="13" viewBox="0 0 12 14" fill="none">
                <path
                  d="M6 1L1.5 3.5v4C1.5 10.3 3.5 12.8 6 13.5c2.5-.7 4.5-3.2 4.5-6V3.5L6 1z"
                  className="fill-emerald-500"
                />
              </svg>
              <span className="text-[11px] text-stone-400 dark:text-stone-600 transition-colors duration-300">
                Secured by Google OAuth 2.0
              </span>
            </div>

            {/* Terms */}
            <p className="mt-7 text-center text-[11px] leading-relaxed text-stone-300 dark:text-stone-700 transition-colors duration-300">
              By continuing, you agree to our{" "}
              <span className="underline underline-offset-2 cursor-pointer hover:text-stone-500 dark:hover:text-stone-500 transition-colors">
                Terms
              </span>{" "}
              and{" "}
              <span className="underline underline-offset-2 cursor-pointer hover:text-stone-500 dark:hover:text-stone-500 transition-colors">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>

      </div>
    </GoogleOAuthProvider>
  );
}