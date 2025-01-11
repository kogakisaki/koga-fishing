import { KogaFishing, Inventory, Fish, FishingRod, Bait } from './src/index';
import { fishMap } from './src/classes/fish';
import { fishingRodMap } from './src/classes/fishingRod';
import { baitMap } from './src/classes/bait';
import { FishNotFoundError, FishingRodNotFoundError, BaitNotFoundError, BaitInsufficientError } from './src/classes/errors';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { environmentMap } from './src/types/environment';

const game = new KogaFishing("kogakisaki", 10246);

const initialFish = fishMap[1]; // Small Bass
const initialRod = fishingRodMap[1]; // Bamboo Fishing Rod
const initialBait = baitMap[1]; // Worm

game.addItem(initialFish);
game.addItem(initialRod);
game.addItem(initialBait);

const rl = readline.createInterface({ input, output });

async function displayMenu() {
    console.log("\n--- Fishing Game ---");
    console.log(`Money: ${game.getMoney()}`);
    console.log(`Inventory Level: ${game.getInventory().level}, Max Capacity: ${game.getInventory().maxCapacity}`);
    console.log("1. Catch a fish");
    console.log("2. View inventory");
    console.log("3. Buy fishing rod");
    console.log("4. Buy bait");
    console.log("5. Sell fish");
    console.log("6. Level up inventory");
    console.log("7. Exit");

    const answer = await rl.question("Choose an option: ");
    return answer;
}

async function catchFish() {
    const inventory = game.getInventory();

    console.log("\n--- Choose your environment ---");
    for (const envId in environmentMap) {
        console.log(`${envId}. ${environmentMap[envId].name}`);
    }
    const envId = await rl.question("Enter environment number: ");
    const selectedEnvironment = environmentMap[parseInt(envId)];

    if (!selectedEnvironment) {
        console.log("Invalid environment selection.");
        return;
    }

    console.log("\n--- Choose your bait ---");
    if (inventory.baits.length === 0) {
        console.log("You have no bait in your inventory. Please buy some bait first.");
        return;
    }
    inventory.baits.forEach((bait, index) => {
        console.log(`${index + 1}. ${bait.name} (Price: ${bait.price})`);
    });

    const baitIndex = await rl.question("Enter bait number: ");
    const selectedBait = inventory.baits[parseInt(baitIndex) - 1];

    if (!selectedBait) {
        console.log("Invalid bait selection.");
        return;
    }

    console.log("\n--- Choose your fishing rod ---");
    if (inventory.fishingRods.length === 0) {
        console.log("You have no fishing rods in your inventory. Please buy one first.");
        return;
    }
    inventory.fishingRods.forEach(({ item: rod, durability }) => {
        if (rod instanceof FishingRod) {
            console.log(`- ${rod.name} (Max Rarity: ${rod.maxRarity}, Durability: ${durability})`);
        }
    });

    const rodIndex = await rl.question("Enter rod number: ");
    const selectedRod = inventory.fishingRods[parseInt(rodIndex) - 1];

    if (!selectedRod) {
        console.log("Invalid rod selection.");
        return;
    }

    try {
        const caughtFish = game.catchFish(selectedBait.id, selectedRod.item.id, selectedEnvironment.id);
        if (caughtFish) {
            console.log(`Bạn đã bắt được ${caughtFish.name}!`);
        } else {
            console.log("Bạn không bắt được cá nào.");
        }
    } catch (error: any) {
        if (error instanceof BaitInsufficientError) {
            console.error(error.message);
        } else {
            console.error("An unexpected error occurred:", error.message);
        }
    }
}

function viewInventory() {
    const inventory = game.getInventory();
    console.log("\n--- Inventory ---");
    console.log("Fish:");
    if (inventory.fish.length > 0) {
        inventory.fish.forEach(fish => {
            if (fish instanceof Fish) {
                console.log(`- ${fish.name} (Rarity: ${fish.rarity})`);
            }
        });
    } else {
        console.log("No fish in inventory.");
    }
    console.log("Fishing Rods:");
    if (inventory.fishingRods.length > 0) {
        inventory.fishingRods.forEach(({ item: rod, durability }) => {
            if (rod instanceof FishingRod) {
                console.log(`- ${rod.name} (Max Rarity: ${rod.maxRarity}, Durability: ${durability})`);
            }
        });
    } else {
        console.log("No fishing rods in inventory.");
    }
    console.log("Baits:");
    inventory.baits.forEach(bait => {
        if (bait instanceof Bait) {
            console.log(`- ${bait.name} (Price: ${bait.price})`);
        }
    });
}

async function buyFishingRod() {
    console.log("\n--- Choose a fishing rod to buy ---");
    for (const rodId in fishingRodMap) {
        console.log(`${rodId}. ${fishingRodMap[rodId].name} (Price: ${fishingRodMap[rodId].price}, Max Rarity: ${fishingRodMap[rodId].maxRarity}, Durability: ${fishingRodMap[rodId].durability})`);
    }
    const rodId = await rl.question("Enter rod ID to buy: ");
    try {
        game.buyFishingRod(parseInt(rodId));
        console.log("Fishing rod purchased successfully!");
    } catch (error: any) {
        console.error("Error buying fishing rod:", error.message);
    }
}

async function buyBait() {
    console.log("\n--- Choose bait to buy ---");
    for (const baitId in baitMap) {
        console.log(`${baitId}. ${baitMap[baitId].name} (Price: ${baitMap[baitId].price})`);
    }
    const baitId = await rl.question("Enter bait ID to buy: ");
    try {
        game.buyBait(parseInt(baitId));
        console.log("Bait purchased successfully!");
    } catch (error: any) {
        console.error("Error buying bait:", error.message);
    }
}

async function sellFish() {
    const inventory = game.getInventory();
    console.log("\n--- Choose a fish to sell ---");
    if (inventory.fish.length === 0) {
        console.log("You have no fish in your inventory.");
        return;
    }

    inventory.fish.forEach((fish, index) => {
        console.log(`${index + 1}. ${fish.name} (Price: ${fish.price})`);
    });

    const fishIndex = await rl.question("Enter fish number to sell: ");
    const selectedFish = inventory.fish[parseInt(fishIndex) - 1];

    if (!selectedFish) {
        console.log("Invalid fish selection.");
        return;
    }

    const quantity = await rl.question("Enter quantity to sell: ");
    try {
        game.sellFish(selectedFish.id, parseInt(quantity));
        console.log(`Sold ${quantity} ${selectedFish.name}(s) successfully!`);
    } catch (error: any) {
        console.error("Error selling fish:", error.message);
    }
}

async function main() {
    let running = true;
    while (running) {
        const choice = await displayMenu();
        switch (choice) {
            case "1":
                await catchFish();
                break;
            case "2":
                viewInventory();
                break;
            case "3":
                await buyFishingRod();
                break;
            case "4":
                await buyBait();
                break;
            case "5":
                await sellFish();
                break;
            case "6":
                game.levelUpInventory();
                console.log("Inventory leveled up!");
                break;
            case "7":
                running = false;
                break;
            default:
                console.log("Invalid option.");
        }
    }
    rl.close();
}

main();