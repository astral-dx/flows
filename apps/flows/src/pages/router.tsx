import { createBrowserRouter } from "react-router-dom"

import { HelloWorldPage } from "./HelloWorldPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HelloWorldPage />,
  },
])