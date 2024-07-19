import breadcrumb from "@/config/breadcrumb";
import { useState, useEffect } from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Breadcrumb() {
  const location = useLocation();

  const { t } = useTranslation();

  const [listBreadcrumb, setListBreadcrumb] = useState([]);

  const checkURLMatch = (pattern, url) => {
    const regex = new RegExp(
      "^" +
        pattern.replace(/\//g, "\\/").replace(/:[^\s/]+/g, "([\\w-]+)") +
        "(/\\d+)?\\/?$"
    );
    return regex.test(url);
  };

  const routesParent = (link, routeChild) => {
    let route = [
      {
        name: "home",
        link: "/admin",
      },
    ];
    let findRoute = breadcrumb.find((item) => checkURLMatch(item.link, link));

    if (location.pathname == "/admin" || !findRoute) {
      return route;
    }

    route.push(findRoute);
    if (!findRoute.parentRoute) {
      if (routeChild) {
        routeChild.splice(1, 0, findRoute);
        return routeChild;
      }

      return route;
    } else {
      let findParent = breadcrumb.find((item) =>
        checkURLMatch(item.link, findRoute.parentRoute)
      );

      if (routeChild) {
        routeChild.splice(1, 0, findRoute);
        return routesParent(findParent.link, routeChild);
      }

      return routesParent(findParent.link, route);
    }
  };

  useEffect(() => {
    !listBreadcrumb.length &&
      setListBreadcrumb(routesParent(location.pathname));
  }, []);

  useEffect(() => {
    setListBreadcrumb(routesParent(location.pathname));
  }, [location]);

  return (
    <ul className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {Object.entries(listBreadcrumb).map(([key, breadcrumb]) => {
        return (
          <li key={key} className="inline-flex items-center gap-1.5">
            {Number(key) ? <MdOutlineNavigateNext /> : ""}

            {checkURLMatch(breadcrumb.link, location.pathname) ? (
              <span className="font-normal text-foreground">
                {t(`common:breadcrumb.${breadcrumb.name}`)}
              </span>
            ) : (
              <Link
                to={breadcrumb.link}
                className="transition-colors hover:text-foreground"
              >
                {t(`common:breadcrumb.${breadcrumb.name}`)}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Breadcrumb;
