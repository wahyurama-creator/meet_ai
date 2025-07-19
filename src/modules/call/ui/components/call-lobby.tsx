"use client";

import '@stream-io/video-react-sdk/dist/css/styles.css';

import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from '@stream-io/video-react-sdk';
import { generateAvatarUri } from '@/lib/avatar';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogInIcon } from 'lucide-react';

interface Props {
    onJoin: () => void;
};

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user?.name || "Guest",
                    image: data?.user?.image || generateAvatarUri({
                        seed: data?.user?.name || "guest",
                        variant: 'initials',
                    }),
                } as StreamVideoParticipant
            }
        />
    );
};

const AllowBrowserPermissions = () => {
    return (
        <p className='text-sm text-muted-foreground'>
            Please grant browser permissions to use your camera and microphone.
        </p>
    );
};

export const CallLobby = ({ onJoin }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasMicrophonePermission } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();

    const hasBrowserMediaPermissions = hasCameraPermission && hasMicrophonePermission;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent
        to-sidebar">
            <div className='py-4 px-8 flex flex-1 items-center justify-center'>
                <div className='flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg
                p-10 shadow-sm'>
                    <div className="flex flex-col gap-y-1 text-center">
                        <h6 className='text-lg font-medium'>Ready to Join?</h6>
                        <p className='text-sm text-muted-foreground'>Set up your call before joining</p>
                    </div>
                    <VideoPreview
                        DisabledVideoPreview={
                            hasBrowserMediaPermissions ? DisabledVideoPreview : AllowBrowserPermissions
                        }
                    />
                    <div className="flex gap-x-2 w-full justify-center">
                        <ToggleAudioPreviewButton />
                        <ToggleVideoPreviewButton />
                        <div className="flex-1" />
                        <Button asChild variant={"ghost"}>
                            <Link href="/meetings" >
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            onClick={onJoin}
                            disabled={!hasBrowserMediaPermissions}
                        >
                            <LogInIcon />
                            Join
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};