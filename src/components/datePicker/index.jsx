import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { RiAsterisk } from "react-icons/ri";
import dayjs from "dayjs";
import Constants from "@/config/constants";

const Date = ({ onChangeDate, label, id, name, extra, classLabel, classDate, labelClass, disabled, required, form, value, ...rest }) => {
  const errorInput = form ? form.formState.errors[name]?.message : "";

  const [dateValue, setDateValue] = useState(value);

  useEffect(() => {
    if (value) {
      setDateValue(value);
    }
  }, [value]);

  const onChange = (date, dateString) => {
    setDateValue(dateString);
    onChangeDate(name, dateString);
  };

  return (
    <div className={`${extra ?? ""}`}>
      <div className={`flex ${labelClass ?? ""}`}>
        <label
          htmlFor={name}
          className={`text-sm text-navy-700 dark:text-white font-bold ${classLabel ?? ""}`}
        >
          {label}
        </label>
        {required && <RiAsterisk className="w-2.5 h-2.5 text-red-500"/>}
      </div>
      <div className="w-full">
        <DatePicker
          id={id}
          className={`mt-2 flex h-12 w-full border font-inter font-medium text-sm items-center justify-center rounded-md outline-none ${classDate ?? ""} ${
            disabled
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          onChange={onChange} 
          status={errorInput ? "error" : ""}
          name={name}
          disabled={disabled}
          inputReadOnly
          required={required}
          value={dateValue ? dayjs(dateValue, Constants.DATE.FORMAT_SHOW_DATE) : null}
          {...rest}
        />
        {errorInput && <p className="text-sm text-red-500">{errorInput}</p>}
      </div>
    </div>
  );
};
export default Date;
