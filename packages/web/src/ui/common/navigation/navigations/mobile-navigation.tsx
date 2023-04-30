"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  FC,
  JSXElementConstructor,
  SVGProps,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

import { Link } from "../../link/link";
import { Logo, LogoProps } from "../../logo/logo";
import { LoginButton } from "../login-button/login-button";
import { NavLink } from "../nav-link/nav-link";
import { NavigationProps } from "../navigation.types";
import { Profile } from "../profile/profile";

interface MobileHeadlineProps {
  logoVariant: LogoProps["variant"];
  icon: JSXElementConstructor<
    SVGProps<SVGSVGElement> & { title?: string; titleId?: string }
  >;
  onClick: () => void;
}

const MobileHeadline: FC<MobileHeadlineProps> = ({
  logoVariant,
  icon: Icon,
  onClick,
}) => {
  return (
    <div className="flex p-4 justify-between items-center md:hidden">
      <Link hideUnderline href={"/"}>
        <Logo variant={logoVariant} size={"small"} />
      </Link>

      <button className="p-2" onClick={onClick}>
        <Icon className="h-6 w-6" />
      </button>
    </div>
  );
};

export const MobileNavigation: FC<NavigationProps> = ({
  onLoginButtonClick,
  user,
  menuItems,
  links,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSegmentsString = useSelectedLayoutSegments().join("-");

  // Close the menu when selectedSegments (= the current route) changes
  useEffect(() => setIsOpen(false), [selectedSegmentsString]);

  const navLinks = useMemo(() => {
    return links.map((l) => (
      <NavLink key={l.href.toString()} {...l} inverted />
    ));
  }, [links]);

  return (
    <>
      <MobileHeadline
        logoVariant={"color"}
        icon={Bars3Icon}
        onClick={() => setIsOpen(true)}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={"mobile-menu"}
            initial={{
              transform: "translateX(100%)",
              transitionProperty: "transform",
            }}
            animate={{ transform: "translateX(0%)" }}
            exit={{
              transform: "translateX(100%)",
              transitionProperty: "transform",
            }}
            className="fixed z-[50] inset-0 bg-brand-800"
          >
            <div className="flex flex-col text-white">
              <MobileHeadline
                logoVariant={"white"}
                icon={XMarkIcon}
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              {navLinks}

              {user ? (
                <Profile variant="mobile" user={user} menuItems={menuItems} />
              ) : (
                <LoginButton onClick={onLoginButtonClick} inverted />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};