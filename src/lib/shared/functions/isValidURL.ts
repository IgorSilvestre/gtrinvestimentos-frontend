export function isValidURL (possibleURL: string): boolean {
    try {
        new URL(possibleURL);
        return true;
    } catch (error) {
        return false;
    }
}