import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, LogIn, UserPlus, Truck, AlertTriangle } from "lucide-react";

const recentActivities = [
  {
    id: 1,
    type: "login",
    user: "John Smith",
    action: "logged in",
    timestamp: "2 minutes ago",
    icon: LogIn,
  },
  {
    id: 2,
    type: "assignment",
    user: "Sarah Jones",
    action: "assigned to Route 42",
    timestamp: "15 minutes ago",
    icon: Truck,
  },
  {
    id: 3,
    type: "alert",
    user: "System",
    action: "Vehicle V002 maintenance alert",
    timestamp: "32 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: "user_created",
    user: "Admin",
    action: "created user Mike Wilson",
    timestamp: "1 hour ago",
    icon: UserPlus,
  },
  {
    id: 5,
    type: "login",
    user: "Lisa Brown",
    action: "logged in",
    timestamp: "2 hours ago",
    icon: LogIn,
  },
];

const getActivityColor = (type: string) => {
  switch (type) {
    case "login":
      return "bg-info text-info-foreground";
    case "assignment":
      return "bg-success text-success-foreground";
    case "alert":
      return "bg-warning text-warning-foreground";
    case "user_created":
      return "bg-primary text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function RecentActivityWidget() {
  return (
    <Card className="bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => window.location.href = '/activity'}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                <activity.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{activity.user}</span>
                  <span className="text-sm text-muted-foreground">{activity.action}</span>
                </div>
                <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}