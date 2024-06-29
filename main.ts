const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth: number = 75;
let enemyAttackDamage: number = 25;

let health: number = 100;
let attackDamage: number = 50;
let numHealthPotions: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; // 50% chance

let running: boolean = true;

console.log("WELCOME TO MY ADVENTURE GAME");

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function gameLoop() {
    console.log("----------------------------------------------------------");

    let enemyHealth: number = getRandomInt(maxEnemyHealth) + 1;
    let enemyIndex = getRandomInt(enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`\t${enemy} has appeared!\n`);

    const combat = () => {
        if (enemyHealth > 0 && health > 0) {
            console.log(`\tYour HP: ${health}`);
            console.log(`\t${enemy}'s HP: ${enemyHealth}`);
            console.log(`\n\tWhat would you like to do?`);
            console.log(`\t1. Attack`);
            console.log(`\t2. Drink Health Potion`);
            console.log(`\t3. Run!`);

            readline.question('> ', (playerAction: string) => {
                switch (playerAction) {
                    case '1':
                        // Attack the enemy
                        let damageDealt = getRandomInt(attackDamage) + 1;
                        let damageTaken = getRandomInt(enemyAttackDamage) + 1;

                        enemyHealth -= damageDealt;
                        health -= damageTaken;

                        console.log(`\t> You strike the ${enemy} for ${damageDealt} damage.`);
                        console.log(`\t> You receive ${damageTaken} damage.`);

                        if (health <= 0) {
                            console.log(`\t> You have taken too much damage, you are too weak to go on!`);
                            running = false;
                            readline.close();
                            return;
                        }

                        if (enemyHealth <= 0) {
                            console.log(`\t> ${enemy} was defeated!`);
                            let dropChance = getRandomInt(100);
                            if (dropChance < healthPotionDropChance) {
                                numHealthPotions++;
                                console.log(`\t> The ${enemy} dropped a health potion!`);
                                console.log(`\t> You now have ${numHealthPotions} health potion(s).`);
                            }
                            gameLoop();
                        } else {
                            combat();
                        }
                        break;

                    case '2':
                        // Drink health potion
                        if (numHealthPotions > 0) {
                            health += healthPotionHealAmount;
                            numHealthPotions--;
                            console.log(`\t> You drink a health potion, healing for ${healthPotionHealAmount}.`);
                            console.log(`\t> You now have ${health} HP.`);
                            console.log(`\t> You have ${numHealthPotions} health potion(s) left.`);
                        } else {
                            console.log(`\t> You have no health potions left! Defeat enemies for a chance to get one!`);
                        }
                        combat();
                        break;

                    case '3':
                        // Run away
                        console.log(`\tYou run away from the ${enemy}!`);
                        gameLoop();
                        break;

                    default:
                        console.log(`\tInvalid command!`);
                        combat();
                        break;
                }
            });
        }
    }

    combat();
}

gameLoop();
