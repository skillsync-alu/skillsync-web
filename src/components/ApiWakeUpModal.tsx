import React from "react";
import Spinner from "./Spinner";

interface ApiWakeUpModalProps {
  open: boolean;
  message?: string;
}

const ApiWakeUpModal: React.FC<ApiWakeUpModalProps> = ({
  open,
  message = "Setting up Skillsync for you",
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-cardBg dark:bg-cardBg rounded-2xl shadow-2xl p-8 w-full max-w-xs flex flex-col items-center">
        <div className="text-5xl mb-6">🚀</div>
        <div className="mb-4 text-lg font-semibold text-text dark:text-text text-center">
          {message}
        </div>
        <Spinner addElipsis={false} />
      </div>
    </div>
  );
};

export default ApiWakeUpModal;
