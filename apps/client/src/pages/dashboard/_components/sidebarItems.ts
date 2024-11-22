import { Home, Presentation, Users } from "lucide-react";

export const sidebarItems = [
  {
    canCreate: false,
    href: "/dashboard",
    icon: Home,
    label: "Dashboard",
  },
  {
    canCreate: true,
    href: "/dashboard/users",
    icon: Users,
    label: "Users",
  },
  {
    canCreate: true,
    href: "/dashboard/posts",
    icon: Presentation,
    label: "Posts",
  },
];
