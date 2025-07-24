import { useState } from "react";
import { RotateCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

export default function ReturnToWorkForm() {
  const [returnDate, setReturnDate] = useState("");
  const [absenceReference, setAbsenceReference] = useState("");
  const [comments, setComments] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!returnDate) {
      toast({
        title: "Error",
        description: "Please select your return date",
        variant: "destructive",
      });
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    toast({
      title: "Return to Work Notice Submitted",
      description: "Your return to work notification has been successfully recorded.",
    });

    // Reset form
    setReturnDate("");
    setAbsenceReference("");
    setComments("");
    setShowConfirmation(false);
  };

  // Mock previous absences for dropdown
  const previousAbsences = [
    { id: "ABS001", date: "2024-01-15", reason: "Sick Leave" },
    { id: "ABS002", date: "2024-01-10", reason: "Emergency Leave" },
    { id: "ABS003", date: "2024-01-05", reason: "Personal Leave" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <RotateCcw className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Return to Work Notification</h1>
          <p className="text-muted-foreground">Notify HR of your return to work</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Return to Work Form</CardTitle>
          <CardDescription>
            Please complete this form to notify HR of your return to work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="returnDate">Date Returning to Work *</Label>
              <Input
                id="returnDate"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="absenceReference">Previous Absence Reference (Optional)</Label>
              <Select value={absenceReference} onValueChange={setAbsenceReference}>
                <SelectTrigger>
                  <SelectValue placeholder="Select previous absence if applicable" />
                </SelectTrigger>
                <SelectContent>
                  {previousAbsences.map((absence) => (
                    <SelectItem key={absence.id} value={absence.id}>
                      {absence.id} - {absence.date} ({absence.reason})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Any additional comments about your return to work..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-accent p-4 rounded-lg">
              <h3 className="font-medium mb-2">Return to Work Guidelines:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Submit this form at least 24 hours before your return</li>
                <li>• Medical clearance may be required for certain absences</li>
                <li>• Report to your supervisor upon return</li>
                <li>• Ensure all work equipment and access are functional</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogTrigger asChild>
                  <Button type="submit" className="bg-primary hover:bg-primary-hover flex-1">
                    Submit Return Notice
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Confirm Return to Work
                    </DialogTitle>
                    <DialogDescription>
                      Please confirm your return to work details:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Return Date:</span>
                        <span>{returnDate}</span>
                      </div>
                      {absenceReference && (
                        <div className="flex justify-between">
                          <span className="font-medium">Absence Reference:</span>
                          <span>{absenceReference}</span>
                        </div>
                      )}
                      {comments && (
                        <div>
                          <span className="font-medium">Comments:</span>
                          <p className="text-sm text-muted-foreground mt-1">{comments}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={confirmSubmission} className="bg-primary hover:bg-primary-hover flex-1">
                        Confirm Submission
                      </Button>
                      <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button type="button" variant="outline" onClick={() => {
                setReturnDate("");
                setAbsenceReference("");
                setComments("");
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