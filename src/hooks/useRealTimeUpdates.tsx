import { useState, useEffect, useCallback } from "react";

interface UseRealTimeUpdatesProps {
  interval?: number;
  enabled?: boolean;
}

export function useRealTimeUpdates({ 
  interval = 60000, // 1 minute default
  enabled = true 
}: UseRealTimeUpdatesProps = {}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [refreshCallbacks, setRefreshCallbacks] = useState<Map<string, () => Promise<void>>>(new Map());

  // Register a callback for refreshing data
  const registerRefreshCallback = useCallback((key: string, callback: () => Promise<void>) => {
    setRefreshCallbacks(prev => new Map(prev.set(key, callback)));
  }, []);

  // Unregister a callback
  const unregisterRefreshCallback = useCallback((key: string) => {
    setRefreshCallbacks(prev => {
      const newMap = new Map(prev);
      newMap.delete(key);
      return newMap;
    });
  }, []);

  // Manual refresh function
  const refreshData = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      // Execute all registered callbacks in parallel
      await Promise.all(Array.from(refreshCallbacks.values()).map(callback => callback()));
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshCallbacks, isRefreshing]);

  // Auto-refresh effect
  useEffect(() => {
    if (!enabled || refreshCallbacks.size === 0) return;

    const intervalId = setInterval(refreshData, interval);
    return () => clearInterval(intervalId);
  }, [enabled, interval, refreshData, refreshCallbacks.size]);

  // Format time since last update
  const getTimeSinceUpdate = useCallback(() => {
    if (!lastUpdate) return "Never";
    
    const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  }, [lastUpdate]);

  return {
    isRefreshing,
    lastUpdate,
    refreshData,
    registerRefreshCallback,
    unregisterRefreshCallback,
    getTimeSinceUpdate
  };
}