import { useState } from 'react';
import {
  Upload,
  Calendar,
  Filter,
  Search,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Grid3x3,
  List,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Header } from '../Header';
import { Page, ScanData } from '../../App';

interface DashboardPageProps {
  scanHistory: ScanData[];
  onNavigate: (page: Page) => void;
  onScanSelect: (scan: ScanData) => void;
}

export function DashboardPage({ scanHistory, onNavigate, onScanSelect }: DashboardPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredScans = scanHistory.filter((scan) => {
    const matchesStatus =
      filterStatus === 'all' || scan.analysisResults?.status === filterStatus;
    const matchesSearch =
      searchQuery === '' ||
      scan.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.patientInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return (
          <Badge className="bg-secondary text-secondary-foreground">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Healthy
          </Badge>
        );
      case 'attention':
        return (
          <Badge className="bg-accent text-accent-foreground">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Attention
          </Badge>
        );
      case 'urgent':
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertCircle className="mr-1 h-3 w-3" />
            Urgent
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const stats = {
    total: scanHistory.length,
    healthy: scanHistory.filter((s) => s.analysisResults?.status === 'healthy').length,
    attention: scanHistory.filter((s) => s.analysisResults?.status === 'attention').length,
    urgent: scanHistory.filter((s) => s.analysisResults?.status === 'urgent').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      <Header onNavigate={onNavigate} currentPage="dashboard" />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-foreground mb-2">My Scans Dashboard</h1>
          <p className="text-muted-foreground">
            View and manage your dental X-ray analysis history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Scans</p>
                  <p className="text-3xl text-foreground">{stats.total}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Healthy</p>
                  <p className="text-3xl text-secondary">{stats.healthy}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <CheckCircle2 className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Need Attention</p>
                  <p className="text-3xl text-accent">{stats.attention}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <AlertTriangle className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Urgent</p>
                  <p className="text-3xl text-destructive">{stats.urgent}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by filename or patient name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-input-background"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex h-10 rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="attention">Attention</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scans Display */}
        {filteredScans.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Upload className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl text-foreground mb-2">No scans yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first dental X-ray to get started with AI-powered analysis
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => onNavigate('upload')}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Your First X-Ray
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredScans.map((scan) => (
              <Card
                key={scan.id}
                className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]"
                onClick={() => onScanSelect(scan)}
              >
                <div className="relative aspect-video overflow-hidden bg-black/5">
                  <img
                    src={scan.imageUrl}
                    alt={scan.fileName}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute bottom-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="sm" className="bg-white text-foreground hover:bg-white/90">
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1 line-clamp-1">{scan.fileName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(scan.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    {scan.analysisResults && getStatusBadge(scan.analysisResults.status)}
                  </div>

                  {scan.analysisResults && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Health Score</span>
                        <span className="text-foreground">
                          {scan.analysisResults.overallScore}/100
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Findings</span>
                        <span className="text-foreground">
                          {scan.analysisResults.findings.length} detected
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredScans.map((scan) => (
              <Card
                key={scan.id}
                className="group cursor-pointer transition-all hover:shadow-lg"
                onClick={() => onScanSelect(scan)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-black/5">
                      <img
                        src={scan.imageUrl}
                        alt={scan.fileName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h3 className="text-foreground mb-1">{scan.fileName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(scan.uploadDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        {scan.analysisResults && getStatusBadge(scan.analysisResults.status)}
                      </div>

                      {scan.analysisResults && (
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Health Score:</span>
                            <span className="text-sm text-foreground">
                              {scan.analysisResults.overallScore}/100
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Findings:</span>
                            <span className="text-sm text-foreground">
                              {scan.analysisResults.findings.length}
                            </span>
                          </div>
                          {scan.patientInfo?.name && (
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-muted-foreground">Patient:</span>
                              <span className="text-sm text-foreground">
                                {scan.patientInfo.name}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upload New CTA */}
        {filteredScans.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => onNavigate('upload')}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload New X-Ray
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
