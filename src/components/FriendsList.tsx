import { Dispatch, SetStateAction } from "react";
import { FriendType } from "../types";
import Friend from "./Friend";
const FriendsList = ({
  friendsList,
  setShowBillForm,
  showBillForm,
  selectedFriend,
  setSelectedFriend,
}: {
  friendsList: FriendType[];
  showBillForm: boolean;
  setShowBillForm: Dispatch<SetStateAction<boolean>>;
  selectedFriend: { id: number | null; name: string | null };
  setSelectedFriend: (friend: {
    id: number | null;
    name: string | null;
  }) => void;
}) => {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          friend={friend}
          key={friend.id}
          isSelected={friend.id === selectedFriend.id}
          setShowBillForm={setShowBillForm}
          showBillForm={showBillForm}
        />
      ))}
    </ul>
  );
};

export default FriendsList;
