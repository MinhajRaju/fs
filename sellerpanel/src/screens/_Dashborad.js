import React from "react";
import { connect } from "react-redux";

import store from "../store";









export default connect()(class Dashboard extends React.Component {


    constructor(props) {
        super(props)
     



    }




    

    render() {





        return (
            <>



      <div class="container">
     
        <div class="row ">
          <div class="col-xl-12 col-12 mb-5">
        
            <div class="card h-100 card-lg">
              <div class="px-6 py-6 ">
                <div class="row justify-content-between">
        
                  <div class="col-lg-4 col-md-6 col-12 mb-2 mb-lg-0">
                    <form class="d-flex" role="search">
                      <input class="form-control" type="search" placeholder="Search Products" aria-label="Search" />
                    </form>
                  </div>
        
                  <div class="col-lg-2 col-md-4 col-12">
                    <select class="form-select">
                      
                      <option selected>Status</option>
                      <option value="1">Active</option>
                      <option value="2">Deactive</option>
                      <option value="3">Draft</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="card-body p-0">
            
    
                  
				  
				  
				  <h1>content goese here</h1>

               
              </div>
             
            </div>

          </div>

        </div>
      </div>
   
            </>


        )




    }
})