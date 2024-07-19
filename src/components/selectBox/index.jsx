/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { RiAsterisk, RiArchive2Line } from "react-icons/ri";

const SelectBox = (props) => {
  const {
    options = [],
    classNameExtra = "",
    classLabel,
    classInput,
    labelClass,
    disabled = false,
    required,
    label,
    name,
    error,
    onChangeSelect,
    form,
    ...rest
  } = props;

  const { t } = useTranslation();
  const errorInput = form ? form.formState.errors[name]?.message : error;

  const onChange = (value, selectValue) => {
    onChangeSelect(name, selectValue?.value);
  };

  return (
    <div className={`${ classNameExtra }`}>
      <div className={`flex ${labelClass}`}>
        <label
          htmlFor={name}
          className={`text-sm text-navy-700 dark:text-white font-bold ${ classLabel }`}
        >
          { label }
        </label>
        { required && <RiAsterisk className="w-2.5 h-2.5 text-red-500"/> }
      </div>
      <Select
        showSearch
        name={name}
        disabled={disabled}
        allowClear
        variant="borderless"
        className={`mt-2 flex h-12 w-full border font-inter font-medium text-sm items-center justify-center rounded-md outline-none ${ classInput } ${
          disabled
          ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
          : errorInput
          ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
          : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
        optionFilterProp="children"
        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input)}
        onChange={onChange}
        options={options}
        notFoundContent={
          <div className="flex justify-center items-center flex-col p-3">
            <RiArchive2Line className="text-3xl"/>
            <p className="text-md mt-1">{ t("common:no_data") }</p>
          </div>
        }
        {...rest}
      />
      { errorInput && <p className="ml-1.5 text-sm text-red-500">{errorInput}</p> }
    </div>
  );
};
export default SelectBox;
