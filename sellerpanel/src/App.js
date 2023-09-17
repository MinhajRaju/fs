import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import store from "./store"

import { connect } from "react-redux";

import Dashboard from "./screens/_Dashborad";
import HCF from "./screens/_HCF";
import AllProduct from "./screens/_AllProduct";



export default class App extends React.Component {


  constructor(props) {
    super(props)

  

  }




  render() {
    return (
      <div >

        <Router>






          <Routes>

            <Route element={<HCF/>} >

            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/ap" element={<AllProduct />} />
            

            </Route>


          </Routes>





        </Router>


      </div>
    )
  }



}

