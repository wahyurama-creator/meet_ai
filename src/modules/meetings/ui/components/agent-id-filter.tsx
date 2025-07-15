import { useState } from "react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGE_SIZE } from "@/constants";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const AgentIdFilter = () => {
    const [filter, setFilter] = useMeetingsFilter();
    const [agentSearch, setAgentSearch] = useState("");

    const trpc = useTRPC();
    const { data } = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: DEFAULT_PAGE_SIZE,
            search: agentSearch,
        }),
    );

    return (
        <CommandSelect
            className="h-9"
            placeholder="Agent"
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-4"
                        />
                        {agent.name}
                    </div>
                )
            }))}
            onSelect={(value) => setFilter({ agentId: value })}
            value={filter.agentId ?? ""}
            onSearch={setAgentSearch}
        />
    );
};