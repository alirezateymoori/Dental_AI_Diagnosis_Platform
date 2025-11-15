import { useState } from 'react';
import {
  Download,
  Mail,
  Share2,
  Save,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Header } from '../Header';
import { Page, ScanData } from '../../App';
import { toast } from 'sonner@2.0.3';

interface ResultsPageProps {
  scan: ScanData;
  onNavigate: (page: Page) => void;
}

export function ResultsPage({ scan, onNavigate }: ResultsPageProps) {
  const [expandedFindings, setExpandedFindings] = useState<string[]>([]);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [zoom, setZoom] = useState(100);

  const results = scan.analysisResults!;

  const toggleFinding = (id: string) => {
    setExpandedFindings((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleDownloadPDF = () => {
    toast.success('PDF report downloaded successfully!');
  };

  const handleEmailResults = () => {
    toast.success('Results sent to your email!');
  };

  const handleShareWithDentist = () => {
    toast.success('Share link copied to clipboard!');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return 'bg-destructive text-destructive-foreground';
      case 'moderate':
        return 'bg-accent text-accent-foreground';
      case 'healthy':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return <XCircle className="h-5 w-5" />;
      case 'moderate':
        return <AlertTriangle className="h-5 w-5" />;
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStatusBadge = () => {
    switch (results.status) {
      case 'healthy':
        return (
          <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-base">
            ✓ Healthy
          </Badge>
        );
      case 'attention':
        return (
          <Badge className="bg-accent text-accent-foreground px-4 py-2 text-base">
            ⚠ Attention Needed
          </Badge>
        );
      case 'urgent':
        return (
          <Badge className="bg-destructive text-destructive-foreground px-4 py-2 text-base">
            ! Urgent
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      <Header onNavigate={onNavigate} currentPage="results" />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-foreground mb-4">Analysis Results</h1>
          
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Analysis Date</p>
                  <p className="text-foreground">
                    {new Date(scan.uploadDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Health Score</p>
                  <div className="flex items-center space-x-3">
                    <div className="relative h-16 w-16">
                      <svg className="h-16 w-16 -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - results.overallScore / 100)}`}
                          className={
                            results.overallScore >= 80
                              ? 'text-secondary'
                              : results.overallScore >= 60
                              ? 'text-accent'
                              : 'text-destructive'
                          }
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg text-foreground">{results.overallScore}</span>
                      </div>
                    </div>
                    <div>
                      <Progress value={results.overallScore} className="h-2 w-32" />
                      <p className="text-xs text-muted-foreground mt-1">Out of 100</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  {getStatusBadge()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Visual Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl text-foreground">X-Ray Analysis</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAnnotations(!showAnnotations)}
                    >
                      {showAnnotations ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Hide Annotations
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Show Annotations
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.max(50, zoom - 10))}
                      disabled={zoom <= 50}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.min(200, zoom + 10))}
                      disabled={zoom >= 200}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative overflow-auto rounded-lg border bg-black/5 p-4">
                  <div className="relative" style={{ width: `${zoom}%` }}>
                    <img
                      src={scan.imageUrl}
                      alt="Dental X-ray"
                      className="w-full rounded-lg"
                    />
                    {showAnnotations && results.findings.length > 0 && (
                      <div className="absolute inset-0">
                        {results.findings.map((finding, index) => {
                          const positions = [
                            { top: '20%', left: '60%' },
                            { top: '40%', left: '20%' },
                            { top: '50%', right: '15%' },
                            { top: '60%', left: '50%' },
                          ];
                          const pos = positions[index % positions.length];
                          
                          return (
                            <div
                              key={finding.id}
                              className="absolute"
                              style={pos}
                            >
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                                  finding.severity === 'urgent'
                                    ? 'border-destructive bg-destructive/80'
                                    : finding.severity === 'moderate'
                                    ? 'border-accent bg-accent/80'
                                    : 'border-secondary bg-secondary/80'
                                } text-white shadow-lg animate-pulse`}
                              >
                                {index + 1}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <p>Click markers to view details in findings list</p>
                  <p>Zoom: {zoom}%</p>
                </div>
              </CardContent>
            </Card>

            {/* Summary Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl text-foreground">Summary</h2>
                <p className="text-muted-foreground">{results.summary}</p>
                
                <div>
                  <h3 className="text-foreground mb-3">Key Findings Overview</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div className="rounded-lg bg-destructive/10 p-4 text-center">
                      <p className="text-2xl text-destructive">
                        {results.findings.filter((f) => f.severity === 'urgent').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Urgent Issues</p>
                    </div>
                    <div className="rounded-lg bg-accent/10 p-4 text-center">
                      <p className="text-2xl text-accent">
                        {results.findings.filter((f) => f.severity === 'moderate').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Moderate Concerns</p>
                    </div>
                    <div className="rounded-lg bg-secondary/10 p-4 text-center">
                      <p className="text-2xl text-secondary">
                        {results.findings.filter((f) => f.severity === 'healthy').length}
                      </p>
                      <p className="text-sm text-muted-foreground">Healthy Findings</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" />
                        <span className="text-muted-foreground">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Findings List */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl text-foreground mb-4">
                  Detected Findings ({results.findings.length})
                </h2>

                <div className="space-y-3">
                  {results.findings.map((finding, index) => (
                    <Card
                      key={finding.id}
                      className={`border-l-4 ${
                        finding.severity === 'urgent'
                          ? 'border-l-destructive'
                          : finding.severity === 'moderate'
                          ? 'border-l-accent'
                          : 'border-l-secondary'
                      }`}
                    >
                      <CardContent className="p-4">
                        <button
                          onClick={() => toggleFinding(finding.id)}
                          className="w-full text-left"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div
                                className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${getSeverityColor(
                                  finding.severity
                                )}`}
                              >
                                <span className="text-xs">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-foreground mb-1">
                                  {finding.condition}
                                  {finding.toothNumber && (
                                    <span className="ml-2 text-sm text-muted-foreground">
                                      {finding.toothNumber}
                                    </span>
                                  )}
                                </h3>
                                <p className="text-sm text-muted-foreground">{finding.location}</p>
                                <div className="mt-2 flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <span className="text-xs text-muted-foreground">Confidence:</span>
                                    <Badge variant="outline" className="text-xs">
                                      {finding.confidence}%
                                    </Badge>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {getSeverityIcon(finding.severity)}
                                    <span className="text-xs capitalize text-muted-foreground">
                                      {finding.severity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {expandedFindings.includes(finding.id) ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </button>

                        {expandedFindings.includes(finding.id) && (
                          <div className="mt-4 space-y-3 border-t pt-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Description:</p>
                              <p className="text-sm text-foreground">{finding.description}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Recommendation:</p>
                              <p className="text-sm text-foreground">{finding.recommendation}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}

                  {results.findings.length === 0 && (
                    <div className="rounded-lg bg-secondary/10 p-6 text-center">
                      <CheckCircle2 className="mx-auto mb-2 h-12 w-12 text-secondary" />
                      <p className="text-foreground">No issues detected</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your dental X-ray shows healthy teeth and structures
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="text-foreground mb-4">Actions</h3>
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleDownloadPDF}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="w-full" onClick={handleEmailResults}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Results
                </Button>
                <Button variant="outline" className="w-full" onClick={handleShareWithDentist}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with Dentist
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onNavigate('dashboard');
                    toast.success('Results saved to dashboard');
                  }}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save to Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Medical Disclaimer */}
            <Card className="bg-[#FEF3C7] border-accent">
              <CardContent className="p-4">
                <div className="flex space-x-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-accent" />
                  <div>
                    <p className="text-sm text-foreground">
                      <strong>Medical Disclaimer:</strong> This is a screening tool, not a diagnosis.
                      Always consult a licensed dentist for professional evaluation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" size="lg" onClick={() => onNavigate('upload')}>
            Upload Another X-Ray
          </Button>
          <Button size="lg" onClick={() => onNavigate('dashboard')}>
            View All Scans
          </Button>
        </div>
      </div>
    </div>
  );
}
