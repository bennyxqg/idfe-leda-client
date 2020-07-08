import Home from "../views/Home";
import News from "../views/News";
import Replys from "../views/Replys";
import Messages from "../views/Messages";
import NotFound from "../views/error/404";
import Detail from "../views/NewDetail";
import Basic from "../views/Basic";

export const routes = [
    { path: "/basic", component: Basic },
    { path: "/home", component: Home },
    { path: "/new", component: News },
    { path: "/detail", component: Detail },
    { path: "/reply", component: Replys },
    { path: "/message", component: Messages },
    { path: "/404", component: NotFound },
];
