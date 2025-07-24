import { CgSpinner } from "react-icons/cg";

/**
 * Reusable loading spinner component with optional message
 * This component provides visual feedback during async operations like:
 * - API calls
 * - Form submissions
 * - Page loading states
 * - Button loading states
 */
interface SpinnerProps {
  message?: string; // Optional loading message to display
  addElipsis?: boolean; // Whether to add "..." after the message
}

const Spinner = ({ message = "", addElipsis = true }: SpinnerProps) => {
  return (
    <p className="flex items-center gap-x-2 justify-center">
      {message}
      {addElipsis ? "..." : ""} 
      {/* Rotating spinner icon using CSS animation */}
      <CgSpinner className="animate-spin" size={25} />
    </p>
  );
};

export default Spinner;
