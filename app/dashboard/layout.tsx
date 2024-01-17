import AddButton from "@/components/AddButton";
import { HomeIcon, PanelsTopLeftIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-full">
      {children}
      <div className="sticky bottom-0 w-full bg-primary-foreground h-16">
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
    </div>
  );
}
