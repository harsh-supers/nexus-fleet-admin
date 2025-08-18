import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Maximize2, Filter, Navigation, AlertCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock fleet data with coordinates
const fleetData = [
  { 
    id: "V001", 
    status: "active", 
    location: "Downtown Depot", 
    driver: "John Smith",
    lat: 40.7589, 
    lng: -73.9851,
    lastUpdate: "2 min ago"
  },
  { 
    id: "V002", 
    status: "maintenance", 
    location: "Service Center", 
    driver: "N/A",
    lat: 40.7505, 
    lng: -73.9934,
    lastUpdate: "15 min ago"
  },
  { 
    id: "V003", 
    status: "active", 
    location: "Route 42", 
    driver: "Sarah Jones",
    lat: 40.7614, 
    lng: -73.9776,
    lastUpdate: "1 min ago"
  },
  { 
    id: "V004", 
    status: "idle", 
    location: "North Terminal", 
    driver: "Mike Wilson",
    lat: 40.7549, 
    lng: -73.9840,
    lastUpdate: "5 min ago"
  },
  { 
    id: "V005", 
    status: "active", 
    location: "Highway 101", 
    driver: "Lisa Brown",
    lat: 40.7580, 
    lng: -73.9855,
    lastUpdate: "30 sec ago"
  },
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

interface VehiclePopupProps {
  vehicle: typeof fleetData[0];
  onClose: () => void;
  position: { x: number; y: number };
}

function VehiclePopup({ vehicle, onClose, position }: VehiclePopupProps) {
  return (
    <div 
      className="absolute z-50 bg-card border rounded-lg shadow-lg p-3 min-w-[240px]"
      style={{ 
        left: position.x + 10, 
        top: position.y - 80,
        transform: position.x > window.innerWidth - 260 ? 'translateX(-100%)' : 'none'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm">{vehicle.id}</h4>
        <button 
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          ×
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge className={cn("text-xs", getStatusColor(vehicle.status))} variant="secondary">
            {getStatusIcon(vehicle.status)}
            <span className="ml-1 capitalize">{vehicle.status}</span>
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          <div><strong>Location:</strong> {vehicle.location}</div>
          <div><strong>Driver:</strong> {vehicle.driver}</div>
          <div><strong>Last Update:</strong> {vehicle.lastUpdate}</div>
        </div>
      </div>
    </div>
  );
}

export function FleetMapWidget() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof fleetData[0] | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredVehicles = statusFilter === "all" 
    ? fleetData 
    : fleetData.filter(v => v.status === statusFilter);

  const handleVehicleClick = (vehicle: typeof fleetData[0], event: React.MouseEvent) => {
    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (rect) {
      setPopupPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
      setSelectedVehicle(vehicle);
    }
  };

  // Simple map simulation with vehicle pins
  return (
    <Card className="bg-gradient-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Fleet Map
        </CardTitle>
        <div className="flex items-center gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border rounded px-2 py-1 bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="maintenance">Maintenance</option>
          </select>
          <Button variant="outline" size="sm">
            <Maximize2 className="w-4 h-4 mr-1" />
            Fullscreen
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div 
          ref={mapContainerRef}
          className="relative h-80 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-b-lg overflow-hidden"
          onClick={() => setSelectedVehicle(null)}
        >
          {/* Simulated map background with grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }} 
            />
          </div>

          {/* Vehicle pins */}
          {filteredVehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={cn(
                "absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 shadow-md",
                vehicle.status === "active" && "bg-success",
                vehicle.status === "idle" && "bg-muted-foreground",
                vehicle.status === "maintenance" && "bg-warning"
              )}
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 12) % 40}%`
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleVehicleClick(vehicle, e);
              }}
            >
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-current rounded-full" />
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
            <div className="text-xs font-medium mb-2">Vehicle Status</div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span>Active ({fleetData.filter(v => v.status === 'active').length})</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span>Idle ({fleetData.filter(v => v.status === 'idle').length})</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span>Maintenance ({fleetData.filter(v => v.status === 'maintenance').length})</span>
              </div>
            </div>
          </div>

          {/* Vehicle popup */}
          {selectedVehicle && (
            <VehiclePopup
              vehicle={selectedVehicle}
              onClose={() => setSelectedVehicle(null)}
              position={popupPosition}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}