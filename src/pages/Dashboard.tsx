import { Calendar, MapPin, Star, UserCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const stats = [
    {
      title: "Current Leave Balance",
      value: "12 days",
      description: "Remaining vacation days",
      icon: Calendar,
      color: "bg-primary",
    },
    {
      title: "Absence Count",
      value: "2",
      description: "This month",
      icon: UserCheck,
      color: "bg-accent-foreground",
    },
    {
      title: "Evaluation Rating",
      value: "4.5",
      description: "Last performance review",
      icon: Star,
      color: "bg-yellow-500",
    },
    {
      title: "Assigned Area",
      value: "Packing",
      description: "Current work assignment",
      icon: MapPin,
      color: "bg-blue-500",
    },
  ];

  const recentActivities = [
    { action: "Leave request approved", date: "2 days ago", status: "approved" },
    { action: "Submitted absence form", date: "1 week ago", status: "pending" },
    { action: "Performance evaluation completed", date: "2 weeks ago", status: "completed" },
    { action: "Return to work form submitted", date: "3 weeks ago", status: "approved" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-hover rounded-lg p-6 text-primary-foreground">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">JD</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, John Doe!</h1>
            <p className="text-primary-foreground/90">Employee ID: EMP001 • CFARBEMPCO</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                  <Badge 
                    variant={activity.status === "approved" ? "default" : 
                             activity.status === "pending" ? "secondary" : 
                             "outline"}
                    className={activity.status === "approved" ? "bg-primary" : ""}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your current performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Rating</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm ml-2">4.5/5.0</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Attendance</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[95%]"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Productivity</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[88%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}