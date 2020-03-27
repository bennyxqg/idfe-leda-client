import Home from '../views/Home';
import News from '../views/News';
import Replys from '../views/Replys';
import Messages from '../views/Messages';
import NotFound from '../views/error/404';

export const routes = [
  {path: '/home', component: Home },
  {path: '/new', component: News },
  {path: '/reply', component: Replys },
  {path: '/message', component: Messages },
  {path: '/404', component: NotFound}
]