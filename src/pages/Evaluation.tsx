import { Star, Download, User, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export default function Evaluation() {
  const evaluation = {
    overallRating: 4.5,
    period: "January 2024 - June 2024",
    evaluator: "Maria Santos",
    evaluatorTitle: "Department Supervisor",
    dateEvaluated: "July 15, 2024",
    areas: [
      { name: "Work Quality", rating: 5, comments: "Consistently delivers high-quality work with attention to detail." },
      { name: "Productivity", rating: 4, comments: "Meets and often exceeds daily targets." },
      { name: "Teamwork", rating: 4, comments: "Collaborates well with team members and helps others when needed." },
      { name: "Punctuality", rating: 5, comments: "Always arrives on time and maintains excellent attendance." },
      { name: "Communication", rating: 4, comments: "Communicates effectively with supervisors and peers." },
    ],
    strengths: [
      "Excellent attention to detail in packing operations",
      "Strong work ethic and reliability",
      "Positive attitude and willingness to help others",
      "Adapts well to changes in procedures"
    ],
    improvements: [
      "Continue developing leadership skills",
      "Consider cross-training in other areas",
      "Participate in more team building activities"
    ],
    goals: [
      "Complete safety certification by end of quarter",
      "Mentor new employees in packing procedures",
      "Maintain current performance standards"
    ]
  };

  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Your evaluation report is being prepared for download.",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : 
              i < rating ? "fill-yellow-400/50 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm ml-2 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Star className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Performance Evaluation</h1>
            <p className="text-muted-foreground">View your latest performance review</p>
          </div>
        </div>
        <Button onClick={handleDownloadPDF} className="bg-primary hover:bg-primary-hover">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Overall Rating Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Performance Rating</span>
            <Badge className="bg-primary text-primary-foreground">
              {evaluation.overallRating}/5.0
            </Badge>
          </CardTitle>
          <CardDescription>Evaluation Period: {evaluation.period}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {renderStars(evaluation.overallRating)}
              </div>
              <h3 className="text-3xl font-bold text-primary">{evaluation.overallRating}</h3>
              <p className="text-lg font-medium">Excellent Performance</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{evaluation.evaluator}</p>
                <p className="text-muted-foreground">{evaluation.evaluatorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Evaluated On</p>
                <p className="text-muted-foreground">{evaluation.dateEvaluated}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Department</p>
                <p className="text-muted-foreground">Packing Operations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Areas</CardTitle>
          <CardDescription>Detailed breakdown of your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {evaluation.areas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{area.name}</h4>
                  {renderStars(area.rating)}
                </div>
                <p className="text-sm text-muted-foreground">{area.comments}</p>
                {index < evaluation.areas.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feedback Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Strengths</CardTitle>
            <CardDescription>What you're doing well</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evaluation.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-600">Areas for Improvement</CardTitle>
            <CardDescription>Opportunities for growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {evaluation.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Future Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Goals for Next Period</CardTitle>
          <CardDescription>Objectives to focus on moving forward</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evaluation.goals.map((goal, index) => (
              <div key={index} className="p-4 bg-accent rounded-lg">
                <p className="text-sm font-medium">{goal}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}