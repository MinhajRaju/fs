import React from 'react'
import withRouter from './_Helper'
import { TrackingCheckListAction } from '../Actions/action'
import store from '../store'
import Invoice from './_Invoice'

import {connect} from 'react-redux'
import Spinner from '../inc/_Spinner'
import moment from 'moment';



const mapStateToProps  =  (state) =>{


    console.log(state)


    return {trackingListData:state.TrackingCheckListReducers.CheckList}
}

export default connect(mapStateToProps)(class Invoice extends React.Component{




    constructor(props){
        super(props)

        this.state ={

            trackinglist: null

        }
       

    }


    componentDidMount(){

        console.log(this.props)

        const  x = this.props.params.idarray.split(',')

        const idArray = []
        x.map((data)=>{
            idArray.push(parseInt(data))
        })
        
        console.log("Xxxxxx" ,parseInt(x), "Res" , idArray)


       store.dispatch(TrackingCheckListAction(idArray))



        console.log(this.props.trackingListData)


        setTimeout(() => {
            let arr = []

            idArray.map((id)=>{

              
    
                let x = this.props.trackingListData[0].filter((item)=>  item[id])
                arr.push(x)
            
            })
            this.setState({trackinglist:arr})
           
        }, 5000);
      

       

    }


    



    render(){

        return (

            <div>

{this.props.params.value == "invoice" || 'chekclist&invoice'?  (

<div class="container" style={{height:"820px" , marginTop:"6pc" , padding:"20px" , border:"1px solid #ccc" , boxSizing:"content-box" , width:"1000px"}}>
<div style={{height:"1000px"}}>
{this.props.trackingListData == undefined ? "Null" :  this.props.trackingListData[1].map((data)=>{



    return (
        <>
        <div class="row contacts">
                                                

                                                      

                                                            <tr>

                                                               
                                                                <td>
                                                                <br /><h1><b>SELLER</b> CENTER</h1 >
                                                                
                                                                <p>Purchase Summary</p> 
                                                                <p><b>{data.seller.store_name}</b></p> 
                                                                
                                                                </td>

                                                            </tr>
                                                   

                                             

                                                    <br />
                                                    <br />
                                                    <h5>Order Details</h5>
                                                    <table class="table table-sm table-bordered">

                                                        <tbody style={{lineHeight:"8px" , fontSize:"12px"}}>
                                                            <tr>

                                                                <td style={{width:"16%"}}>Order ID</td>
                                                                <td style={{width:"35%"}}>{data['o'].id}</td>
                                                                <td>Order Date</td>
                                                                <td>{moment(data['o'].order_date).format("DD MMMM YYYY ")}</td>

                                                            </tr>
                                                            <tr>

                                                                <td style={{width:"16%"}}>Invoice id</td>
                                                                <td style={{width:"35%"}}>NUll</td>
                                                                <td>Paid By</td>
                                                                <td>Null</td>

                                                            </tr>
                                                            <tr>

                                                                <td style={{width:"16%"}}>Deliver To</td>
                                                                <td style={{width:"35%"}}>{data['o'].shipping.name}</td>
                                                                <td>Phone</td>
                                                                <td>{data['o'].shipping.phone_number}</td>

                                                            </tr>
                                                            <tr>

                                                                <td style={{lineHeight:"17px"}}>Delivery Address</td>
                                                                <td  colspan="3">{data['o'].shipping.area} , {data['o'].shipping.region} , {data['o'].shipping.city}</td>


                                                            </tr>


                                                            <tr>

                                                                <td style={{width:"16%"}}>Bill To</td>
                                                                <td style={{width:"35%"}}>{data['o'].customer.user.username}</td>
                                                                <td>Phone</td>
                                                                <td>{data['o'].customer.phone_number}</td>

                                                            </tr>

                                                            <tr>

                                                                <td style={{lineHeight:"17px"}}>Delivery Address</td>
                                                                <td  colspan="3">{data['o'].shipping.area} , {data['o'].shipping.region} , {data['o'].shipping.city}</td>


                                                            </tr>




                                                        </tbody>
                                                    </table>

                                       

                                                    
                                            





                                                    



                                                </div>
        </>


    )




})}



 <h5>Order Items</h5>





    {this.props.trackingListData == undefined ? "Null" :  this.props.trackingListData[1].map((data)=>{


        return(
            <>
             <table class="table table-sm table-bordered">

             <thead style={{lineHeight:"8px" , fontSize:"12px"}}>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Product Name</th>
    <th scope="col">Shop Sku</th>
    <th scope="col">Seller Sku</th>
    <th scope="col">Attribbute</th>
    <th scope="col">Qty</th>
    <th scope="col">Paid Price</th>
    <th scope="col">Price</th>
    
    <th scope="col">Item Total</th>
    </tr>
</thead>






<tbody style={{lineHeight:"16px" , fontSize:"12px"}}>

    { data.od.map((d , index)=>{
        
    
return(
    <>
        <tr>
        <td>{index + 1}</td>
        <td style={{width:"25%"}}>{d.product.title}</td>
        <td>"this"</td>
        <td>"this"</td>
        <td>"this"</td>
        <td>{d.qty}</td>
        <td>"this"</td>
        <td>"this"</td>    
        <td>{d.qty *  d.product.price}</td>
          

        </tr>
    </>
)

})}

</tbody>


                
             </table>


             <table>


             <table class="table table-sm table-bordered" style={{ width: "265px", marginLeft: "46pc" , marginTop:"-1pc" }}>

<tbody style={{lineHeight:"8px" , fontSize:"12px"}}>
    <tr>

        <td style={{width:"148px"}}> Subtotal</td>
        <td> {Number(data.od.reduce((acc, item) => acc + item.product.price * item.qty, 0).toFixed(2))} </td>

    </tr>

    <tr>

        <td>Shipping Cost</td>
        <td>{ data.o.shipping_cost / data.o.seller_id_array.length}</td>

    </tr>
    <tr>

        <td><b>Total</b></td>
        <td> {Number(data.od.reduce((acc, item) => acc + item.product.price * item.qty, 0).toFixed(2))+ Number(data.o.shipping_cost / data.o.seller_id_array.length)}   </td>

    </tr>

</tbody>
</table>
             </table>
  






            
            </>

        )




        


    })}

</div>
</div>

            )  : "Null"}

            </div>

        )


    }






})