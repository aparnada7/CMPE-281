import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LoginPage from 'layouts/LoginPage/LoginPage';
import Register from 'layouts/Register/RegisterPage';

const indexRoutes = [{ path: "/register", component: Register}, {path: "/", component: LoginPage}, {path: "/dashboard", component: Dashboard}];

export default indexRoutes;