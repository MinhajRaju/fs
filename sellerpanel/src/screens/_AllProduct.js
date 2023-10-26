import React  from "react";
import { connect } from "react-redux";

import store from "../store";

import DataTable, { ExpanderComponentProps } from "react-data-table-component";

import { DateRangePicker } from 'react-date-range';

import dayjs from "dayjs";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {EditOutlined}  from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import {Space,   Form, Radio , Switch, Table , Dropdown  , Empty ,Tag, Badge , InputNumber, Select} from 'antd';

import { Button, message, Popconfirm , Popover , Input } from 'antd';
import { SellerProductAction } from "../Actions/action";
import { BulkAction } from "../Actions/action";


const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);






const mapStateToProps = (state) =>{

    console.log(state)

    return {SellerProductData:state.SellerItemReducers.SellerItemData}

}



export default connect(mapStateToProps)(class AllProduct extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {

          title: "",
          productFiltered: [],
          from: "",
          to: "",
          startDate: new Date(),
          endDate: new Date(),
          idArray: [],
    
          dateDrop: "disable",
    
          id: "",
          sign: "",
          stock: "",
          rowId: "", 
          pStockId:null,
          sing:null,
          stockValue:null    
        
    
    
        }


    }

    componentDidMount(){

      store.dispatch(SellerProductAction())

    }




    titlefilter = (value) => {

      console.log(this.props.SellerProductData , "from filter")


      this.setState({ title: value })
  
      const result = this.props.SellerProductData.filter(product => {
        return product.title.toLowerCase().match(this.state.title.toLowerCase())
      })
      if (value == "") {
        this.setState({ productFiltered:this.props.SellerProductData })
      } else {
        this.setState({ productFiltered: result })
      }
      console.log(result)
  
  
  
    }

    handleSelect = (ranges) => {
      console.log(ranges);
      this.setState({ startDate: ranges.selection.startDate, endDate: ranges.selection.endDate })
  
      var today = ranges.selection.startDate;
      var year = today.getFullYear();
      var mes = today.getMonth() + 1;
      var dia = today.getDate();
      var startDate = year + "-" + mes + "-" + dia;
      console.log(startDate);
  
  
      var today2 = ranges.selection.endDate;
      var year2 = today2.getFullYear();
      var mes2 = today2.getMonth() + 1;
      var dia2 = today2.getDate();
      var endDate = year2 + "-" + mes2 + "-" + dia2;
      console.log(endDate);
  
      console.log(this.props.AllProduct)


      const dateresult = this.props.SellerProductData.filter((data) => {

        if(data.createdAt){

          if (dayjs(data.createdAt).isSameOrAfter(dayjs(startDate))) {
  
            if (dayjs(data.createdAt).isSameOrBefore(dayjs(endDate))) {
              return data
            }
    
          }
        }

   
  
      });

      console.log(dateresult , 'datedasfasdf')

      this.setState({ productFiltered: dateresult })
  
  
  
      // {
      //   selection: {
      //     startDate: [native Date Object],
      //     endDate: [native Date Object],
      //   }
      // }
    }
    handleSearchChange = (field) => (event) => {
      const { value } = event.target
      this.setState({
        ...this.state,
        [field]: value,
  
  
      })
      console.log(field)
  
      if (field == 'title') {
  
        this.titlefilter(value)
  
  
  
      }
  
  
  
  
  
  
  
  
  
    }
    

    event = () => {




      if (this.state.dateDrop == "disable") {
  
        this.setState({ dateDrop: "enable" })
      }
      if (this.state.dateDrop == "enable") {
        this.setState({ dateDrop: "disable" })
  
      }
  
  
    }
  


    


    action =  (id , flag , msg )=>{

  
      store.dispatch(BulkAction(id , flag ))
      message.success(msg);     


   
      }
    
      cancel = (msg) => {
    
        message.error(msg);
      };
    
      onChange = (value) => {
        console.log('changed', value);
        this.setState({stockValue:value})

      };
      
      onChangeplusminus = (value) => {
        console.log('changed', value);
        this.setState({sign:value})
      };

      updateStock = (id , sign , value) =>{

        console.log(id , sign , value)
      }



      hello = (id , totalstock , sku) =>{
    
     
        const columns = [
        
          
          {
            title: 'Total Stock',
            dataIndex:"totalstock"
        
          },
          {
            title: 'sku',
            dataIndex: 'sku',
          },
            {
            title: 'Modify Stock',
            render : (record) => (
              <>
<Space>
<Select size="small" 
        defaultValue={'+'}
        style={{
          width: "110%",
        }}
        onChange={this.onChangeplusminus}
        options={[{
          label: '+',
          value: '+',
        },{
          label: '-',
          value: '-',
        }]}
      />
                <InputNumber size="small" min={1} max={100000} defaultValue={1} onChange={this.onChange} />
</Space>

              </>
            )
          },



        ];
        const data = [
          {
          
            totalstock : totalstock,
            sku: sku ,

          },
   
        ];
        return(
          
          <>
          <Table
    columns={columns}
    dataSource={data}
    bordered
    pagination={false}
    footer={() => (

    <>
   <Button type="primary" onClick={()=> this.updateStock(this.state.pStockId , this.state.sign  , this.state.stockValue)}> 
      Confirm
    </Button>
    </>
    )}

  />
          </>
        )

      }
    
   

    render() {

      const selectionRange = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        key: 'selection',
      } 


      console.log('akdhkfahdskfhd' , this.state.pStockId , this.state.sign , this.state.stockValue )



    

 

    const items = [
        {
          key: '1',
          label: <a>test</a>,
        },
        {
          key: '2',
          label: <a>test1</a>,
        },
      ];


    

  const columns = [
     {
     
      render: (record) => (<> {record.image.length == []  ? <Empty imageStyle={{display:"flex" , height:"0.5pc"}} description={"No Image"} image={Empty.PRESENTED_IMAGE_SIMPLE} />  : 
          
        <div class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>

        <Popover placement="top" content={<img src={record.image[0]['thumbnail'] == 0 ? null : record.image[0]['thumbnail']} alt=""/>}>
        <img src={record.image[0]['thumbnail'] == 0? null : record.image[0]['thumbnail']} alt=""/>
</Popover>
       
 
        </div>
        
        
        } </>) 
   
    },
  {
    
    title: 'Name',
    render :(record) =>  (<>{record.active == true ? <Badge.Ribbon text="Active" color="lime"  size="s" style={{fontSize:"10px" , fontVariantCaps:"small-caps" , letterSpacing:"1px"}} />: <Badge.Ribbon text="Deactive" color="volcano" size="small" style={{fontSize:"10px" , fontVariantCaps:"small-caps" , letterSpacing:"1px"}}/>} {record.title.trim().length <= 80 ? (<span style={{fontFamily:"open sans ,sans-serif"}}>{record.title.substring(0,80)}</span>) : (<span style={{fontFamily:"open sans ,sans-serif"}}>{record.title.substring(0,80) + '..'}</span>)} </>)
  },
 
  {
    title: 'Sku',
    render: (record) => (<span style={{color:"#afafaf"}}>{record.sku}</span>)
  
  },
  {
    title: 'Price',
    render : (record) => (<><span style={{color:"black" , fontWeight:"500"}}>{record.price}</span> <span style={{color:"#afafaf" , fontWeight:"500"}}>BDT</span> </>)
  
  },
  {
    title: 'Stock',
    render : (record) =>  (<><Space>{record.totalqty == 0 ? <span style={{"color":"Red"}}>Stock out
    
    
    
    </span>  : record.totalqty} 
    <Popover content={()=> this.hello(record.id , record.totalqty , record.sku)} title="Title" trigger="click" >
    {record.variation.length == 0 ? <EditOutlined onClick={()=>  this.setState({pStockId:record.id , sign:null , stockValue:null})} /> : null }
    </Popover></Space></>)
  },

  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>

        <Dropdown
       
        menu={{items}}

        >
      
        <a>
        <Space >
            More actions
            <DownOutlined />
            </Space>
        </a>
        </Dropdown>
      
      </Space>
    ),
  },
];



const Variationcolumns = [
  {
  
   render: (record) =>(<> 
   
    {record.variation_image.length == [] ? <Empty imageStyle={{display:"flex" , height:"1.5pc"}} description={"No Image"} image={Empty.PRESENTED_IMAGE_SIMPLE} /> : 
       
   <div class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>

   <Popover placement="top" content={<img src={record.variation_image[0].thumbnail} alt=""/>}>
   <img src={record.variation_image[0].thumbnail} alt=""/>
   </Popover>
   
   
   </div>
      
    
    }

   
   
    </>) 
    
  },
  {
    title: 'Attribute',
   
    render :  (record) => (<>    {record.active == true ? <Badge.Ribbon text="Active" color="lime"  size="s" style={{fontSize:"10px" , fontVariantCaps:"small-caps" , letterSpacing:"1px"}} />: <Badge.Ribbon text="Deactive" color="volcano" size="small" style={{fontSize:"10px" , fontVariantCaps:"small-caps" , letterSpacing:"1px"}}/>} 
    <Space size={[0, 8]} wrap> {record.colors == null ? <Tag color="warning">Color : None </Tag>  : <Tag color="success">Color: {record.colors.color}</Tag>}  {record.size == null  ? <Tag color="warning">Size : None</Tag> : <Tag color="success">Size: {record.size.size}</Tag>}  
    

    </Space> 
   </>)
  },  
  
    {
    title: 'Sku',  
    render : (record) => (<span style={{color:"#afafaf"}}>{record.sku}</span>)
  
  },
  {
    title: 'Price',
    render : (record) => (<><span style={{color:"black" , fontWeight:"500"}}>{record.price}</span> <span style={{color:"#afafaf" , fontWeight:"500"}}>BDT</span> </>)
  
  },
  {
    title: 'Stock',  
    render : (record) =>  (<><Space>{record.qty == 0 ? <span style={{"color":"Red"}}>Stock out
    
    
    
    </span>  : record.qty} 
    <Popover content={()=> this.hello(record.id , record.totalqty , record.sku)} title="Title" trigger="click" >
     <EditOutlined onClick={()=>  this.setState({pStockId:record.id , sign:null , stockValue:null})} /> 
    </Popover></Space></>)
  },
  

];


const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {

  
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

    this.setState({idArray:selectedRowKeys})
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const variationrowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {

  
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

   
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
const defaultExpandable = {
  expandedRowRender: (record) => (
    <>


<Table
 rowSelection={{
  ...variationrowSelection,


}}
title={()=> 

( <div class="col-xl-4 col-12 mb-5">
        

    <h6>Variation</h6>


              
              

      &nbsp;

      <Popconfirm
title="Batch Delete"
description="Are you sure to delete all selected item?"
icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
onConfirm={()=>  this.action(this.state.idArray , "delete"  ,  'Deleted' )}
onCancel={() => this.cancel('Action Cancel')}
okText="Yes"
cancelText="No"
>
<Button type="dashed"  class="btn btn-success">Batch Delete </Button>
</Popconfirm>



&nbsp;
<Popconfirm
title="Batch activation"
description="Are you sure to active?"
onConfirm={() => this.action(this.state.idArray , 'active' , 'Active Success' )}
onCancel={() => this.cancel('Action Cancel')}
okText="Yes"
cancelText="No"
>
<Button type="dashed"  class="btn btn-success">Batch Active</Button>
</Popconfirm>


&nbsp;
<Popconfirm
title="Batch deactivaton"
description="Are you sure to delete this task?"
onConfirm={()=>  this.action(this.state.idArray , 'deactive' ,'Deactive Success')}
onCancel={() => this.cancel('Action Cancel')}
okText="Yes"
cancelText="No"
>
<Button   type="dashed"  class="btn btn-success">Batch Deactive </Button>
</Popconfirm>





</div>)

}
 style={{}} bordered columns={Variationcolumns} 
 dataSource={record.variation}
 
 rowKey={"id"}
 pagination={false}
 />

    

   
    </>
  )
};
      console.log(this.state.productFiltered , this.state.idArray)
  
  
        return (
            <>

 
      <div class="container">
          
          <div class="row">
            <div class="col-xl-4 col-12 mb-5">
            <div class="form-group">
                <Input type="text" class="form-control" id="inputAddress" placeholder="Search for...." value={this.state.title}
                  onChange={this.handleSearchChange('title')} />
              </div>
            </div>

            <div class="col-xl-4 col-12 mb-5">

            </div>
          <div class="col-xl-4 col-12 mb-5">
        




              
              
              <div class="form-group" style={{display:"contents"}}>
                {this.state.dateDrop == "disable" ? (<Button type="dashed"  onClick={this.event} class="btn btn-success">Date Range </Button>) :
                  (<React.Fragment>
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={this.handleSelect}
                      rangeColors={["#FD5B61"]}

                    />
                    <Button type="dashed" danger onClick={this.event} class="btn btn-danger">Hide Range </Button>
                  </React.Fragment>
                  )}

              </div>
                    &nbsp;

                    <Popconfirm
    title="Batch Delete"
    description="Are you sure to delete all selected item?"
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
    onConfirm={()=>  this.action(this.state.idArray , "delete"  ,  'Deleted' )}
    onCancel={() => this.cancel('Action Cancel')}
    okText="Yes"
    cancelText="No"
  >
<Button type="dashed"  class="btn btn-success">Batch Delete </Button>
  </Popconfirm>

            

              &nbsp;
              <Popconfirm
    title="Batch activation"
    description="Are you sure to active?"
    onConfirm={() => this.action(this.state.idArray , 'active' , 'Active Success' )}
    onCancel={() => this.cancel('Action Cancel')}
    okText="Yes"
    cancelText="No"
  >
<Button type="dashed"  class="btn btn-success">Batch Active</Button>
  </Popconfirm>


&nbsp;
<Popconfirm
    title="Batch deactivaton"
    description="Are you sure to delete this task?"
    onConfirm={()=>  this.action(this.state.idArray , 'deactive' ,'Deactive Success')}
    onCancel={() => this.cancel('Action Cancel')}
    okText="Yes"
    cancelText="No"
  >
    <Button   type="dashed"  class="btn btn-success">Batch Deactive </Button>
  </Popconfirm>




         
          </div>


          </div>
        <div class="row ">
          <div class="col-xl-12 col-12 mb-5">
        
            <div class="card h-100 card-lg">
             
            
            <Table
            
        columns={columns}
        bordered
      expandable={defaultExpandable}
      rowSelection={{
        ...rowSelection,
      
      
      }}
        size
        dataSource={this.state.productFiltered.length == 0 ?  this.props.SellerProductData : this.state.productFiltered}
        rowKey={"id"}
       
      />
   

           
  
              <ToastContainer />

                  
				  
				  
              
      

               
         
             
            </div>

          </div>

        </div>
      </div>
   
            </>


        )




    }
})