import { useState, useEffect } from 'react'
import './App.css'

const NAVIGATION_STATE = 'pushstate'
const navigate = (href) => {
  window.history.pushState({}, '', href)

  // Create a custom event
  const navigationEvent = new Event(NAVIGATION_STATE)
  window.dispatchEvent(navigationEvent)
}

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus minus nulla enim quos? Consequuntur, corrupti. Doloribus aliquid architecto quasi at itaque id sit ratione atque?</p>
      <button onClick={() => navigate('/about')}>Go to about page</button>
    </>
  )
}

const AboutPage = () => {
  return (
    <>
      <h1>About Me: Franco Zeta</h1>
      <img src='https://avatars.githubusercontent.com/u/124936792?v=4' alt='Avatar' />
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus minus nulla enim quos? Consequuntur, corrupti. Doloribus aliquid architecto quasi at itaque id sit ratione atque?</p>
      <button onClick={() => navigate('/')}>Go to home page</button>
    </>
  )
}

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(NAVIGATION_STATE, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATION_STATE, onLocationChange)
    }
  }, [])
  return (
    <>
      <main>
        {currentPath === '/' && <HomePage />}
        {currentPath === '/about' && <AboutPage />}
      </main>
    </>
  )
}

export default App
