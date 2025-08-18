import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { KPICard } from "@/components/admin/KPICard";
import { FleetStatusWidget } from "@/components/admin/FleetStatusWidget";
import { RecentActivityWidget } from "@/components/admin/RecentActivityWidget";
import { AlertsWidget } from "@/components/admin/AlertsWidget";
import { UserOverviewWidget } from "@/components/admin/UserOverviewWidget";
import { Truck, Route, Package, Clock, AlertTriangle, CheckCircle, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Welcome back, Admin" 
        subtitle="Monitor and control your fleet, users, system health, and compliance from one place"
      />
      
      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Active Vehicles"
            value={156}
            change="+12%"
            changeType="positive"
            icon={Truck}
            description="vs last month"
          />
          <KPICard
            title="Total Trips"
            value="2,847"
            change="+8%"
            changeType="positive"
            icon={Route}
            description="this month"
          />
          <KPICard
            title="Jobs in Progress"
            value={43}
            change="-3%"
            changeType="negative"
            icon={Package}
            description="currently active"
          />
          <KPICard
            title="SLA Compliance"
            value="98.2%"
            change="+0.5%"
            changeType="positive"
            icon={CheckCircle}
            description="delivery rate"
          />
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Open Incidents"
            value={7}
            change="-2"
            changeType="positive"
            icon={AlertTriangle}
            description="vs yesterday"
          />
          <KPICard
            title="Total Users"
            value={527}
            change="+15"
            changeType="positive"
            icon={Users}
            description="active accounts"
          />
          <KPICard
            title="Avg Response Time"
            value="4.2 min"
            change="-30s"
            changeType="positive"
            icon={Clock}
            description="to incidents"
          />
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <FleetStatusWidget />
          </div>
          <div className="xl:col-span-1">
            <UserOverviewWidget />
          </div>
          <div className="xl:col-span-1">
            <RecentActivityWidget />
          </div>
        </div>

        {/* Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsWidget />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-gradient-card border rounded-lg hover:shadow-md transition-shadow text-left">
                <div className="text-sm font-medium">View Fleet</div>
                <div className="text-xs text-muted-foreground">Monitor vehicles</div>
              </button>
              <button className="p-4 bg-gradient-card border rounded-lg hover:shadow-md transition-shadow text-left">
                <div className="text-sm font-medium">Manage Users</div>
                <div className="text-xs text-muted-foreground">User & roles</div>
              </button>
              <button className="p-4 bg-gradient-card border rounded-lg hover:shadow-md transition-shadow text-left">
                <div className="text-sm font-medium">Audit Log</div>
                <div className="text-xs text-muted-foreground">View activity</div>
              </button>
              <button className="p-4 bg-gradient-card border rounded-lg hover:shadow-md transition-shadow text-left">
                <div className="text-sm font-medium">Create Incident</div>
                <div className="text-xs text-muted-foreground">Report issue</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
