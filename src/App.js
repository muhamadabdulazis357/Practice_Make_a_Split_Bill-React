import { useState } from "react";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendList from "./components/FriendList";

const initialFriends = [
  {
    id: 118836,
    name: "Choi Yikyung",
    image:
      "https://i.pinimg.com/736x/ac/e3/33/ace333fe695ea125fba4cf64d0eb08df.jpg",
    balance: -7,
  },
  {
    id: 933372,
    name: "Jeong Dojun",
    image:
      "https://i.pinimg.com/1200x/0c/c4/4f/0cc44ffd857f4b9fc28b0dfdacc5922e.jpg",
    balance: 20,
  },
  {
    id: 499476,
    name: "Park Joo-Yeon",
    image:
      "https://i.pinimg.com/736x/07/20/68/0720680f0eccc0de4cb69dbca348c4ef.jpg",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friends) => {
        if (friends.id === selectedFriend?.id) {
          return {
            ...friends,
            balance: friends.balance + value,
          };
        }
        return friends;
      })
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelected={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <button className="button" onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
