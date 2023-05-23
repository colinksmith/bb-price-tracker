import React, { useEffect, useState } from 'react'
import Search from './features/Search';
import Manage from './features/Manage';
import Item from './features/Item'
import ErrorPage from './features/ErrorPage'
import NavBar from './features/NavBar';
import Footer from './features/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import APIService from './services/apiService';
import HomePage from 'features/HomePage';


const App = () => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState([]);

  let location = useLocation()

  // Fetch events from server
  const fetchData = async () => {
    // Database data from server
    const response = await APIService.getAllExamples();
    setData(response.data);
  }

  useEffect(() => {
    setFormData([])
  }, [location])
  
  // Fetch the data on page load, don't set loading to false until data's fetched.
  // useEffect(() => {
  //   setLoading(true);
  //   fetchData()
  //   .then(setLoading(false)).catch(setLoading(false));
  // }, [])


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
  const handleSubmit = async (e) => {
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
      console.log(formData)
      const response = await APIService.createPriceWatch(formData);
    } catch (err) {
      return
    }

    // Re-fetch data after addition
    // fetchData();
  }

  /* Data Deletion */
  // const handleDelete = async (event, idToDelete) => {
  //   try {
  //     const response = await APIService.deleteExample(idToDelete);
  //   } catch (err) {
  //     return
  //   }

  //   // Re-fetch data after delete
  //   fetchData();
  // }

  // Render nothing while fetching for data from server
  // if (loading) return null;

  return (
    <div className="">
      <NavBar />

      <main className="mx-[10%] text-center flex flex-col justify-center">
        <Routes>
          <Route index element={<HomePage handleSubmit={handleSubmit} handleChangeInForm={handleChangeInForm} />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="manage" element={<Manage />}></Route>
          <Route path="item/:id" element={<Item handleSubmit={handleSubmit} handleChangeInForm={handleChangeInForm} location={location} />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>

        </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App