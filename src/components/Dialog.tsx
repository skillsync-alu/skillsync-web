import React from "react";
import confirmation from "../assets/confirmation.svg";

// Props interface for the Dialog component
interface DialogProps {
  message: React.ReactNode; // Main message content (can be text or JSX)
  onConfirm: () => void; // Callback when user confirms action
  onReject: () => void; // Callback when user cancels/rejects action
  confirmText?: string; // Text for confirm button (default: "Confirm")
  rejectText?: string; // Text for cancel button (default: "Cancel")
  open: boolean; // Controls dialog visibility
  feedbackRequired?: boolean; // Whether feedback textarea should be shown
  feedbackValue?: string; // Current feedback text value
  onFeedbackChange?: (value: string) => void; // Callback for feedback text changes
}

/**
 * Reusable modal dialog component for confirmations and user input
 * This component provides a consistent interface for:
 * - Confirmation dialogs (delete actions, etc.)
 * - Feedback collection with required text input
 * - Custom messaging with flexible content
 * - Accessible modal behavior with backdrop
 * 
 * Features:
 * - Backdrop click handling
 * - Customizable button text
 * - Optional feedback textarea with validation
 * - Consistent styling with app theme
 * - Auto-focus on feedback input when required
 */
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
  // Don't render dialog if not open
  if (!open) return null;

  return (
    // Modal backdrop with overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      {/* Dialog container with rounded corners and shadow */}
      <div className="bg-cardBg dark:bg-cardBg rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center relative">
        {/* Confirmation illustration */}
        <div className="mb-6 w-32 h-32 flex items-center justify-center">
          <img src={confirmation} alt="Confirmation" />
        </div>

        {/* Main message content */}
        <div className="mb-6 text-lg font-medium text-text dark:text-text text-center">
          {message}
        </div>
        
        {/* Optional feedback textarea - shown when feedback is required */}
        {feedbackRequired && (
          <textarea
            className="mb-6 w-full min-h-[80px] rounded-lg border border-lines bg-cardBgWeak text-text p-3 resize-none focus:outline-none focus:ring-2 focus:ring-main"
            placeholder="Please provide your feedback..."
            value={feedbackValue}
            onChange={e => onFeedbackChange?.(e.target.value)}
            required
            autoFocus // Auto-focus for better UX
          />
        )}
        
        {/* Action buttons container */}
        <div className="flex justify-center gap-4 w-full">
          {/* Cancel/Reject button with secondary styling */}
          <button
            className="px-5 py-2 rounded-lg bg-cardBgWeak dark:bg-cardBgWeak text-text dark:text-text hover:bg-lines dark:hover:bg-lines transition-colors focus:outline-none border border-lines dark:border-lines"
            onClick={onReject}
          >
            {rejectText}
          </button>
          
          {/* Confirm button with primary styling */}
          <button
            className="px-5 py-2 rounded-lg bg-main text-white hover:bg-mainWeak transition-colors focus:outline-none shadow-sm"
            onClick={onConfirm}
            // Disable confirm button if feedback is required but not provided
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
