import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { nanoid } from "nanoid";
import { AppContext } from "../context/appContext";
import { NodeBase } from "../types";

export function ContextMenu() {
    const context = useContext(AppContext);
    const menuRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    // clamp context menu position after opening
    useEffect(() => {
        if (!menuRef.current) {
            return;
        }

        const { width, height } = menuRef.current.getBoundingClientRect();

        let x = context.contextMenu.x;
        if (x + width > window.innerWidth) {
            x = window.innerWidth - width;
        }

        let y = context.contextMenu.y;
        if (y + height > window.innerHeight) {
            y = window.innerHeight - height - 1;
        }

        setPos({ x, y });
    }, [context.contextMenu]);

    const addNode = () => {
        const newNode: NodeBase = {
            uid: nanoid(8),
            x: context.contextMenu.x,
            y: context.contextMenu.y,
            width: 0,
            height: 0,
        };

        context.setNodes([...context.nodes, newNode]);
        context.setContextMenu(null);
    };

    return (
        context.contextMenu && (
            <div
                ref={menuRef}
                className="context-menu"
                style={{
                    left: pos.x,
                    top: pos.y,
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
