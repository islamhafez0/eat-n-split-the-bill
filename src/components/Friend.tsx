import { Dispatch, SetStateAction } from "react";
import { FriendType } from "../types";

const Friend = ({
  friend,
  setShowBillForm,
  isSelected,
  setSelectedFriend,
}: {
  friend: FriendType;
  showBillForm: boolean;
  setShowBillForm: Dispatch<SetStateAction<boolean>>;
  isSelected: boolean;
  selectedFriend: { id: number | null; name: string | null };
  setSelectedFriend: (friend: {
    id: number | null;
    name: string | null;
  }) => void;
}) => {
  const { balance, image, name, id } = friend;
  const handleButtonClick = () => {
    if (isSelected) {
      setShowBillForm(false);
      setSelectedFriend({ id: null, name: null });
    } else {
      setSelectedFriend({ id, name });
      setShowBillForm(true);
    }
  };
  return (
    <li className={`${isSelected ? "selected-item" : ""}`}>
      <div>
        <img src={image || "../assets/placeholder-src.png"} alt={name} />
        <span>
          <h4>{name}</h4>
          {balance < 0 ? (
            <span className="negative">{`You owe ${name} ${-balance}$`}</span>
          ) : balance > 0 ? (
            <span className="postive">{`${name} owes you ${balance}$`}</span>
          ) : (
            <span className="even">{`You and ${name} are even`}</span>
          )}
        </span>
      </div>
      <button onClick={handleButtonClick}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
};

export default Friend;
