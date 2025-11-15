import { useState } from 'react';
import { LandingPage } from './components/pages/LandingPage';
import { UploadPage } from './components/pages/UploadPage';
import { AnalysisPage } from './components/pages/AnalysisPage';
import { ResultsPage } from './components/pages/ResultsPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { Toaster } from './components/ui/sonner';

export type Page = 'landing' | 'upload' | 'analysis' | 'results' | 'dashboard';

export interface PatientInfo {
  name?: string;
  ageRange?: string;
  medicalHistory?: string[];
}

export interface ScanData {
  id: string;
  imageUrl: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  patientInfo?: PatientInfo;
  status: 'analyzing' | 'completed';
  analysisResults?: AnalysisResults;
}

export interface Finding {
  id: string;
  condition: string;
  location: string;
  toothNumber?: string;
  confidence: number;
  severity: 'healthy' | 'moderate' | 'urgent';
  description: string;
  recommendation: string;
}

export interface AnalysisResults {
  overallScore: number;
  status: 'healthy' | 'attention' | 'urgent';
  findings: Finding[];
  summary: string;
  recommendations: string[];
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentScan, setCurrentScan] = useState<ScanData | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanData[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleUploadComplete = (scan: ScanData) => {
    setCurrentScan(scan);
    navigateTo('analysis');
  };

  const handleAnalysisComplete = (results: AnalysisResults) => {
    if (currentScan) {
      const updatedScan: ScanData = {
        ...currentScan,
        status: 'completed',
        analysisResults: results,
      };
      setCurrentScan(updatedScan);
      setScanHistory([updatedScan, ...scanHistory]);
      navigateTo('results');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={navigateTo} />;
      case 'upload':
        return <UploadPage onNavigate={navigateTo} onUploadComplete={handleUploadComplete} />;
      case 'analysis':
        return currentScan ? (
          <AnalysisPage scan={currentScan} onAnalysisComplete={handleAnalysisComplete} />
        ) : null;
      case 'results':
        return currentScan?.analysisResults ? (
          <ResultsPage scan={currentScan} onNavigate={navigateTo} />
        ) : null;
      case 'dashboard':
        return (
          <DashboardPage
            scanHistory={scanHistory}
            onNavigate={navigateTo}
            onScanSelect={(scan) => {
              setCurrentScan(scan);
              navigateTo('results');
            }}
          />
        );
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}

export default App;
