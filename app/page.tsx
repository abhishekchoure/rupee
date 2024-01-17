import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="text-3xl font-bold mb-8">Rupaye</div>
      <div className="w-screen flex flex-col justify-center items-center gap-2 ">
        <Link
          className="w-3/4 p-3 bg-primary text-white flex justify-center rounded"
          href={"/login"}
        >
          Login
        </Link>
        <Link
          className="w-3/4 p-3 bg-secondary-foreground text-white flex justify-center rounded "
          href={"/signup"}
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
