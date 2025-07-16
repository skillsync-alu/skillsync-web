import { useRecoilState } from "recoil";
import { userState } from "../resources/user";
import { type FC, useMemo } from "react";
import { type User } from "../interfaces/user";
import { Avatar, type AvatarProps } from "@chakra-ui/react";
import classNames from "classnames";

export interface UserAvatarProps extends AvatarProps {
  user?: User;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({
  user: newUser,
  className,
  ...props
}) => {
  const [storedUser] = useRecoilState(userState);

  const user = useMemo(() => {
    return newUser || storedUser;
  }, [newUser, storedUser]);

  const OutputAvatar = useMemo(() => {
    if (!user.id) {
      return () => null;
    }

    return (props: UserAvatarProps) => (
      <Avatar
        {...props}
        size={props.size || "sm"}
        src={user.avatar?.includes("https") ? user.avatar : ""}
        name={user.firstName}
        className={classNames(
          "object-cover !text-secondary !bg-primary",
          props.className
        )}
      />
    );
  }, [user]);

  return <OutputAvatar {...props} className={className} />;
};

export default UserAvatar;
