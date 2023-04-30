import { FC, useMemo } from "react";
import { Link } from "../../link/link";
import { Logo } from "../../logo/logo";
import { LoginButton } from "../login-button/login-button";
import { NavigationProps } from "../navigation.types";
import { Profile } from "../profile/profile";
import { NavLink } from "../nav-link/nav-link";

export const DesktopNavigation: FC<NavigationProps> = ({
  onLoginButtonClick,
  user,
  menuItems,
  links,
}) => {
  const navLinks = useMemo(() => {
    return links.map((l) => <NavLink key={l.href.toString()} {...l} />);
  }, [links]);

  return (
    <div className="hidden md:flex gap-12 max-w-7xl w-full my-6 mx-auto items-center px-6">
      <Link hideUnderline className="mr-auto" href={"/"}>
        <Logo variant="color" size={"medium"} />
      </Link>
      {navLinks}
      {user ? (
        <Profile variant="desktop" user={user} menuItems={menuItems} />
      ) : (
        <LoginButton onClick={onLoginButtonClick} />
      )}
    </div>
  );
};
