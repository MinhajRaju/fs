import React from 'react'
import withRouter from './_Helper'
import { TrackingCheckListAction } from '../Actions/action'
import store from '../store'
import Invoice from './_Invoice'

import {connect} from 'react-redux'
import Spinner from '../inc/_Spinner'
import moment from 'moment';



const mapStateToProps = (state) =>{


    console.log(state)

    return {trackingListData:state.TrackingCheckListReducers.CheckList}



}

export default withRouter(connect(mapStateToProps)(class LabelTracking extends React.Component{


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


        
        console.log(this.state.trackinglist , "this.asetata.trackinglist")

        const data = [[{'Product': {'id': 54}, 'qty': 15}, {'Product': {'id': 11}, 'qty': 2},{'Product': {'id': 11}, 'qty': 2},{'Product': {'id': 11}, 'qty': 2}] ,[{'Product': {'id': 70}, 'qty': 200}],[{'Product': {'id': 70}, 'qty': 200}]]

        return(

            <>
            <div class="container">

                
            </div>
            <div class="row" style={{display:"none" }}>

                <div class="col-lg-12">
                    <div class="col-xs-6">  <h4>Print All Docuemnt For Selected Items</h4>
</div>                    <div class="col-xs-6">  <h4>Print All Docuemnt For Selected Items</h4>
</div>
                  

                </div>
               


            </div>
                {this.props.params.value == "checklist" && this.state.trackinglist != null ? this.state.trackinglist.map((d)=>{


                   return( 
<div class="container" style={{height:"820px" , marginTop:"6pc" , padding:"20px" , border:"1px solid #ccc" , boxSizing:"content-box" , width:"1000px"}}>
<div style={{height:"1000px"}}>
<table class="table table-bordered">
<thead>
<tr>
      <th scope="col">Order Sku</th>
      <th scope="col">Image</th>
      <th scope="col">Product</th>
      <th scope="col">Qty</th>
      
    
    </tr>
{d.map((t)=>{
   
   console.log(t, "T")

   const key  = Object.keys(t)

   console.log("kye" , key , t[key].Product.id)


   return (
   <tr>
      <th scope="col"><span style={{fontSize:"12px"}}>{ t[key].Product.sku}</span></th>
      <th scope="col" ><img style={{height:"5pc" , margin:"auto" , textAlign:"center"}} src={ t[key].Product.image[0].thumbnail}/></th>
      <th scope="col"><span style={{fontSize:"12px"}}>{ t[key].Product.title}</span></th>
      <th scope="col"><span style={{fontSize:"12px"}}>{ t[key].qty}</span></th>
      
    
    </tr>
   )
})}
  </thead>



    


    
</table>      </div>
</div>

     )


    


                })  :  < Spinner />  }



            
            
          
            

            
            
            </>




        )

    }


}))