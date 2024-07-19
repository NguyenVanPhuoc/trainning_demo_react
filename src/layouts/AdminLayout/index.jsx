import Confirm from "@/components/modal/Confirm";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { setState } from "@/stores/admin/authSlice";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function AdminLayout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const parentDivs = document.querySelectorAll("div");
    parentDivs.forEach(parentDiv => {
      const childLinks = parentDiv.querySelectorAll("a");
      childLinks.forEach(childLink => {
        if (childLink.textContent === "Claim your free account") {
          parentDiv.style.display = "none";
        }
      });
    });
  }, [location.pathname]);

  const { admin } = useSelector((state) => state.adminAuth);

  const logout = () => {
    dispatch(setState({ admin: undefined }));
    localStorage.removeItem("adminAuthenticate");
    sessionStorage.removeItem("adminAuthenticate");

    toast({
      variant: "success",
      title: t("common:success.logout"),
    });

    navigateTo("/admin/login");
  };

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  return (
    <div className="flex">
      <Toaster />
      <Confirm
        show={showModal}
        title={t("common:logout.title")}
        content={t("common:logout.description")}
        dialogCancel={t("common:cancel")}
        dialogActionText={t("common:ok")}
        onDismiss={() => setShowModal(false)}
        onAction={logout}
      />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full flex-1 bg-lightPrimary dark:!bg-navy-900 min-h-screen">
        <main className="mx-[12px] h-full flex-none transition-all min-[1200px]:ml-[313px]">
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoutClick={() => setShowModal(true)}
              fullname={admin?.name}
              avatar={admin?.avatar}
            />
            <div className="mt-8 mb-8 mx-auto flex-1 mr-20">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
