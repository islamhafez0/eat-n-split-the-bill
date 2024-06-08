import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

const SplittingForm = ({
  selectedFriend,
  billValue,
  setBillValue,
  isPayedByUser,
  setIsPayedByUser,
  whoIsPaying,
  setWhoIsPaying,
  paidByFriend,
  handleSplitBill,
}: {
  selectedFriend: { id: number | null; name: string | null };
  billValue: string;
  setBillValue: Dispatch<SetStateAction<string>>;
  isPayedByUser: string;
  setIsPayedByUser: Dispatch<SetStateAction<string>>;
  whoIsPaying: string;
  setWhoIsPaying: Dispatch<SetStateAction<string>>;
  paidByFriend: number | string;
  handleSplitBill: (value: string) => void;
}) => {
  const handleBillValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillValue(e.target.value);
  };

  const handleUserExpenseChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || parseFloat(value) <= parseFloat(billValue)) {
      setIsPayedByUser(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!billValue || !isPayedByUser) return;
    const friendExpense = parseFloat(billValue) - parseFloat(isPayedByUser);
    handleSplitBill(
      whoIsPaying === "user"
        ? friendExpense.toString()
        : (-parseFloat(isPayedByUser)).toString()
    );
    setBillValue("");
    setIsPayedByUser("");
    setWhoIsPaying("user");
  };

  return (
    <div className="split_form-wrapper">
      <h2>Split a bill with {selectedFriend.name?.toUpperCase()}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="bill-value">💰 Bill value</label>
          <input
            value={billValue}
            onChange={handleBillValueChange}
            type="text"
            id="bill-value"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="user-exepense">🤑 Your expense</label>
          <input
            type="text"
            value={isPayedByUser}
            onChange={handleUserExpenseChange}
            id="user-exepense"
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="friend's-exepense">
            🤝 {selectedFriend.name}'s expense
          </label>
          <input
            type="text"
            id="friend's-exepense"
            value={paidByFriend}
            disabled
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="select">🧾 Who will pay the bill</label>
          <select id="select" onChange={(e) => setWhoIsPaying(e.target.value)}>
            <option value="user">You</option>
            <option value={`${selectedFriend.name || ""}`}>
              {selectedFriend.name}
            </option>
          </select>
        </div>
        <button type="submit">Split Bill</button>
      </form>
    </div>
  );
};

export default SplittingForm;
