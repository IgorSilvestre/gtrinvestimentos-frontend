export function areObjectsIdentical(obj1: object, obj2: object): boolean {
	const string1 = JSON.stringify(obj1);
	const string2 = JSON.stringify(obj2);
	return string1 === string2;
}
