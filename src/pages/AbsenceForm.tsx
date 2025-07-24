import { useState } from "react";
import { UserX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

export default function AbsenceForm() {
  const [absenceDate, setAbsenceDate] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!absenceDate || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Absence Notification Submitted",
      description: "Your absence has been recorded successfully.",
    });

    // Reset form
    setAbsenceDate("");
    setReason("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <UserX className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Submit Absence Notification</h1>
          <p className="text-muted-foreground">Report your absence to HR</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please submit absence notifications as soon as possible. For emergencies, 
          contact your supervisor directly at +63-XXX-XXX-XXXX.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Absence Notification Form</CardTitle>
          <CardDescription>
            Please provide details about your absence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="absenceDate">Date of Absence *</Label>
              <Input
                id="absenceDate"
                type="date"
                value={absenceDate}
                onChange={(e) => setAbsenceDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Absence *</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a detailed reason for your absence..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="bg-accent p-4 rounded-lg">
              <h3 className="font-medium mb-2">Absence Policy:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Report absences before your scheduled shift when possible</li>
                <li>• Medical documentation may be required for consecutive absences</li>
                <li>• Frequent unexcused absences may affect your employment status</li>
                <li>• Contact your supervisor for urgent situations</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary-hover flex-1">
                Submit Absence Form
              </Button>
              <Button type="button" variant="outline" onClick={() => {
                setAbsenceDate("");
                setReason("");
              }}>
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Contact */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>HR Department</Label>
              <p className="text-sm">Phone: +63-XXX-XXX-XXXX</p>
              <p className="text-sm">Email: hr@cfarbempco.com</p>
            </div>
            <div className="space-y-2">
              <Label>Your Supervisor</Label>
              <p className="text-sm">Maria Santos</p>
              <p className="text-sm">Phone: +63-XXX-XXX-XXXX</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}