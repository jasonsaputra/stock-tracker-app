import React from "react";
import Link from "next/link";

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
  return (
    <div className="pt-4 flex items-center justify-center gap-1">
      <p className="text-sm text-gray-500">
        {text} {` `}
      </p>
      <Link href={href} className="footer-link">
        {linkText}
      </Link>
    </div>
  );
};

export default FooterLink;
