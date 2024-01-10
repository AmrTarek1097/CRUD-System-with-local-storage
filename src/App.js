
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import { RouterProvider,  createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import ContextProvider from './Context/Store';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {

  let routers = createBrowserRouter([
    {path:'/signUp',element:<SignUp/>},
    {path:'/',element:<Login/>},
    {path:'/not-found',element:<NotFound/>},
    {path:'/home',element:<ProtectedRoute><Home/> </ProtectedRoute> },
    {path:'/home/:id',element:<ProtectedRoute><Home/> </ProtectedRoute>},
  ])
  
  return <ContextProvider>
<RouterProvider router={routers}/>
  </ContextProvider> 
}

export default App;
