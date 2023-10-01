import React from "react";

import { connect } from "react-redux";
import store from "../store";
import { MediaAction, MediaUploadAction ,MediaBulkAction } from "../Actions/action";
import axios from 'axios';



const mapStateToProps = (state) =>{

    return {MediaData:state.MediaItemReducers.MediaData}

}



export default connect(mapStateToProps)(class Meida extends React.Component{

    
    constructor(props){
        super(props)
        this.state = {
            
            images :null,
            idArray: [],
        }


    }
    
    componentDidMount(){
        store.dispatch(MediaAction())
    }



    images = (file ) =>{

       this.setState({images:file})
        

    }

  

    bulkRemove = (idArray) =>{

      store.dispatch(MediaBulkAction(idArray))

      this.setState({idArray:[]})

    }


    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      let form_data = new FormData();

      for (const file of  this.state.images) {
        form_data.append('file', file);
    }
      store.dispatch(MediaUploadAction(form_data))
  }


  handleSelect = (id) =>{

    this.setState((prevState) => ({
      idArray: [...prevState.idArray, id],
    }));

  }
  removeid = (id) => {
        
    const res = this.state.idArray.filter((item) => item !== id);

    this.setState({ idArray: res });

  }
 

    render(){

    console.log(this.state.idArray)

        return (
            <>
            
              
      <div class="container">
     
     <div class="row ">
       <div class="col-xl-12 col-12 mb-5">
     
         <div class="card h-100 card-lg">
          
           



           <div class="card-body p-0">

           <div class="row" style={{padding:"10px" , width:"fit-content"}}>
                <h1>PRODUCT IMAGE</h1>
                <ul style={{listStyle:"none"}}>



 <form onSubmit={this.handleSubmit}>
       
  <input onChange={(e)=> this.setState({images:e.target.files})} class="form-control" type="file" id="formFile" multiple name='images' /><br/>
  <button type="submit" onClick={ this.upload} class="btn"><i class="fa-solid fa-upload"></i></button> <br/>
  </form>
  <button onClick={()=>  this.bulkRemove(this.state.idArray)} class="btn"><i style={{color:"red"}} class="fa fa-trash" aria-hidden="true"></i></button>
  
  </ul>   
  
                  
     

                        {this.props.MediaData == undefined ? null : this.props.MediaData.map((data)=>{

                            return (

<div class="col-lg-2 col-12 mb-3">
                              
                              <div class="">                               
                                      <img src={`${data.photo}`} style={{width:"120px" , height:"150px"}} />
                                        
                                      <div class="dropdown ">
                            <a href="#" class="text-reset" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="feather-icon icon-more-horizontal fs-5"></i>
                            </a>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#"><i class="bi bi-trash me-3"></i>Delete</a></li>
                              <li><a class="dropdown-item" href="#"><i class="bi bi-pencil-square me-3 "></i>Edit</a>
                              </li>
                            </ul>
                          </div>
                          <div class="form-check">
                            <input onClick={(e) =>
                                        this.state.idArray == []
                                          ? null
                                          : this.state.idArray.includes(data.id)
                                          ? this.removeid(data.id)
                                          : this.handleSelect(data.id)
                                      } class="form-check-input" type="checkbox" value={`${data.id}`} id="customerOne" style={{padding:"12px"}}  checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false } />
                            <label class="form-check-label" for="customerOne">

                            </label>
                          </div>
                              </div>
                           
                          </div>
                            )



                        })}
               
                            
                            
                          
                          
                         
                          
                            
                            
                            
                        </div>
   

            
           </div>
          
         </div>

       </div>

     </div>
   </div>
            </>
        )


    }



})