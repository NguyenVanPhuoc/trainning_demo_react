/* eslint-disable */
function Card(props) {
  const { variant, extra, children, ...rest } = props;

  return (
    <div
      className={`!z-5 relative flex flex-col rounded-xl bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
