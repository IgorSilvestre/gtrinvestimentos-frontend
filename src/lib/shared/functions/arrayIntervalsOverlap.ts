export function intervalsOverlap(interval1: [number, number], interval2: [number, number]): boolean {
    const [start1, end1] = interval1;
    const [start2, end2] = interval2;
    return !(end1 < start2 || end2 < start1);
}