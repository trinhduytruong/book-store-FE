import Home from '../pages/Home/Home'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Checkout from '../pages/Checkout/Checkout'
import TitleDetail from '../pages/Title/TitleDetail'
import CatalogSearch from '../pages/Searching/CatalogSearch'
import Overral from '../pages/Profile/Overral'
import ListOrder from '../pages/Profile/ListOrder'
import Address from '../pages/Profile/Address'
import AddressEdit from '../pages/Profile/AddressEdit'
import AccountInfo from '../pages/Profile/AccountInfo'
import { CategoryList } from '../configs/config'
import OrderDetail from '../pages/Profile/OrderDetail'

export const publicRoutes = [
  {
    key: "login",
    path: '/login',
    element: <Login />,
    exact: false
  },
  {
    key: "register",
    path: '/register',
    element: <Register />,
    exact: true
  },
  {
    key: "home",
    path: '/',
    element: <Home />,
    exact: true
  },
  {
    key: 'profile',
    path: '/profile/overral',
    element: <Overral/>,
    exact: true
  },
  {
    key: 'order-detail',
    path: '/profile/orders/detail/:id',
    element: <OrderDetail/>,
    exact: true
  },
  {
    key: 'my-orders',
    path: '/profile/orders/:type',
    element: <ListOrder/>,
    exact: true
  },
  {
    key: 'my-address',
    path: '/profile/address',
    element: <Address/>,
    exact: true
  },
  {
    key: 'address-edit',
    path: '/profile/address/edit',
    element: <AddressEdit/>,
    exact: true
  },
  {
    key: 'account-info',
    path: '/profile/account-info',
    element: <AccountInfo/>,
    exact: true
  },
  {
    key: 'title',
    path: '/title/:slug',
    element: <TitleDetail />,
    exact: true
  },
  {
    key: 'searching1',
    path: '/catalog-search',
    element: <CatalogSearch type='catalog-search'/>,
    exact: true
  },
  {
    key: 'searching2',
    path: `/${CategoryList[0].slug}`,
    element: <CatalogSearch type={CategoryList[0].slug}/>,
    exact: true
  },
  {
    key: 'searching3',
    path: `/${CategoryList[1].slug}`,
    element: <CatalogSearch type={CategoryList[1].slug}/>,
    exact: true
  }
]

export const onlyHeaderRoutes = [
  {
    key: 'cart',
    path: '/cart',
    element: <Cart />,
    exact: true
  },
  {
    key: 'checkout',
    path: '/checkout',
    element: <Checkout />,
    exact: true
  },
]

