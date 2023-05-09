import React, { useState } from "react";
import "./Card_Edits.css";
import { X } from 'react-feather';

function Card_Edits (props) {
    const [showEdit, setShowEdit] = useState(false);
    const [inputValue, setInputValue] = useState(props.defaultValue ||"");
    const submission = (e) => {
        e.preventDefault();
        if (inputValue && props.onSubmit) {
          setInputValue("");
          props.onSubmit(inputValue);
        }
        setShowEdit(false);
      };
    return(
        <div className="card_editable">
            {
                showEdit?
            (
                <form className={`edit ${props.editClass || "" }`} 
                onSubmit={submission}>
                    <input autoFocus
                    type="text"
                    value={inputValue}
                    onChange= { (e) => setInputValue(e.target.value) }
                    placeholder= {props.placeholder || "Enter item"}
                    />
                    <div className="edit_bottom">
                        <button type="submit">{props.buttonText || "Add"}</button>
                        <X onClick={()=> setShowEdit(false)} className="closeIcon"/>
                    </div>
                </form>)
            : (<p className={`editable_display ${props.displayClass || ""}`} 
            onClick={()=> setShowEdit(true)}>
                {props.text || "Add Item"}</p>)}
        </div>
    );
}

export default Card_Edits;