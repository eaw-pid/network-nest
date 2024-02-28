import App from "./pages/App"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import MyConnects from "./pages/MyConnects"
import ErrorPage from "./pages/ErrorPage"

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/my-connections",
                element: <MyConnects />,
            },
        
            
        ]
    }
];

export default routes;