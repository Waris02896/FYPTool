import React, { useState } from "react";
import "./Supervisor_Boards.css";
import { MoreHorizontal } from 'react-feather';
import Card from "../Card/Card";
import Card_Edits from "../Card_Edits/Card_Edits";
import Options_Board from "../Options_Board/Options_Board";

function SupervisorBoard(props) {
  const [showOpts, setShowOpts] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handleAnnouncementChange = (event) => {
    setAnnouncement(event.target.value);
  }

  const handleAnnouncementSubmit = (event) => {
    event.preventDefault();
    const newAnnouncement = {
      text: announcement,
      date: new Date().toLocaleString(),
      replies: []
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setAnnouncement('');
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }

  const handleReplySubmit = (announcementIndex, replyText) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[announcementIndex].replies.push({
      text: replyText,
      date: new Date().toLocaleString()
    });
    setAnnouncements(updatedAnnouncements);
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }

  const getAnnouncementsFromLocalStorage = () => {
    const announcementsFromLocalStorage = localStorage.getItem('announcements');
    if (announcementsFromLocalStorage) {
      setAnnouncements(JSON.parse(announcementsFromLocalStorage));
    }
  }

  React.useEffect(() => {
    getAnnouncementsFromLocalStorage();
  }, []);

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
            <Options_Board className="board_opts"
              onClose={() => setShowOpts(false)}>
              <p onClick={() => props.removeBoard(props.board && props.board.id)}>Delete Board</p>
            </Options_Board>
          )}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {props.board && props.board.cards && props.board.cards.map((item) => (
          <Card key={item.id} card={item}
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
        <div className="announcement">
          <h2>Announcements:</h2>
          {announcements.map((announcement, index) => (
            <div className="announcement-card" key={index}>
              <p>{announcement.text}</p>
              <p>{announcement.date}</p>
              {/* <CommentBox
                placeholder="Reply to this announcement"
                onSubmit={(replyText) => handleReplySubmit(index, replyText)}
                comments={announcement.replies}
                /> */}
                </div>
              ))}
              <form onSubmit={handleAnnouncementSubmit}>
                <textarea className="announcement-textarea" value={announcement} onChange={handleAnnouncementChange} placeholder="Post an announcement" />
                <button className="announcement-button" type="submit">Post</button>
              </form>
            </div>
          </div>
        </div>
        );
        }
        
        export default SupervisorBoard;