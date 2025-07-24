import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function LeaveForm() {
  const [leaveType, setLeaveType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !dateFrom || !dateTo || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been submitted successfully and is pending approval.",
    });

    // Reset form
    setLeaveType("");
    setDateFrom("");
    setDateTo("");
    setReason("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <Calendar className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Apply for Leave</h1>
          <p className="text-muted-foreground">Submit your leave request for approval</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Application Form</CardTitle>
          <CardDescription>
            Please fill out all required information for your leave request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Leave Type *</Label>
              <Select value={leaveType} onValueChange={setLeaveType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="emergency">Emergency Leave</SelectItem>
                  <SelectItem value="vacation">Vacation Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity/Paternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Date From *</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">Date To *</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave *</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a detailed reason for your leave request..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="bg-accent p-4 rounded-lg">
              <h3 className="font-medium mb-2">Leave Policy Reminder:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit leave requests at least 2 weeks in advance when possible</li>
                <li>• Sick leave requires medical documentation for absences over 3 days</li>
                <li>• Emergency leave should be reported as soon as possible</li>
                <li>• Current leave balance: 12 days remaining</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary-hover flex-1">
                Submit Leave Request
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setLeaveType("");
                setDateFrom("");
                setDateTo("");
                setReason("");
              }}>
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}