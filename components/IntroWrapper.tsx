"use client";

import { ReactNode, useEffect, useState } from "react";
import IntroScreen from "@/components/IntroScreen";

type Props = {
  children: ReactNode;
};

export default function IntroWrapper({ children }: Props) {
  const [mounted, setMounted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
        const seen=false;
      if (!seen) {
        setShowIntro(true);
      } else {
        setIntroDone(true);
      }
    } catch (e) {
      // sessionStorage not available or blocked
      setIntroDone(true);
    }
  }, []);

  if (!mounted) return null; // avoid hydration mismatch

  return (
    <>
      {showIntro && !introDone ? (
        <IntroScreen
          onFinish={() => {
            try {
              sessionStorage.setItem("introSeen", "true");
            } catch (e) {}
            setIntroDone(true);
            setShowIntro(false);
          }}
        />
      ) : null}

      {introDone ? children : null}
    </>
  );
}
