import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, UserX, Crown } from "lucide-react";

const userStats = [
  { role: "Admins", count: 5, color: "text-primary", bgColor: "bg-primary/10" },
  { role: "Operators", count: 24, color: "text-info", bgColor: "bg-info/10" },
  { role: "Drivers", count: 156, color: "text-success", bgColor: "bg-success/10" },
  { role: "Customers", count: 342, color: "text-warning", bgColor: "bg-warning/10" },
];

const recentUsers = [
  { name: "Mike Wilson", role: "Driver", status: "active", joinDate: "Today" },
  { name: "Emma Davis", role: "Operator", status: "active", joinDate: "Yesterday" },
  { name: "Tom Anderson", role: "Customer", status: "pending", joinDate: "2 days ago" },
];

export function UserOverviewWidget() {
  return (
    <Card className="bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Overview
        </CardTitle>
        <Button variant="outline" size="sm">
          Manage Users
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Statistics */}
        <div className="grid grid-cols-2 gap-4">
          {userStats.map((stat) => (
            <div
              key={stat.role}
              className={`p-3 rounded-lg ${stat.bgColor} border`}
            >
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.count}
              </div>
              <div className="text-sm text-muted-foreground">{stat.role}</div>
            </div>
          ))}
        </div>

        {/* Recent Users */}
        <div>
          <h4 className="text-sm font-medium mb-3">Recent Additions</h4>
          <div className="space-y-2">
            {recentUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user.status === "active" ? (
                    <UserCheck className="w-4 h-4 text-success" />
                  ) : (
                    <UserX className="w-4 h-4 text-warning" />
                  )}
                  <span className="text-xs text-muted-foreground">{user.joinDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}