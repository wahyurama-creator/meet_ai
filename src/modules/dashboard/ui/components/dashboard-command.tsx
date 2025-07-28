import { GeneratedAvatar } from "@/components/generated-avatar";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface DashboardCommandProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
};

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const trpc = useTRPC();
    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            search,
            pageSize: DEFAULT_PAGE_SIZE,
        })
    );
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            search,
            pageSize: DEFAULT_PAGE_SIZE,
        })
    );

    return (
        <CommandResponsiveDialog
            shouldFilter={false}
            open={open}
            onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent..."
                value={search}
                onValueChange={(value) => setSearch(value)}
            />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty>
                        <span className="text-muted-foreground">
                            No meetings found
                        </span>
                    </CommandEmpty>
                    {
                        meetings.data?.items.map((item) => {
                            return (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => {
                                        router.push(`/meetings/${item.id}`)
                                        setOpen(false)
                                    }}
                                >
                                    {item.name}
                                </CommandItem>
                            );
                        })
                    }
                </CommandGroup>
                <CommandGroup heading="Agents">
                    <CommandEmpty>
                        <span className="text-muted-foreground">
                            No agents found
                        </span>
                    </CommandEmpty>
                    {
                        agents.data?.items.map((item) => {
                            return (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => {
                                        router.push(`/agents/${item.id}`)
                                        setOpen(false)
                                    }}
                                >
                                    <GeneratedAvatar
                                        seed={item.name}
                                        variant="botttsNeutral"
                                        className="size-5"
                                    />
                                    {item.name}
                                </CommandItem>
                            );
                        })
                    }
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    );
};