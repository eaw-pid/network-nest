import React from "react";
import App from "./pages/App";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
