"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    async function authCheck() {
      const response = await fetch("http://localhost:3000/api/auth/check");
      const { message, authorize } = await response.json();
      if (authorize === false) {
        toast("Please login again", {
          description: "Alert",
          action: {
            label: "OK",
            onClick: () => {},
          },
        });

        router.replace("/login");
      }
    }

    authCheck();
  }, []);

  const params = useSearchParams();
  const id = params.get("id");
  const username = params.get("username");
  const { setTheme } = useTheme();

  const invoices = [
    {
      invoice: "INV001",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex justify-between gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/logout"}>Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex flex-col mx-2 h-40vh ">
        <Card>
          <CardHeader className="p-4 space-y-0">
            <CardTitle className="text-lg">Income</CardTitle>
            <CardDescription>Remaining amount for this month</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-semibold leading-none tracking-tight">
              $ 10,000
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 space-y-0">
            <CardTitle className="text-lg">Expense</CardTitle>
            <CardDescription>Remaining amount for this month</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-semibold leading-none tracking-tight">
              $ 5,000
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 space-y-0">
            <CardTitle className="text-lg">Savings</CardTitle>
            <CardDescription>Remaining amount for this month</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-3xl font-semibold leading-none tracking-tight">
              $ 5,000
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-semibold">Recent Transactions</h1>
          <Button variant="ghost" className="px-0">
            See all
          </Button>
        </div>
      </div>
      <div className="w-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Invoice</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
