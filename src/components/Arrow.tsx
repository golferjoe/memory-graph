import { ArrowBase } from "../types";

export function Arrow({ from, to }: ArrowBase) {
    const dX = to.x - from.x;
    const dY = to.y - from.y;
    const length = Math.sqrt(dX * dX + dY * dY);
    const angle = Math.atan2(dY, dX) * (180 / Math.PI);

    return (
        <>
            <div
                className="arrow"
                style={{
                    left: from.x + 140,
                    top: from.y + 6,
                    width: length,
                    transform: `rotate(${angle}deg)`,
                }}
            />
            <div
                className="arrow-head"
                style={{
                    left: to.x + 134,
                    top: to.y,
                    transform: `rotate(${angle - 90}deg)`,
                }}
            />
        </>
    );
}
