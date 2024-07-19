// Custom components
import React from "react";
import { RiAsterisk } from "react-icons/ri";

function TextField(props) {
  // eslint-disable-next-line react/prop-types
  const { label, id, name, extra, placeholder, cols, rows, required, disabled, classInput, classLabel, error, form, ...rest } = props;
  const errorInput = form ? form.formState.errors[name]?.message : error;
  const attributeRegister = form ? form.register(name) : {};

  return (
    <div className={`${extra}`}>
      <div className="flex">
      <label
        htmlFor={name}
        className={`ml-3 mb-2 text-sm font-bold text-navy-700 dark:text-white ${classLabel}`}
      >
        {label}
      </label>
      {required && <RiAsterisk className="w-2.5 h-2.5 text-red-500"/>}
      </div>
      <div>
        <textarea
          id={id}
          name={name}
          cols={cols}
          rows={rows}
          placeholder={placeholder}
          className={`flex w-full items-center justify-center rounded-xl border bg-white/0 pl-3 pt-3 text-sm outline-none ${classInput} ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : errorInput
              ? "!border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          {...rest}
          {...attributeRegister}
        />
        {errorInput && <p className="ml-1.5 text-sm text-red-500">{errorInput}</p>}
      </div>
    </div>
  );
}

export default TextField;
