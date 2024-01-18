import { HomeIcon, PanelsTopLeftIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky bottom-0 w-full  h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="flex flex-1 h-full justify-evenly items-center">
        <li>
          <Link href="/dashboard">
            <HomeIcon size={28} />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/workspace">
            <PanelsTopLeftIcon size={28} />
          </Link>
        </li>
        <li>
          <Link href="/dashboard/add">
            <PlusCircleIcon size={28} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
