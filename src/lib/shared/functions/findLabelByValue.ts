import type { IOption } from "$lib/interfaces-validation/IOption";

export function findLabelByValue(arr: IOption[], value: string): string | undefined {
    const item = arr.find((obj: IOption) => obj.value === value);
    return item ? item.label : undefined;
}

