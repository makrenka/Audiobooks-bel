"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

import style from "./Navigation.module.css";

type NavLink = {
  label: string;
  href: string;
  imgSrcActive: string;
  imgSrcUnactive: string;
};

type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={classNames(style.link, isActive && style.active)}
          >
            {isActive ? (
              <img src={link.imgSrcActive} alt="link icon" />
            ) : (
              <img src={link.imgSrcUnactive} alt="link icon" />
            )}
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export { Navigation };
