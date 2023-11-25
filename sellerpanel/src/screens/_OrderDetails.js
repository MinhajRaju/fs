import React from "react";
import {connect} from 'react-redux'

import store from "../store";

import { SellerWiseOrderAction } from "../Actions/action";
import { OrderInfoAction } from "../Actions/action";
import { StatusFlagAction } from "../Actions/action";
import withRouter from "./_Helper";
import { Link } from "react-router-dom";
import { Button, message, Popconfirm , Popover } from 'antd';


const mapStateToProps = (state) =>{


    return {OrderInfoData:state.OrderInfoReducers.OrderInfoData , SellerData:state.SellerWiseOrderReducers.SellerWiseOrderData }
}


export default withRouter(connect(mapStateToProps)(class OrderDetails extends React.Component{


    constructor(props){
        super(props)

        this.state = {  
            id : null,
            flag:null,
            status: [],
           

        }
    }


    componentDidMount(){
        store.dispatch(OrderInfoAction(this.props.params.id))
        store.dispatch(SellerWiseOrderAction(this.props.params.id , this.state.id , this.state.flag , this.state.status))
    }



    status = (val) =>{

        this.setState((prevState) => ({
            status: [...prevState.status, val],
          }));

        setTimeout(() => {
            store.dispatch(SellerWiseOrderAction(this.props.params.id , this.state.id , this.state.flag , this.state.status))
        }, 2000);  
       
    }

    removeStatus = (val) =>{

        const res = this.state.status.filter((item) => item !== val);

        this.setState({ status: res });
        setTimeout(() => {
            store.dispatch(SellerWiseOrderAction(this.props.params.id , this.state.id , this.state.flag ,this.state.status))
        }, 2000);

    }

   
     rtsconfirm = (e , id) => {
      console.log(e ,id);
      store.dispatch(SellerWiseOrderAction(this.props.params.id  , id , "Rts" , this.state.status))
      message.success('Ready To ship Successful');
    };
    rejectAction = (e) => {
      console.log(e);
      message.error('Click on No');
    };

    cancle  = (e ,  id ) => {
       
        store.dispatch(SellerWiseOrderAction(this.props.params.id  , id , "Cancle" , this.state.status))
        message.success('Cancle Succesfully');
    
}
    

    render(){

        console.log(this.props.params.id , this.state.status)

       

       

        return (

            <>


      <div class="container">
   
        <div class="row mb-8">
          <div class="col-md-12">
            <div class="d-md-flex justify-content-between align-items-center">
              <div>
        
               
               
             
              </div>
       
             

            </div>
          </div>
        </div>
 
        <div class="row ">
          <div class="col-xl-12 col-12 mb-5">
          
            <div class="card h-100 card-lg">
              <div class="card-body p-6">
                <div class="d-md-flex justify-content-between">
                  <div class="d-flex align-items-center mb-2 mb-md-0">
                    <h2 class="mb-0">Order ID: #{this.props.params.id}</h2>
                    
                  </div>
                 
                  <div class="d-md-flex">
                  
                    <div class="ms-md-3">
                     
                      <a href="#" class="btn btn-secondary">Download Invoice</a>
                    </div>
                  </div>
                </div>
                <div class="mt-8">
                  <div class="row">
                  
                    <div class="col-lg-4 col-md-4 col-12">
                      <div class="mb-6">
                        <h6>Customer Details</h6>
                        {this.props.OrderInfoData == undefined ? null : (
                        <p class="mb-1 lh-lg">{this.props.OrderInfoData.customer.user.username}<br/>
                        anderalex@example.com<br/>
                        {this.props.OrderInfoData.customer.phone_number}</p>



                        ) }
                            
                              
            
                     
                      </div>
                    </div>
                
                    <div class="col-lg-4 col-md-4 col-12">
                      <div class="mb-6">
                        <h6>Shipping Address</h6>

                        {this.props.OrderInfoData == undefined ? null : (

                           
                                <p class="mb-1 lh-lg">{this.props.OrderInfoData.shipping.name}<br/>
                                {this.props.OrderInfoData.shipping.region} , {this.props.OrderInfoData.shipping.city}<br/>
                              
                                Contact No. {this.props.OrderInfoData.shipping.phone_number}</p>

                            
                        )}
                    

                      </div>
                    </div>
                  
              
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                  <div class="p-6">
                                  <Link  to={`/ol/`}>Back</Link>
                                    <hr/>
                                   
                                    <input class="form-check-input" type="checkbox" value="Rts" id="customerOne"   onClick={(e) =>
                                  this.state.status == []
                                    ? null
                                    : this.state.status.includes(
                                        e.target.value
                                      )
                                    ? this.removeStatus(e.target.value)
                                    : this.status(e.target.value)
                                } /> Rts &nbsp;
                                    <input class="form-check-input" type="checkbox" value="Return" id="customerOne" onClick={(e) =>
                                  this.state.status == []
                                    ? null
                                    : this.state.status.includes(
                                        e.target.value
                                      )
                                    ? this.removeStatus(e.target.value)
                                    : this.status(e.target.value)
                                } /> Return &nbsp;
                                    <input class="form-check-input" type="checkbox" value="Cancle" id="customerOne" onClick={(e) =>
                                  this.state.status == []
                                    ? null
                                    : this.state.status.includes(
                                        e.target.value
                                      )
                                    ? this.removeStatus(e.target.value)
                                    : this.status(e.target.value)
                                } />  Cancel &nbsp;
                                    <input class="form-check-input" type="checkbox" value id="customerOne"   onClick={(e) =>
                                  this.state.status == []
                                    ? null
                                    : this.state.status.includes(
                                        e.target.value
                                      )
                                    ? this.removeStatus(e.target.value)
                                    : this.status(e.target.value)
                                } /> Deliverd &nbsp;
                                  
                                </div>
               
                    <table class="table mb-0 text-nowrap table-centered">
                   
                      <thead class="bg-light">
                        <tr>
                          <th>Products</th>
                          <th>Variation</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                   
                      <tbody>
                        
                        {this.props.SellerData == undefined ? null : this.props.SellerData.map((data)=>{

                            return (

<tr>
                          <td>
                            <a href="#" class="text-inherit">
                              <div class="d-flex align-items-center">
                                
                                <div class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>

                                <Popover placement="rightBottom" content={<img src={data.product.image.length == 0 ? null :data.product.image[0].photo} alt=""/>}>
                                <img src={data.product.image.length == 0 ? null :data.product.image[0].photo} alt=""/>
  </Popover>
                               
                         
                                </div>
                                <div class="ms-lg-4 mt-2 mt-lg-0">
                                  <h5 class="mb-0 h6">
                                    {data.product.title} 
                                  </h5>
                                
                                </div>
                              </div>
                            </a>
                          </td>
                         
                          <td>{ data.order_status == 'Cancle' ? 0 : data.qty}</td>
                          <td>&#2547;{ data.order_status == 'Cancle' ? 0 : data.tprice}</td>
                          <td>
                                                         {data.order_status == "Pending" ?(<span class="badge bg-light-warning text-dark-primary">Pending</span>)  : data.order_status =="Rts" ?<span class="badge bg-light-success text-dark-primary">Ready to ship</span> : data.order_status == 'Cancle' ?<span class="badge bg-light-danger text-dark-primary">Cancled</span> : null }   
                                                        </td>
                          <td>

                        {data.order_status == 'Cancle' || data.order_status == 'Rts' ? null :<a href="#" class="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="feather-icon icon-more-vertical fs-5"></i>
                         </a> }

                          
                          
                          
                            <ul class="dropdown-menu">
                            {data.order_status == 'Cancle' ? null :  <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={(e) => this.rtsconfirm(e , data.id)}
    onCancel={this.rejectAction}
    okText="Yes"
    cancelText="No"
    
  >
   <span style={{cursor:"pointer"}}><i  style={{cursor:"pointer"}} class="bi bi-trash me-3"></i>Rts</span>
  </Popconfirm>}
<br/>
                            {data.order_status == 'Rts' ? null :   <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={(e) => this.cancle(e , data.id)}
    onCancel={this.rejectAction}
    okText="Yes"
    cancelText="No"
  >
   <span style={{cursor:"pointer"}}><i  class="bi bi-trash me-3"></i>Cancle</span>
  </Popconfirm>}
                           
                             
                              
                            </ul>
                          </td>
                        </tr>

                            )

                        })}
                        
                        
                        



                        
                      
                    

                        

                      </tbody>
                    </table><br/>
                  </div>
                </div>
              </div>
              <div class="card-body p-6">

                <div class="row">
                  <div class="col-md-6 mb-4 mb-lg-0">
                    <h6>Payment Info</h6>
                    <span>Cash on Delivery</span><br/>
                    <span>&#2547;{ this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=>  item.order_status !== "Cancle").reduce((acc, item) => acc + item.tprice , 0).toFixed(2) }</span>
                  </div>

               
                </div>
                
              </div>

              <div class="card-body p-6">



</div>




            </div>

          </div>

        </div>

      </div>


            </>

        )

    }



}))