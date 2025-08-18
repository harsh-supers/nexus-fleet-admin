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
import { UserPlus, Search, Download, Users as UsersIcon, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Driver",
    status: "active",
    lastLogin: "2 hours ago",
    assignedVehicle: "V001",
  },
  {
    id: 2,
    name: "Sarah Jones",
    email: "sarah.jones@company.com",
    role: "Operator",
    status: "active",
    lastLogin: "15 minutes ago",
    assignedVehicle: "N/A",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@company.com",
    role: "Driver",
    status: "inactive",
    lastLogin: "3 days ago",
    assignedVehicle: "V004",
  },
  {
    id: 4,
    name: "Lisa Brown",
    email: "lisa.brown@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "1 hour ago",
    assignedVehicle: "N/A",
  },
  {
    id: 5,
    name: "Tom Anderson",
    email: "tom.anderson@client.com",
    role: "Customer",
    status: "active",
    lastLogin: "Yesterday",
    assignedVehicle: "N/A",
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Admin":
      return "alert";
    case "Operator":
      return "maintenance";
    case "Driver":
      return "active";
    case "Customer":
      return "pending";
    default:
      return "inactive";
  }
};

const getStatusColor = (status: string) => {
  return status === "active" ? "active" : "inactive";
};

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [bulkActionsOpen, setBulkActionsOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(u => u.id.toString()) : []);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, userId]
        : prev.filter(id => id !== userId)
    );
  };

  const handleBulkAction = (action: string, params?: any) => {
    console.log("Bulk action:", action, "on users:", selectedUsers, "with params:", params);
    toast({
      title: "Bulk action completed",
      description: `${action} applied to ${selectedUsers.length} user(s)`,
    });
    setSelectedUsers([]);
    setBulkActionsOpen(false);
  };

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "User data is being exported to CSV",
    });
  };

  return (
    <div className="min-h-screen">
      <DashboardHeader 
        title="User & Role Management" 
        subtitle="Manage users, assign roles, and control access permissions"
      />
      
      <main className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Operator">Operator</SelectItem>
                <SelectItem value="Driver">Driver</SelectItem>
                <SelectItem value="Customer">Customer</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div>
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Operator">Operator</SelectItem>
                        <SelectItem value="Driver">Driver</SelectItem>
                        <SelectItem value="Customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={() => {
                      toast({
                        title: "User added",
                        description: "New user has been successfully created",
                      });
                    }}>Create User</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            {selectedUsers.length > 0 && (
              <>
                <Button variant="outline" onClick={() => setBulkActionsOpen(true)}>
                  <UsersIcon className="w-4 h-4 mr-2" />
                  Bulk Actions ({selectedUsers.length})
                </Button>
                <BulkActionsDialog
                  open={bulkActionsOpen}
                  onOpenChange={setBulkActionsOpen}
                  selectedItems={selectedUsers}
                  onAction={handleBulkAction}
                  type="users"
                />
              </>
            )}
          </div>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Vehicle</TableHead>
                  <TableHead>Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <DetailDrawer
                    key={user.id}
                    trigger={
                      <TableRow className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedUsers.includes(user.id.toString())}
                            onCheckedChange={(checked) => handleSelectUser(user.id.toString(), !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-primary-foreground">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={user.assignedVehicle === "N/A" ? "text-muted-foreground" : ""}>
                            {user.assignedVehicle}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.lastLogin}
                        </TableCell>
                      </TableRow>
                    }
                    title={`User: ${user.name}`}
                    data={user}
                    type="user"
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

export default Users;