import Dashboard from 'views/Dashboard/Dashboard';
import DashboardVar from 'views/Dashboard/DashboardVar';
import DashboardVar2 from 'views/Dashboard/DashboardVar2'
import Notifications from 'views/Notifications/Notifications';
import Upgrade from 'views/Upgrade/Upgrade';

const appRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/dashboardvar", name: "Current Session", icon: "pe-7s-next-2", component: Dashboard },
    { dashboardvar2: true, path: "/dashboardvar2", name: "New Session", icon: "pe-7s-rocket", component: Upgrade },
    { redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;
