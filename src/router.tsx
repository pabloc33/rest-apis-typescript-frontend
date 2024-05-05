import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { EditProduct, NewProduct, Products } from "./views";
import { action as newProductAction } from "./views/NewProduct";
import {
  action as updateAvailability,
  loader as productsLoader,
} from "./views/Products";
import {
  action as editProductAction,
  loader as editProductLoader,
} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailability,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar", // ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction,
      },
    ],
  },
]);
