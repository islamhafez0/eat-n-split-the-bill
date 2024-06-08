import { FormEvent, useEffect, useState } from "react";
import AddFriend from "./components/AddFriend";
import FriendsList from "./components/FriendsList";
import { initialFriendsList } from "./constants";
import { FriendType } from "./types";
import SplittingForm from "./components/SplittingForm";

export const App = () => {
  const [friendsList, setFriendsList] =
    useState<FriendType[]>(initialFriendsList);
  const [newFriendValue, setNewFriendValue] = useState<string>("");
  const [imageValue, setImageValue] = useState<string>("");
  const [showBillForm, setShowBillForm] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: number | null;
    name: string | null;
  }>({ id: null, name: null });
  const [billValue, setBillValue] = useState<string>("");
  const [isPayedByUser, setIsPayedByUser] = useState<string>("");
  const [whoIsPaying, setWhoIsPaying] = useState<string>("user");

  const paidByFriend =
    billValue && isPayedByUser ? +billValue - +isPayedByUser : "";

  useEffect(() => {
    setImageValue(`https://i.pravatar.cc/150?img=${friendsList.length + 1}`);
  }, [friendsList.length]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const newFriend: FriendType = {
      id: friendsList.length + 1,
      balance: 0,
      image: imageValue,
      name: newFriendValue,
    };
    e.preventDefault();
    if (newFriendValue.trim() === "") return;
    setFriendsList([...friendsList, newFriend]);
    setNewFriendValue("");
  };

  const handleSplitBill = (value: string) => {
    setFriendsList((prev) =>
      prev.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + +value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="left-col">
        <FriendsList
          friendsList={friendsList}
          setShowBillForm={setShowBillForm}
          showBillForm={showBillForm}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
        <AddFriend
          friendsList={friendsList}
          setNewFriendValue={setNewFriendValue}
          newFriendValue={newFriendValue}
          imageValue={imageValue}
          setImageValue={setImageValue}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="right-col">
        {showBillForm && (
          <SplittingForm
            billValue={billValue}
            setBillValue={setBillValue}
            isPayedByUser={isPayedByUser}
            setIsPayedByUser={setIsPayedByUser}
            whoIsPaying={whoIsPaying}
            setWhoIsPaying={setWhoIsPaying}
            selectedFriend={selectedFriend}
            paidByFriend={paidByFriend}
            handleSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
};
