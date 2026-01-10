import { useState } from "react";
import { toast } from "sonner";

export type UploadStatus = "IDLE" | "UPLOADING" | "SUCCESS" | "ERROR";

export default function useUpload() {
  const [status, setStatus] = useState<UploadStatus>("IDLE");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    // 1. Validation (Client-side)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File is too large. Max 2MB allowed.");
      return null;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF or DOCX.");
      return null;
    }

    // 2. Cloudinary Configuration
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error("Missing Cloudinary Configuration");
      toast.error("System Error: Upload configuration missing.");
      return null;
    }

    setStatus("UPLOADING");
    setFileName(file.name);
    setProgress(0);

    // 3. Upload Logic (Using XMLHttpRequest for Progress Tracking)
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "resumes"); // Keeps your Cloudinary bucket clean

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/upload`);

      // Track Progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const p = (event.loaded / event.total) * 100;
          setProgress(Math.round(p));
        }
      };

      // Handle Success
      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const url = response.secure_url; // Cloudinary's PDF link

          setDownloadUrl(url);
          setStatus("SUCCESS");
          toast.success("Resume attached successfully!");
          resolve(url);
        } else {
          console.error("Cloudinary Error:", xhr.responseText);
          setStatus("ERROR");
          toast.error("Upload failed. Please try again.");
          reject(new Error("Upload failed"));
        }
      };

      // Handle Network Errors
      xhr.onerror = () => {
        console.error("Network Error");
        setStatus("ERROR");
        toast.error("Network error during upload.");
        reject(new Error("Network error"));
      };

      xhr.send(formData);
    });
  };

  const resetUpload = () => {
    setStatus("IDLE");
    setProgress(0);
    setDownloadUrl(null);
    setFileName(null);
  };

  return {
    status,
    progress,
    downloadUrl,
    fileName,
    uploadFile,
    resetUpload,
  };
}
