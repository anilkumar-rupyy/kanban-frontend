import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col gap-2 items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Kanban
        </h1>
          <div className="flex gap-4 mt-4 align-center">
            <Button asChild>
              <Link href="/signin">Register</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          </div>
      </main>
    </div>
  );
}
