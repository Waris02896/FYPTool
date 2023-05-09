import React, {Component} from 'react';
import './ProcessCard.css';
import List from '../List/List.jsx';
import CustomButton from '../Button/button.component';
//import { useEffect } from 'react';

class ProcessCard extends Component{
    state ={
        items:[],
        text:""
    }
    handlechange = e =>{
        this.setState({text:e.target.value})
    }
    handleAdd = e =>{
        if(this.state.text !== ""){
            const items = [...this.state.items, this.state.text]
            this.setState({items: items, text:""});
        }
    }
    handleDelete = id =>{
        console.log("Deleted",id);
        const olditems = [...this.state.items]
        console.log("olditems",olditems);
        const items = olditems.filter((element,i)=>{
            return i !== id
        })
        this.setState({items: items});
    }
    handleclose =()=>{
        this.state(false);
    }
    render()
    {
        //add data to localstorage
        // useEffect(() => {
        //     localStorage.setItem('lists', JSON.stringify(this.state.items))
        // }, [this.state.items]);
        return(
            //container ke liye
            <div>
                {/* <div className="button">
                <CustomButton className="cross_button" 
                onClick={this.handleclose}>X</CustomButton>
                </div> */}
            <div className='container-fluid mt-5'>
                <div className='row'> 
                    <div className='col-sm-6 mx-auto shadow-lg p-3'>
                       <h2 className='text-center'>Process Card</h2>
                       <div className='row'>
                        <div className='col-9'>
                            <input type="text" className='form-control' placeholder='Process Name'
                            value={this.state.text}onChange={this.handlechange}/>
                            
                            <CustomButton className='btn btn-warning px-5 font-weight-bold'
                            onClick={this.handleAdd}>Add Process</CustomButton>
                        </div>
                        
                        <div className="container-fluid">
                            <ul className='list-unstyled row m-5'>
                                {
                                    this.state.items.map((value, i)=>{
                                        return <List key={i} id= {i}value={value}
                                         sendData = {this.handleDelete}/>
                                    })
                                }
                            </ul>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default ProcessCard;
