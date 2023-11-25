import React from 'react'

import store from '../store'
import { BrandTotalAction } from '../Actions/action';
import { WarrantyAction } from '../Actions/action';
import { Select  , Input ,Button ,message, Popconfirm ,Tree  , Modal , Space} from 'antd';
import { Cascader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FolderDetailsAction } from "../Actions/action";
import { MoveToFolderAction } from "../Actions/action";
import { FolderImageAction } from '../Actions/action';
import { MediaAction, MediaUploadAction ,MediaBulkAction } from "../Actions/action";

import {connect} from 'react-redux'
import ReactQuill , {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { getAdapter } from 'axios';
Quill.register('modules/imageResize', ImageResize);
const { DirectoryTree } = Tree;
const mapStateToProps = (state) =>{

  return {  CategoryData: state.NestedcategoryReducer.NestedCategoryData ,MediaData:state.MediaItemReducers.MediaData , BrandData: state.BrandTotalReducer.TotalBrand, Warranty:state.WarrantyReducer.Warranty , FolderDetailsData:state.FolderDetailReducers.FolderDetails , FolderImageData:state.FolderImageReducers.FolderImageDetails}

}


export default connect(mapStateToProps)(class AddProdcut extends React.Component{

    constructor(props){
        super(props)

        this.state={
          sub_cat_first:null,
          sub_cat_second:null,
          parent:null,
          child1:null,
          child2:null,
          
          
          idArray: [],
          Mediaid:null,
          pidArray:[],
          flag:false,


          title:null,
          brand:null,
          warranty:null,
          highlights:null,
          sdes:null,
          ldes:null,
          spec:null,
          variation:[{}],

          warranty:[],
          OpBrand:[],
          NestedCat:[],




          images :[],
   

          folderDetails : [],
          folderMoveDetails:[],
          allImage:[],
          folderImage:null,
          isModalOpen:null,

          selectfolderId:null,
          folderId:null,

          previewImageArray:[]

        } 


    }


    
   

    
  handleSelect = (id , thumbnail) =>{

    console.log(id , thumbnail)
    
    if(this.state.idArray.length < 6) {


      this.setState((prevState) => ({
        idArray: [...prevState.idArray, id],
      }));


      this.setState((prevState) => ({
        previewImageArray: [...prevState.previewImageArray, thumbnail],
      }));

      console.log(this.state.allImage , "form handleselect")


    





    } 
    else{
      console.log("Not More Than 8")
    }


  }
    removeid = (id , thumbnail) => {
        
      const res = this.state.idArray.filter((item) => item !== id);
     



      const thumb = this.state.previewImageArray.filter((item) => item !== thumbnail);
  
      this.setState({ idArray: res });

      this.setState({previewImageArray:thumb})
  
    }

    componentDidMount(){
      store.dispatch(MediaAction())
      store.dispatch(FolderDetailsAction())

      
     store.dispatch(WarrantyAction())


     setTimeout(() => {

        console.log(this.props.CategoryData)

        this.props.CategoryData.map((d)=>{

          d.children.map((d1)=>{

            d1.children.map((d2)=>{

              console.log(d , d1 , d2 , "test")

              this.setState(prevState =>({

                NestedCat:[...prevState.NestedCat ,  {'value':d.id , 'label':d.name ,  children:[{'value':d1.id , 'label':d1.name , 'children':[{'value':d2.id , 'label':d2.name}]}] }]
              }))


            })

          })


        })




        this.props.Warranty.map((data)=>{

          this.setState(prevState =>({

            warranty:[...prevState.warranty ,  {'value':data.id , 'label':data.warrenty}]
          }))

        })
     }, 2000);








     
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


    addClick = (e) =>{
      console.log("hit")
      this.setState(prevState => ({ 
        variation: [...prevState.variation, {}],
        idArray:[],
        previewImageArray:[]  
          
      }))
  }
  removeClick(i){
    let stock = [...this.state.variation];
    stock.splice(i, 1);
    this.setState({ variation:stock });
 }

 test = (index,  flag) =>{
  
  if(flag){
    this.setState({pidArray:this.state.idArray})
  }
  else{
    let stock = [...this.state.variation];
    console.log("hiiittt")
    stock[index] = {...stock[index], "image":this.state.idArray , "preview":this.state.previewImageArray};
    this.setState({ variation:stock  });

  }
  

 }
 quill = (value) =>{

  console.log(value,"ASDfasdfas")


 }

 


  createUI = () =>{

    this.handleChange = (e , i) => {
      const { name, value } = e.target;
      
      console.log("hit hithihtithithi" , e.target)
      
  
      let stock = [...this.state.variation];
      console.log("Asdat" , {...stock[i]})
      
      stock[i] = {...stock[i], [name]: value };
  
  
    
      this.setState({ variation:stock  });
   }


  
  



   this.atest = (i) =>{

    this.setState({Mediaid:i})

    const res = this.state.variation.filter((item , index) =>  index == i)
    console.log(res , i  ,  "Asdfasdfasdfasdfasf")


    res.map((data)=>{
      console.log(data , data)


      if(Object.keys(data).length === 0){
        this.setState({idArray:[] , previewImageArray:[]})

      }else{

        this.setState({idArray:data.image, previewImageArray:data.preview})
      }

    
    })



   }

  


   

    return this.state.variation.map((el, index) =>  (
  

    
   


<>
<div class="mb-3 col-lg-12" style={{marginTop:"8px"}} >
  
          <a name="image" type="number" data-bs-toggle="modal" data-bs-target=".gd-example-modal-xl" style={{cursor:"pointer"}} onClick={() => this.atest(index)} ><i class="fa-solid fa-image" style={{color:"#FD5417"}}></i><span style={{padding:"15px" , color:"#FD5417"}}>Media Libary</span></a>
                                | &nbsp; <a  style={{cursor:"pointer"}}  onClick={()=> this.showModal()}  ><i class="fa-solid fa-image" style={{color:"#FD5417"}}></i><span style={{padding:"15px" , color:"#FD5417"}}>Local upload</span></a>
            
          
                    </div>
<div class="mb-3 col-lg-2">
<select class="form-control" aria-label="Default select example" name="color" onChange={(e)=>this.handleChange(e,index)}> 
                    <option>Select Brand</option>
                    
                    </select>
</div>
      
                


<div class="mb-3 col-lg-2">
            
<input type="number" class="form-control overwrite" name="price" id="inputNumber" placeholder="BDT" onChange={(e)=> this.handleChange(e, index)} />
        </div>
  

       
<div class="mb-3 col-lg-2">
            
<input type="number" class="form-control overwrite" name="quantity" placeholder="Quantity" onChange={(e)=>this.handleChange(e,index)}/>
                    </div>
               
  
  
                    <div class="mb-3 col-lg-2">
            
                    <input type="text" class="form-control overwrite" name="sellersku"  placeholder="Seller SKU"  onChange={(e)=> this.handleChange(e,index)}/>
                                </div>
                           
                   
                                <div class="mb-3 col-lg-2" >
            
            
                    <Button type="dashed" danger onClick={()=> this.removeClick(index)} >
    <i class="fa fa-trash" aria-hidden="true"></i>
    </Button>
 
      
     
                                </div>
                           
              
                             
          
      
                              
 


</>


   
      
  ))

  
  
  
  }
  

    parentTofirstLevel = (e) =>{
      console.log(e.target.value)

     
   




    const res = this.props.CategoryData.filter((cat) => cat.id == e.target.value)
      
    res.map((data)=>{

      this.setState({sub_cat_first:data.children , parent:e.target.value , child1:null, child2:null})

    })

    }

    childToSecondLevel = (e) =>{
      console.log(e.target.value)


    const res = this.props.CategoryData.filter((cat) => cat.id == e.target.value)
      
    res.map((data)=>{

      this.setState({sub_cat_second:data.children , child1:e.target.value})

    })

    }
  
    handleChange = (value) => {
      this.setState({text: value});
    }


   filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    modules = {
     
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
      },
      
      toolbar: [
        [{ 'header': [1, 2,3,4,5,6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote',],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image' ,'video'],
        [{ 'direction': 'rtl' }]
        [{ 'color': ['red'] }, { 'background': [] }],        
  [{ 'font': [] }],
  [{ 'align': [] }],
        ['clean'],
      
      ],
  }
 
    formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image' , 'video','color','font','backgorund','align','clean'
    ]

  
    handleSubmit = (e) => {    
      e.preventDefault();
      
      console.log("submit" , e)
   
  }

  warrantyonchange = (value) => {
    console.log(`warrenty ${value}`);
  };

  brandonchange = (value) => {
    console.log(`Brand ${value}`);
  };

  catchange = (value) =>{
 

    if(value == undefined){
      this.setState({OpBrand:[]})
      return null
    }else{
      console.log(`cat ${value}` ,value[0]);
      this.setState({OpBrand:[]})

      store.dispatch(BrandTotalAction(value[0]))
  
  
      setTimeout(() => {
  
      
          this.props.BrandData.map((data)=>{
  
            this.setState(prevState =>({
    
              OpBrand:[...prevState.OpBrand  , {'value':data.id , 'label':data.name}]
            }))
    
          })
        
  
  
       
     }, 1000);
    }



    

  } 

  flushFolder = () =>{

    this.setState({folderImage:null})

  }


    render(){

      console.log(
        this.state.parent , 
        this.state.child1,  
        this.state.child2 , this.state.text,
  
          this.state.idArray ,
           this.state.Mediaid ,
            this.state.pidArray , 
            this.state.title,
            this.state.brand,
            this.state.warranty,
            this.state.highlights,
            this.state.sdes,
            this.state.ldes,
            this.state.variation , 

            this.state.warranty,
            this.state.OpBrand,

            this.state.NestedCat,


            this.state.previewImageArray
        
        
        )

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



        return (

            <>
                  <form onSubmit={this.handleSubmit}>

        <div class="container">
      

      
        <div class="row">

          <div class="col-lg-12 col-12">
        
            <div class="card mb-6 card-lg">
        


    
              <div class="card-body p-6 ">
                <h4 class="mb-4 h5">Product Information</h4>
                <div class="row">
             
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Title</label><br/>
                   <Input onChange={(e)=>  this.setState({title:e.target.value})} placeholder="Basic usage" style={{
width: '60%',

}} />
                  </div>

                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Category</label><br/>
                    <Cascader

showSearch
options={this.state.NestedCat}
onChange={this.catchange}

style={{
width: '60%',

}}
/>
                  </div>


              
     
                  {/* <div class="mb-3 col-lg-0">
                    <label class="form-label">Category</label>
                    
                  </div>
                 
                  <div class="mb-3 col-lg-2">
                      <label class="form-label" for="selectOne"><i class="fa-solid fa-p"></i> <span
                      class="text-secondary"><i class="fa-solid fa-family"></i>arent Category &nbsp; -> </span></label>
                      <select class="form-select" aria-label="Default select example" onChange={this.parentTofirstLevel}>
                      <option selected>Open this select menu</option>

                      {this.props.CategoryData == undefined ? 
                      null
                    
                    
                    : (this.props.CategoryData.map((x)=>{
                            
                        if(x.level == 0){
                            return <option value={x.id} >{x.name}</option>   
                        }                        

                    }))                
                    
                    
                    
                     }
                     
                      </select>                    
                  </div>



                   
                  <div class="mb-3 col-lg-2">
                      <label class="form-label" for="selectOne"><span
                      class="text-secondary"><i class="fa-solid fa-c"></i>&nbsp; <i class="fa-solid fa-1"></i>&nbsp; -></span></label>
                      <select class="form-select" aria-label="Default select example" onChange={this.childToSecondLevel}>
                      <option selected>Open this select menu</option>


                      {this.state.sub_cat_first  == undefined ? 
                      null
                    
                    
                    : (this.state.sub_cat_first.map((x)=>{
                            
                     
                            return <option value={x.id} >{x.name}</option>   
                                           

                    }))                
                    
                    
                    
                     }
                      
                      </select>                    
                  </div>




                  <div class="mb-3 col-lg-2">
                      <label class="form-label" for="selectOne"><span
                      class="text-secondary"><i class="fa-solid fa-c"> </i>&nbsp; <i class="fa-solid fa-2"></i>&nbsp;</span></label>
                      <select class="form-select" aria-label="Default select example" onChange={(e) => this.setState({child2:e.target.value})}>
                      <option selected>Open this select menu</option>
                      {this.state.sub_cat_second  == undefined ? 
                      null
                    
                    
                    : (this.state.sub_cat_second.map((x)=>{
                            
                     
                            return <option value={x.id} >{x.name}</option>   
                                           

                    }))                
                    
                    
                    
                     }
                      </select>                    
                  </div> */}

                  
                  <div class="mb-3 col-lg-0">
                    
                  </div>
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Brand</label> <br/>
                    <Select
    showSearch
    placeholder="Select a brand"
    optionFilterProp="children"
    onChange={this.brandonchange}

    filterOption={this.filterOption}  
    
     style={{width:"25%"}}             

    options={this.state.OpBrand}
    
    />
          
                  </div>



                
                   
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Warranty</label><br/>
                                     <Select
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={this.warrantyonchange}

    filterOption={this.filterOption}  
    
      
    style={{width:"25%"}}  

    options={this.state.warranty}
    
    />
           


               
                  </div>

                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Highlights</label><br/>
                    <Input onChange={(e)=>  this.setState({highlights:e.target.value})} placeholder="Eg : Red,Durable,Fashionable" style={{
width: '60%',

}} />
                    </div>
                    
                    
                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Short Description</label><br/>
                      <Input.TextArea  onChange={(e)=>  this.setState({sdes:e.target.value})} placeholder="Short Description : Red,Durable,Fashionable" style={{
width: '60%',

}}autoSize={{ minRows: 3, maxRows: 5 }} />
                    </div>
                    

                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Description</label>
                      <ReactQuill   style={{width:"70%"}} 
                        modules={this.modules}
                        formats={this.formats}

                        value={this.state.ldes}
                    

                        onChange={this.quill} />
                    </div>
                   
                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Specification</label><br/>
                      <Input  onChange={(e)=>  this.setState({spec:e.target.value})} placeholder="Eg : key,value,key,value -> Ram,16gb,Weight,200kg" style={{
width: '60%',

}}
                     />
                    </div>

                  
                    </div>
          

          </div>
          
        </div>
        </div> 

 
        <div class="row">

          <div class="col-lg-12 col-12">
        
            <div class="card mb-6 card-lg">
       
              <div class="card-body p-6 ">
              <h4 class="mb-4 h5">Price & Stock</h4>
                <div class="row">

                <div class="mb-3 col-lg-12" style={{marginTop:"6px"}}>
                  <a name="image" type="number" data-bs-toggle="modal" data-bs-target=".gd-example-modal-xl" style={{cursor:"pointer"}} onClick={() => this.setState({flag:true})} ><i class="fa-solid fa-image" style={{color:"#FD5417"}}></i><span style={{padding:"15px" , color:"#FD5417"}}>Media Libary</span> </a>
                  <Button type="dashed" danger>
      Apply to all
    </Button> 
                 
                  </div>

                <div class="mb-3 col-lg-2">
            
                      <input  type="text" class="form-control" placeholder="BDT" required />
                  </div>
      
                
                  <div class="mb-3 col-lg-2">
                
                      <input  type="text" class="form-control" placeholder="Promo Price" required />
                  </div>   
                   <div class="mb-3 col-lg-2">
                
                      <input  type="number" class="form-control" placeholder="Quantity" required />
                  </div>
                 
    
                  
              
                </div>    


                </div>
                </div>
                </div>
                </div>

















































                <div class="row">

<div class="col-lg-12 col-12">

  <div class="card mb-6 card-lg">

    <div class="card-body p-6 ">
                   <Button type="dashed" danger onClick={() => this.addClick()}>
      Add Sku
    </Button> 
 
    <br/>
    <br/>
      <div class="row">
      
     
      {this.createUI()}                     
      </div>    
                      

      <div style={{width:"20%"}} class="input-group mb-3">
                   
   
                   <div class="modal fade gd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                     <div class="modal-dialog modal-xl">
                       <div class="modal-content" style={{margin:"8%" , padding:"5px"}}>
                       <div class="modal-header">
                       <button type="button" class="button-13" data-bs-dismiss="modal" style={{width:"auto"}} onClick={() => this.test(this.state.Mediaid , this.state.flag)}> Save </button>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>






                        <div class="container">

    
     <div class="row " style={{border:"1px solid #f0f0f0"}}>
    


     <div class="col-xl-3 col-12 mb-5"  style={{borderRight:"1px solid #f0f0f0"}}>
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
       <div class="col-xl-9 col-12 mb-5">
     
         <div class="card h-100 card-lg">
          
           



           <div class="card-body p-0">

            <div class="row" style={{borderBottom:"1px solid #f0f0f0"}}>

           
                  <div class="col-12 mb-3 col-lg-0" style={{marginTop:"20px"}}>
            
         








                <div class="row row-cols-xl-12 row-cols-lg-6 row-cols-sm-2 g-2">

                      


{this.state.previewImageArray.length !== 0   ? this.state.previewImageArray.map((data)=>{

      
return (

      


      
      



<div  class="card-body">

<div  class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>


<img 
src={`${data}`}  />





</div>

<br/>

<div class="row">
<div class="col-6">

</div>
<div class="col-6">

</div>
</div>



</div>








)



}) :"No image seleceted"}
            




        </div>






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


  

  </div>

            </div>


           <div class="row" style={{padding:"10px"}} >


           
                  
     
  <div class="row row-cols-xl-6 row-cols-lg-5 row-cols-sm-2 g-2">

                      


                        {this.state.folderImage == undefined   ? this.state.allImage.map((data)=>{

                              
return (

                              


                              
                              
                       

  <div class="card card-product mb-lg-12"  style={{border:"none" }}>
    <div  class="card-body">
    <div class="form-check">
<input onClick={(e) =>
            this.state.idArray == []
              ? null
              : this.state.idArray.includes(data.id) || this.state.previewImageArray.includes(data.thumbnail)
              ? this.removeid(data.id ,data.thumbnail)
              : this.handleSelect(data.id , data.thumbnail)
          } class="form-check-input" type="checkbox" value={`${data.id}`} id="customerOne" style={{padding:"7px"}}  checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false } />
<label class="form-check-label" for="customerOne">

</label>

</div>
<br/>
        <div 
            
            onClick={(e) =>
              this.state.idArray == []
                ? null
                : this.state.idArray.includes(data.id) || this.state.previewImageArray.includes(data.thumbnail)
                ? this.removeid(data.id ,data.thumbnail)
                : this.handleSelect(data.id, data.thumbnail)
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
                                        :  this.state.idArray.includes(data.id) || this.state.previewImageArray.includes(data.thumbnail)
                                        ? this.removeid(data.id ,data.thumbnail)
                                        : this.handleSelect(data.id,data.thumbnail)
                                    } class="form-check-input" type="checkbox" value={`${data.id}`} id="customerOne" style={{padding:"7px"}}  checked={this.state.idArray.length == 0 ? false :this.state.idArray.includes(data.id) ? true : false } />
                          <label class="form-check-label" for="customerOne">
                          
                          </label>
                          
                          </div>
                          <br/>
                                  <div 
                                      
                                      onClick={(e) =>
                                        this.state.idArray == []
                                          ? null
                                          : this.state.idArray.includes(data.id) || this.state.previewImageArray.includes(data.thumbnail)
                                          ? this.removeid(data.id , data.thumbnail)
                                          : this.handleSelect(data.id ,data.thumbnail)
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






                        </div>































                       {/* <div class="row row-cols-xl-6 row-cols-lg-5 row-cols-sm-2 g-2">
                                           {this.props.MediaData == undefined ? null : this.props.MediaData.map((data)=>{
                   
                                               return (
                   
                                                 
                   
                   
                                             
                                                 <div class="card card-product mb-lg-12"  style={{border:"none", width:"auto"}}>
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
                                                           }  class="text-center position-relative " style={{height:"2pc" , cursor:"pointer" ,justifyContent:"center", display:"flex" }}>
                                                           
                                                       
                                                           <img  
                                                           src={`${data.thumbnail}`}  />
                                                           
                                              
                                                  
                   
                   
                                                       </div>
                   
                                                       <br/>
                                            
                                                   
                                                    
                                                       
                                             
                                             </div>
                                                     
                                               
                   
                   
                   
                                               </div>
                   
                        
                   
                   
                                            
                                                    
                                                     
                                              
                                              
                                           
                                               )
                                             
                   
                                           })}
                                  
                                                       
                   
             
                 
                    
                                       
                                             
                                  </div> */}
                       </div>
                                              
                     </div>
                   </div>
                          
                         
                     
                    
                   
                          


</div>
</div>
</div>
</div>


             
      
                 
              

                

                
                     <br/>


             
              </div>
              <div style={{width:"20%"}} class="input-group mb-3">
                   
                 
                 </div>
                
             

            </div>
            <button type="submit"  class="btn">submit</button> 
              </form>
            </>
        )
    }


})