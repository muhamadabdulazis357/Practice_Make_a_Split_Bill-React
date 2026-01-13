import { useState } from "react";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState("");
  const friendBill = bill ? amount - bill : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !bill) return;
    onSplitBill(whoIsPaying === "user" ? friendBill : -bill);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label htmlFor="">💰Total bill</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <label htmlFor="">🙋Your bill</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label htmlFor="">🙋‍♂️{selectedFriend.name} bill</label>
      <input type="text" value={friendBill} disabled />

      <label htmlFor="">💵bailed out by</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <button className="button">Add</button>
    </form>
  );
}
