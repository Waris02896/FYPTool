import React from 'react';
import CustomButton from '../Button/button.component';
import './list.styles.css';

function List(props) {
  return (
    <>
      <li>
        Name:  {props.name}  
      </li>
      <li>
      Priority: {props.priority}
      </li>
      <CustomButton
        className="btn btn-danger my-2 col-sm-2 offset-1"
        onClick={() => {
          props.sendData(props.id);
        }}
      >
        Delete Process
      </CustomButton>
    </>
  );
}

export default List;
