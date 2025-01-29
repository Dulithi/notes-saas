"use client"

import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <nav className="border-b bg-backgrond flex items-center h-[10vh] px-10">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="font-bold text-3xl">NotesSaas</h1>
                </Link>
                <div className="flex items-center gap-x-5">
                    <ThemeToggle />
                    <div className="flex items-center gap-x-2">
                        <Button>Sign In</Button> 
                        <Button variant={"outline"}>Sign Up</Button>
                    </div>
                </div>

            </div>

        </nav>
    );
}