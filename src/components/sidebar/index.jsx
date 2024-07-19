import { useState } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import sidebars from "@/config/sidebar";
import { uniqueId } from "lodash";
import { useTranslation } from "react-i18next";

const Sidebar = ({ open, onClose }) => {
  const { t } = useTranslation();
  let location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const activeRoute = (route) => {
    return location.pathname.includes(route) && location.pathname.endsWith(route);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  return (
    <div
      className={`sm:none bg-neutral-600 duration-175 linear fixed !z-50 flex min-h-full flex-col pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <div className="mx-[35px] mt-[45px] flex items-center justify-center">
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-600 dark:text-white">
            <span className="text-xl sm:font-bold sm:text-2xl text-white">
              {t("common:app_name")}
            </span>
          </span>
        </Link>
      </div>
      <div className="mt-[50px] mb-7 h-px bg-white dark:bg-white/30" />
      <ul className="mb-auto pt-1">
        {sidebars.map((item, index) => (
          <div key={uniqueId()}>
            {item.children ? (
              <div className="relative">
                <div
                  onClick={() => toggleSubmenu(index)}
                  className="relative mb-3 flex cursor-pointer"
                >
                  <li className="flex my-[3px] cursor-pointer items-center px-8">
                    <span
                      className={`${
                        (activeRoute(item.path) || openSubmenu === index)
                          ? "font-bold text-white dark:text-white"
                          : "font-medium text-white"
                      }`}
                    >
                      {<item.icon className="h-6 w-6" />}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex ${
                        (activeRoute(item.path) || openSubmenu === index)
                          ? "font-bold text-white dark:text-white"
                          : "font-medium text-white"
                      }`}
                    >
                      {item.name}
                    </p>
                    <HiChevronDown
                      className={`ml-auto h-5 w-5 ${
                        openSubmenu === index
                          ? "transform rotate-180"
                          : "transform rotate-0"
                        }
                        ${
                          (activeRoute(item.path) || openSubmenu === index)
                            ? "font-bold text-white dark:text-white"
                            : "font-medium text-white"
                        }
                      `}
                    />
                  </li>
                </div>
                {openSubmenu === index && (
                  <ul className="bg-sky-600 transition-all py-0.5">
                    {item.children.map((subItem) => (
                      <Link key={uniqueId()} to={`${item.path}/${subItem.path}`}>
                        <li className="my-[10px] flex cursor-pointer items-center px-12 gap-2">
                          <span
                            className={`${
                              activeRoute(`${item.path}/${subItem.path}`)
                                ? "font-bold text-white dark:text-white"
                                : "font-medium text-white"
                            }`}
                          >
                            {<subItem.icon className="h-6 w-6" />}
                          </span>
                          <p
                            className={`leading-1 ${
                              activeRoute(`${item.path}/${subItem.path}`)
                                ? "font-bold text-white dark:text-white"
                                : "font-medium text-white"
                            }`}
                          >
                            {subItem.name}
                          </p>
                        </li>
                        {(activeRoute(`${item.path}/${subItem.path}`)) && (
                          <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-white dark:text-white" />
                        )}
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={uniqueId()} to={item.path}>
                <div className="relative mb-3 flex hover:cursor-pointer">
                  <li className="my-[3px] flex cursor-pointer items-center px-8">
                    <span
                      className={`${
                        activeRoute(item.path)
                          ? "font-bold text-white dark:text-white"
                          : "font-medium text-white"
                      }`}
                    >
                      {<item.icon className="h-6 w-6" />}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex ${
                        activeRoute(item.path)
                          ? "font-bold text-white dark:text-white"
                          : "font-medium text-white"
                      }`}
                    >
                      {item.name}
                    </p>
                  </li>
                  {activeRoute(item.path) && (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-neutral-50" />
                  )}
                </div>
              </Link>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
