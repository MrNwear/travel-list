import { useState } from "react";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import PackingList from "./Components/PackingList";
import Stats from "./Components/stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };
  const clearList = () => setItems([]);
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
        onClearItems={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
