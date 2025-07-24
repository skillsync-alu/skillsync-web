import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { type FC, useMemo } from "react";
import { type User } from "../interfaces/user";
import { Avatar, type AvatarProps } from "@chakra-ui/react";
import classNames from "classnames";

// Extended props interface for UserAvatar component
// Inherits all Chakra UI Avatar props plus custom additions
export interface UserAvatarProps extends AvatarProps {
  user?: User; // Optional user object, falls back to global state if not provided
  className?: string; // Additional CSS classes for styling
}

/**
 * Reusable user avatar component that displays profile pictures with fallbacks
 * This component:
 * - Shows user's profile picture if available
 * - Falls back to initials-based avatar if no picture
 * - Uses global user state if no user prop provided
 * - Handles secure HTTPS avatar URLs
 * - Applies consistent styling across the app
 */
const UserAvatar: FC<UserAvatarProps> = ({
  user: newUser,
  className,
  ...props
}) => {
  // Get current user from global state as fallback
  const [storedUser] = useRecoilState(userState);

  // Determine which user data to use - prop takes priority over global state
  const user = useMemo(() => {
    return newUser || storedUser;
  }, [newUser, storedUser]);

  // Memoized avatar component to prevent unnecessary re-renders
  // Only creates new component when user data changes
  const OutputAvatar = useMemo(() => {
    // Don't render avatar if no user data available
    if (!user.id) {
      return () => null;
    }

    return (props: UserAvatarProps) => (
      <Avatar
        {...props}
        size={props.size || "sm"} // Default to small size if not specified
        // Only use avatar URL if it's a secure HTTPS link
        src={user.avatar?.includes("https") ? user.avatar : ""}
        name={user.firstName} // Used for initials fallback
        className={classNames(
          "object-cover !text-secondary !bg-primary", // Consistent styling
          props.className
        )}
      />
    );
  }, [user]);

  return <OutputAvatar {...props} className={className} />;
};

export default UserAvatar;
