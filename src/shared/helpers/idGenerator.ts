export function idGenerator(
  digits: number,
  id: number,
  pre: string = '',
): string {
  const zeroNeeded = digits - id.toString().length;
  const zeros = '0'.repeat(zeroNeeded);
  return pre + zeros + id.toString();
}
