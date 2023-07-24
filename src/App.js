import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes, onlyHeaderRoutes } from './router';
import PublicLayout from './Layout/PublicLayout';
import OnlyHeaderLayout from './Layout/OnlyHeaderLayout';

function App() {
  return (
    <Router>
      <Routes>
        {onlyHeaderRoutes.map((e) => 
          <Route
            key={e.key}
            path={e.path}
            exact={e.exact}
            element={<OnlyHeaderLayout>{e.element}</OnlyHeaderLayout>}
          />
        )}

        {publicRoutes.map((e) => 
          <Route
            key={e.key}
            path={e.path}
            exact={e.exact}
            element={<PublicLayout>{e.element}</PublicLayout>}
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
