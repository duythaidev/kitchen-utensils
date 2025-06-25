import Link from "next/link";

const HoverLink = ({ link, type, text }: { text: string, link: string, type: 'bold' | 'normal' | 'medium' }) =>
  <Link href={`${link}`} className={`font-${type} hover:text-primary`}>{text}</Link>


export default HoverLink;