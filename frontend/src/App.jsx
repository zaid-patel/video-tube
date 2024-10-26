import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)
  const [loading,setLoading]=useState(false)
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
           <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  ) : null
}

export default App
