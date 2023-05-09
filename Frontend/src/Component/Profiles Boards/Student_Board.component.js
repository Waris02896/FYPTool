import React, { useState } from "react";
import "./Student_Board.css";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Card_Edits from "../Card_Edits/Card_Edits";
import Options_Board from "../Options_Board/Options_Board";
import Announcements from "./Announcement";

function StudentBoard(props) {
  const [showOpts, setShowOpts] = useState(false);

  return (
    <div className="board">
      <div className="boardtop">
        <p className="boardtop_title">
          {props.board && props.board.title}
          <span>{` ${props.board ? (props.board.cards ? props.board.cards.length : 0) : 0}`}</span>
        </p>
        <div className="boardtop_opts" onClick={() => setShowOpts(true)}>
          <MoreHorizontal />
          {showOpts && (
            <Options_Board className="board_opts" onClose={() => setShowOpts(false)}>
              <p onClick={() => props.removeBoard(props.board && props.board.id)}>Delete Board</p>
            </Options_Board>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board &&
          props.board.cards &&
          props.board.cards.map((item) => (
            <Card
              key={item.id}
              card={item}
              removeCard={props.removeCard}
              boardId={props.board && props.board.id}
              handleDragEnd={props.handleDragEnd}
              handleDragEnter={props.handleDragEnter}
              updateCard={props.updateCard}
            />
          ))}
        <Card_Edits
          displayClass="board_cards_add"
          text="+ Add Card"
          placeholder="Enter Card Title"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(value, props.board && props.board.id)}
        />
      </div>
      <div>
        <Announcements />
      </div>
    </div>
  );
}

export default StudentBoard;

