function Button(props) {
  // eslint-disable-next-line react/prop-types
  const { name, classExtra, type = "button", btnDefault, children, ...rest } = props;

  return (
    <button
      type={type}
      className={`${btnDefault && "flex flex-row items-center justify-center rounded-md bg-sky-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-sky-600 active:bg-sky-700"} ${classExtra}`}
      {...rest}
    >
      {name ? name : children}
    </button>
  );
}

export default Button;