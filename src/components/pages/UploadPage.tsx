import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, Check, X, AlertCircle, Info, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Header } from '../Header';
import { Page, PatientInfo, ScanData } from '../../App';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface UploadPageProps {
  onNavigate: (page: Page) => void;
  onUploadComplete: (scan: ScanData) => void;
}

export function UploadPage({ onNavigate, onUploadComplete }: UploadPageProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG or PNG)');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    toast.success('X-ray uploaded successfully!');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleAnalyze = () => {
    if (!uploadedFile) {
      toast.error('Please upload an X-ray first');
      return;
    }

    const scan: ScanData = {
      id: `scan-${Date.now()}`,
      imageUrl: previewUrl,
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      uploadDate: new Date().toISOString(),
      patientInfo,
      status: 'analyzing',
    };

    onUploadComplete(scan);
  };

  const handleMedicalHistoryToggle = (condition: string, checked: boolean) => {
    const current = patientInfo.medicalHistory || [];
    if (checked) {
      setPatientInfo({
        ...patientInfo,
        medicalHistory: [...current, condition],
      });
    } else {
      setPatientInfo({
        ...patientInfo,
        medicalHistory: current.filter((c) => c !== condition),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAFC]">
      <Header onNavigate={onNavigate} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              1
            </div>
            <span className="text-sm">Upload</span>
          </div>
          <div className="mx-4 h-0.5 w-16 bg-border" />
          <div className="flex items-center space-x-2 opacity-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border">
              2
            </div>
            <span className="text-sm text-muted-foreground">Analyze</span>
          </div>
          <div className="mx-4 h-0.5 w-16 bg-border" />
          <div className="flex items-center space-x-2 opacity-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border">
              3
            </div>
            <span className="text-sm text-muted-foreground">Results</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl text-foreground mb-2">Upload Your OPG X-Ray</h2>
                  <p className="text-muted-foreground">
                    Upload a panoramic dental X-ray for AI-powered analysis
                  </p>
                </div>

                {/* Upload Zone */}
                {!uploadedFile ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                      isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-[#F8FAFC] hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <Upload className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg text-foreground mb-2">Drag & drop your OPG X-ray here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Badge variant="outline">JPG</Badge>
                      <Badge variant="outline">PNG</Badge>
                      <span>• Max 10MB</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Preview */}
                    <div className="relative overflow-hidden rounded-xl border-2 border-secondary bg-black">
                      <img
                        src={previewUrl}
                        alt="Uploaded X-ray preview"
                        className="w-full h-auto"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-secondary text-white">
                          <Check className="mr-1 h-3 w-3" />
                          Uploaded
                        </Badge>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="flex items-center justify-between rounded-lg bg-[#F8FAFC] p-4">
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFile(null);
                          setPreviewUrl('');
                        }}
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Patient Information (Optional) */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg text-foreground mb-1">Patient Information (Optional)</h3>
                  <p className="text-sm text-muted-foreground">
                    This helps provide more personalized analysis
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter name"
                      value={patientInfo.name || ''}
                      onChange={(e) =>
                        setPatientInfo({ ...patientInfo, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Age Range</Label>
                    <select
                      id="age"
                      className="flex h-10 w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      value={patientInfo.ageRange || ''}
                      onChange={(e) =>
                        setPatientInfo({ ...patientInfo, ageRange: e.target.value })
                      }
                    >
                      <option value="">Select age range</option>
                      <option value="0-17">0-17 years</option>
                      <option value="18-30">18-30 years</option>
                      <option value="31-50">31-50 years</option>
                      <option value="51-70">51-70 years</option>
                      <option value="70+">70+ years</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Medical History (Select all that apply)</Label>
                  <div className="grid gap-3 md:grid-cols-2">
                    {['Diabetes', 'Heart Disease', 'Previous Dental Surgery', 'Gum Disease'].map(
                      (condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={condition}
                            checked={patientInfo.medicalHistory?.includes(condition)}
                            onCheckedChange={(checked) =>
                              handleMedicalHistoryToggle(condition, checked as boolean)
                            }
                          />
                          <Label htmlFor={condition} className="cursor-pointer">
                            {condition}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90"
              onClick={handleAnalyze}
              disabled={!uploadedFile}
            >
              Analyze Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <Card className="border-primary/20 bg-[#EFF6FF]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-primary" />
                  <h3 className="text-foreground">Tips for Better Results</h3>
                </div>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Use high-quality panoramic (OPG) X-rays</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Ensure the image is clear and not blurry</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Include the full dental arch in the image</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                    <span>Avoid screenshots or photos of X-rays</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Security Badge */}
            <Card className="border-secondary/20 bg-[#DCFCE7]">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-foreground">Your Data is Secure</h3>
                </div>
                <p className="text-sm text-foreground">
                  All uploads are encrypted and processed securely. Your X-ray data is never shared
                  with third parties.
                </p>
              </CardContent>
            </Card>

            {/* Example Quality */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-foreground">X-Ray Quality Guide</h3>
                <div className="space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-foreground">Good Quality</span>
                      <Badge className="bg-secondary">Recommended</Badge>
                    </div>
                    <div className="h-24 rounded-lg bg-[#F8FAFC] border-2 border-secondary flex items-center justify-center">
                      <Check className="h-8 w-8 text-secondary" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Clear, high-resolution panoramic X-ray
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-foreground">Poor Quality</span>
                      <Badge variant="destructive">Avoid</Badge>
                    </div>
                    <div className="h-24 rounded-lg bg-[#F8FAFC] border-2 border-destructive flex items-center justify-center">
                      <X className="h-8 w-8 text-destructive" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Blurry, partial, or low-quality images
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
