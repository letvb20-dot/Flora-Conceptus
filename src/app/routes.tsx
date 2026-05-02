import { createBrowserRouter } from 'react-router';
import Root from './components/Root';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'colecao', Component: CollectionPage },
    ],
  },
]);
