import { Suspense, useState, useContext } from 'react';
import {Routes, Link, Route} from 'react-router-dom'
import AboutPage from './pages/AboutPage/AboutPage';
import MainPage from './pages/MainPage/MainPage';
import { MainPageAsync } from './pages/MainPage/MainPage.async';
import { AboutPageAsync } from './pages/AboutPage/AboutPage.async';
import './styles/index.scss'
import { ThemeContext } from './theme/ThemeContext';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

const App = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>Toggle</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route
            path={'/about'}
            element={<AboutPageAsync/>}
          />
          <Route
            path={'/'}
            element={<MainPageAsync/>}
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
