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
  
    dataTableChange = (selectableRows) => {

      const arr = []
  
      selectableRows.selectedRows.map((data) => {
  
  
        if (!arr.includes(data['id'])) {
          arr.push(data['id'])
        } else {
          arr.pop(data['id'])
        }
  
  
  
  
  
      })
  
      this.setState({ idArray: arr })
  
    }

   


    action =  (id , flag , success , cancel)=>{

      store.dispatch(BulkAction(id , flag ))

      if(id.length == 0){
        return;
      }
      const bool = window.confirm(`Execute ${id.length} selected items`)

      if(bool == true){
    
        store.dispatch(BulkAction(id , flag )).then(()=>{

          toast(success, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })

          
        }).catch((err)=>{
          return;
        })
       
      }
      else{

        console.log(id ,"active")
      
        toast(cancel, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        
      }


   
      }
    

    
    
   

    render() {


      const ExpandedComponent = ({ data }) =>{

        console.log(data , "Data form expandaskdfhdashfo")

        return (
          <>
          {data.variation.length == 0 ?  null : (


<div class="card-body p-0">
   <div class="table-responsive ">
      <table class="table table-centered table-hover mb-0 text-nowrap table-borderless table-with-checkbox">
         <thead class="bg-light">
            <tr>
              
              
               <th> Name</th>
               <th>Proudct</th>
               <th>Status</th>
               <th>Status</th>
               <th>Status</th>
               <th>Status</th>
               <th>Status</th>
               <th>Status</th>
               <th>Status</th>
            </tr>
         </thead>
         <tbody>
           {data.variation.map((data)=>{

            return(

              <>
                       <tr>
              
             
              
              <td>{data.color}</td>
            
               <td>12</td>
               <td>12</td>
               <td>12</td>
              
               <td>12</td>
               <td>12</td>
               <td>12</td>
         
              
              
        
           </tr>
              </>

            )

           })}
           
           
   


         </tbody>
      </table>
   </div>
</div>

          ) }

         
          </>
        )

      }

      



    

      const columns = [
          
   
        
          {
              name: 'Title',
              selector: row => (<> {row.active == false ? <span ><i class="fa fa-ban" aria-hidden="true"></i> &nbsp;{row.title}</span> : row.title}  </>) 
          },
          {
              name: 'Year',
              selector: row => row.year,
          },
          {
            name: 'Year',
            selector: row => row.year,
        },
        {
          name: 'Year',
          selector: row => row.year,
      },
      {
        name: 'Year',
        selector: row => row.year,
    },
          
          {
          
            
            selector: row => (
             <>
              
             
                <button type="button" class="btn btn-rounded" onClick={this.multiDelete} style={{padding:"0px"}}  ><i class="fa-sharp fa-solid fa-trash fa-sm" style={{color:"Red" ,fontSize:"10px"}}></i></button>|
                <button type="button" class="btn btn-rounded" onClick={this.multiDelete}  style={{padding:"0px"}}><i class="fas fa-edit" style={{color:"green",fontSize:"10px"}}></i></button>|
                <button type="button" class="btn btn-rounded" onClick={this.multiDelete}  style={{padding:"0px"}} ><i class="fa fa-link"  aria-hidden="true" style={{color: "rgb(235, 65, 0)" ,fontSize:"10px"}}></i></button>

            

             
             </>
           
           
            )
    
    
    
          },
      ];

      const customStyles = {
        rows: {
            style: {
                minHeight: '72px',
               
              // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
              
              
               
                

            },
        },
        cells: {
            style: {
               padding:'10px',
             
              
            },
        },
    };
      
 



      const selectionRange = {


        startDate: this.state.startDate,
        endDate: this.state.endDate,
        key: 'selection',
      }
      

      console.log(this.state.productFiltered , this.state.idArray)
  
  
        return (
            <>

 
      <div class="container">
     
        <div class="row ">
          <div class="col-xl-12 col-12 mb-5">
        
            <div class="card h-100 card-lg">
             
              

   

              <div class="card-body p-0">
  
              <ToastContainer />

                  
				  
				  
              <DataTable
      
            columns={columns}
            data={this.state.productFiltered.length == 0 ?  this.props.SellerProductData : this.state.productFiltered}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            onSelectedRowsChange={this.dataTableChange}
            defaultSortField="id"
            defaultSortAsc={false}
            noHeader
            selectableRows
            pagination

            customStyles={customStyles}

            subHeader
            dense
           
            subHeaderAlign="right"
            subHeaderComponent={<React.Fragment>

<div class=" d-md-flex justify-content-between align-items-center p-6">
                
                  <nav class="mt-2 mt-md-0">
                    <ul class="pagination mb-0 ">
                     
                      <li onClick={()=>  this.action(this.state.idArray , "delete" , "Success" , 'cancel'  )} class="page-item"><a class="page-link" href="#!"><i style={{color:"red"}} class="fa fa-trash" aria-hidden="true"></i></a></li>
                      <li  onClick={()=>  this.action(this.state.idArray , 'active', "Active" , 'cancel'  )} class="page-item"><a class="page-link" href="#!"><i style={{color:"green"}}class="fas fa-toggle-on"></i></a></li>
                      <li  onClick={()=>  this.action(this.state.idArray , 'deactive' ,"Deactive" , 'cancel'  )} class="page-item"><a class="page-link" href="#!"><i style={{color:"#eb4100"}} class="fas fa-toggle-off"></i></a></li>
                    
                    </ul>
                  </nav>
                </div>


              <div class="form-group">
                <input type="text" class="form-control" id="inputAddress" placeholder="Search for...." value={this.state.title}
                  onChange={this.handleSearchChange('title')} />
              </div>
              &nbsp; &nbsp; &nbsp;
              <div class="form-group">
                {this.state.dateDrop == "disable" ? (<button onClick={this.event} class="btn btn-success">Date Range </button>) :
                  (<React.Fragment>
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={this.handleSelect}
                      rangeColors={["#FD5B61"]}

                    />
                    <button onClick={this.event} class="btn btn-danger">Hide Range </button>
                  </React.Fragment>
                  )}

              </div>






            </React.Fragment>


            }




          />
      

               
              </div>
             
            </div>

          </div>

        </div>
      </div>
   
            </>


        )




    }
})