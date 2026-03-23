import { useState } from "react";

export function useSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return { isSidebarOpen, setIsSidebarOpen };
}