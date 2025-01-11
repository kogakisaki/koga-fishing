/**
 * Exports the main game class and other relevant classes.
 */
export { KogaFishing } from './game';
export { Inventory } from './classes/inventory';
export { Fish, fishMap } from './classes/fish';
export { FishingRod, fishingRodMap } from './classes/fishingRod';
export { Bait, baitMap } from './classes/bait';
export { FishNotFoundError, FishingRodNotFoundError, BaitNotFoundError, BaitInsufficientError } from './classes/errors';
export { Environment, environmentMap } from './types/environment';