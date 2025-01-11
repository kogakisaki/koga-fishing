import { Fish } from './fish';
import { FishingRod } from './fishingRod';
import { Bait } from './bait';

export class Inventory {
    fish: Fish[] = [];
    fishingRods: { item: FishingRod, durability: number }[] = [];
    baits: Bait[] = [];
    level: number;
    maxCapacity: number;

    constructor(level: number = 1) {
        this.level = level;
        this.maxCapacity = this.calculateMaxCapacity(level);
    }

    private calculateMaxCapacity(level: number): number {
        return level * 10; // Ví dụ: mỗi cấp độ tăng 10 khoảng trống
    }

    addItem(item: Fish | FishingRod | Bait, durability?: number): void {
        if (this.getTotalItems() >= this.maxCapacity) {
            throw new Error("Inventory is full.");
        }

        if (item instanceof Fish) {
            this.fish.push(item);
        } else if (item instanceof FishingRod) {
            this.fishingRods.push({ item, durability: durability !== undefined ? durability : item.durability });
        } else if (item instanceof Bait) {
            this.baits.push(item);
        }
    }

    removeItem(item: Fish | FishingRod | Bait): void {
        if (item instanceof Fish) {
            this.fish = this.fish.filter(f => f.id !== item.id);
        } else if (item instanceof FishingRod) {
            this.fishingRods = this.fishingRods.filter(r => r.item.id !== item.id);
        } else if (item instanceof Bait) {
            this.baits = this.baits.filter(b => b.id !== item.id);
        }
    }

    getTotalItems(): number {
        return this.fish.length + this.fishingRods.length + this.baits.length;
    }

    levelUp(): void {
        if (this.level < 5) {
            this.level++;
            this.maxCapacity = this.calculateMaxCapacity(this.level);
        } else {
            throw new Error("Maximum inventory level reached.");
        }
    }
} 