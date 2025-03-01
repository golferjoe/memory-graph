export interface NodeBase {
    uid: string;
    x: number;
    y: number;
}

export interface NodeLink {
    fromUid: string;
    toUid: string;
}
