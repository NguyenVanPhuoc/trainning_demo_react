// Custom components
import React, { useState } from "react";
import { RiAsterisk } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Constants from "@/config/constants";

function InputField(props) {
  // eslint-disable-next-line react/prop-types
  const {
    label,
    id,
    noAttributeNoEmoji = true,
    name,
    extra,
    type,
    placeholder,
    error,
    disabled,
    classInput,
    classLabel,
    labelClass,
    classInputWrapper,
    required,
    form,
    isShowPassword,
    password,
    toggleIconPassword,
    ...rest
  } = props;
  const errorInput = form ? form.formState.errors[name]?.message : error;
  const attributeRegister = form ? form.register(name) : {};
  const [inputValue, setInputValue] = useState("");
  const attributeNoEmoji =
    !form && !noAttributeNoEmoji
      ? { value: inputValue, onChange: (event) => handleChange(event) }
      : {};

  const removeEmoji = function (text) {
    if (typeof(text) != "boolean") {
      return text.replace(Constants.REGEX.IS_EMOJI, "");
    }
    return text;
  }
  
  const handleChange = (event) =>
    setInputValue(removeEmoji(event.target.value));

  if (form) {
    const { watch } = form;

    watch((value, { name, type }) => {
      if (type == "change") {
        form.setValue(name, removeEmoji(value[name]));
      }
    });
  }

  return (
    <div className={`${extra ?? ""}`}>
      <div className={`flex ${labelClass ?? ""}`}>
        <label
          htmlFor={id}
          className={`text-sm text-navy-700 dark:text-white font-bold ${classLabel ?? ""}`}
        >
          {label}
        </label>
        {required && <RiAsterisk className="w-2.5 h-2.5 text-red-500" />}
      </div>
      <div className={`w-full ${classInputWrapper ?? ""}`}>
        <input
          id={id}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-md border bg-white/0 p-3 text-sm outline-none ${classInput} ${
            disabled === true
              ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
              : errorInput
                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
          {...rest}
          {...attributeRegister}
          {...attributeNoEmoji}
        />
        {password &&
          (isShowPassword ? (
            <IoEyeOutline
              className="w-4 h-4 absolute right-4 cursor-pointer top-4"
              onClick={() => toggleIconPassword(false, name)}
            />
          ) : (
            <IoEyeOffOutline
              className="w-4 h-4 absolute right-4 cursor-pointer top-4"
              onClick={() => toggleIconPassword(true, name)}
            />
          ))}
        {errorInput && (
          <p className="inline-block mt-1 text-sm text-red-500">{errorInput}</p>
        )}
      </div>
    </div>
  );
}

export default InputField;

