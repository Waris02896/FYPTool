import React, { useState, useEffect } from "react";
import "./supervisorpage.css";
import SupervisorBoard from "../../Component/Profiles Boards/Supervisor_Board.component";
import Card_Edits from "../../Component/Card_Edits/Card_Edits";

function SupervisorBoards_Display() {
    
    const [boards,setBoards] = useState(
        JSON.parse(localStorage.getItem("fyp-tracking")) ||[])
    const [target, setTarget] = useState({
        bid: "",
        cid: "",
    });

    const addCard = (title, bid) => {

        const card = {
            id: Date.now() + Math.random() * 2,
            title,
            labels: [],
            tasks: [],
            date: "",
            desc: "",
          };
        const index = boards.findIndex((item) => item.id === bid);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        tempBoards[index].cards.push(card);
        setBoards(tempBoards);
      };
    const addboard = (title) => {
        setBoards([...boards,
            {
                id: Date.now() + Math.random(),
                title,
                cards: [],
              }]);
      };
    
    const removeCard = (cid, bid) => {
        const bIndex = boards.findIndex((item) => item.id === bid);
        if (bIndex < 0) return;
    
        const tempBoards = [...boards];
        const cards = tempBoards[bIndex].cards;

        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
        if (cIndex < 0) return;

        // const tempBoards = [...boards];
        // const cards = tempBoards[index].cards;
        cards.splice(cIndex, 1);
        // tempBoards[bIndex].cards.splice(cIndex, 1);
        setBoards(tempBoards);
      };
      const removeBoard = (id) => {
        const index = boards.findIndex((item) => item.id === id);
        if (index < 0) return;
    
        const tempBoards = [...boards];
        tempBoards.splice(index, 1);
        // tempBoards = boards.filter(item=> item.id!==bid)
        setBoards(tempBoards);
      };
    
    const handleDragEnter = (cid, bid) => {
        if (target.cid === cid) return;
        setTarget({
            bid,
            cid,
        });
        
    };
    const handleDragEnd = (cid, bid) => {
        let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
        
        s_bIndex = boards.findIndex((item) => item.id === bid);
        if (s_bIndex<0) return;

        // s_cIndex = (boards[s_bIndex]?.cards?.findIndex((item) => item.id === cid));
        // if (s_cIndex<0) return;
        if (boards && boards[s_bIndex] && boards[s_bIndex].cards) 
        {
            s_cIndex = boards[s_bIndex].cards.findIndex(function (item) {
            return item.id === cid;
        });
        } else {
        s_cIndex = null;}

        t_bIndex = boards.findIndex((item) => item.id === target.bid);
        if (t_bIndex<0) return;

        // t_cIndex = boards[t_bIndex].cards?.findIndex((item) => item.id === target.cid);
        // if (t_cIndex<0) return;
        if (boards && boards[t_bIndex] && boards[t_bIndex].cards) {
        t_cIndex = boards[t_bIndex].cards.findIndex(function (item) {
            return item.id === cid;
        });
        } else {
        s_cIndex = null;}

        const tempBoards = [...boards];
        const tempCard = tempBoards[s_bIndex].cards[s_cIndex];

        tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
        tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
        setBoards(tempBoards);

        setTarget({
            bid: "",
            cid: "",
        });
    };

    const updateCard = (bid, cid, card) => {
        const bIndex = boards.findIndex((item) => item.id === bid);
        if (bIndex < 0) return;
    
        const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
        if (cIndex < 0) return;
    
        const tempBoards = [...boards];
        // const cards = tempBoards[index].cards;

        tempBoards[bIndex].cards[cIndex] = card;
    
        setBoards(tempBoards);
      }; 

      useEffect(() => {
        localStorage.setItem("fyp-tracking", JSON.stringify(boards));
      }, [boards]);
    
    
    return(
        <div className="app">
            <div className="app_navbar">
                <h2>Project Tracking</h2>
            </div>
            <div className="app_container">
                <div className="app_boards">
                    {
                        boards.map((item) => (
                            <SupervisorBoard key={item.id} board={item}
                            removeBoard={removeBoard}
                            addCard = {addCard}
                            removeCard = {removeCard}
                            handleDragEnd = {handleDragEnd}
                            handleDragEnter = {handleDragEnter}
                            updateCard = {updateCard}
                            />
                        ))
                    }
                    {/* <Board />
                    <Board />
                    <Board /> */}
                    <div className="app_boards_more">
                        <Card_Edits
                        displayClass="app_boards_more_add"
                        text="Add Board"
                        placeholder="Enter Board Title"
                        onSubmit={value => addboard(value)}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SupervisorBoards_Display;