// import {
//   ConstructorPage,
//   Feed,
//   ForgotPassword,
//   Login,
//   NotFound404,
//   Profile,
//   ProfileOrders,
//   Register,
//   ResetPassword
// } from '@pages';
// import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import { AppHeader } from '../app-header';
import { IntroUI } from '../ui';
import { Circles } from '../circles';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <IntroUI title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <IntroUI title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <IntroUI title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <Circles text={['текст 1', 'текст 2', 'текст 3', 'текст 4']}></Circles>
      <Routes location={background || location}>
        {/* <Route path='/' element={<ConstructorPage />} /> */}
        {/* <Route path='/ingredients/:id' element={<IngredientDetails />} /> */}
        {/* <Route path='/feed' element={<Feed />} /> */}
        {/* <Route path='/feed/:number' element={<OrderInfo />} /> */}
        {/* <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path='*' element={<NotFound404 />} /> */}
      </Routes>
        </div>
  );
};
export default App;
