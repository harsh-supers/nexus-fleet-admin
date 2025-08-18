import { useState } from "react";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Users, Building, Plus, Search, Edit, Trash2, MapPin, Phone, Calendar } from "lucide-react";

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
  },
];

const mockDrivers = [
  {
    id: "D001",
    name: "John Smith",
    license: "DL123456789",
    phone: "+1 234-567-8901",
    vehicle: "V001",
    status: "active",
    performance: "Excellent",
    licenseExpiry: "2025-12-15",
  },
  {
    id: "D002",
    name: "Sarah Jones", 
    license: "DL987654321",
    phone: "+1 234-567-8902",
    vehicle: "V003",
    status: "active",
    performance: "Good",
    licenseExpiry: "2024-08-20",
  },
  {
    id: "D003",
    name: "Mike Wilson",
    license: "DL456789123",
    phone: "+1 234-567-8903",
    vehicle: "V004",
    status: "inactive",
    performance: "Fair",
    licenseExpiry: "2024-03-10",
  },
];

const mockClients = [
  {
    id: "C001",
    name: "TechCorp Solutions",
    contact: "Alice Johnson",
    phone: "+1 555-0101",
    email: "alice@techcorp.com",
    type: "Business",
    status: "active",
    slaRating: "A+",
  },
  {
    id: "C002",
    name: "Global Logistics Inc",
    contact: "Bob Martinez",
    phone: "+1 555-0102", 
    email: "bob@globallogistics.com",
    type: "Business",
    status: "active",
    slaRating: "A",
  },
  {
    id: "C003",
    name: "Emma Davis",
    contact: "Emma Davis",
    phone: "+1 555-0103",
    email: "emma.davis@email.com",
    type: "Individual",
    status: "active",
    slaRating: "B+",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-success text-success-foreground";
    case "maintenance":
      return "bg-warning text-warning-foreground";
    case "inactive":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case "Excellent":
      return "bg-success text-success-foreground";
    case "Good":
      return "bg-info text-info-foreground";
    case "Fair":
      return "bg-warning text-warning-foreground";
    case "Poor":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getSlaColor = (rating: string) => {
  if (rating.startsWith("A")) return "bg-success text-success-foreground";
  if (rating.startsWith("B")) return "bg-info text-info-foreground";
  if (rating.startsWith("C")) return "bg-warning text-warning-foreground";
  return "bg-destructive text-destructive-foreground";
};

const MasterData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("vehicles");

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Master Data Management" 
        subtitle="Manage vehicles, drivers, and client information"
      />
      
      <main className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Vehicles
            </TabsTrigger>
            <TabsTrigger value="drivers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Clients
            </TabsTrigger>
          </TabsList>

          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
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
                        <Input id="make" placeholder="e.g., Ford" />
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input id="model" placeholder="e.g., Transit" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" type="number" placeholder="2023" />
                      </div>
                      <div>
                        <Label htmlFor="vin">VIN</Label>
                        <Input id="vin" placeholder="Vehicle ID Number" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Vehicle</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vehicles ({mockVehicles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vehicle ID</TableHead>
                      <TableHead>Make & Model</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Driver</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Maintenance</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{vehicle.make} {vehicle.model}</div>
                            <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vehicle.status)} variant="secondary">
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.driver}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-muted-foreground" />
                            {vehicle.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={vehicle.maintenance === "Good" ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"} 
                            variant="secondary"
                          >
                            {vehicle.maintenance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search drivers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Driver
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Drivers ({mockDrivers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>License Expiry</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDrivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-foreground">
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-muted-foreground">{driver.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">{driver.license}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            {driver.phone}
                          </div>
                        </TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell>
                          <Badge className={getPerformanceColor(driver.performance)} variant="secondary">
                            {driver.performance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            {driver.licenseExpiry}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Client
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Clients ({mockClients.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>SLA Rating</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-sm text-muted-foreground">{client.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{client.contact}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{client.phone}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{client.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {client.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSlaColor(client.slaRating)} variant="secondary">
                            {client.slaRating}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MasterData;