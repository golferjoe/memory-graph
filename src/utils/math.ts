export function clampNumber(value: number, min: number, max: number): number {
    if (value > max) {
        value = max;
    } else if (value < min) {
        value = min;
    }

    return value;
}
