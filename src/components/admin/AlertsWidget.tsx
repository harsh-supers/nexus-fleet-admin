import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Vehicle V002 Engine Failure",
    description: "Immediate attention required",
    timestamp: "5 minutes ago",
  },
  {
    id: 2,
    type: "warning",
    title: "Driver License Expiring",
    description: "John Smith - expires in 7 days",
    timestamp: "1 hour ago",
  },
  {
    id: 3,
    type: "info",
    title: "Route Optimization Complete",
    description: "New routes generated for tomorrow",
    timestamp: "3 hours ago",
  },
  {
    id: 4,
    type: "warning",
    title: "SLA Breach Risk",
    description: "Delivery D12345 may be delayed",
    timestamp: "4 hours ago",
  },
];

const getAlertConfig = (type: string) => {
  switch (type) {
    case "critical":
      return {
        icon: AlertCircle,
        color: "bg-destructive text-destructive-foreground",
        bgColor: "bg-destructive/10 border-destructive/20",
      };
    case "warning":
      return {
        icon: AlertTriangle,
        color: "bg-warning text-warning-foreground",
        bgColor: "bg-warning/10 border-warning/20",
      };
    case "info":
      return {
        icon: Info,
        color: "bg-info text-info-foreground",
        bgColor: "bg-info/10 border-info/20",
      };
    case "success":
      return {
        icon: CheckCircle,
        color: "bg-success text-success-foreground",
        bgColor: "bg-success/10 border-success/20",
      };
    default:
      return {
        icon: Info,
        color: "bg-muted text-muted-foreground",
        bgColor: "bg-muted/10",
      };
  }
};

export function AlertsWidget() {
  return (
    <Card className="bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Active Alerts
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/incidents'}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getAlertConfig(alert.type);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${config.bgColor}`}
              >
                <div className="flex items-start gap-3">
                  <Badge className={config.color} variant="secondary">
                    <Icon className="w-3 h-3" />
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{alert.title}</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}