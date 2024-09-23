export function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, ""); // Remove non-numeric chars
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);

  if (!match) return value;

  const [, areaCode, firstPart, secondPart] = match;
  let formatted = "";

  if (areaCode) formatted += `(${areaCode}`;
  if (firstPart) formatted += `) ${firstPart}`;
  if (secondPart) formatted += `-${secondPart}`;

  return formatted;
}
