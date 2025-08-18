import { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { FileText, Database, Truck, Globe, CheckCircle, AlertCircle, Settings } from "lucide-react";

const integrations = [
  {
    id: "gps-tracking",
    name: "GPS Tracking Service",
    description: "Real-time vehicle location and route optimization",
    status: "connected",
    icon: Truck,
    type: "Fleet Management"
  },
  {
    id: "erp-system",
    name: "ERP Integration",
    description: "Sync data with your existing enterprise resource planning system",
    status: "disconnected",
    icon: Database,
    type: "Business Systems"
  },
  {
    id: "fuel-cards",
    name: "Fuel Card Provider",
    description: "Track fuel consumption and costs across your fleet",
    status: "connected",
    icon: FileText,
    type: "Financial"
  },
  {
    id: "telematics",
    name: "Telematics Platform",
    description: "Vehicle diagnostics and driver behavior monitoring",
    status: "pending",
    icon: Globe,
    type: "Fleet Management"
  },
  {
    id: "maintenance",
    name: "Maintenance System",
    description: "Scheduled maintenance and service history tracking",
    status: "connected",
    icon: Settings,
    type: "Operations"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "connected": return "bg-success text-success-foreground";
    case "pending": return "bg-warning text-warning-foreground";
    case "disconnected": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected": return CheckCircle;
    case "pending": 
    case "disconnected": return AlertCircle;
    default: return AlertCircle;
  }
};

const Integrations = () => {
  const [integrationsState, setIntegrationsState] = useState(integrations);

  const toggleIntegration = (id: string) => {
    setIntegrationsState(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { 
              ...integration, 
              status: integration.status === "connected" ? "disconnected" : "connected" 
            }
          : integration
      )
    );
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Integrations" 
        subtitle="Connect with third-party services and manage data flows"
      />
      
      <main className="p-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {integrationsState.filter(i => i.status === "connected").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {integrationsState.filter(i => i.status === "pending").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Setup</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{integrationsState.length}</p>
                  <p className="text-sm text-muted-foreground">Total Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationsState.map((integration) => {
            const IconComponent = integration.icon;
            const StatusIcon = getStatusIcon(integration.status);
            
            return (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {integration.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-4 h-4 text-muted-foreground" />
                      <Badge className={getStatusColor(integration.status)} variant="secondary">
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {integration.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Switch 
                      checked={integration.status === "connected"}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add New Integration */}
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Need a Custom Integration?</h3>
            <p className="text-muted-foreground mb-4">
              Connect with any service using our API or request a custom integration
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline">View API Docs</Button>
              <Button>Request Integration</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Integrations;