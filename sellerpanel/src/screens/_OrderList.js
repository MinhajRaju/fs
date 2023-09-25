import React from "react";
import {connect} from 'react-redux'

import store from "../store";
import { SellerOrderAction ,SellerWiseOrderAction } from "../Actions/action";
import { StatusLengthAction } from "../Actions/action";
import { Link } from "react-router-dom";


const mapStateToProps = (state) =>{


    return {SellerOrder:state.SellerOrderReducers.SellerOrder  ,SellerData:state.StatusLengthReducers.StatusLengthData }
}


export default connect(mapStateToProps)(class OrderList extends React.Component{


    constructor(props){
        super(props)
       
    }


    componentDidMount(){
        store.dispatch(SellerOrderAction())
        store.dispatch(StatusLengthAction())
        


    }

    





    
   


    

    render(){

        console.log(this.props.SellerData)
      

        return (

            <>
            
                <section class="container">

                <div class="row "  style={{margin:"1%"}}>
                        <div class="col-xl-12 col-lg-12 col-md-12 col-12 mb-6">
                            <div class="card h-100 card-lg">
                              
                               
                                <div class="card-body p-0">
                               
                                    <div class="table-responsive">
                                        <table class="table table-centered table-borderless text-nowrap table-hover">
                                            <thead class="bg-light">
                                                <tr>
                                                    <th scope="col">Order Number</th>                                                   
                                                    <th scope="col">Order Date</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Status</th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.props.SellerOrder == undefined ? null : this.props.SellerOrder.map((data)=>{

                                                    
                                                    return (
                                                        <tr>

                                                        <td><Link  to={`/od/${data.id}`}>#OR-{data.id}</Link></td>
                                                        
                                                        <td>28 March 2023</td>


                                                        <td>
                                                   
                                                           

                                                        &#2547; { this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status !== "Cancle").reduce((acc, item) => acc + item.tprice , 0).toFixed(2) }
                                                 
                                                
                                               
                                              </td>
                                                       

                                                        
                                                        <td>
                                                   
                                                           

                                                              
                                                        {this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Pending').length == 0 ? null : (<><span class="badge bg-light-warning text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Pending').length} -Pending</span>&nbsp;</>) }

                                                        {this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Rts').length == 0 ? null : (<><span class="badge bg-light-success text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Rts').length} -Shipped</span>&nbsp;</>) }
                                                        {this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Cancle').length == 0 ? null : (<><span class="badge bg-light-danger text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == data.id && item.order_status == 'Cancle').length} -Cancle</span>&nbsp;</>) }

                                                            
                                                                                  
                                                           <span>-></span>  <span class="badge bg-light-primary text-dark-primary">Total-{this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == data.id).length} items</span>
                                                           
                                                          
                                                         
                                                        </td>
                                                    
                                                    
                                                    
                                                    </tr>
                                                    )


                                                }) }
                                               
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            
            </>

        )

    }



})