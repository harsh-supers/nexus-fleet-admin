import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { KPICard } from "@/components/admin/KPICard";
import { FleetMapWidget } from "@/components/admin/FleetMapWidget";
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
      
      <main className="p-6 space-y-8">
        {/* Primary KPI Cards */}
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

        {/* Secondary KPI Cards */}
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

        {/* Fleet Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FleetMapWidget />
          </div>
          <div>
            <UserOverviewWidget />
          </div>
        </div>

        {/* Activity and Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivityWidget />
          <AlertsWidget />
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gradient-card rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => window.location.href = '/master-data'}
              className="p-4 bg-background border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="text-sm font-medium group-hover:text-primary transition-colors">View Fleet</div>
              <div className="text-xs text-muted-foreground">Monitor vehicles</div>
            </button>
            <button 
              onClick={() => window.location.href = '/users'}
              className="p-4 bg-background border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="text-sm font-medium group-hover:text-primary transition-colors">Manage Users</div>
              <div className="text-xs text-muted-foreground">User & roles</div>
            </button>
            <button 
              onClick={() => window.location.href = '/activity'}
              className="p-4 bg-background border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="text-sm font-medium group-hover:text-primary transition-colors">Audit Log</div>
              <div className="text-xs text-muted-foreground">View activity</div>
            </button>
            <button 
              onClick={() => window.location.href = '/incidents'}
              className="p-4 bg-background border rounded-lg hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className="text-sm font-medium group-hover:text-primary transition-colors">Create Incident</div>
              <div className="text-xs text-muted-foreground">Report issue</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
