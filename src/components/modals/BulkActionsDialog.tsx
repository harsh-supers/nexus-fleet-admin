import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Users, Download, UserCheck, UserX, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItems: any[];
  onAction: (action: string, params?: any) => void;
  type: "users" | "vehicles" | "drivers" | "clients";
}

export function BulkActionsDialog({ 
  open, 
  onOpenChange, 
  selectedItems, 
  onAction, 
  type 
}: BulkActionsDialogProps) {
  const [selectedAction, setSelectedAction] = useState("");
  const [actionParams, setActionParams] = useState<any>({});
  const [confirmAction, setConfirmAction] = useState(false);
  const { toast } = useToast();

  const getActionOptions = () => {
    switch (type) {
      case "users":
        return [
          { value: "activate", label: "Activate Users", icon: UserCheck, variant: "success" },
          { value: "deactivate", label: "Deactivate Users", icon: UserX, variant: "warning" },
          { value: "assign-role", label: "Assign Role", icon: Users, variant: "info" },
          { value: "export", label: "Export Data", icon: Download, variant: "default" },
          { value: "delete", label: "Delete Users", icon: AlertTriangle, variant: "destructive" }
        ];
      case "vehicles":
        return [
          { value: "activate", label: "Activate Vehicles", icon: UserCheck, variant: "success" },
          { value: "maintenance", label: "Schedule Maintenance", icon: AlertTriangle, variant: "warning" },
          { value: "assign-driver", label: "Assign Driver", icon: Users, variant: "info" },
          { value: "export", label: "Export Data", icon: Download, variant: "default" }
        ];
      case "drivers":
        return [
          { value: "activate", label: "Activate Drivers", icon: UserCheck, variant: "success" },
          { value: "deactivate", label: "Deactivate Drivers", icon: UserX, variant: "warning" },
          { value: "assign-vehicle", label: "Assign Vehicle", icon: Users, variant: "info" },
          { value: "export", label: "Export Data", icon: Download, variant: "default" }
        ];
      case "clients":
        return [
          { value: "activate", label: "Activate Clients", icon: UserCheck, variant: "success" },
          { value: "deactivate", label: "Deactivate Clients", icon: UserX, variant: "warning" },
          { value: "update-tier", label: "Update Service Tier", icon: Users, variant: "info" },
          { value: "export", label: "Export Data", icon: Download, variant: "default" }
        ];
      default:
        return [];
    }
  };

  const renderActionParams = () => {
    switch (selectedAction) {
      case "assign-role":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Role</label>
            <Select onValueChange={(value) => setActionParams({ ...actionParams, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="operator">Operator</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "assign-driver":
      case "assign-vehicle":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select {selectedAction === "assign-driver" ? "Driver" : "Vehicle"}
            </label>
            <Select onValueChange={(value) => setActionParams({ ...actionParams, assignment: value })}>
              <SelectTrigger>
                <SelectValue placeholder={`Choose ${selectedAction === "assign-driver" ? "driver" : "vehicle"}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-assign based on availability</SelectItem>
                <SelectItem value="manual">Manual assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "update-tier":
        return (
          <div className="space-y-2">
            <label className="text-sm font-medium">Service Tier</label>
            <Select onValueChange={(value) => setActionParams({ ...actionParams, tier: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Choose service tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      default:
        return null;
    }
  };

  const executeAction = () => {
    if (!selectedAction) return;

    // Show loading state
    toast({
      title: "Processing...",
      description: `Executing ${selectedAction} on ${selectedItems.length} items`,
    });

    // Simulate API call
    setTimeout(() => {
      onAction(selectedAction, actionParams);
      
      toast({
        title: "Action Completed",
        description: `Successfully executed ${selectedAction} on ${selectedItems.length} items`,
      });

      // Reset and close
      setSelectedAction("");
      setActionParams({});
      setConfirmAction(false);
      onOpenChange(false);
    }, 1000);
  };

  const actionOptions = getActionOptions();
  const selectedActionConfig = actionOptions.find(opt => opt.value === selectedAction);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Actions</DialogTitle>
          <DialogDescription>
            Perform actions on {selectedItems.length} selected items
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Items Summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">Selected Items ({selectedItems.length})</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {selectedItems.slice(0, 5).map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item.name || item.id}
                </Badge>
              ))}
              {selectedItems.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{selectedItems.length - 5} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Choose Action</label>
            <div className="grid gap-2">
              {actionOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedAction === option.value 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedAction(option.value)}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      option.variant === "destructive" ? "bg-destructive/10" :
                      option.variant === "warning" ? "bg-warning/10" :
                      option.variant === "success" ? "bg-success/10" :
                      option.variant === "info" ? "bg-info/10" :
                      "bg-muted"
                    }`}>
                      <IconComponent className={`w-4 h-4 ${
                        option.variant === "destructive" ? "text-destructive" :
                        option.variant === "warning" ? "text-warning" :
                        option.variant === "success" ? "text-success" :
                        option.variant === "info" ? "text-info" :
                        "text-muted-foreground"
                      }`} />
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Parameters */}
          {selectedAction && renderActionParams()}

          {/* Confirmation */}
          {selectedAction && (
            <>
              <Separator />
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="confirm" 
                  checked={confirmAction}
                  onCheckedChange={(checked) => setConfirmAction(checked === true)}
                />
                <label htmlFor="confirm" className="text-sm">
                  I understand this action will affect {selectedItems.length} items
                  {selectedActionConfig?.variant === "destructive" && " and cannot be undone"}
                </label>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1"
              disabled={!selectedAction || !confirmAction}
              onClick={executeAction}
              variant={selectedActionConfig?.variant === "destructive" ? "destructive" : "default"}
            >
              Execute Action
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}