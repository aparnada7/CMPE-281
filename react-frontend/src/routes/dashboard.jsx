// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import LoginForm from "../layouts/LoginPage/LoginForm.js"
import AddSensor from "../views/Icons/addSensor"
import AddNode from "../views/Icons/addNode"

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Cluster Management",
    navbarName: "Cluster Management",
    icon: BubbleChart,
    component: TableList
  },
  {
    path: "/addNode",
    sidebarName: "Node Management",
    navbarName: "Node Management",
    icon: "wb_cloudy",
    component: AddNode
  },
  {
    path: "/icons",
    sidebarName: "Sensor Management",
    navbarName: "Sensor Simulation",
    icon: "wb_incandescent",
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "View Reports",
    navbarName: "View Reports",
    icon: LibraryBooks,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "LOGOUT",
    navbarName: "LOGOUT",
    icon: "power_settings_new",
    component: UpgradeToPro
  },
  {
        path: "/addSensor",
        sidebarName: "Add Sensor",
        navbarName: "Add Sensor",
        icon: "wb_incandescent",
        component: AddSensor
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
