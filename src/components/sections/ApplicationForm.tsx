import { useState } from "react";
import Dropzone from "../ui/Dropzone";
import useUpload from "../../hooks/useUpload";
import { toast } from "sonner";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function ApplicationForm() {
  const { status, progress, downloadUrl, fileName, uploadFile, resetUpload } =
    useUpload();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = async (file: File) => {
    await uploadFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!downloadUrl) {
      toast.error("Please upload your resume first!");
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "applicants"), {
        ...formData,
        resume_url: downloadUrl,
        status: "new",
        timestamp: serverTimestamp(),
      });

      toast.success("Application received! We'll be in touch.");
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      resetUpload();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="application-form"
      className="relative z-20 max-w-4xl mx-auto -mt-20 px-4 mb-20"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Audition Stage
          </h2>
          <p className="text-gray-500">
            Show us what you've got. Upload your resume and tell us your story.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
                placeholder="Clark Kent"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none"
                placeholder="clark@dailyplanet.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Your Mission (Cover Letter)
            </label>
            <textarea
              id="message"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all outline-none resize-none"
              placeholder="Tell us why you're the hero we need..."
              required
            ></textarea>
          </div>

          {/* Smart Dropzone */}
          <Dropzone
            onFileSelect={handleFileSelect}
            status={status}
            fileName={fileName}
            progress={progress}
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || status === "UPLOADING"}
              className="w-full bg-brand-green hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "Sending..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
