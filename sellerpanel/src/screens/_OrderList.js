import React from "react";
import {connect} from 'react-redux'

import store from "../store";
import { SellerOrderAction ,SellerWiseOrderAction } from "../Actions/action";
import { StatusLengthAction } from "../Actions/action";
import { Link } from "react-router-dom";

import {Space,   Form, Radio , Switch, Table , Dropdown  , Empty ,Tag, Badge , InputNumber, Select , Popover}  from 'antd';
import moment from 'moment';
import { LabelTracking } from "./_LabelTracking";


const mapStateToProps = (state) =>{


    return {SellerOrder:state.SellerOrderReducers.SellerOrder  ,SellerData:state.StatusLengthReducers.StatusLengthData }
}


export default connect(mapStateToProps)(class OrderList extends React.Component{


    constructor(props){
        super(props)


        this.state = {
            order: null,
            tracking:null,
            trackingdetails:[],
            idArray:[],
            productArray:[],
            orderid:null,
            sellerid:null
        }
    }


    componentDidMount(){
        store.dispatch(SellerOrderAction())
        setTimeout(() => {
          
            this.setState({order:this.props.SellerOrder.order , tracking:this.props.SellerOrder.tracking , trackingdetails:this.props.SellerOrder.trackingdetails})
        }, 6000);
       
        store.dispatch(StatusLengthAction())
        


    }

    



    printaction = (value) =>{



      console.log("fire" , this.state.idArray)


      window.location.replace(`/labeltracking/${value}/${this.state.idArray}/`)


    }

    



    

    render(){


      console.log(this.state.orderid , "orderid" , this.state.sellerid)

         
          const TrackingDetailscolumns = [

            {
                title:"Send to",
                render: (record) => (<>
    <p style={{   fontSize:"smaller"}}>

    {record.shipping.name}<br/>
                        {record.shipping.phone_number}<br/>
                        {record.shipping.area}<br/>

    </p>
                       
                </>)
            },
            {
                title:"Product",
                render: (record) => (<>

                        <p style={{width:"20%" , wordBreak:"break-all" , fontSize:"smaller"}}>{record.product.title}<br/></p>
               

                </>)
            },
            
            {
  
                render: (record) =>(<> 
                
                 {record.product.image.length == [] ? <Empty imageStyle={{display:"flex" , height:"1.5pc"}} description={"No Image"} image={Empty.PRESENTED_IMAGE_SIMPLE} /> : 
                    
                <div class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>
             
                <Popover placement="top" content={<img src={record.product.image[0].thumbnail} alt=""/>}>
                <img src={record.product.image[0].thumbnail} alt=""/>
                </Popover>
                
                
                </div>
                   
                 
                 }
             
                
                
                 </>) 
                 
               },
             
       
            
              {
              title: 'Tracking id',  
              render : (record) => (<span style={{color:"#afafaf"}}>BD-BOX {record.tracking}</span>)
            
            },
            {
                title: 'Status',  
                render : (record) => (<span style={{color:"#afafaf"}}>{record.id}</span>)
              
              },
            {
              title: 'Price',
              render : (record) => (<><span style={{color:"black" , fontWeight:"500"}}>{record.price}</span> <span style={{color:"#afafaf" , fontWeight:"500"}}>BDT</span> </>)
            
            },
           
            
          
          ];



        console.log(this.state.order , this.state.tracking)
        const columns = [
        
          
            {
              title: 'Order Number',
              render : (record) =>  (<><Link  to={`/od/${record.id}`}>#OR-{record.id}</Link></>)
            
          
            },
            {
              title: 'Order Date',
              render :(record) =>  (<>
              <p style={{color: "rgb(175, 175, 175)"}}>{moment(record.order_date).format("DD MMMM YYYY LT")}</p>
              <p style={{color: "rgb(175, 175, 175)"}}>{moment(record.order_date).fromNow().toLocaleLowerCase()}</p>
              
              </>)
            
            },
            {

                title:"Tracking id",
                render : (record) =>(

                    <>
                    {this.state.tracking.filter((item)=> item.order == record.id).length} Tracking id
                    </>
                )
            },
            {
                title: 'Price',
                render :(record) => (

                    <>
                    { this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status !== "Cancle").reduce((acc, item) => acc + item.tprice , 0).toFixed(2) +" BDT"}
                    </>

                )
              
              },
              {
                title: 'Status',
                render :(record) =>  (<>
                  <Badge.Ribbon text={`Total-${this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == record.id).length} items`} color="lime"  size="s" style={{fontSize:"13px" , fontVariantCaps:"small-caps" , letterSpacing:"1px"}} />
                {this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Pending').length == 0 ? null : (<><span class="badge bg-light-warning text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Pending').length} -Pending</span>&nbsp;</>) }

{this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Rts').length == 0 ? null : (<><span class="badge bg-light-success text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Rts').length} -Shipped</span>&nbsp;</>) }
{this.props.SellerData == undefined ? null : this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Cancle').length == 0 ? null : (<><span class="badge bg-light-danger text-dark-primary">{this.props.SellerData.filter((item)=> item.order_no == record.id && item.order_status == 'Cancle').length} -Cancle</span>&nbsp;</>) }
                
               </>)
               
              },

        ]

        const TrackingColoums = [

          {
            title:"id",
            render : (record) => (<>{record.id}</>)
          },
          {
            title:"status",
            render : (record) => (<>{record.tracking_status}</>)
          },
          {
            title:"#",
            render:(record) => (<>{this.state.trackingdetails.filter((item)=> item.tracking == record.id).length}</>)
          }
        ]

        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
        
          
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        
            this.setState({idArray:selectedRowKeys})
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
            this.setState({orderid:record['order'] , sellerid:record['seller']})
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);

            if(selected !== false){
               this.setState({orderid:selectedRows[0]['order'] , sellerid:selectedRows[0]['seller']})
            }else{
              this.setState({orderid:null , sellerid:null})
            }

         
          },
        };

        return (

            <>
    
            
                <section class="container">
                    


<Table
    expandable={{
        expandedRowRender: (record) => (
          <>
      
      
      <Table
      
      expandable={{
        expandedRowRender : (record) =>(
        <>
          <Table
      
      
      
      style={{}} 
      bordered 
      columns={TrackingDetailscolumns}      
      dataSource={this.state.trackingdetails.filter((item)=> item.tracking == record.id)}
      pagination={false}
      rowKey={"id"}
      />
     


        
        </>
        )
      }}
      rowSelection={{
        ...rowSelection
      }}
      title={()=> 

        ( <div class="col-xl-4 col-12 mb-5">

      
                
                <Select

    placeholder="Print"

    onChange={this.printaction}
      
    style={{width:"50%"}}  

    options={[{value:"checklist" , label:"Print selected checklist"},{value:"allchekclist" , label:"Print selected all checklist"},{value:"chekclist with label" , label:"Print selected checklist with label"}]}
    
    />

        
        
        
        
        
        </div>)
        
        }

       style={{}} 
       bordered 
       columns={TrackingColoums}      
       dataSource={this.state.tracking.filter((item)=>  item.order == record.id)}
       pagination={false}
       rowKey={"id"}
       />
      
          
      
         
          </>
        )
      }}

    
  
    columns={columns}
    dataSource={this.state.order}
    bordered
    rowKey={"id"}
    pagination={false}
   

  />
    

               

                </section>
            
            </>

        )

    }



})