import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Toast() {
  useEffect(() => {
    toast.dismiss();
    toast("Please log in first...");
  }, []);

  return <Toaster />;
}

export default Toast;
