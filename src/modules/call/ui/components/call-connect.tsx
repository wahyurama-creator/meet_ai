"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Call, CallingState, StreamCall, StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2Icon } from "lucide-react";
import { CallUi } from "./call-ui";

interface Props {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage: string;
};

export const CallConnect = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage,
}: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateToken } = useMutation(
        trpc.meetings.generateToken.mutationOptions(),
    );

    const [error, setError] = useState<string>();

    const [client, setClient] = useState<StreamVideoClient>();
    useEffect(() => {
        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage,
            },
            tokenProvider: generateToken,
            options: {
                maxConnectUserRetries: 2,
                timeoutErrorMessage: "Connection timeout",
                timeout: 6000,
                onConnectUserError: (err) => {
                    setError(err.message);
                }
            }
        });

        setClient(_client);

        return () => {
            _client.disconnectUser();
            setClient(undefined);
        }
    }, [generateToken, userId, userName, userImage,]);

    const [call, setCall] = useState<Call>();
    useEffect(() => {
        if (!client) return;

        const _call = client.call("default", meetingId);
        _call.camera.disable();
        _call.microphone.disable();
        setCall(_call);

        return () => {
            if (_call.state.callingState === CallingState.LEFT) {
                _call.endCall();
                setCall(undefined);
            }
        }
    }, [client, meetingId]);

    if (!client) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center gap-y-2">
                <Loader2Icon className="size-6 animate-spin text-white" />
                <p className="font-medium text-muted-foreground">
                    Waiting for connection to be established...
                </p>
            </div>
        )
    }

    if (!call && !error) {
        return <p className="text-sm text-muted-foreground">Waiting for call to be created...</p>;
    }

    return (
        <StreamVideo client={client} >
            <StreamCall call={call}>
                <CallUi meetingName={meetingName} />
            </StreamCall>
        </StreamVideo>
    )
}