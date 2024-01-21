import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const deleteItem = (id) => {
    const filteredItems = items.filter((item) => item?.id !== id);
    setItems(filteredItems);
  };
  const updateItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id !== id ? item : { ...item, packed: !item.packed }
    );
    setItems(updatedItems);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onUpdateItem={updateItem}
      />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🏝️ FAR AWAY 🧳</h1>;
}
function PackingList({ items, onDeleteItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              <input
                type="checkbox"
                value={item.packed}
                onChange={(e) => {
                  onUpdateItem(item.id);
                }}
              />
              <span
                style={{ textDecorationLine: item.packed && "line-through" }}
              >
                {item.quantity + " " + item.description}
              </span>
              <button onClick={() => onDeleteItem(item.id)}>❌</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleForm(e) {
    e.preventDefault();
    if (!description) {
      alert("please enter task description");
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleForm} style={{ display: "" }}>
      <h3>What do you need for your trip ? 💙</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you aleardy packed X (x%)</em>;
    </footer>
  );
}
