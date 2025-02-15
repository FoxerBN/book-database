import React from "react";

interface RememberCheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const RememberCheckbox: React.FC<RememberCheckboxProps> = ({
  checked,
  onChange,
  id = "checkbox",
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="relative flex w-8 h-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70] p-0.5 duration-100 hover:p-1"
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="group peer hidden"
        />

        <div className="w-6 h-6 rounded-full bg-gray-800 duration-300 peer-checked:w-0 peer-checked:h-0"></div>
        <div className="absolute left-[0.79rem] h-[2px] w-[12px] -translate-y-5 translate-x-5 rotate-[-41deg] rounded-sm bg-white duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
        <div className="absolute left-[0.49rem] top-4 h-[2px] w-[8px] -translate-x-5 -translate-y-5 rotate-[45deg] rounded-sm bg-white duration-300 peer-checked:translate-x-0 peer-checked:translate-y-0"></div>
      </label>
    </div>
  );
};

export default RememberCheckbox;
