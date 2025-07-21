import { clsx, type ClassValue } from "clsx"
import humanizeDuration from "humanize-duration";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    language: "shortEn",
    units: ["h", "m", "s"],
    round: true,
  });
}