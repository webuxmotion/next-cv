import Link from "next/link";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

export default AppLink;
