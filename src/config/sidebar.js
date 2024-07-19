import {
  MdHome,
  MdBarChart,
  MdPerson,
} from "react-icons/md";

const sidebars = [
  {
    name: "Dashboard",
    icon: MdHome,
    path: "dashboard",
  },
  {
    name: "Admin",
    icon: MdPerson,
    path: "admins",
    children: [
      {
        name: "List",
        icon: MdBarChart,
        path: "",
      },
      {
        name: "Create",
        icon: MdHome,
        path: "create",
      },
    ],
  },
];

export default sidebars;
