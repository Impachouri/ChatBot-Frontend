import { toast } from "react-toastify";

const notification = () => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  return (message, type) => {
    switch (type) {
      case "SUCCESS":
        return toast.success(message, options);
      case "ERROR":
        return toast.error(message, options);
      default:
        return;
    }
  };
};

export default notification;
