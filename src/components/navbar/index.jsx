/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from "react";
import Dropdown from "@/components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import avatarDefault from "@/assets/images/avatar4.png";
import Breadcrumb from "../breadcrumb";
import sidebars from "@/config/sidebar";
import { useTranslation } from "react-i18next";

const Navbar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { onOpenSidenav, logoutClick, fullname, avatar } = props;
  const location = useLocation();
  const [routeName, setRouteName] = useState("");
  const { t, i18n  } = useTranslation();

  useEffect(() => {
    getTitleNavBar();
  }, [location.pathname]);

  const getTitleNavBar = () => {
    const routeName = sidebars.find(item => location.pathname.indexOf(item.path) !== -1);
    setRouteName(routeName? routeName.name.toLowerCase() : "");
  }

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <Breadcrumb />
        <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {
              i18n.exists(`common:breadcrumb.${routeName}`)
              ? t(`common:breadcrumb.${routeName}`)
              : routeName 
            }
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px]">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full shadow-slate-600"
              src={avatar ?? avatarDefault}
              alt={fullname}
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-xl bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy-700 dark:text-white text-ellipsis overflow-hidden">
                    👋 Hey, { fullname }
                  </p>
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <Link
                  onClick={logoutClick}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in"
                >
                  {t("common:logout.title")}
                </Link>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
