import React from 'react';
import CustomButton from '../Button/button.component';

function List(props) {
    return (
        <>
    <li className="shadow p-2 my-2 col-sm-9">{props.value}</li> 
    <CustomButton className="btn btn-danger my-2 col-sm-2 offset-1"
    onClick={()=>{props.sendData(props.id)}}>Delete Process</CustomButton>
    
    </>
    )
}
export default List;