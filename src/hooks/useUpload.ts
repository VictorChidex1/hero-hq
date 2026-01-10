import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";
import { toast } from "sonner";

export type UploadStatus = "IDLE" | "UPLOADING" | "SUCCESS" | "ERROR";

export default function useUpload() {
  const [status, setStatus] = useState<UploadStatus>("IDLE");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    // 1. Validation (Client-side)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max 5MB allowed.");
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

    try {
      setStatus("UPLOADING");
      setFileName(file.name);

      // 2. Create Storage Reference
      // Path: resumes/YYYY/[uuid]_[filename]
      const fileId = crypto.randomUUID();
      const storageRef = ref(
        storage,
        `resumes/${new Date().getFullYear()}/${fileId}_${file.name}`
      );

      // 3. Upload Task
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(p);
          },
          (error) => {
            console.error("Upload error:", error);
            setStatus("ERROR");
            toast.error("Upload failed. Please try again.");
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setDownloadUrl(url);
            setStatus("SUCCESS");
            toast.success("Resume attached successfully!");
            resolve(url);
          }
        );
      });
    } catch (error) {
      console.error("Upload initiation error:", error);
      setStatus("ERROR");
      return null;
    }
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
