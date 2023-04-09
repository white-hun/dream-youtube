import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClinentPreovider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <QueryClinentPreovider client={queryClient}>
  <RouterProvider router={router} />
  // </QueryClinentPreovider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
