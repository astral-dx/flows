import { createBrowserRouter } from "react-router-dom"

import App from "./App/App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])