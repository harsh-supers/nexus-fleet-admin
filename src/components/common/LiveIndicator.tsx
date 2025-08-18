import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiveIndicatorProps {
  isRefreshing: boolean;
  lastUpdate: Date | null;
  onRefresh: () => void;
  className?: string;
}

export function LiveIndicator({ 
  isRefreshing, 
  lastUpdate, 
  onRefresh, 
  className 
}: LiveIndicatorProps) {
  const [timeAgo, setTimeAgo] = useState<string>("Never");

  useEffect(() => {
    const updateTimeAgo = () => {
      if (!lastUpdate) {
        setTimeAgo("Never");
        return;
      }

      const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000);
      if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        setTimeAgo(`${Math.floor(seconds / 60)}m ago`);
      } else {
        setTimeAgo(`${Math.floor(seconds / 3600)}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 1000);
    return () => clearInterval(interval);
  }, [lastUpdate]);

  const isOnline = navigator.onLine;
  const isStale = lastUpdate && (Date.now() - lastUpdate.getTime()) > 120000; // 2 minutes

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Connection Status */}
      <div className="flex items-center gap-1">
        {isOnline ? (
          <Wifi className="w-3 h-3 text-success" />
        ) : (
          <WifiOff className="w-3 h-3 text-destructive" />
        )}
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            isOnline ? "border-success/20 text-success" : "border-destructive/20 text-destructive"
          )}
        >
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </div>

      {/* Last Update */}
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs",
          isStale ? "border-warning/20 text-warning" : "border-muted/20 text-muted-foreground"
        )}
      >
        Updated {timeAgo}
      </Badge>

      {/* Refresh Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing || !isOnline}
        className="h-6 px-2"
      >
        <RefreshCw className={cn(
          "w-3 h-3",
          isRefreshing && "animate-spin"
        )} />
      </Button>

      {/* Live Indicator Dot */}
      <div className="flex items-center gap-1">
        <div className={cn(
          "w-2 h-2 rounded-full",
          isRefreshing ? "bg-info animate-pulse" :
          isStale ? "bg-warning" :
          isOnline ? "bg-success" : "bg-destructive"
        )} />
        <span className="text-xs text-muted-foreground">
          {isRefreshing ? "Syncing..." : "Live"}
        </span>
      </div>
    </div>
  );
}