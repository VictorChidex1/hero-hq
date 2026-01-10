import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  CheckCircle,
  FileText,
  ArrowDownCircle,
} from "lucide-react";
import type { UploadStatus } from "../../hooks/useUpload";
import { toast } from "sonner";

// Interface removed to fix TS6196

export default function Dropzone({
  onFileSelect,
  status,
  fileName,
  progress,
  selectedFile, // <--- NEW PROP
}: {
  onFileSelect: (file: File) => void;
  status: UploadStatus;
  fileName: string | null;
  progress: number;
  selectedFile?: File | null;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const onDropRejected = useCallback(() => {
    toast.error(
      "File rejected. Please check size (Max 5MB) and type (PDF/DOCX)."
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
    disabled: status === "SUCCESS" || status === "UPLOADING",
  });

  // State C: SUCCESS (The Confirmation)
  if (status === "SUCCESS" && fileName) {
    return (
      <div className="border border-green-500 bg-white rounded-xl p-6 relative overflow-hidden group">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-full">
            <FileText className="w-8 h-8 text-brand-green" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 font-medium">
              Uploaded Successfully
            </p>
            <p className="text-brand-dark font-bold truncate">{fileName}</p>
          </div>
          <div className="text-green-500">
            <CheckCircle className="w-6 h-6 fill-current text-green-100" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 rotate-45 transform translate-x-8 -translate-y-8"></div>
      </div>
    );
  }

  // State B.5: FILE SELECTED (Waiting for Submit)
  if (selectedFile && status === "IDLE") {
    return (
      <div className="border border-brand-blue bg-blue-50 rounded-xl p-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <FileText className="w-8 h-8 text-brand-blue" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm text-brand-blue font-medium">
              Ready to submit
            </p>
            <p className="text-brand-dark font-bold truncate">
              {selectedFile.name}
            </p>
          </div>
          {/* Change File Button */}
          <button
            type="button"
            onClick={getRootProps().onClick}
            className="text-xs font-semibold text-gray-500 hover:text-brand-blue underline"
          >
            Change
          </button>
        </div>
      </div>
    );
  }

  // State B: ACTIVE (The Reaction - Drag Over)
  if (isDragActive) {
    return (
      <div
        {...getRootProps()}
        className="border-2 border-brand-green bg-green-50 rounded-xl p-10 text-center cursor-grabbing transition-all transform scale-[1.02]"
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-sm">
          <ArrowDownCircle className="w-8 h-8 text-brand-green" />
        </div>
        <p className="text-brand-green font-bold text-lg">Drop it!</p>
      </div>
    );
  }

  // State A: IDLE (The Invitation)
  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer group"
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        {status === "UPLOADING" ? (
          <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <UploadCloud className="w-8 h-8 text-brand-blue" />
        )}
      </div>
      <p className="text-gray-600 font-medium">
        {status === "UPLOADING"
          ? `Uploading... ${Math.round(progress)}%`
          : "Drag & Drop your Resume here"}
      </p>
      <p className="text-sm text-gray-400 mt-1">PDF or DOCX, max 5MB</p>
    </div>
  );
}
