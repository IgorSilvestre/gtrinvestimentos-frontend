import type { IOption } from "$lib/interfaces-validation/IOption";

export function parseArrayOfOptionsToIds(option: IOption[] | undefined) {
    if (!option) return undefined;
    return option.map((opt) => opt.value);
}