import React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  MailCheck,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useSendVerificationLink } from "@/hooks";
import { useUserStore } from "@/store";

export function VerifyEmail() {
  const { mutateAsync, isPending, isSuccess, error } =
    useSendVerificationLink();
  const email = useUserStore((state) => state.email);

  const handleVerify = async () => {
    try {
      await mutateAsync({ email });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
          <MailCheck className="mr-2 h-4 w-4" />
          Verify your email
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm text-center space-y-5">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2">
            <MailCheck className="h-5 w-5 text-blue-600" />
            Verify your email
          </DialogTitle>
          <DialogDescription>
            We'll send a verification link to your email address.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center">
          <MailCheck className="h-12 w-12 text-blue-600" />
        </div>

        {!isSuccess && (
          <Button
            onClick={handleVerify}
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send verification link
              </>
            )}
          </Button>
        )}

        {isSuccess && (
          <p className="text-sm text-success font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Verification link sent! Please check your inbox.
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Failed to send verification email. Please try again.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
