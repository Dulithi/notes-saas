import { SubmitButton } from "@/components/submitButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true,
        },
    });
    return data;
}
export default async function SettingsPage() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user.id);

    async function postData(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        
        await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                name: name ?? undefined,
            }
        });

        revalidatePath("/dashboard/settings")

        
    }

    return (
        <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="text-3xl md:text-4xl">Settings</h1>
                    <p className="text-lg text-muted-foreground">Your Profile settings</p>
                </div>
            </div>
            <Card>
            <form action={postData}>
                <CardHeader>
                    <CardTitle>General Data</CardTitle>
                    <CardDescription>Add your general information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" type="text" placeholder="Enter Your Name" defaultValue={data?.name ?? undefined} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" placeholder="Your Email Address" defaultValue={data?.email as string} disabled/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <SubmitButton />
                </CardFooter>
                </form>
            </Card>
        </div>
    );
}