import { createContext } from "preact";
import { ContextMenuBase, CursorOffset, NodeBase, NodeLink } from "../types";
import { Signal, signal } from "@preact/signals";

type NodeUidType = string | null;

interface AppContextValues {
    contextMenu: Signal<ContextMenuBase>;
    nodes: Signal<NodeBase[]>;
    selectedNode: Signal<NodeUidType>;
    links: Signal<NodeLink[]>;
    linkStart: Signal<string>;
    cursorOffset: Signal<CursorOffset>;
}

const AppContext = createContext<AppContextValues>(null);

function createAppContext(): AppContextValues {
    const contextMenu = signal<ContextMenuBase>(null);
    const nodes = signal<NodeBase[]>([]);
    const selectedNode = signal<string>(null);
    const links = signal<NodeLink[]>([]);
    const linkStart = signal<string>(null);
    const cursorOffset = signal<CursorOffset>({ x: 0, y: 0 });

    return {
        contextMenu,
        nodes,
        selectedNode,
        links,
        linkStart,
        cursorOffset,
    };
}

export { AppContext, createAppContext };
