import LoginAdmin from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Admin from "@/pages/admin/Admin";
import Create from "@/pages/admin/Admin/create";
import EditAdmin from "@/pages/admin/Admin/edit";

const authRoutesAdmin = [
  {
    path: "",
    component: LoginAdmin
  },
  {
    path: "login",
    component: LoginAdmin
  },
  {
    path: "*",
    component: LoginAdmin
  },
];

const adminRoutes = [
  {
    path: "dashboard",
    component: Dashboard,
  },
  {
    path: "",
    to: "dashboard",
  },
  {
    path: "*",
    to: "dashboard",
  },
  {
    path: "users",
    component: Admin,
  },
  {
    path: "users/create",
    component: Create,
  },
  {
    path: "users/edit/:id",
    component: EditAdmin,
  },
];

export { authRoutesAdmin, adminRoutes };
