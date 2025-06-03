"use client";

import TaskDashboard from "../components/TaskDashboard";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <TaskDashboard />
    </ProtectedRoute>
  );
}
