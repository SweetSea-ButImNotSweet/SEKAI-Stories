import React, { useContext, useRef } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

const SidebarResizeBar: React.FC = () => {
    const resizeStart = useRef<{ pointerX: number; width: number } | null>(
        null,
    );

    const settings = useContext(SettingsContext);

    if (!settings) return;

    const { sidebarWidth, setSidebarWidth } = settings;

    const maxSidebarWidth = Math.min(625, window.innerWidth * 0.45);
    const resizeSidebar = (width: number) => {
        const nextWidth = Math.max(300, Math.min(maxSidebarWidth, width));
        setSidebarWidth(nextWidth);
        localStorage.setItem("sidebarWidth", String(nextWidth));
    };

    const handleResizePointerDown = (
        event: React.PointerEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();
        resizeStart.current = {
            pointerX: event.clientX,
            width: sidebarWidth,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handleResizePointerMove = (
        event: React.PointerEvent<HTMLDivElement>,
    ) => {
        if (!resizeStart.current) return;
        resizeSidebar(
            resizeStart.current.width -
                (event.clientX - resizeStart.current.pointerX),
        );
    };

    const handleResizePointerUp = () => {
        resizeStart.current = null;
    };

    return (
        <div
            className="sidebar-resize-handle"
            onPointerDown={handleResizePointerDown}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            onLostPointerCapture={handleResizePointerUp}
        />
    );
};

export default SidebarResizeBar;
