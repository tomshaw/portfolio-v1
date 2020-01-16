// ==========================================================================
// Routes
// ==========================================================================
import Home from '../containers/home';
import About from '../containers/about';
import Gallery from '../containers/gallery';
import Playlist from '../containers/playlist';
import Login from '../containers/login/login';
import Logout from '../containers/login/logout';

const Routes = [{
    title: "Home",
    path: "/",
    component: Home,
    protected: false
}, {
    title: "About",
    path: "/about",
    component: About,
    protected: false
}, {
    title: "Gallery",
    path: "/gallery",
    component: Gallery,
    protected: false
}, {
    title: "Playlist",
    path: "/playlist",
    component: Playlist,
    protected: false
}, {
    title: "Login",
    path: "/login",
    component: Login,
    protected: false
},{
    title: "Logout",
    path: "/logout",
    component: Logout,
    protected: false
}]

export default Routes;
