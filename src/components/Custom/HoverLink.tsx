import Link from "next/link";
interface HoverLinkProps {
  link: string;
  className?: string;
  children: React.ReactNode;
}
const HoverLink = ({ link, className, children }: HoverLinkProps) =>
  <Link href={`${link}`} className={` hover:text-primary-dark ${className}`}>{children}</Link>


export default HoverLink;