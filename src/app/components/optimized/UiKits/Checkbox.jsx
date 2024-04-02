import { useState, useEffect } from "react";
import { CheckIcon } from "src/app/utils/icons";

const CheckBox = ({ variant, onChange, label, checked: externalChecked }) => {
  const [internalChecked, setInternalChecked] = useState(false);

  useEffect(() => {
    if (externalChecked !== undefined) {
      setInternalChecked(externalChecked);
    }
  }, [externalChecked]);

  const handleToggle = () => {
    const newValue = !internalChecked;
    setInternalChecked(newValue);
    if (onChange) {
      onChange(newValue);
      console.log(newValue);
    }
  };

  switch (variant) {
    case "minus":
      return (
        <div className="flex items-center">
          <div
            onClick={handleToggle}
            className={`hover:bg-sec-light w-5 h-5 border rounded cursor-pointer disabled:bg-hint ${
              internalChecked ? "bg-success hover:bg-sec-pressed" : ""
            }`}
          >
            {internalChecked && (
              <p className="text-white flex justify-center items-center h-full w-full">
                -
              </p>
            )}
          </div>
          {label && <label className="text-title text-sm ml-2">{label}</label>}
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <div
            onClick={handleToggle}
            className={`hover:bg-sec-light w-5 h-5 border rounded cursor-pointer disabled:bg-hint ${
              internalChecked ? "bg-success hover:bg-sec-pressed" : ""
            }`}
          >
            {internalChecked && (
              <CheckIcon className="fill-white w-full h-full" />
            )}
          </div>
          {label && <label className="text-title text-sm ml-2">{label}</label>}
        </div>
      );
  }
};

export default CheckBox;
