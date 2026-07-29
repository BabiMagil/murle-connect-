import NetInfo from "@react-native-community/netinfo";
import { useCallback, useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  const check = useCallback(async () => {
    setChecking(true);
    const state = await NetInfo.fetch();
    setIsConnected(Boolean(state.isConnected && state.isInternetReachable !== false));
    setChecking(false);
  }, []);

  useEffect(() => {
    check();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return () => unsubscribe();
  }, [check]);

  return { isConnected, checking, retry: check };
}
