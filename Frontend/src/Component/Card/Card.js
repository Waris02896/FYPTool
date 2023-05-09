import React from "react";
import { useState } from "react";
import './Card.css';
import {CheckSquare, Clock,MoreHorizontal} from 'react-feather';
import Chip from "../Chip/Chip";
import Options_Board from "../Options_Board/Options_Board";
import CardInfo from "./CardInfo/CardInfo";

function Card(props)
{
    const [showOpts, setShowOpts] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const cardTitle = props.card ? props.card.title : null;

    const { id, title, date, tasks, labels } = props.card;

    const formatDate = (value) => {
      if (!value) return "";
      const date = new Date(value);
      if (!date) return "";
  
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Aprl",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
  
      const day = date.getDate();
      const month = months[date.getMonth()];
      return day + " " + month;
    };
    return(
        <>
            {showModal && (
                <CardInfo 
                onClose={ () => {   console.log("calllinf");
                    setShowModal(false);}}
                card={props.card}
                updateCard = {props.updateCard}
                boardId={props.boardId}
            />     
            )}
        <div className="card" draggable
        onDragEnd={ () => {
            if (props.card && props.card.id) {
                props.handleDragEnd(props.card.id, props.boardId)
            }
        }}
        onDragEnter={() => {
            if (props.card && props.card.id) {
                props.handleDragEnter(props.card.id, props.boardId)
            }
        }}
        onClick = { () => setShowModal(true)}
        >
            <div className="card_top">
                <div className="card_top_labels">
                    {
                        props.card && props.card.labels && props.card.labels.map((item, index) => (
                            <label key={index} style={{ backgroundColor: item.color }}>
                                {item.text}
                            </label>
                        ))
                    }
                </div>
                <div className="card_top_opts" onClick={(e) => e.stopPropagation() && setShowOpts(true)}>
                    <MoreHorizontal/>
                    {
                        showOpts && (
                            <Options_Board className="card_opts" onClose={() => setShowOpts(false)}>
                                <p onClick={() => {
                                    props.removeCard(props.boardId, id);
                                }}>Delete Card</p>
                            

                            </Options_Board>
                        )
                    }
                    
                </div>
            </div>
            <div className="card_title">{cardTitle}</div>
            <div className="card_bottom">
                {
                    props.card && props.card.date &&
                    (
                        <p>
                            <Clock/>
                            {props.card.date}
                        </p>
                    )

                }
                {
                    props.card &&
                    props.card.tasks &&
                    props.card.tasks.length > 0 && (
                        <p>
                        <CheckSquare />
                        {props.card.tasks.filter((item) => item.completed).length}/
                        {props.card.tasks.length}
                        </p>
                    )
                    }
            </div>
        </div>
        </>
    );
}

export default Card;