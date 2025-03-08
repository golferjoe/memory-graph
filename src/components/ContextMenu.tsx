import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { nanoid } from "nanoid";
import { AppContext } from "../context/appContext";
import { NodeBase } from "../types";

export function ContextMenu() {
    const context = useContext(AppContext);
    const menuRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // clamp context menu position after opening
    useEffect(() => {
        if (!menuRef.current) {
            return;
        }

        const { width, height } = menuRef.current.getBoundingClientRect();

        let x = context.contextMenu.value.x;
        if (x + width > window.innerWidth) {
            x = window.innerWidth - width;
        }

        let y = context.contextMenu.value.y;
        if (y + height > window.innerHeight) {
            y = window.innerHeight - height - 1;
        }

        setPosition({ x, y });
    }, [context.contextMenu.value]);

    const addNode = () => {
        const newNode: NodeBase = {
            uid: nanoid(8),
            x: context.contextMenu.value.x,
            y: context.contextMenu.value.y,
            width: 0,
            height: 0,
        };

        context.nodes.value = [...context.nodes.value, newNode];
        context.contextMenu.value = null;
    };

    return (
        context.contextMenu.value && (
            <div
                ref={menuRef}
                className="context-menu"
                style={{
                    left: position.x,
                    top: position.y,
                }}
                onClick={(e) => e.stopPropagation()} // Prevent the click event from bubbling up to the main div
            >
                <input
                    onClick={addNode}
                    className="context-menu_button"
                    type="button"
                    value="Add Node"
                />
            </div>
        )
    );
}
