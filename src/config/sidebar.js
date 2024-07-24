import {
  MdHome,
  MdDensityMedium ,
  MdPerson,
  MdControlPoint ,
} from "react-icons/md";

const sidebars = [
  {
    name: "Dashboard",
    icon: MdHome,
    path: "dashboard",
  },
  {
    name: "Users",
    icon: MdPerson,
    path: "users",
    children: [
      {
        name: "List",
        icon: MdDensityMedium ,
        path: "",
      },
      {
        name: "Create",
        icon: MdControlPoint ,
        path: "create",
      },
    ],
  },
];

export default sidebars;
