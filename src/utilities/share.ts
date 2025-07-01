import { handleErrorMessage } from "./error-handling";
import toast from "react-hot-toast";

export const copyText = async (text = "") => {
  if (!text) {
    return false;
  }

  if (window.navigator) {
    await window.navigator.clipboard.writeText(text);

    return true;
  }

  const textArea = document.createElement("textarea");

  textArea.value = text;

  (textArea as any).style = {
    top: "0",
    left: "0",
    position: "fixed"
  };

  window.document.body.appendChild(textArea);

  textArea.focus();

  textArea.select();

  const success = window.document.execCommand("copy");

  if (!success) {
    handleErrorMessage("Couldn't copy to Clipboard.");
  }

  return success;
};

export const share = async (payload: ShareData) => {
  try {
    if (
      !Boolean(window?.navigator?.canShare) ||
      !window?.navigator?.canShare?.(payload)
    ) {
      if (await copyText(payload.url)) {
        toast.success(
          "Your device can't share so we copied the link for you! :)"
        );
      }

      return;
    }

    return await window?.navigator.share(payload);
  } catch (error: any) {
    // if ((error?.message || "")?.toLowerCase()?.includes("share canceled")) {
    //   return;
    // }
    // if ((error?.message || "")?.toLowerCase()?.includes("share navigator")) {
    //   return;
    // }
    // handleErrorMessage(error);
    // pass
  }
};
