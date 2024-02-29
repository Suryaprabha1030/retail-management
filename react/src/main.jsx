import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Index from './components/index.jsx'
import Login from './components/login.jsx'
import Admin from './components/admin.jsx'
import Employ from './components/employ.jsx'
import Inventory from './components/Inventory.jsx'
import Billing from './components/Billing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <BrowserRouter>
  <Routes>
  <Route index  element={<Index/>}/>

  <Route path="login" element={<Login/>} />
  <Route path="admin" element={<Admin/>}/>
  <Route path="employ" element={<Employ/>}/>
  <Route path="inventory" element={<Inventory/>}/>

  <Route path="bill" element={<Billing/>}/>
  </Routes>
  </BrowserRouter>

  </React.StrictMode>,
)
