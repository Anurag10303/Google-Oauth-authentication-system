"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import Spinner from "../../components/Spinner";
import DarkModeToggle from "../../components/DarkModeToggle";
import { CredentialResponse } from "@react-oauth/google";

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
      <div className="relative h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 overflow-hidden">

        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />

        {/* Warm glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute top-5 right-5 z-10">
          <DarkModeToggle />
        </div>

        <div className="relative z-10 w-full max-w-sm mx-4">
          {/* Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl dark:shadow-stone-950/60 shadow-stone-200/80 p-10 text-center">

            {/* Logo mark */}
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-amber-400/10 dark:bg-amber-400/10 border border-amber-400/20">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2L13.5 8.5H20.5L14.8 12.7L17.1 19.5L11 15.3L4.9 19.5L7.2 12.7L1.5 8.5H8.5L11 2Z" fill="#f59e0b" />
              </svg>
            </div>

            <h1
              className="text-3xl mb-1 text-stone-900 dark:text-stone-50"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Welcome back
            </h1>
            <p className="text-sm text-stone-400 dark:text-stone-500 mb-8 font-light">
              Sign in to continue to your workspace
            </p>

            <div className="flex justify-center">
              {loading ? (
                <Spinner />
              ) : (
                <GoogleLogin onSuccess={handleSuccess} onError={() => {}} />
              )}
            </div>

            <p className="mt-8 text-xs text-stone-300 dark:text-stone-700">
              By signing in, you agree to our Terms & Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}