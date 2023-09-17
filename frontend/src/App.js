import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./screens/_Dashboard"
import store from "./store"
import { NestedCategoryAction } from "./Actions/actions"
import { connect } from "react-redux";
import HCF from "./screens/_HCF"
import Test from "./screens/_Product"
import Product from "./screens/_Product"
import CategoryProduct from "./screens/_CategoryProduct"

import CheckOut from "./screens/_Checkout"




export default class App extends React.Component {


  constructor(props) {
    super(props)

    store.dispatch(NestedCategoryAction())

  }




  render() {
    return (
      <div >

        <Router>






          <Routes>

            <Route element={< HCF />}>

              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/product/:slug/" element={<Product />} />
              <Route exact path="/category/:catname" element={<CategoryProduct />} />           
              <Route exact path="/checkout/" element={<CheckOut />} />

            </Route>


          </Routes>





        </Router>


      </div>
    )
  }



}


