import {
  LayoutDashboard,
  Video,
  FileText,
  TrendingUp,
  User,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mock Interview",
    path: "/mock-interview",
    icon: Video,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    title: "Progress",
    path: "/progress",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];