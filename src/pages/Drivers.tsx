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
import { UserPlus, Search, Download, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockDrivers = [
  {
    id: "D001",
    name: "John Smith",
    email: "john.smith@company.com",
    license: "DL123456789",
    phone: "+1 234-567-8901",
    vehicle: "V001",
    status: "active",
    performance: "Excellent",
    licenseExpiry: "2025-12-15",
    rating: 4.9,
    tripsCompleted: 1247,
  },
  {
    id: "D002",
    name: "Sarah Jones", 
    email: "sarah.jones@company.com",
    license: "DL987654321",
    phone: "+1 234-567-8902",
    vehicle: "V003",
    status: "active",
    performance: "Good",
    licenseExpiry: "2024-08-20",
    rating: 4.7,
    tripsCompleted: 892,
  },
  {
    id: "D003",
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    license: "DL456789123",
    phone: "+1 234-567-8903",
    vehicle: "V004",
    status: "inactive",
    performance: "Fair",
    licenseExpiry: "2024-03-10",
    rating: 4.2,
    tripsCompleted: 634,
  },
  {
    id: "D004",
    name: "Lisa Brown",
    email: "lisa.brown@company.com",
    license: "DL789123456",
    phone: "+1 234-567-8904",
    vehicle: "V007",
    status: "active",
    performance: "Excellent",
    licenseExpiry: "2025-06-30",
    rating: 4.8,
    tripsCompleted: 1156,
  },
  {
    id: "D005",
    name: "Tom Anderson",
    email: "tom.anderson@company.com",
    license: "DL321654987",
    phone: "+1 234-567-8905",
    vehicle: "N/A",
    status: "pending",
    performance: "New",
    licenseExpiry: "2026-01-15",
    rating: 0,
    tripsCompleted: 0,
  },
];

const getPerformanceColor = (performance: string) => {
  switch (performance) {
    case "Excellent":
      return "active";
    case "Good":
      return "completed";
    case "Fair":
      return "pending";
    case "Poor":
      return "alert";
    case "New":
      return "inactive";
    default:
      return "inactive";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "active";
    case "inactive":
      return "inactive";
    case "pending":
      return "pending";
    default:
      return "inactive";
  }
};

const Drivers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [performanceFilter, setPerformanceFilter] = useState("all");
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>([]);
  const [bulkActionsOpen, setBulkActionsOpen] = useState(false);
  const { toast } = useToast();

  const filteredDrivers = mockDrivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.license.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter;
    const matchesPerformance = performanceFilter === "all" || driver.performance === performanceFilter;
    
    return matchesSearch && matchesStatus && matchesPerformance;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedDrivers(checked ? filteredDrivers.map(d => d.id) : []);
  };

  const handleSelectDriver = (driverId: string, checked: boolean) => {
    setSelectedDrivers(prev => 
      checked 
        ? [...prev, driverId]
        : prev.filter(id => id !== driverId)
    );
  };

  const handleBulkAction = (action: string, params?: any) => {
    console.log("Bulk action:", action, "on drivers:", selectedDrivers, "with params:", params);
    toast({
      title: "Bulk action completed",
      description: `${action} applied to ${selectedDrivers.length} driver(s)`,
    });
    setSelectedDrivers([]);
    setBulkActionsOpen(false);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Driver data is being exported to CSV",
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="Driver Management" 
        subtitle="Manage driver profiles, performance, and assignments"
      />
      
      <main className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search drivers..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
                <SelectItem value="New">New</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Driver</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter email" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="license">License Number</Label>
                      <Input id="license" placeholder="Driver license number" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Phone number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="licenseExpiry">License Expiry</Label>
                      <Input id="licenseExpiry" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="vehicle">Assign Vehicle</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="V001">V001 - Ford Transit</SelectItem>
                          <SelectItem value="V002">V002 - Mercedes Sprinter</SelectItem>
                          <SelectItem value="V003">V003 - Iveco Daily</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      toast({
                        title: "Driver added",
                        description: "New driver has been successfully created",
                      });
                    }}>Create Driver</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {selectedDrivers.length > 0 && (
              <BulkActionsDialog
                open={bulkActionsOpen}
                onOpenChange={setBulkActionsOpen}
                selectedItems={selectedDrivers}
                onAction={handleBulkAction}
                type="drivers"
                trigger={
                  <Button variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Bulk Actions ({selectedDrivers.length})
                  </Button>
                }
              />
            )}
          </div>
        </div>

        {/* Drivers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Drivers ({filteredDrivers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedDrivers.length === filteredDrivers.length && filteredDrivers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Trips</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrivers.map((driver) => (
                  <DetailDrawer
                    key={driver.id}
                    trigger={
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedDrivers.includes(driver.id)}
                            onCheckedChange={(checked) => handleSelectDriver(driver.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-foreground">
                                {driver.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-sm text-muted-foreground">{driver.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-sm">{driver.license}</div>
                          <div className="text-xs text-muted-foreground">Exp: {driver.licenseExpiry}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{driver.phone}</div>
                        </TableCell>
                        <TableCell>
                          <span className={driver.vehicle === "N/A" ? "text-muted-foreground" : ""}>
                            {driver.vehicle}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(driver.status)}>
                            {driver.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPerformanceColor(driver.performance)}>
                            {driver.performance}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{driver.rating > 0 ? driver.rating : 'N/A'}</span>
                            {driver.rating > 0 && <span className="text-xs text-muted-foreground">★</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{driver.tripsCompleted}</span>
                        </TableCell>
                      </TableRow>
                    }
                    title={`Driver: ${driver.name}`}
                    data={driver}
                    type="driver"
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

export default Drivers;