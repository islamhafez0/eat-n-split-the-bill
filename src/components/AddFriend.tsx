import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { FriendType } from "../types";

const AddFriend = ({
  setNewFriendValue,
  newFriendValue,
  handleSubmit,
  imageValue,
  setImageValue,
}: {
  setNewFriendValue: Dispatch<SetStateAction<string>>;
  newFriendValue: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  friendsList: FriendType[];
  imageValue: string;
  setImageValue: Dispatch<SetStateAction<string>>;
}) => {
  const [toggleAddForm, setToggleAddForm] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setNewFriendValue(target.value);
  };

  const handleImageChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setImageValue(target.value);
  };
  return (
    <div className="add-friend">
      {toggleAddForm ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="friend-name">
              Friend name
              <input
                type="text"
                id="friend-name"
                value={newFriendValue}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="friend-image">
              Image url
              <input
                type="text"
                value={imageValue}
                onChange={handleImageChange}
                id="friend-image"
              />
            </label>
            <span>
              <button type="submit">Add</button>
            </span>
          </form>
          <span
            onClick={() => setToggleAddForm((prev) => !prev)}
            className="close"
          >
            X
          </span>
        </>
      ) : (
        <div>
          <button onClick={() => setToggleAddForm((prev) => !prev)}>
            Add Friend
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFriend;
