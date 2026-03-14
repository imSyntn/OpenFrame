"use client";

import { AuthWrapper } from "@/components/auth";
import { useVerifyEmailToken } from "@/hooks";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const { isLoading, isError } = useVerifyEmailToken(token!);
  return (
    <AuthWrapper>
      <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
        {isLoading && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Verifying your email</h1>
              <p className="text-sm text-muted-foreground">
                Please wait while we verify your email address.
              </p>
            </div>
          </>
        )}

        {!isLoading && !isError && (
          <>
            <CheckCircle2 className="h-14 w-14 text-green-600" />
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Email verified 🎉</h1>
              <p className="text-sm text-muted-foreground">
                Your email has been successfully verified. You can now continue
                using your account.
              </p>
            </div>
          </>
        )}

        {!isLoading && isError && (
          <>
            <XCircle className="h-14 w-14 text-red-600" />
            <div className="space-y-2">
              <h1 className="text-xl font-semibold">Verification failed</h1>
              <p className="text-sm text-muted-foreground">
                This verification link is invalid or has expired.
              </p>
            </div>
          </>
        )}
      </div>
    </AuthWrapper>
  );
}
