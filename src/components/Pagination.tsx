import { useMemo } from "react";
import { config } from "../config";

// Props interface for the Pagination component
interface PaginationProps {
  totalItems: number; // Total number of items across all pages
  itemsPerPage: number; // Number of items to show per page
  currentPage: number; // Currently active page (1-indexed)
  onPageChange: (page: number) => void; // Callback when user selects a page
  siblingCount?: number; // Number of sibling pages to show around current page
  brandColor?: string; // Custom color for active page styling
  className?: string; // Additional CSS classes
}

// Utility function to generate a range of numbers
// Used to create arrays of page numbers for pagination display
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Pagination component for navigating through large datasets
 * This component provides a user-friendly way to navigate through paginated content
 * with smart page number truncation using dots when there are many pages
 * 
 * Features:
 * - Smart truncation with dots for large page counts
 * - Configurable sibling page count
 * - Previous/Next navigation buttons
 * - Responsive design considerations
 * - Customizable styling with brand colors
 * - Accessibility-friendly button interactions
 */
const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  siblingCount = 1,
  brandColor = config.colors.primary,
  className = "",
}: PaginationProps) => {
  // Calculate total pages needed - memoized to prevent recalculation on re-renders
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Uncomment to hide pagination when only 1 page exists
  // if (totalPages <= 1) return null;

  // Generate the array of page numbers and dots - memoized for performance
  // This creates the pagination display logic with smart truncation
  const pages = useMemo(() => {
    // If we have 7 or fewer pages, show all pages without truncation
    if (totalPages <= 7) {
      return range(1, totalPages);
    }

    // Calculate the range of sibling pages around the current page
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Determine if we need to show dots on the left or right
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // No dots on left side
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, "...", totalPages];
    }

    // No dots on right side
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, "...", ...rightRange];
    }

    // Dots on both sides
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, "...", ...middleRange, "...", totalPages];
    }

    return [];
  }, [currentPage, totalPages, siblingCount]);

  // Custom brand color style
  const brandColorStyle = useMemo(
    () =>
      ({
        "--brand-color": brandColor,
      }) as React.CSSProperties,
    [brandColor]
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div
      className={`flex items-center justify-center space-x-2 font-sans ${className}`}
      style={brandColorStyle}
    >
      {/* First page button */}
      <button
        type="button"
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        className={
          "w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-500 text-gray-400 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:text-gray-500"
        }
        aria-label="Go to first page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Previous button */}
      <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-500 text-gray-400 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:text-gray-500"
        aria-label="Previous page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              …
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            type="button"
            onClick={() => goToPage(pageNumber)}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors
              ${
                isActive
                  ? "bg-red-100 border border-red-300 text-red-600 font-medium"
                  : "border border-primary/30 text-gray-400 hover:bg-primary/20"
              }`}
            style={
              isActive
                ? {
                    backgroundColor: `${brandColor}20`,
                    borderColor: brandColor,
                    color: brandColor,
                  }
                : {}
            }
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next button */}
      <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-500 text-gray-400 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:text-gray-500"
        aria-label="Next page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Last page button */}
      <button
        type="button"
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-md border cursor-pointer border-gray-500 text-gray-400 hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:text-gray-500"
        aria-label="Go to last page"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 5l7 7-7 7M5 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
