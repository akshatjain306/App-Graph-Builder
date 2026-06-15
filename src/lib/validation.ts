export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return Math.min(Math.max(value, min), max);
}

export function normalizePercentage(
  value: number,
): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  return clamp(value, 0, 100);
}