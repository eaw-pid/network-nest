import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routes.js"

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);





// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
// import App from "./pages/App";
// import { createRoot } from "react-dom/client";


