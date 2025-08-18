import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Truck, Navigation, AlertCircle } from "lucide-react";

const fleetData = [
  { id: "V001", status: "active", location: "Downtown Depot", driver: "John Smith" },
  { id: "V002", status: "maintenance", location: "Service Center", driver: "N/A" },
  { id: "V003", status: "active", location: "Route 42", driver: "Sarah Jones" },
  { id: "V004", status: "idle", location: "North Terminal", driver: "Mike Wilson" },
  { id: "V005", status: "active", location: "Highway 101", driver: "Lisa Brown" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success text-success-foreground";
    case "maintenance":
      return "bg-warning text-warning-foreground";
    case "idle":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return <Navigation className="w-3 h-3" />;
    case "maintenance":
      return <AlertCircle className="w-3 h-3" />;
    case "idle":
      return <Truck className="w-3 h-3" />;
    default:
      return <Truck className="w-3 h-3" />;
  }
};

export function FleetStatusWidget() {
  return (
    <Card className="bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Fleet Status
        </CardTitle>
        <Button variant="outline" size="sm">
          View Map
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fleetData.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                  {getStatusIcon(vehicle.status)}
                  <span className="ml-1 capitalize">{vehicle.status}</span>
                </Badge>
                <div>
                  <div className="font-medium text-sm">{vehicle.id}</div>
                  <div className="text-xs text-muted-foreground">{vehicle.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{vehicle.driver}</div>
                <div className="text-xs text-muted-foreground">Driver</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}