import React, { useState } from 'react';

const Announcements = () => {
  // state for storing announcements
  const [announcements, setAnnouncements] = useState([]);

  // state for storing user input
  const [input, setInput] = useState('');

  // function for adding new announcement
  const addAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      text: input,
      replies: []
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setInput('');
  };

  // function for adding reply to announcement
  const addReply = (index, replyText) => {
    const updatedAnnouncements = [...announcements];
    updatedAnnouncements[index].replies.push(replyText);
    setAnnouncements(updatedAnnouncements);
  };

  return (
    <div>
      <h2>Announcements</h2>
      <form onSubmit={addAnnouncement}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Post Announcement</button>
      </form>
      {announcements.map((announcement, index) => (
        <div key={index}>
          <p>{announcement.text}</p>
          <form onSubmit={(e) => {
              e.preventDefault();
              addReply(index, e.target.replyInput.value);
              e.target.replyInput.value = '';
            }}>
            <input type="text" name="replyInput" />
            <button type="submit">Reply</button>
          </form>
          <ul>
            {announcement.replies.map((reply, i) => (
              <li key={i}>{reply}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
