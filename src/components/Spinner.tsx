import { CgSpinner } from "react-icons/cg";

const Spinner = ({ message = "", addElipsis = true }) => {
  return (
    <p className="flex items-center gap-x-2 justify-center">
      {message}
      {addElipsis ? "..." : ""} <CgSpinner className="animate-spin" size={25} />
    </p>
  );
};

export default Spinner;
