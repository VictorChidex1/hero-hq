import {
  X,
  Mail,
  Phone,
  Calendar,
  FileText,
  Trash2,
  Download,
} from "lucide-react";
import { type Applicant } from "../../types";

interface Props {
  applicant: Applicant | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function ApplicationInspector({
  applicant,
  onClose,
  onDelete,
}: Props) {
  if (!applicant) return null;

  // Helper: Force Cloudinary to download instead of preview
  const getDownloadUrl = (url: string) => {
    if (!url) return "#";
    if (url.includes("cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {applicant.name}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>
                Applied on{" "}
                {applicant.createdAt?.toDate().toLocaleDateString(undefined, {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                at{" "}
                {applicant.createdAt?.toDate().toLocaleTimeString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Status Chip */}
          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${
                applicant.status === "new"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  applicant.status === "new" ? "bg-green-500" : "bg-gray-400"
                }`}
              ></span>
              {applicant.status.toUpperCase()}
            </span>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-2 text-brand-blue font-semibold mb-1">
                <Mail className="w-4 h-4" />
                Email
              </div>
              <a
                href={`mailto:${applicant.email}`}
                className="text-gray-900 hover:underline break-all"
              >
                {applicant.email}
              </a>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-1">
                <Phone className="w-4 h-4" />
                Phone
              </div>
              <a
                href={`tel:${applicant.phone}`}
                className="text-gray-900 hover:underline"
              >
                {applicant.phone || "N/A"}
              </a>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Cover Letter
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-gray-700 leading-relaxed font-sans text-base whitespace-pre-wrap">
              {applicant.message || "No cover letter provided."}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white safe-area-bottom flex gap-3">
          <a
            href={getDownloadUrl(applicant.resumeUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/10"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>

          <button
            onClick={() => onDelete(applicant.id)}
            className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold transition-colors border border-red-200"
          >
            <Trash2 className="w-5 h-5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
