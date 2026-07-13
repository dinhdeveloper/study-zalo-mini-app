// src/components/global-loading.tsx
import { useEffect, useState } from "react";
import { Box, Spinner } from "zmp-ui";
import { subscribeLoading } from "@/services/core/loadingStore";

function GlobalLoading() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return subscribeLoading(setIsLoading);
  }, []);

  if (!isLoading) return null;

  return (
    <Box
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        backgroundColor: "rgba(120, 120, 120, 0.35)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <Spinner visible />
    </Box>
  );
}

export default GlobalLoading;