import { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, Activity, User, Truck, Settings } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    timestamp: "2024-01-15 14:30:22",
    user: "John Smith",
    action: "Vehicle Assignment",
    details: "Assigned vehicle V001 to driver D001",
    type: "fleet",
    status: "success"
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:28:15",
    user: "Sarah Admin",
    action: "User Created",
    details: "Created new user account for Mike Wilson",
    type: "user",
    status: "success"
  },
  {
    id: 3,
    timestamp: "2024-01-15 14:25:33",
    user: "System",
    action: "Compliance Alert",
    details: "Driver license expiring in 30 days - D002",
    type: "compliance",
    status: "warning"
  },
  {
    id: 4,
    timestamp: "2024-01-15 14:20:45",
    user: "Lisa Brown",
    action: "Role Update",
    details: "Changed user role from Driver to Operator - U005",
    type: "user",
    status: "success"
  },
  {
    id: 5,
    timestamp: "2024-01-15 14:15:12",
    user: "System",
    action: "Maintenance Due",
    details: "Vehicle V003 maintenance scheduled",
    type: "fleet",
    status: "info"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "user": return User;
    case "fleet": return Truck;
    case "compliance": return Activity;
    default: return Settings;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "success": return "bg-success text-success-foreground";
    case "warning": return "bg-warning text-warning-foreground";
    case "info": return "bg-info text-info-foreground";
    case "error": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const ActivityLog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || activity.type === typeFilter;
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Activity Log" 
        subtitle="Monitor all system activities and user actions"
      />
      
      <main className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="fleet">Fleet</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Activity Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities ({filteredActivities.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => {
                  const TypeIcon = getTypeIcon(activity.type);
                  return (
                    <TableRow key={activity.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {activity.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">
                        {activity.user}
                      </TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {activity.details}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-4 h-4 text-muted-foreground" />
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(activity.status)} variant="secondary">
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ActivityLog;