"use client";

import { useState, useEffect } from "react";
import { SpaceStars } from "@/components/ui/meteors";

export default function GlobalBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Skip the fixed star layer on mobile — each section already has its own stars
    // and a fixed composited layer behind everything is very expensive on phones
    if (isMobile) return null;

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
