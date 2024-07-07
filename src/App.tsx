import { useEffect, useRef, useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "./App.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const minDateOffset = 4 * 60 * 60 * 1000;

const stringyfyToTwoSymbols = (a: number) => `${a > 9 ? a : "0" + a}`;
const prepareDate = (day: number, month: number) => {
  return `${stringyfyToTwoSymbols(day)}.${stringyfyToTwoSymbols(month)}`;
};
const dateRangeOrdate = (value: ValuePiece[]) => {
  const res = value.map((val) =>
    prepareDate(val!.getDate(), val!.getMonth() + 1)
  );

  if (res[0] === res[1]) {
    return [res[0]];
  }

  return res;
};

function App() {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);
  const currentDate = new Date();
  const rawStartDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  const rawStartDateWithOffset = new Date(
    rawStartDate.getTime() + minDateOffset
  );
  const minDate =
    rawStartDateWithOffset.getDate() === rawStartDate.getDate()
      ? rawStartDate
      : rawStartDateWithOffset;

  const refToInputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    refToInputEl.current = document.querySelector(
      "input#customFieldValue"
    ) as HTMLInputElement;
  }, []);

  const applyDateRangeToInputFn = () => {
    if (Array.isArray(value)) {
      const selectedDateOrRange = dateRangeOrdate(value).join("-");

      const currentInputValueArray = (refToInputEl.current?.value || "").split(
        "," // TODO: create separate value for separator
      );

      // Checking if first part of array is date or range
      const inputDataReg = /\d{2}.\d{2}(-\d{2}.\d{2})?/gm;
      // If yes - remove old value
      if (inputDataReg.test(currentInputValueArray[0])) {
        currentInputValueArray.splice(0, 1);
      }
      // Prepare new array of values for input
      const newInputValueArray = [
        selectedDateOrRange,
        ...currentInputValueArray,
      ];

      refToInputEl.current!.value = newInputValueArray.join(",");
    }
  };

  return (
    <>
      <div className="date-range-component">
        <DateRangePicker
          calendarProps={{}}
          onChange={onChange}
          value={value}
          minDate={minDate}
        />
        <button onClick={applyDateRangeToInputFn}>Apply</button>
      </div>
    </>
  );
}

export default App;
