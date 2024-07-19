const Switch = (props) => {
  const { name, extra, color, form, ...rest } = props;
  const attributeRegister = form ? form.register(name) : {};

  return (
    <input
      type="checkbox"
      name={name}
      {...attributeRegister}
      className={`relative h-6 w-12 appearance-none rounded-xl bg-[#e0e5f2] outline-none transition duration-[0.5s] 
      before:absolute before:top-[50%] before:h-6 before:w-6 before:translate-x-[2px] before:translate-y-[-50%] before:rounded-xl
      before:bg-white before:shadow-[0_2px_5px_rgba(0,_0,_0,_.2)] before:transition before:content-[""]
      checked:before:translate-x-[24px] hover:cursor-pointer
      dark:bg-white/5 ${
        color === "red"
          ? "checked:bg-red-500 dark:checked:bg-red-400"
          : color === "blue"
          ? "checked:bg-blue-500 dark:checked:bg-blue-400"
          : color === "green"
          ? "checked:bg-green-500 dark:checked:bg-green-400"
          : color === "yellow"
          ? "checked:bg-yellow-500 dark:checked:bg-yellow-400"
          : color === "orange"
          ? "checked:bg-orange-500 dark:checked:bg-orange-400"
          : color === "teal"
          ? "checked:bg-teal-500 dark:checked:bg-teal-400"
          : color === "navy"
          ? "checked:bg-navy-500 dark:checked:bg-navy-400"
          : color === "lime"
          ? "checked:bg-lime-500 dark:checked:bg-lime-400"
          : color === "cyan"
          ? "checked:bg-cyan-500 dark:checked:bg-cyan-400"
          : color === "pink"
          ? "checked:bg-pink-500 dark:checked:bg-pink-400"
          : color === "purple"
          ? "checked:bg-purple-500 dark:checked:bg-purple-400"
          : color === "amber"
          ? "checked:bg-amber-500 dark:checked:bg-amber-400"
          : color === "indigo"
          ? "checked:bg-indigo-500 dark:checked:bg-indigo-400"
          : color === "gray"
          ? "checked:bg-gray-500 dark:checked:bg-gray-400"
          : "checked:bg-neutral-600 dark:checked:bg-brand-400"
      } ${extra}`}
      {...rest}
    />
  );
};

export default Switch;