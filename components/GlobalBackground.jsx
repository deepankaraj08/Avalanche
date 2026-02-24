"use client";

import { SpaceStars } from "@/components/ui/meteors";

export default function GlobalBackground() {
    return (
        <>
            {/* Full-screen animated background */}
            <SpaceStars
                starCount={100}
                className="fixed inset-0 -z-10"
            />
        </>
    );
}
