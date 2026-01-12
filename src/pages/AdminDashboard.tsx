import { useEffect, useState } from "react";
import SEO from "../components/seo/SEO";
import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  type DocumentSnapshot,
} from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LogOut,
  Shield,
  Calendar,
  Phone,
  Mail,
  User,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { type Applicant } from "../types";
import ApplicationInspector from "../components/admin/ApplicationInspector";

const ITEMS_PER_PAGE = 15;

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [firstVisible, setFirstVisible] = useState<DocumentSnapshot | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [isNextAvailable, setIsNextAvailable] = useState(true); // Naive check

  const navigate = useNavigate();

  // Fetch Function
  const fetchApplicants = async (
    direction: "init" | "next" | "prev" = "init"
  ) => {
    setLoading(true);
    try {
      const baseQuery = collection(db, "applicants");
      let q;

      if (direction === "next" && lastVisible) {
        q = query(
          baseQuery,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(ITEMS_PER_PAGE)
        );
      } else if (direction === "prev" && firstVisible) {
        // To go back, we query *backwards* from the first visible item
        // But Firestore pagination is tricky.
        // A simpler way for "Prev" in this context without maintaining a full stack:
        // Ideally we'd maintain a stack of "startAfter" cursors.
        // For simplicity in this iteration, keeping it robust:
        // We will stick to "Next" flow or just reset for now if complex,
        // BUT strict "Prev" requires endBefore(firstVisible) limitToLast(15).
        q = query(
          baseQuery,
          orderBy("createdAt", "desc"),
          endBefore(firstVisible),
          limitToLast(ITEMS_PER_PAGE)
        );
      } else {
        // Init or Reset
        q = query(
          baseQuery,
          orderBy("createdAt", "desc"),
          limit(ITEMS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        if (direction === "next") {
          setIsNextAvailable(false);
          toast.info("No more applications.");
        } else if (direction === "init") {
          setApplicants([]);
        }
        setLoading(false);
        return;
      }

      // Update Cursors
      setFirstVisible(querySnapshot.docs[0]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

      // Check if we likely have a next page (if we got full page)
      setIsNextAvailable(querySnapshot.docs.length === ITEMS_PER_PAGE);

      const apps = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Applicant[];

      setApplicants(apps);

      // Update Page Number
      if (direction === "next") setPage((p) => p + 1);
      if (direction === "prev") setPage((p) => Math.max(1, p - 1));
      if (direction === "init") setPage(1);
    } catch (error: any) {
      console.error("Error fetching documents: ", error);
      toast.error(`Failed to load: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants("init");
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "applicants", id));
      setApplicants((prev) => prev.filter((app) => app.id !== id));

      if (selectedApplicant?.id === id) {
        setSelectedApplicant(null);
      }

      toast.success("Application deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Failed to delete application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <SEO
        title="Mission Control | CanMan HQ"
        description="Admin dashboard for managing applications."
      />

      {/* Top Bar */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="bg-brand-blue/10 p-2 rounded-lg">
            <Shield className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">
              Mission Control
            </h1>
            <p className="text-xs text-gray-500 font-medium">Hero HQ Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-brand-blue hover:bg-blue-50 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            Back to HQ
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Inbound Applications
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Review and manage potential candidates.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchApplicants("init")}
                className="p-2 text-gray-400 hover:text-brand-blue transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="bg-blue-50 text-brand-blue font-bold px-4 py-1.5 rounded-full text-sm">
                Page {page}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50/50">
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4">Candidate</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-24 text-center text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
                        <p>Loading data...</p>
                      </div>
                    </td>
                  </tr>
                ) : applicants.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-24 text-center text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <User className="w-12 h-12 text-gray-200" />
                        <p className="font-medium">No applications found.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedApplicant(app)}
                      className={`cursor-pointer transition-colors group ${
                        selectedApplicant?.id === app.id
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Created At */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 text-gray-300" />
                          {app.createdAt
                            ?.toDate()
                            .toLocaleDateString(undefined, {
                              month: "short",
                              year: "numeric",
                            })}
                        </div>
                      </td>

                      {/* Candidate Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center
                           text-brand-blue font-bold text-xs"
                          >
                            {app.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="font-semibold text-gray-900">
                            {app.name}
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                            {app.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {app.phone}
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            app.status === "new"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                              app.status === "new"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></span>
                          {app.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Don't trigger row click
                              setSelectedApplicant(app);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-brand-blue transition-all shadow-sm"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Don't trigger row click
                              handleDelete(app.id);
                            }}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing {applicants.length} records
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => fetchApplicants("prev")}
                disabled={page === 1 || loading}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={() => fetchApplicants("next")}
                disabled={!isNextAvailable || loading}
                className="flex items-center gap-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Slide-Over Inspector */}
      <ApplicationInspector
        applicant={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
