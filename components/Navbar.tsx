"use client"

import Link from "next/link";
import { ThemeToggle } from "./Themetoggle";
import { Button } from "./ui/button";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

export function Navbar() {
    const {isAuthenticated, getUser} = useKindeBrowserClient();
    const user = getUser();
    console.log(user?.email);
    return (
        <nav className="border-b bg-backgrond flex items-center h-16 px-10">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="font-bold text-3xl">
                        Notes<span className="text-primary">Saas</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-x-5">
                    <ThemeToggle />
                    {isAuthenticated ? (<LogoutLink><Button>Log Out</Button></LogoutLink>) : 
                    (<div className="flex items-center gap-x-2">
                        <LoginLink><Button>Sign In</Button></LoginLink>
                        <RegisterLink><Button variant={"secondary"}>Sign Up</Button></RegisterLink>
                    </div>)}
                </div>

            </div>

        </nav>
    );
}