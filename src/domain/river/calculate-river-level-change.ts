type CalculateLevelRiverChangeProps = {
  currentElevation: number | null,
  previousElevation: number | null,
}

export function CalculateLevelRiverChange({
  currentElevation, previousElevation }: CalculateLevelRiverChangeProps): number | null {
  if (currentElevation == null || previousElevation == null) {
    return null;
  }

  return currentElevation - previousElevation;
}
