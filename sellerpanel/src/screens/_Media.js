import React from "react";

import { connect } from "react-redux";
import store from "../store";
import { MediaAction, MediaUploadAction ,MediaBulkAction } from "../Actions/action";
import axios from 'axios';
import { FolderDetailsAction } from "../Actions/action";
import { MoveToFolderAction } from "../Actions/action";
import { Tree ,Row ,Col } from 'antd';
import { FolderImageAction } from "../Actions/action";
import {Space,   Form, Radio , Switch, Table , Dropdown  , Empty ,Tag, Badge , InputNumber, Select , Button , Modal} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { DirectoryTree } = Tree;



const mapStateToProps = (state) =>{

    return {MediaData:state.MediaItemReducers.MediaData , FolderDetailsData:state.FolderDetailReducers.FolderDetails , FolderImageData:state.FolderImageReducers.FolderImageDetails}

}



export default connect(mapStateToProps)(class Meida extends React.Component{

    
    constructor(props){
        super(props)
        this.state = {
            
            images :[],
            idArray: [],

            folderDetails : [],
            folderMoveDetails:[],
            allImage:[],
            folderImage:null,
            isModalOpen:null,

            selectfolderId:null,
            folderId:null

        
        }


    }


    
  
    componentDidMount(){
        store.dispatch(MediaAction())
        store.dispatch(FolderDetailsAction())


        setTimeout(() => {
          this.props.FolderDetailsData.map((data)=>{
          
     

            this.setState(prevState =>({
     
              folderDetails:[...prevState.folderDetails ,  {'title':data.title , 'key':data.id }]
           }))
     
           })

           this.setState({allImage:this.props.MediaData})


           this.props.FolderDetailsData.map((data)=>{
  
            this.setState(prevState =>({
    
              folderMoveDetails:[...prevState.folderMoveDetails  , {'value':data.id , 'label':data.title}]
            }))
    
          })
         
        }, 2000);
      
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
      console.log("teststsetsts")
      console.log(this.state);
      let form_data = new FormData();

      for (const file of  this.state.images) {
        form_data.append('file', file);
    }
      store.dispatch(MediaUploadAction(form_data))


      setTimeout(() => {
        this.setState({allImage:this.props.MediaData})
      }, 1000);
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
  
  flushFolder = () =>{

    this.setState({folderImage:null})

  }


  showModal = () => {
  
    this.setState({isModalOpen:true})
  };
  handleOk = () => {
    this.setState({isModalOpen:false})
  };
  handleCancel = () => {
    this.setState({isModalOpen:false})
  };
 
  filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  handleImageMove = (value) =>{

      this.setState({folderId:value})  

  }



    render(){

 

      console.log(this.state.folderDetails , this.state.selectfolderId,  'folderImage',this.props.FolderImageData , this.state.folderDetails , this.state.folderId , this.state.folderImage )


      const moveToFolder = () =>{


        store.dispatch(MoveToFolderAction(this.state.selectfolderId , this.state.folderId , this.state.idArray))
        this.setState({idArray:[]})
    
        console.log(this.state.selectfolderId , this.state.folderId , this.state.idArray)

       
       
        setTimeout(() => {
          store.dispatch(FolderImageAction(this.state.selectfolderId))
          
    
        }, 1000);

        setTimeout(() => {
          this.setState({folderImage:this.props.FolderImageData , selectfolderId:this.state.selectfolderId})

          console.log("hiiiiiiting")
    
        }, 2000);
       
    
      }
      const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    
        store.dispatch(FolderImageAction(keys[0]))

        setTimeout(() => {
          this.setState({folderImage:this.props.FolderImageData , selectfolderId:keys[0]})

        }, 1000);
      };
  
    console.log(this.state.idArray)

        return (
            <>
            
    
      <div class="container">
      <h1>PRODUCT IMAGE</h1>
    
     <div class="row " style={{border:"1px solid #f0f0f0"}}>
    


     <div class="col-xl-2 col-12 mb-5"  style={{borderRight:"1px solid #f0f0f0"}}>
    <a style={{cursor:"pointer"}} onClick={this.flushFolder}>All Image</a>
     <DirectoryTree
      style={{color:"gray" }}
      option={true}
          
      multiple
      defaultExpandAll
      onSelect={onSelect}
  
      treeData={this.state.folderDetails}
    />  
      </div>
       <div class="col-xl-10 col-12 mb-5">
     
         <div class="card h-100 card-lg">
          
           



           <div class="card-body p-0">

            <div class="row" style={{borderBottom:"1px solid #f0f0f0"}}>

            <div class=" col-6  mb-3 col-lg-0">
                    <label class="form-label">Move To</label> <br/>
                 
                    <Select
    showSearch
    placeholder="Move To"
    optionFilterProp="children"
    onChange={this.handleImageMove}

    filterOption={this.filterOption}  
    
     style={{width:"35%"}}             

    options={this.state.folderMoveDetails}
    
    />            <Button type="dashed" onClick={moveToFolder} style={{color:"#f50"}}>
    Move
</Button>


              

          
                  </div>
                  <div class="col-6 mb-3 col-lg-0" style={{marginTop:"20px"}}>
                <ul style={{listStyle:"none"  ,textAlign:"right"}}>

                <Button type="dashed" danger onClick={()=> this.showModal()}>
                Upload
      </Button>
      
{/*   <button onClick={()=>  this.bulkRemove(this.state.idArray)} class="btn"><i style={{color:"red"}} class="fa fa-trash" aria-hidden="true"></i></button> */}
      <Modal footer={false} title="Basic Modal" open={this.state.isModalOpen} onOk={()=> this.handleOk()} onCancel={()=> this.handleCancel()}>
      <form onSubmit={this.handleSubmit}>
       
       <input onChange={(e)=> this.setState({images:e.target.files})} class="form-control" type="file" id="formFile" multiple name='images'  style={{width:"100%"}} /><br/>
       
       <Space>
       <button  type="submit" onClick={ ()=> this.handleOk()} class="button-13" style={{width:"auto"}}>Confirm</button> 
        <button   onClick={()=> this.handleCancel()} class="button-13" style={{width:"auto"}} >Cancle</button> 

       </Space>

       </form>
      </Modal>


  
  </ul>   
  </div>

            </div>


           <div class="row" style={{padding:"10px"}} >


           
                  
     
  <div class="row row-cols-xl-6 row-cols-lg-5 row-cols-sm-2 g-2">

                      {this.state.fol}


                        {this.state.folderImage == undefined   ? this.state.allImage.map((data)=>{

                              
return (

                              


                              
                              
                       

  <div class="card card-product mb-lg-12"  style={{border:"none" }}>
    <div  class="card-body">
    <div class="form-check">
<input onClick={(e) =>
            this.state.idArray == []
              ? null
              : this.state.idArray.includes(data.id)
              ? this.removeid(data.id)
              : this.handleSelect(data.id)
          } class="form-check-input" type="checkbox" value={`${data.id}`} id="customerOne" style={{padding:"7px"}}  checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false } />
<label class="form-check-label" for="customerOne">

</label>

</div>
<br/>
        <div 
            
            onClick={(e) =>
              this.state.idArray == []
                ? null
                : this.state.idArray.includes(data.id)
                ? this.removeid(data.id)
                : this.handleSelect(data.id)
            }  class="text-center position-relative " style={{height:"4pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>
            
        
            <img 
            src={`${data.thumbnail}`}  />
            

   


        </div>

        <br/>

       <div class="row">
        <div class="col-6">
       
        </div>
        <div class="col-6">
        
        </div>
       </div>
     
        

</div>
      



</div>



)



                        }) : this.state.folderImage.image.map((data)=>{

                          return (

                              


                              
                              
                       

                            <div class="card card-product mb-lg-12"  style={{border:"none" }}>
                              <div  class="card-body">
                              <div class="form-check">
                          <input onClick={(e) =>
                                      this.state.idArray == []
                                        ? null
                                        : this.state.idArray.includes(data.id)
                                        ? this.removeid(data.id)
                                        : this.handleSelect(data.id)
                                    } class="form-check-input" type="checkbox" value={`${data.id}`} id="customerOne" style={{padding:"7px"}}  checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false } />
                          <label class="form-check-label" for="customerOne">
                          
                          </label>
                          
                          </div>
                          <br/>
                                  <div 
                                      
                                      onClick={(e) =>
                                        this.state.idArray == []
                                          ? null
                                          : this.state.idArray.includes(data.id)
                                          ? this.removeid(data.id)
                                          : this.handleSelect(data.id)
                                      }  class="text-center position-relative " style={{height:"4pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>
                                      
                                  
                                      <img 
                                      src={`${data.thumbnail}`}  />
                                      
                          
                             
                          
                          
                                  </div>
                          
                                  <br/>
                          
                                 <div class="row">
                                  <div class="col-6">
                                  
                                  </div>
                                  <div class="col-6">
                                 
                                  </div>
                                 </div>
                               
                                  
                          
                          </div>
                                
                          
                          
                          
                          </div>
                          
                          
                          
                          )



                        })
                        
                        
                        
                        }
               
                            
                            
                          
               </div>
                         
                          
                            
                            
                            
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