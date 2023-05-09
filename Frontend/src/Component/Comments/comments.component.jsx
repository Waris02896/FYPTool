// import CustomButton from "../Button/button.component";
// import { useState } from "react";

// function CommentBox(){
//     const [comment, setComment] = useState("");
//     const [comments, setComments] = useState([]);

//     const handleClick=()=>{
//         setComments((comments)=>[...comments, comment]);
//     };

//     const handleChange = (e) =>{
//         setComment(e.target.value);
//     };
//     return(
//         <div className="main-container">
//             {comments.map((text)=>(
//                 <div className="comment-container">{text}</div>
//             ))}
//             <div className="comment-flexbox">
//             <h4 className="comment-text">Comment Box</h4>
//             <textarea value= {comment} onChange={handleChange} className="inpur-box"/>
//             <button onClick={handleClick} className="comment-button" >Submit</button>
//             </div>
//         </div>
//     );
// }
// export default CommentBox;

import React, { useState } from 'react';
import './comments.styles.css';

const CommentBox = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  }

  return (
    <div className="CommentBox">
      <form onSubmit={handleSubmit}>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} 
        placeholder="Leave your comment here"></textarea>
        <div>
        <button type="submit">Submit</button>
        </div>
      </form>
      <div className="CommentList">
        {comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
}

export default CommentBox;
