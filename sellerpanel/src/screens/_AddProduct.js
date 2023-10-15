import React from 'react'

import store from '../store'


import {connect} from 'react-redux'
import ReactQuill , {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);
const mapStateToProps = (state) =>{

  return {  CategoryData: state.NestedcategoryReducer.NestedCategoryData}

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
          text:"",
        }

    


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

    render(){

      console.log(this.state.parent , this.state.child1,  this.state.child2 , this.state.text)



        return (

            <>
        <div class="container">
      

      
        <div class="row">

          <div class="col-lg-12 col-12">
        
            <div class="card mb-6 card-lg">
       
              <div class="card-body p-6 ">
                <h4 class="mb-4 h5">Product Information</h4>
                <div class="row">
             
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Title</label>
                    <input style={{width:"70%"}} type="text" class="form-control" placeholder="Product Name" required />
                  </div>
                  <br/>
               
                  <div class="mb-3 col-lg-0">
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
                  </div>

                  
                  <div class="mb-3 col-lg-0">
                    
                  </div>
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Brand</label>
                    <select  style={{width:"20%"}} class="form-select" aria-label="Default select example" onChange={this.parentTofirstLevel}>
                      <option selected>Open this select menu</option>

                     
                      </select>    
                   
                  </div>



                
                   
                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Warranty</label>
                    <select  style={{width:"20%"}} class="form-select" aria-label="Default select example" onChange={this.parentTofirstLevel}>
                      <option selected>Open this select menu</option>

                     
                      </select>  
                  </div>

                  <div class="mb-3 col-lg-0">
                    <label class="form-label">Highlights</label>
                    <input  style={{width:"70%"}} type="text" class="form-control" placeholder="Eg : Red,Durable,Fashionable" required />
                    </div>
                    
                    
                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Short Description</label>
                      <textarea style={{width:"70%"}} class="form-control" id="textarea-input" rows="5"></textarea>
                    </div>
                    

                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Description</label>
                      <ReactQuill   style={{width:"70%"}} value={this.state.text}
                        modules={this.modules}
                        formats={this.formats}
                    

                        onChange={this.handleChange} />
                    </div>
                   
                    <div class="mb-3 col-lg-0">
                      <label for="textarea-input" class="form-label">Specification</label>
                      <input  style={{width:"70%"}} type="text" class="form-control" placeholder="Eg : key,value,key,value -> Ram,16gb,Weight,200kg" required />
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