import { Timestamp } from "firebase/firestore";

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  resumeUrl: string;
  status: string;
  createdAt: Timestamp;
}
