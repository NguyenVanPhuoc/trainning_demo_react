import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/toaster";

function AuthLayout() {
  return (
    <>
      <Toaster />
      <div className="relative float-right h-full min-h-screen w-full !bg-white">
        <main className="mx-auto min-h-screen">
          <div className="relative flex bg-gray-50">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
