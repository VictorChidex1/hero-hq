import { useState } from "react";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useUpload from "../../hooks/useUpload";
import Dropzone from "./Dropzone";

export default function FloatingForm() {
  // 1. Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // 2. Upload Hook (The Cloudinary Logic)
  const { uploadFile, status, progress, fileName, resetUpload } = useUpload();

  // 3. Local state to hold the file before user clicks "Submit"
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Text Inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Drop
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Note: We don't upload immediately. We wait for the "Submit" button.
    // This saves bandwidth if the user changes their mind.
  };

  // 4. The Master Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!selectedFile) {
      toast.error("Please attach your resume first!");
      return;
    }
    if (!formData.name || !formData.email) {
      toast.error("Name and Email are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step A: Upload File to Cloudinary
      // We wait for the URL before creating the database record
      const resumeUrl = await uploadFile(selectedFile);

      if (!resumeUrl) {
        throw new Error("Upload failed");
      }

      // Step B: Save Application to Firestore
      await addDoc(collection(db, "applicants"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        resumeUrl: resumeUrl, // The link to Cloudinary
        status: "new", // For the Admin Dashboard
        createdAt: serverTimestamp(),
      });

      // Step C: Success & Reset
      toast.success("Application Sent! Good luck.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedFile(null);
      resetUpload();
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto px-4">
      {/* THE NEGATIVE MARGIN - Pulls card up into the Blue Hero */}
      <div className="-mt-24 bg-white rounded-2xl shadow-float p-8 md:p-10 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply Now</h2>
          <p className="text-gray-500">
            Join the team that's cleaning up Texas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid for Name/Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                placeholder="Victor Chidera"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                placeholder="victor@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              placeholder="+234 ..."
            />
          </div>

          {/* DROPZONE SECTION */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Resume / CV
            </label>
            <Dropzone
              onFileSelect={handleFileSelect}
              status={status}
              fileName={fileName}
              progress={progress}
              selectedFile={selectedFile}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Short Cover Letter
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-none"
              placeholder="Tell us why you are a good fit..."
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting || status === "UPLOADING"}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-brand-green hover:bg-[#5a8013] text-white"
            }`}
          >
            {isSubmitting ? "Sending Application..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
