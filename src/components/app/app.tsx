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
import { IntroUI, StatisticCard } from '../ui';
import { Circles } from '../circles';

import Femida from '../ui/femida/femida';
import { Statistics } from '../statistics';
import { FemidaBlock } from '../femida';
import { AnimatedHeader } from '../ui/animated-header/animated-header';



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <div className={styles.app}>
      <AppHeader />
      <IntroUI title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <Circles text={['Законность и прозрачность', 'Комлексный подход', 'Экономия времени и нервов', 'Защита от коллекторов']}></Circles>
      <Statistics/>
      <FemidaBlock/>
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
