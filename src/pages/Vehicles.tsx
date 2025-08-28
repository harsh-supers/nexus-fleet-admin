import { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DetailDrawer } from "@/components/modals/DetailDrawer";
import { BulkActionsDialog } from "@/components/modals/BulkActionsDialog";
import { Plus, Search, Download, Truck, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockVehicles = [
  {
    id: "V001",
    make: "Ford",
    model: "Transit",
    year: 2022,
    status: "active",
    driver: "John Smith",
    location: "Downtown Depot",
    maintenance: "Good",
    mileage: 45820,
    fuelType: "Diesel",
    vin: "1FTPW14V67KC54321",
    lastService: "2024-01-15",
  },
  {
    id: "V002", 
    make: "Mercedes",
    model: "Sprinter",
    year: 2021,
    status: "maintenance",
    driver: "N/A",
    location: "Service Center",
    maintenance: "Due",
    mileage: 67432,
    fuelType: "Diesel",
    vin: "WD3PE8CD5L5123456",
    lastService: "2023-11-20",
  },
  {
    id: "V003",
    make: "Iveco",
    model: "Daily",
    year: 2023,
    status: "active",
    driver: "Sarah Jones",
    location: "Route 42",
    maintenance: "Good",
    mileage: 23150,
    fuelType: "Diesel",
    vin: "ZCFC35B07NM654321",
    lastService: "2024-02-10",
  },
  {
    id: "V004",
    make: "Ford",
    model: "E-Transit",
    year: 2023,
    status: "active",
    driver: "Mike Wilson",
    location: "City Center",
    maintenance: "Excellent",
    mileage: 18750,
    fuelType: "Electric",
    vin: "1FTBW2CM9PKA12345",
    lastService: "2024-01-28",
  },
  {
    id: "V005",
    make: "Renault",
    model: "Master",
    year: 2020,
    status: "inactive",
    driver: "N/A",
    location: "Depot B",
    maintenance: "Poor",
    mileage: 89560,
    fuelType: "Diesel",
    vin: "VF1MA000664567890",
    lastService: "2023-08-15",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "active";
    case "maintenance":
      return "maintenance";
    case "inactive":
      return "inactive";
    default:
      return "inactive";
  }
};

const getMaintenanceColor = (maintenance: string) => {
  switch (maintenance) {
    case "Excellent":
      return "completed";
    case "Good":
      return "active";
    case "Due":
      return "pending";
    case "Poor":
      return "alert";
    default:
      return "inactive";
  }
};

const Vehicles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [makeFilter, setMakeFilter] = useState("all");
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [bulkActionsOpen, setBulkActionsOpen] = useState(false);
  const { toast } = useToast();

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter;
    
    return matchesSearch && matchesStatus && matchesMake;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedVehicles(checked ? filteredVehicles.map(v => v.id) : []);
  };

  const handleSelectVehicle = (vehicleId: string, checked: boolean) => {
    setSelectedVehicles(prev => 
      checked 
        ? [...prev, vehicleId]
        : prev.filter(id => id !== vehicleId)
    );
  };

  const handleBulkAction = (action: string, params?: any) => {
    console.log("Bulk action:", action, "on vehicles:", selectedVehicles, "with params:", params);
    toast({
      title: "Bulk action completed",
      description: `${action} applied to ${selectedVehicles.length} vehicle(s)`,
    });
    setSelectedVehicles([]);
    setBulkActionsOpen(false);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Vehicle data is being exported to CSV",
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Vehicle Management" 
        subtitle="Manage fleet vehicles, maintenance, and assignments"
      />
      
      <main className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={makeFilter} onValueChange={setMakeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                <SelectItem value="Ford">Ford</SelectItem>
                <SelectItem value="Mercedes">Mercedes</SelectItem>
                <SelectItem value="Iveco">Iveco</SelectItem>
                <SelectItem value="Renault">Renault</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">Make</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ford">Ford</SelectItem>
                          <SelectItem value="Mercedes">Mercedes</SelectItem>
                          <SelectItem value="Iveco">Iveco</SelectItem>
                          <SelectItem value="Renault">Renault</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="e.g., Transit" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" type="number" placeholder="2023" min="2000" max="2024" />
                    </div>
                    <div>
                      <Label htmlFor="vin">VIN</Label>
                      <Input id="vin" placeholder="Vehicle ID Number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fuelType">Fuel Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fuel type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Diesel">Diesel</SelectItem>
                          <SelectItem value="Gasoline">Gasoline</SelectItem>
                          <SelectItem value="Electric">Electric</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="mileage">Current Mileage</Label>
                      <Input id="mileage" type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      toast({
                        title: "Vehicle added",
                        description: "New vehicle has been successfully created",
                      });
                    }}>Add Vehicle</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {selectedVehicles.length > 0 && (
              <>
                <Button variant="outline" onClick={() => setBulkActionsOpen(true)}>
                  <Truck className="w-4 h-4 mr-2" />
                  Bulk Actions ({selectedVehicles.length})
                </Button>
                <BulkActionsDialog
                  open={bulkActionsOpen}
                  onOpenChange={setBulkActionsOpen}
                  selectedItems={selectedVehicles}
                  onAction={handleBulkAction}
                  type="vehicles"
                />
              </>
            )}
          </div>
        </div>

        {/* Vehicles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicles ({filteredVehicles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedVehicles.length === filteredVehicles.length && filteredVehicles.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Vehicle ID</TableHead>
                  <TableHead>Make & Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Driver</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Maintenance</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Last Service</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <DetailDrawer
                    key={vehicle.id}
                    trigger={
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedVehicles.includes(vehicle.id)}
                            onCheckedChange={(checked) => handleSelectVehicle(vehicle.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-muted-foreground">{vehicle.year} • {vehicle.fuelType}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(vehicle.status)}>
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={vehicle.driver === "N/A" ? "text-muted-foreground" : ""}>
                            {vehicle.driver}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{vehicle.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getMaintenanceColor(vehicle.maintenance)}>
                            {vehicle.maintenance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{vehicle.mileage.toLocaleString()} km</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm">{vehicle.lastService}</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    }
                    title={`Vehicle: ${vehicle.id}`}
                    data={vehicle}
                    type="vehicle"
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vehicles;