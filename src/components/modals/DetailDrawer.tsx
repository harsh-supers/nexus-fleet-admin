import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, Trash2, History, MapPin, Phone, Calendar, Truck } from "lucide-react";

interface DetailDrawerProps {
  trigger: ReactNode;
  title: string;
  data: any;
  type: "user" | "vehicle" | "driver" | "client";
}

export function DetailDrawer({ trigger, title, data, type }: DetailDrawerProps) {
  const renderUserDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <span className="text-lg font-medium text-primary-foreground">
            {data.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-muted-foreground">{data.email}</p>
          <Badge className="mt-1">
            {data.role}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Role</label>
          <p className="font-medium">{data.role}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <p className="font-medium">{data.status}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Last Login</label>
          <p className="font-medium">{data.lastLogin}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Assigned Vehicle</label>
          <p className="font-medium">{data.assignedVehicle || 'N/A'}</p>
        </div>
      </div>
    </div>
  );

  const renderVehicleDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Truck className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{data.make} {data.model}</h3>
          <p className="text-muted-foreground">{data.id}</p>
          <Badge className="mt-1">
            {data.status}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Make & Model</label>
          <p className="font-medium">{data.make} {data.model}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Year</label>
          <p className="font-medium">{data.year}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Driver</label>
          <p className="font-medium">{data.driver}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Location</label>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <p className="font-medium">{data.location}</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Maintenance</label>
          <p className="font-medium">{data.maintenance}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <p className="font-medium">{data.status}</p>
        </div>
      </div>
    </div>
  );

  const renderDriverDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <span className="text-lg font-medium text-primary-foreground">
            {data.name?.split(' ').map((n: string) => n[0]).join('') || 'D'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-muted-foreground">{data.id}</p>
          <Badge className="mt-1">
            {data.performance}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">License Number</label>
          <p className="font-medium font-mono">{data.license}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone</label>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-muted-foreground" />
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Assigned Vehicle</label>
          <p className="font-medium">{data.vehicle}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Performance</label>
          <p className="font-medium">{data.performance}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">License Expiry</label>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-muted-foreground" />
            <p className="font-medium">{data.licenseExpiry}</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <p className="font-medium">{data.status}</p>
        </div>
      </div>
    </div>
  );

  const renderClientDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <span className="text-lg font-medium text-primary-foreground">
            {data.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <p className="text-muted-foreground">{data.id}</p>
          <Badge className="mt-1">
            {data.type}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Contact Person</label>
          <p className="font-medium">{data.contact}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Phone</label>
          <div className="flex items-center gap-1">
            <Phone className="w-3 h-3 text-muted-foreground" />
            <p className="font-medium">{data.phone}</p>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="font-medium">{data.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">SLA Rating</label>
          <p className="font-medium">{data.slaRating}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Type</label>
          <p className="font-medium">{data.type}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Status</label>
          <p className="font-medium">{data.status}</p>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (type) {
      case "user": return renderUserDetails();
      case "vehicle": return renderVehicleDetails();
      case "driver": return renderDriverDetails();
      case "client": return renderClientDetails();
      default: return <div>Details not available</div>;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            View and manage detailed information
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          {renderDetails()}
          
          <Separator className="my-6" />
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" className="flex-1">
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          {/* Activity Timeline */}
          <div>
            <h4 className="font-semibold mb-4">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Status updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Assignment changed</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Profile created</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}