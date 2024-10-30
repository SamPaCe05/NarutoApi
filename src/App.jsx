import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'

import About from './pages/About.jsx';
import Home from './pages/Home.jsx'
import Details from './pages/Details.jsx'
import Layout from './layouts/Layout'
import All from './pages/All.jsx';
function App() {
  const [characters, setCharacters] = useState([])
  const [not, setNot] = useState(false)
  const url = 'https://dattebayo-api.onrender.com/characters'
  async function ftc(url) {
    try {

      const response = await fetch(url, {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        }
      })
      if (!response.ok) {
        throw new Error('Error en la petición')
      }
      const data = await response.json();
      setCharacters(data.characters)
      if (!not) {
        toast.success("Fetch Realizado", {
          position: 'bottom-right',
          autoClose: 2000,
        })
        setNot(true)
      }
    } catch (error) {
      toast.error(error, {
        position: 'bottom-right',
        autoClose: 2000,
      })
      throw new Error(error)
    }


  }
  useEffect(() => {
    ftc(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout></Layout>}>
          <Route path='/' element={<Home characters={characters}></Home>}></Route>
          <Route path='/details/:id' element={<Details></Details>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/all' element={<All></All>}></Route>
        </Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
