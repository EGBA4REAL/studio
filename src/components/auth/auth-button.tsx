
'use client';

import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { signIn } from '@/app/actions';
import { Loader2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const provider = new GoogleAuthProvider();

interface AuthButtonProps {
    isFreeTrial?: boolean;
}

export function AuthButton({ isFreeTrial = false }: AuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        await signIn(idToken);
      }
    } catch (error: any) {
      console.error('Authentication failed', error);
       toast({
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred during sign-in.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (isFreeTrial) {
    return (
        <Button size="lg" className="group" onClick={handleSignIn} disabled={loading}>
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Redirecting...
                </>
            ) : (
                <>
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
            )}
        </Button>
    )
  }

  return (
    <Button onClick={handleSignIn} disabled={loading}>
      {loading ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </>
      ) : (
        'Sign In with Google'
      )}
    </Button>
  );
}
