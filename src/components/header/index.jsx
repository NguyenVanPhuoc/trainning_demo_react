import { Link } from "react-router-dom";
import logo from "@/assets/images/meeting-room-logo.png";
import avatarDefault from "@/assets/images/avatar4.png";
import Dropdown from "../dropdown";
import { useTranslation } from "react-i18next";


const Header = (props) => {
  const { t } = useTranslation();
  const menu = [
    {
      name: t("common:calendar"),
      href: "/calendar",
    },
    {
      name: t("common:profile"),
      href: "/profile",
    },
  ];
  // eslint-disable-next-line react/prop-types
  const { logoutClick, fullname, avatar } = props;
  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        <div className="flex">
          <Link href="/" className="mr-9">
            <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-600 dark:text-gray-100">
              <span>
                <img src={logo} alt="Logo" className="w-12 sm:w-16" />
              </span>
              <span className="text-xl sm:font-bold sm:text-2xl">
                {t("common:app_name")}
              </span>
            </span>
          </Link>

          <div className="hidden text-center lg:flex lg:items-center">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              {menu.map((item, index) => (
                <li className="mr-3" key={index}>
                  <Link
                    to={item.href}
                    className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:outline-none dark:focus:bg-gray-800"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex mr-3 space-x-4">
          <Dropdown
            button={
              <img
                className="h-10 w-10 rounded-full cursor-pointer"
                src={avatar ?? avatarDefault}
                alt="Elon Musk"
              />
            }
            // eslint-disable-next-line react/no-children-prop
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
                {menu.map((item, index) => (
                  <Link key={index}
                    to={item.href}
                    className="text-sm font-medium mb-3 text-gray-800 dark:text-white hover:dark:text-white lg:hidden"
                  >
                    {item.name}
                  </Link>
                ))}
                  <Link
                    onClick={logoutClick}
                    className="text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in"
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
    </div>
  );
};

export default Header;
