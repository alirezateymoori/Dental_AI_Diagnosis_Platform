import { Upload, Zap, FileText, Shield, Brain, Clock, Share2, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Header } from '../Header';
import { Page } from '../../App';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      <Header onNavigate={onNavigate} currentPage="landing" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-[#EFF6FF] px-4 py-2 w-fit">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Dental Analysis</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground">
              AI-Powered Dental Diagnosis in Minutes
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Get instant AI-powered analysis of your dental X-rays. Fast, accurate, and secure screening
              to help you understand your oral health better.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg h-14 px-8"
                onClick={() => onNavigate('upload')}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload X-Ray Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn How It Works
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">Fast Results</span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EFF6FF]">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">AI-Powered</span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEF3C7]">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Detailed Reports</span>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F1F5F9]">
                  <Shield className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Secure & Private</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758202292826-c40e172eed1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGFpfGVufDF8fHx8MTc2MzEzMTY3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical AI Technology"
                className="rounded-xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl text-foreground">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get your dental X-ray analysis in three simple steps
          </p>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl">
                1
              </div>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-[#EFF6FF]">
                <Upload className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Upload OPG X-Ray</h3>
              <p className="text-muted-foreground">
                Upload your panoramic dental X-ray image. We support JPG and PNG formats.
              </p>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl">
                2
              </div>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-[#EFF6FF]">
                <Brain className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI examines all 32 tooth regions and checks for various dental conditions.
              </p>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors">
            <CardContent className="p-8 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl">
                3
              </div>
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-[#EFF6FF]">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl text-foreground">Get Results</h3>
              <p className="text-muted-foreground">
                Receive a detailed report with findings, confidence scores, and recommendations.
              </p>
            </CardContent>
          </Card>

          {/* Connection Lines - Desktop Only */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-primary/20" />
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-[#F8FAFC] rounded-3xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl text-foreground">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for comprehensive dental X-ray analysis
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#DCFCE7]">
                <Brain className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-foreground">Multiple Condition Detection</h3>
              <p className="text-muted-foreground">
                Detects cavities, bone loss, infections, impacted teeth, and more with high accuracy.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EFF6FF]">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-foreground">Detailed Visual Reports</h3>
              <p className="text-muted-foreground">
                Get annotated X-rays with color-coded highlights and comprehensive written analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#FEF3C7]">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-foreground">Quick Turnaround</h3>
              <p className="text-muted-foreground">
                Results in 15-30 seconds. No waiting for days or weeks for analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F1F5F9]">
                <Share2 className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="text-foreground">Export & Share</h3>
              <p className="text-muted-foreground">
                Download PDF reports and easily share results with your dental professional.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EFF6FF]">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-foreground">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted and secure. We respect your privacy and comply with HIPAA.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#DCFCE7]">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-foreground">Confidence Scores</h3>
              <p className="text-muted-foreground">
                Each finding includes AI confidence levels so you know how certain the analysis is.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="overflow-hidden bg-gradient-to-r from-primary to-primary/90 border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl text-white">
              Ready to Analyze Your Dental X-Ray?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Get instant AI-powered insights into your oral health. Upload your X-ray now and receive
              detailed analysis in minutes.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg h-14 px-8"
              onClick={() => onNavigate('upload')}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload X-Ray Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Medical Disclaimer */}
      <section className="container mx-auto px-4 py-8">
        <Card className="bg-[#FEF3C7] border-[#F59E0B]">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-foreground">
              <strong>Medical Disclaimer:</strong> This is an AI-powered screening tool and should not
              replace professional dental diagnosis. Always consult with a licensed dentist for proper
              evaluation and treatment. DentalAI is not intended for collecting personally identifiable
              information (PII) or securing sensitive medical data.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-[#F8FAFC] py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 DentalAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
