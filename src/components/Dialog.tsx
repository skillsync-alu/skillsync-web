import React from "react";
import confirmation from "../assets/confirmation.svg";

interface DialogProps {
  message: string;
  onConfirm: () => void;
  onReject: () => void;
  confirmText?: string;
  rejectText?: string;
  open: boolean;
  feedbackRequired?: boolean;
  feedbackValue?: string;
  onFeedbackChange?: (value: string) => void;
}

const Dialog: React.FC<DialogProps> = ({
  message,
  onConfirm,
  onReject,
  confirmText = "Confirm",
  rejectText = "Cancel",
  open,
  feedbackRequired = false,
  feedbackValue = "",
  onFeedbackChange,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-cardBg dark:bg-cardBg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center relative">
        {/* Illustration slot */}
        <div className="mb-6 w-32 h-32 flex items-center justify-center">
          <img src={confirmation} alt="Confirmation" />
        </div>

        <div className="mb-6 text-lg font-medium text-text dark:text-text text-center">
          {message}
        </div>
        {feedbackRequired && (
          <textarea
            className="mb-6 w-full min-h-[80px] rounded-lg border border-lines bg-cardBgWeak text-text p-3 resize-none focus:outline-none focus:ring-2 focus:ring-main"
            placeholder="Please provide your feedback..."
            value={feedbackValue}
            onChange={e => onFeedbackChange?.(e.target.value)}
            required
            autoFocus
          />
        )}
        <div className="flex justify-center gap-4 w-full">
          <button
            className="px-5 py-2 rounded-lg bg-cardBgWeak dark:bg-cardBgWeak text-text dark:text-text hover:bg-lines dark:hover:bg-lines transition-colors focus:outline-none border border-lines dark:border-lines"
            onClick={onReject}
          >
            {rejectText}
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-main text-white hover:bg-mainWeak transition-colors focus:outline-none shadow-sm"
            onClick={onConfirm}
            disabled={feedbackRequired && !feedbackValue.trim()}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
