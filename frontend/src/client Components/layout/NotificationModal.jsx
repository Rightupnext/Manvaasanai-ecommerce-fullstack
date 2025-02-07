import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/reducers/modalSlice"; 

const NotificationModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector((state) => state.modal);

  if (!isOpen) return null;

  const iconTypes = {
    success: "fill-green-500",
    error: "fill-red-500",
    warning: "fill-yellow-500",
    info: "fill-blue-500",
  };

  const titleTypes = {
    success: "Success!",
    error: "Error!",
    warning: "Warning!",
    info: "Information",
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 cursor-pointer fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={() => dispatch(closeModal())}
        >
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
        </svg>

        <div className="my-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-14 inline ${iconTypes[type]}`}
            viewBox="0 0 512 512"
          >
            <path d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z" />
            <path d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z" />
          </svg>
          <h4 className="text-xl text-gray-800 font-semibold mt-4">
            {titleTypes[type]}
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed mt-4">
            {message}
          </p>
        </div>

        <button
          onClick={() => dispatch(closeModal())}
          className="px-5 py-2.5 w-full rounded-lg text-white bg-gray-800 hover:bg-gray-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default NotificationModal;
