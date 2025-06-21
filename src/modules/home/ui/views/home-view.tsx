"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = () => {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    return (
        <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
            <h1 className="text-2xl font-bold">{session?.user.name}</h1>

            <Button
                onClick={() => authClient.signOut({
                    fetchOptions: {
                        onSuccess: () => {
                            router.push("/sign-in");
                        }
                    }
                })}>
                Sign Out
            </Button>
        </div>
    );
}