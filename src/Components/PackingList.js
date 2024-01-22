import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
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
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={"input"}>Sort By Input Order</option>
          <option value={"description"}>Sort By description</option>
          <option value={"packed"}>Sort By unpacked</option>
        </select>
        <button onClick={onClearItems}>clear List</button>
      </div>
    </div>
  );
}
