import React, { useState } from 'react';
import Card, { CardHeader, CardTitle } from '../../../components/ui/Card';
import { UploadCloud, FileText, CheckCircle2, Trash2, RefreshCw } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function ResumeUploader({ onResumeParsed }) {
  const [file, setFile] = useState({
    name: 'John_Doe_Software_Resume_2025.pdf',
    size: '1.4 MB',
    uploadedAt: 'Uploaded 10 May 2025',
    parsed: true,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setIsUploading(true);
      setTimeout(() => {
        setFile({
          name: uploadedFile.name,
          size: `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadedAt: 'Uploaded Just now',
          parsed: true,
        });
        setIsUploading(false);
        if (onResumeParsed) onResumeParsed(uploadedFile.name);
      }, 1200);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <Card className="border border-[#ede3f0]">
      <CardHeader className="mb-3">
        <div>
          <CardTitle>Technical Resume & AI Parser</CardTitle>
          <p className="text-xs text-[#6e5975] mt-0.5">
            Upload your resume to extract core engineering competencies and calibrate question difficulty.
          </p>
        </div>
      </CardHeader>

      {file ? (
        /* Parsed Resume File Box */
        <div className="p-4 rounded-2xl bg-[#faf8fb] border border-[#ede3f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8c60a2]/15 to-[#fa846e]/15 text-[#6e4876] flex items-center justify-center border border-[#ce93cb]/30 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#2b1d30]">
                  {file.name}
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Parsed
                </span>
              </div>
              <p className="text-xs text-[#a08ba7] mt-0.5">
                {file.size} • {file.uploadedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#6e4876] bg-white border border-[#ede3f0] hover:bg-[#faf8fb] transition shadow-2xs flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace</span>
              </span>
            </label>

            <button
              onClick={handleRemove}
              className="p-2 rounded-xl text-[#a08ba7] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
              title="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          className={cn(
            'p-8 rounded-2xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center cursor-pointer',
            isDragging
              ? 'border-[#8c60a2] bg-[#8c60a2]/10'
              : 'border-[#ede3f0] bg-[#faf8fb]/60 hover:bg-white hover:border-[#ce93cb]'
          )}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="w-12 h-12 rounded-2xl bg-white border border-[#ede3f0] text-[#8c60a2] flex items-center justify-center mb-3 shadow-2xs">
            <UploadCloud className="w-6 h-6" />
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-[#2b1d30]">
            Click to upload or drag & drop your resume
          </h4>
          <p className="text-xs text-[#a08ba7] mt-1">
            Supports PDF, DOCX (Max size: 5MB)
          </p>

          {isUploading && (
            <p className="text-xs text-[#8c60a2] font-semibold mt-3 animate-pulse">
              Parsing resume keywords with NLP...
            </p>
          )}
        </label>
      )}
    </Card>
  );
}

export default ResumeUploader;
