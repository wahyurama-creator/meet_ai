import "server-only";

import { StreamClient } from '@stream-io/node-sdk';

export const streamVideoClient = new StreamClient(
    process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!,
    process.env.NEXT_PUBLIC_STREAM_VIDEO_SECRET_KEY!,
);