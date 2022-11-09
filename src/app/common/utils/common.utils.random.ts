export function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomBoolean(randomFactor: number = 0.5): boolean {
  return Math.random() < randomFactor;
}
