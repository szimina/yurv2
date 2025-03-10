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
import { Intro, Nest, Pipe, ScrollIndicator } from '../ui';
import { Circles } from '../circles';
import { Statistics } from '../statistics';
import { FemidaBlock } from '../femida';
import { Cards } from '../cards';
import { useRef } from 'react';




const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pipeRef = useRef<HTMLElement | null>(null);

  return (
    <div className={styles.app}>
      <ScrollIndicator/>
      <AppHeader />
      <Intro title={'Спишем долги быстро и законно'} text={'На основании ФЗ "О банкротстве"'}/>
      <Circles text={['Законность и прозрачность', 'Комлексный подход', 'Экономия времени и нервов', 'Защита от коллекторов']}></Circles>
      <Statistics/>
      <FemidaBlock/>
      <Cards/>
      <Pipe/>
      {/* <Nest/> */}
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
