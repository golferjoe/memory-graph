export interface NodeBase {
    uid: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface NodeLink {
    fromUid: string;
    toUid: string;
}
