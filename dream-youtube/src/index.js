import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";

// router를 정의했으니 사용해야하는데
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <App />,
    children: [
      { index: true, path: "/", element: <Videos /> },
      { path: "/videos", element: <Videos /> },
      { path: "/videos/:keyword", element: <Videos /> },
      { path: "/videos/watch/:videoId", element: <VideoDetail /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

reportWebVitals();
