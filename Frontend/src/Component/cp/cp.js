// import React, { useState } from 'react';

// function MyComponent() {
//   const [showModal, setShowModal] = useState(false);
//   const [listItems, setListItems] = useState([]);

//   // Function to handle adding an item to the list
//   const handleAddItem = (newItem) => {
//     // Add the new item to the list
//     setListItems([...listItems, newItem]);
//     // Save the updated list to local storage
//     localStorage.setItem('myList', JSON.stringify([...listItems, newItem]));
//     // Close the modal
//     setShowModal(false);
//   };

//   // Function to handle clicking on an item in the list
//   const handleItemClick = (item) => {
//     // Navigate to another modal or do something else with the item
//     console.log(`Clicked on item: ${item}`);
//   };

//   return (
//     <div>
//       <button onClick={() => setShowModal(true)}>Open Modal</button>
//       <ul>
//         {listItems.map((item, index) => (
//           <li key={index} onClick={() => handleItemClick(item)}>{item}</li>
//         ))}
//       </ul>
//       {showModal && (
//         <div>
//           <h2>Add Item</h2>
//           <input type="text" placeholder="Item name" onChange={(e) => setNewItem(e.target.value)} />
//           <button onClick={() => handleAddItem(newItem)}>Add</button>
//         </div>
//       )}
//     </div>
//   );
// }
