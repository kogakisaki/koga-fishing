import { Fish } from './fish';
import { FishingRod } from './fishingRod';
import { Bait } from './bait';

/**
 * Represents the player's inventory.
 */
export class Inventory {
    fishes: { item: Fish, durability: null }[] = [];
    fishingRods: { item: FishingRod, durability: number }[] = [];
    baits: { item: Bait, durability: null }[] = [];
    level: number;
    maxCapacity: number;

    /**
     * @param {number} level - The initial level of the inventory.
     */
    constructor(level: number = 1) {
        this.level = level;
        this.maxCapacity = this.calculateMaxCapacity(level);
    }

    /**
     * Calculates the maximum capacity of the inventory based on the level.
     * @param {number} level - The current level of the inventory.
     * @returns {number} The maximum capacity of the inventory.
     */
    private calculateMaxCapacity(level: number): number {
        return level * 10;
    }

    /**
     * Adds one or more items to the inventory.
     * @param {(Fish | FishingRod | Bait)[]} items - The items to add.
     * @throws {Error} If the inventory is full.
     */
    addItem(...items: (Fish | FishingRod | Bait)[]): void {
        for (const item of items) {
            if (this.getTotalItems() >= this.maxCapacity) {
                throw new Error("Inventory is full.");
            }

            if (item instanceof Fish) {
                this.fishes.push({ item, durability: null });
            } else if (item instanceof FishingRod) {
                this.fishingRods.push({ item, durability: item.durability });
            } else if (item instanceof Bait) {
                this.baits.push({ item, durability: null });
            }
        }
    }

    /**
     * Removes one or more items from the inventory.
     * @param {(Fish | FishingRod | Bait)[]} items - The items to remove.
     */
    removeItem(...items: (Fish | FishingRod | Bait)[]): void {
        for (const item of items) {
            if (item instanceof Fish) {
                this.fishes = this.fishes.filter(f => f.item.id !== item.id);
            } else if (item instanceof FishingRod) {
                this.fishingRods = this.fishingRods.filter(r => r.item.id !== item.id);
            } else if (item instanceof Bait) {
                this.baits = this.baits.filter(b => b.item.id !== item.id);
            }
        }
    }

    /**
     * Gets the total number of items in the inventory.
     * @returns {number} The total number of items.
     */
    getTotalItems(): number {
        return this.fishes.length + this.fishingRods.length + this.baits.length;
    }

    /**
     * Levels up the inventory, increasing its capacity.
     * @throws {Error} If the maximum inventory level is reached.
     */
    levelUp(): void {
        if (this.level < 5) {
            this.level++;
            this.maxCapacity = this.calculateMaxCapacity(this.level);
        } else {
            throw new Error("Maximum inventory level reached.");
        }
    }
} 