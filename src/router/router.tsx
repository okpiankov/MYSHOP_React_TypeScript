import { createBrowserRouter, Outlet } from 'react-router-dom';
// import { AuthPage } from '../components/Auth/AuthPage';
// import { AuthPageFormik } from '../components/Auth/AuthPageFormik';
// import { RegisterPage } from '../components/Auth/RegisterPage';
import { BasketPage } from '../components/BasketPage/BasketPage';
import { СabinetPage } from '../components/LK/CabinetPage';
import { RootComponent } from '../components/Core/Root';
import { MainPage } from '../components/MainPage/MainPage';
import { PayPage } from '../components/PayPage/PayPage';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductCardID } from '../components/ProductCard/ProductCardID';
import { ProductCardType } from '../components/ProductCard/ProductCardType';
import { ROUTES } from './routes';
import { PlugPage } from '../components/PlugPage/PlugPage';
import { DeliveryPage } from '../components/DeliveryPage/DeliveryPage';
import { LayoutСabinet } from '../components/LK/Core/Root';
import { LayoutAdmin } from '../components/Admin/Core/Root';
import { AdminPage } from '../components/Admin/AdminPage';
import { AddProductPage } from '../components/Admin/EditProduct/AddProductPage';
import { DeleteProductPage } from '../components/Admin/EditProduct/DeleteProductPage';
import { EditProductPage } from '../components/Admin/EditProduct/EditProductPage';
import { EditUserPage } from '../components/Admin/EditUser/EditUserPage';
import { AddUserPage } from '../components/Admin/EditUser/AddUsertPage';
import { OrderPage } from '../components/OrderPage/OrderPage';
import { ProtectedRoute } from './ProtectedRoute';
import { SearchPage } from '../components/SearchPage/SearchPage';
import { EditOrderPage } from '../components/Admin/EditOrder/EditOrderPage';
import { PersonalDataPage } from '../components/LK/PersonalDataPage/PersonalDataPage';
import { OrderID } from '../components/Admin/EditOrder/OrderID';

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <RootComponent />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: ROUTES.pay,
        element: <PayPage />,
      },
      {
        path: ROUTES.delivery,
        element: <DeliveryPage />,
      },
      {
        path: ROUTES.productsAll,
        element: <ProductCard />,
      },
      {
        path: ROUTES.productsType,
        element: <ProductCardType />,
      },
      {
        path: `${ROUTES.productID}/:id`,
        element: <ProductCardID />,
      },
      // {
      //   path: ROUTES.auth,
      //   element: <AuthPage />,
      // },
      // {
      //   path: ROUTES.authFormik,
      //   element: <AuthPageFormik />,
      // },
      // {
      //   path: ROUTES.register,
      //   element: <RegisterPage />,
      // },
      {
        path: ROUTES.plug,
        element: <PlugPage />,
      },
      {
        path: ROUTES.basket,
        element: <BasketPage />,
      },
      // {
      //   path: ROUTES.addProduct,
      //   element: <AddProductPage />,
      // },
      // {
      //   path: ROUTES.editOrder,
      //   element: <EditOrderPage />,
      // },
      // {
      //   path: `${ROUTES.orderID}/:id`,
      //   element: <OrderID />,
      // },
      // {
      //   path: ROUTES.orderID,
      //   element: <OrderID />,
      // },
      {
        path: ROUTES.search,
        element: <SearchPage />,
      },
    ],
  },

  // отдельный layout для личного кабинета
  {
    path: ROUTES.cabinet,
    element: (
      <ProtectedRoute requiredRole="client">
        <LayoutСabinet />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <СabinetPage />,
      },
      {
        path: ROUTES.order,
        element: <OrderPage />,
      },
      {
        path: ROUTES.mybasket,
        element: <BasketPage />,
      },
      {
        path: ROUTES.personalData,
        element: <PersonalDataPage />,
      },
    ],
  },
  
  // отдельный layout для админки
  {
    path: ROUTES.admin,
    element: (
      <ProtectedRoute requiredRole="admin">
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: ROUTES.addProduct,
        element: <AddProductPage />,
      },
      {
        path: ROUTES.editProduct,
        element: <EditProductPage />,
      },
      {
        path: ROUTES.addUser,
        element: <AddUserPage />,
      },
      {
        path: ROUTES.editUser,
        element: <EditUserPage />,
      },
      {
        path: ROUTES.editOrder,
        element: <EditOrderPage />,
      },
      {
        path: `${ROUTES.orderID}/:id`,
        element: <OrderID />,
      }, 
    ],
  },
]);
