import { useState } from "react";
import { Search, Filter, Download, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

export default function Records() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for leave and absence records
  const records = [
    {
      id: "REQ001",
      type: "Leave",
      subType: "Vacation",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      days: 3,
      status: "Approved",
      submittedDate: "2024-01-10",
      comments: "Family vacation"
    },
    {
      id: "ABS001",
      type: "Absence",
      subType: "Sick",
      startDate: "2024-01-08",
      endDate: "2024-01-08",
      days: 1,
      status: "Approved",
      submittedDate: "2024-01-08",
      comments: "Flu symptoms"
    },
    {
      id: "REQ002",
      type: "Leave",
      subType: "Emergency",
      startDate: "2024-01-20",
      endDate: "2024-01-22",
      days: 3,
      status: "Pending",
      submittedDate: "2024-01-18",
      comments: "Family emergency"
    },
    {
      id: "RTW001",
      type: "Return to Work",
      subType: "From Sick Leave",
      startDate: "2024-01-09",
      endDate: "2024-01-09",
      days: 0,
      status: "Approved",
      submittedDate: "2024-01-08",
      comments: "Feeling better, ready to return"
    },
    {
      id: "ABS002",
      type: "Absence",
      subType: "Personal",
      startDate: "2024-01-25",
      endDate: "2024-01-25",
      days: 1,
      status: "Rejected",
      submittedDate: "2024-01-24",
      comments: "Personal appointment - insufficient notice given"
    },
  ];

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.subType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.comments.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || record.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || record.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-primary text-primary-foreground";
      case "pending":
        return "bg-yellow-500 text-white";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted";
    }
  };

  const handleExportPDF = () => {
    toast({
      title: "Export Started",
      description: "Your records are being exported to PDF format.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary rounded-lg">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Leave & Absence Records</h1>
          <p className="text-muted-foreground">View and manage your leave and absence history</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Leave Days Remaining</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">1</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Records</CardTitle>
          <CardDescription>Search and filter your leave and absence records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, type, or comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="leave">Leave</SelectItem>
                <SelectItem value="absence">Absence</SelectItem>
                <SelectItem value="return to work">Return to Work</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExportPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Records ({filteredRecords.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-muted-foreground">{record.subType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {record.startDate === record.endDate 
                          ? record.startDate 
                          : `${record.startDate} to ${record.endDate}`
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.days > 0 ? `${record.days} day${record.days > 1 ? 's' : ''}` : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.submittedDate}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm truncate" title={record.comments}>
                        {record.comments}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRecords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No records found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}