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
import { AppHeader } from '../app-header';
import { IntroUI } from '../ui';
import { Circles } from '../circles';

import { About } from '../about';



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className={styles.app}>
      <AppHeader />
      <IntroUI title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <Circles text={['Какие мы крутые небольшой текст 1', 'Какие мы крутые небольшой текст 2', 'Какие мы крутые небольшой текст 3', 'Какие мы крутые небольшой текст 4']}></Circles>
      <div><About/></div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>
      <div>Текст</div>



        </div>
  );
};
export default App;
