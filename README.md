# Koga Fishing

A fishing game package that allows you to simulate fishing activities, manage inventory, and interact with various fishing elements.

## Installation

You can install the package using npm:

```bash
npm install @kogakisaki/fishing
```

## Usage

### Importing the Library

You can import the library using ES modules or CommonJS:

```javascript
// ES Modules
import { KogaFishing, Fish, FishingRod, Bait } from '@kogakisaki/fishing';

// CommonJS
const { KogaFishing, Fish, FishingRod, Bait } = require('@kogakisaki/fishing');
```

### Creating a Game Instance

To create a new game instance, you can do the following:

```javascript
const game = new KogaFishing("PlayerName", 1000);
```

### Adding Items to Inventory

You can add items such as fish, fishing rods, and bait to the inventory:

```javascript
const fish = new Fish(1, "Small Bass", 10);
const rod = new FishingRod(1, "Bamboo Fishing Rod", 2, 50, 100);
const bait = new Bait(1, "Worm", 5);

game.addItem(fish);
game.addItem(rod);
game.addItem(bait);
```

### Catching Fish

To catch fish, you need to specify the bait ID, rod ID, and environment ID:

```javascript
const caughtFish = game.catchFish(bait.id, rod.id, environmentId);
if (caughtFish) {
    console.log(`You caught a ${caughtFish.name}!`);
} else {
    console.log("No fish caught.");
}
```

### Selling Fish

You can sell fish from your inventory:

```javascript
game.sellFish(fish.id, quantity);
```

### Leveling Up Inventory

You can level up your inventory to increase its capacity:

```javascript
game.levelUpInventory();
```

## Features

- **Catch Fish**: Simulate catching fish with different baits and rods.
- **Manage Inventory**: Keep track of fish, rods, and bait with a leveling system.
- **Sell Fish**: Sell caught fish for money.
- **Environment Interaction**: Choose different environments for fishing.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## Author

@KogaKisaki
