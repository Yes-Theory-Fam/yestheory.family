"use client";

import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DefaultDiscordAvatar } from "../../icons/default-discord-avatar";
import { MenuItemDefinition, User } from "../navigation.types";

export interface ProfileProps {
  user: User;
  variant: "desktop" | "mobile";
  menuItems: MenuItemDefinition[];
}

export const Profile: FC<ProfileProps> = ({ user, variant, menuItems }) => {
  const textColor = variant === "desktop" ? "text-brand-800" : "text-white";
  const tagColor = variant === "desktop" ? "text-gray-800" : "text-white";

  const { username, avatarUrl } = user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {isMenuOpen && (
        <div
          className="absolute inset-0 bg-transparent cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        role="button"
        onClick={() => setIsMenuOpen((open) => !open)}
        className="flex flex-col items-start gap-1 relative cursor-pointer"
      >
        <span className={twMerge(textColor, "text-xs")}>Logged in as:</span>
        <div className="flex gap-2 items-center">
          <div className="relative h-12 w-12">
            {avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={avatarUrl} alt={username} className="rounded-full" />
            ) : (
              <div className="bg-[#5865F2] rounded-full h-full w-full flex justify-center items-center">
                <DefaultDiscordAvatar className="text-white h-7 w-7" />
              </div>
            )}
            <div className="absolute h-3 w-3 bottom-0 right-0 bg-[green] border-2 border-white rounded-full" />
          </div>
          <span className={tagColor}>{username}</span>
        </div>
        {/* This span is used to align the profile picture in the middle when used in the navbar */}
        <span className={"text-xs invisible"}>Logged in as:</span>

        {isMenuOpen && (
          <div className="absolute top-full z-50 flex flex-col rounded-md border border-gray-200 shadow bg-white py-2 w-min min-w-[120px]">
            {menuItems.map((i) => (
              <button
                type="button"
                className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 text-left"
                onClick={() => {
                  i.onClick?.();
                  setIsMenuOpen(false);
                }}
                key={i.key}
              >
                {i.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
