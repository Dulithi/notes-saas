import DashboardNav from "@/components/DashboardNav";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function getData({email, id, firstName, lastName} : {email: string, id: string, firstName: string | undefined | null, lastName:string |undefined | null}) {
    const user = await prisma.user.findUnique(
        {
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
            }
        }
    )
    if(!user) {
        await prisma.user.create({
            data: {
                id: id,
                email: email,
                name:`${firstName ?? ""} ${lastName ?? ""}`,
            }
        });
    }
}
export default async function DashboardLayout({ children } : {children: ReactNode}) {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    if(!user) {
        redirect("/");
    }
    await getData({
        email: user.email as string,
        id: user.id,
        firstName: user.given_name as string,
        lastName: user.family_name as string,

    })
    return (
        <div className="flex flex-col space-y-6 mt-10 px-10">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav />
                </aside>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}