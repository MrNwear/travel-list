export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Let's add your travel List 🔥</em>
      </footer>
    );
  const itemsLength = items.length;
  const packedItems = items.reduce((acc, item) => {
    return item.packed ? acc + 1 : acc;
  }, 0);
  const percentage = ((packedItems / itemsLength) * 100).toFixed(2);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `🧳 You have ${itemsLength} items on your list, and you aleardy packed 
            ${packedItems} (${percentage}%)`
          : `You got packed All your list 🚀`}
      </em>
      ;
    </footer>
  );
}
