import React, { useEffect, useState } from 'react'
import About from './features/About';
import Manage from './features/Manage';
import Item from './features/Item'
import ErrorPage from './features/ErrorPage'
import NavBar from './features/NavBar';
import Footer from './features/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import APIService from './services/apiService';
import HomePage from 'features/HomePage';

import bgImg from './assets/joe-woods-4Zaq5xY5M_c-unsplash-2.jpg'

const App = () => {

  const [managePWData, setManagePWData] = useState([]);

  const [formData, setFormData] = useState([]);

  let location = useLocation()

  // Fetch events from server
  const fetchPriceWatchData = async (e) => {
    if (e) {
      e.preventDefault()
    }
    // Database data from server
    const response = await APIService.getUserPriceWatch(formData);
    setManagePWData(response.data);
  }

  
  const fetchPriceWatchDataFromParams = async (email) => {
    // Database data from server
    const response = await APIService.getUserPriceWatch(email);
    setManagePWData(response.data);
  }

  useEffect(() => {
    setFormData([])
  }, [location])
  



  /* Handle Data Changes */
  const handleChangeInForm = (e) => {
    // Set the target state to the new form field value
    const {name, value} = e.target;
    setFormData(prevFormData => {
      if (name === 'price') {
        return ({ ...prevFormData, [name]: Number(value) })
      } else {
        return ({ ...prevFormData, [name]: value })
      }
    });
  }

  /* Data Submission */
  const submitPriceWatch = async (e) => {
    e.preventDefault();
    setFormData(prevFormData => {
      const temp = window.location.pathname.split('/')
      const sku = Number(temp[temp.length - 1])
      return ({ ...prevFormData, sku: sku })
    })
    // Example
    try {
      // Axios automatically serializes object to JSON
      // https://masteringjs.io/tutorials/axios/post-json
      const response = await APIService.createPriceWatch(formData);
    } catch (err) {
      return
    }

    // Re-fetch data after addition
    // fetchData();
  }

  /* Data Deletion */
  const deletePriceWatch = async (event, idToDelete) => {
    try {
      const response = await APIService.deletePriceWatch(idToDelete);
    } catch (err) {
      return
    }
    fetchPriceWatchData()
  }

  return (
    <div style={{'--image-url': `url(${bgImg})`}} className='bg-[image:var(--image-url)] bg-fixed' >
      <div className='flex flex-col backdrop-blur-sm min-h-screen'>
        <NavBar />

        <main className="mx-[10%] text-center flex flex-col justify-center">
          <Routes>
            <Route index element={<HomePage handleSubmit={submitPriceWatch} handleChangeInForm={handleChangeInForm} />}></Route>
            <Route path="manage" element={
              <Manage 
                handleChangeInForm={handleChangeInForm} 
                handleSubmit={fetchPriceWatchData} 
                data={managePWData} 
                handleDeletePriceWatch={deletePriceWatch}
              />
            }></Route>
            <Route path="manage/:email" element={
              <Manage 
                handleChangeInForm={handleChangeInForm} 
                handleSubmit={fetchPriceWatchData} 
                data={managePWData} 
                handleDeletePriceWatch={deletePriceWatch}
                fetchPriceWatchDataFromParams={fetchPriceWatchDataFromParams}
              />
            }></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="item/:id" element={<Item handleSubmit={submitPriceWatch} handleChangeInForm={handleChangeInForm} location={location} setFormData={setFormData} />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>

          </Routes>
        </main>
        <Footer />

      </div>
    </div>
  )
}

export default App