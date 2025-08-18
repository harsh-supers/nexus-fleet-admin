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
import { UserPlus, Search, Filter, MoreHorizontal, Edit, Trash2, Mail } from "lucide-react";

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
      return "bg-primary text-primary-foreground";
    case "Operator":
      return "bg-info text-info-foreground";
    case "Driver":
      return "bg-success text-success-foreground";
    case "Customer":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  return status === "active" 
    ? "bg-success text-success-foreground" 
    : "bg-muted text-muted-foreground";
};

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

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
                    <Button>Create User</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Bulk Invite
            </Button>
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
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Vehicle</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
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
                      <Badge className={getRoleColor(user.role)} variant="secondary">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)} variant="secondary">
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
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