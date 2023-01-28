import { Router, Routes, Route } from '@solidjs/router';

import Auth from './components/Auth';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Sidebar from './components/Sidebar';
import Single from './pages/Single';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Entry from './pages/Entry';
import Media from './pages/Media';

export default function AdminRouter(props: { path: string }) {
  return (
    <Router base="/admin" url={props.path}>
      <Auth>
        <Sidebar>
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/settings" component={Settings} />
            <Route path="/media" component={Media} />
            <Route path="/search" component={Search} />
            <Route path="/single/:collectionId" component={Single} />
            <Route path="/collection/:collectionId" component={Collection} />
            <Route path="/collection/:collectionId/:entryId" component={Entry} />
          </Routes>
        </Sidebar>
      </Auth>
    </Router>
  );
}
