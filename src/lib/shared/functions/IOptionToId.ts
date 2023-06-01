import type { IOption } from "$lib/interfaces-validation/IOption";

export function IOptionToId(options: IOption[]) {
    return options.map((option) => option.value)
}