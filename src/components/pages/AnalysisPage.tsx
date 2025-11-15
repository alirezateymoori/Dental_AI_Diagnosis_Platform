import { useEffect, useState } from 'react';
import { Brain, CheckCircle2, Search, Activity } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { ScanData, AnalysisResults, Finding } from '../../App';

interface AnalysisPageProps {
  scan: ScanData;
  onAnalysisComplete: (results: AnalysisResults) => void;
}

const analysisSteps = [
  'Initializing AI model...',
  'Loading X-ray image...',
  'Detecting tooth regions...',
  'Examining dental structures...',
  'Analyzing for cavities...',
  'Checking bone density...',
  'Detecting infections...',
  'Evaluating gum health...',
  'Generating report...',
  'Finalizing analysis...',
];

export function AnalysisPage({ scan, onAnalysisComplete }: AnalysisPageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = 300;
    const totalDuration = analysisSteps.length * stepDuration;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 100 / (totalDuration / 50);
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    const analysisTimer = setTimeout(() => {
      const mockResults = generateMockResults();
      onAnalysisComplete(mockResults);
    }, totalDuration + 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(analysisTimer);
    };
  }, [onAnalysisComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Background X-ray */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-sm">
            <img
              src={scan.imageUrl}
              alt="X-ray being analyzed"
              className="max-h-64 rounded-lg object-contain"
            />
          </div>
        </div>

        {/* Main Analysis Card */}
        <Card className="relative overflow-hidden border-2 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          
          <CardContent className="relative p-12 space-y-8">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                  <Brain className="h-12 w-12 text-white animate-pulse" />
                </div>
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl text-foreground">Analyzing Your X-Ray</h2>
              <p className="text-muted-foreground">
                Our AI is examining your dental X-ray in detail...
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
                <span className="text-muted-foreground">Usually takes 15-30 seconds</span>
              </div>
            </div>

            {/* Current Step */}
            <div className="flex items-center justify-center space-x-3 rounded-lg bg-muted/50 p-4">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-foreground">{analysisSteps[currentStep]}</span>
            </div>

            {/* Analysis Details */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-[#EFF6FF] p-4 text-center">
                <Search className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-sm text-foreground">Examining 32 tooth regions</p>
              </div>
              <div className="rounded-lg bg-[#DCFCE7] p-4 text-center">
                <CheckCircle2 className="mx-auto mb-2 h-6 w-6 text-secondary" />
                <p className="text-sm text-foreground">Checking for cavities & decay</p>
              </div>
              <div className="rounded-lg bg-[#FEF3C7] p-4 text-center">
                <Activity className="mx-auto mb-2 h-6 w-6 text-accent" />
                <p className="text-sm text-foreground">Analyzing bone & gum health</p>
              </div>
            </div>

            {/* Completed Steps */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Processing steps:</p>
              <div className="space-y-1">
                {analysisSteps.slice(0, currentStep + 1).map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm animate-fade-in"
                  >
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function generateMockResults(): AnalysisResults {
  const findings: Finding[] = [];
  const randomFindings = Math.random();

  if (randomFindings > 0.3) {
    findings.push({
      id: '1',
      condition: 'Cavity Detected',
      location: 'Upper Right Quadrant',
      toothNumber: '#14',
      confidence: 87,
      severity: 'moderate',
      description:
        'A moderate-sized cavity has been detected on tooth #14. The decay appears to affect the outer enamel layer and may be extending into the dentin.',
      recommendation:
        'Schedule a dental appointment for examination and possible filling. Early treatment can prevent further decay.',
    });
  }

  if (randomFindings > 0.5) {
    findings.push({
      id: '2',
      condition: 'Early Bone Loss',
      location: 'Lower Left Quadrant',
      toothNumber: '#19',
      confidence: 72,
      severity: 'moderate',
      description:
        'Minor bone loss detected around tooth #19, which may indicate early periodontal disease or previous infection.',
      recommendation:
        'Consult with your dentist about periodontal health. Regular cleanings and proper oral hygiene are essential.',
    });
  }

  if (randomFindings > 0.7) {
    findings.push({
      id: '3',
      condition: 'Impacted Wisdom Tooth',
      location: 'Lower Right Quadrant',
      toothNumber: '#32',
      confidence: 94,
      severity: 'urgent',
      description:
        'Wisdom tooth #32 appears to be partially impacted and may be causing pressure on adjacent teeth.',
      recommendation:
        'Urgent: Consult with an oral surgeon to evaluate if extraction is necessary. Impacted wisdom teeth can lead to infection and pain.',
    });
  }

  if (randomFindings > 0.4) {
    findings.push({
      id: '4',
      condition: 'Root Canal Treatment Detected',
      location: 'Upper Left Quadrant',
      toothNumber: '#11',
      confidence: 96,
      severity: 'healthy',
      description:
        'Previous root canal treatment visible on tooth #11. The treatment appears to be successful with no signs of infection.',
      recommendation:
        'Continue regular dental check-ups to monitor the treated tooth. No immediate action required.',
    });
  }

  const overallScore = findings.length === 0 ? 95 : Math.max(50, 85 - findings.length * 10);
  const urgentCount = findings.filter((f) => f.severity === 'urgent').length;
  const moderateCount = findings.filter((f) => f.severity === 'moderate').length;

  let status: 'healthy' | 'attention' | 'urgent' = 'healthy';
  if (urgentCount > 0) status = 'urgent';
  else if (moderateCount > 0) status = 'attention';

  return {
    overallScore,
    status,
    findings,
    summary:
      findings.length === 0
        ? 'Your dental X-ray shows generally healthy teeth and supporting structures. No significant issues were detected.'
        : `Analysis complete. ${findings.length} finding${findings.length > 1 ? 's' : ''} detected that require attention.`,
    recommendations:
      findings.length === 0
        ? [
            'Continue regular dental check-ups every 6 months',
            'Maintain good oral hygiene with brushing and flossing',
            'Consider professional cleaning if not done recently',
          ]
        : [
            'Schedule a dental appointment for professional evaluation',
            'Bring this report to discuss findings with your dentist',
            'Maintain good oral hygiene while waiting for appointment',
            'Monitor any symptoms like pain or sensitivity',
          ],
  };
}

function Brain({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
