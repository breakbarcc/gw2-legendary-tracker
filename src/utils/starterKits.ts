import type {WeaponType} from '@/types/gw2-api';

/**
 * Maps each Legendary Weapon Starter Kit/Key "set" to the weapon types it can unlock.
 * Each kit/key lets the player choose ONE of the listed weapons, so all listed
 * weapon types count as "craftable via this kit".
 *
 * Sets 1-5 originally shipped as "Legendary Weapon Starter Kit" items (now discontinued).
 * Starting with Set 6, Anet switched to "Legendary Weapon Starter Key" items sold via the
 * Wizard's Vault, and Set 1 was later re-sold as a Key too. The keys are keyed here by
 * their first-seen item ID; STARTER_KIT_ALIASES below maps every other item ID that grants
 * the same choice (re-issues of the same set through later Wizard's Vault historical
 * rotations) back to that canonical ID, so the UI shows one row per set regardless of
 * whether the account holds the Kit or any Key variant of it.
 */
export const STARTER_KIT_WEAPONS: Record<number, WeaponType[]> = {
  96054: ['Scepter', 'Staff', 'Sword', 'Pistol'], // Set 1
  101123: ['Sword', 'Pistol', 'Mace', 'Rifle'], // Set 2
  101623: ['Mace', 'Rifle', 'ShortBow', 'Axe'], // Set 3
  101938: ['ShortBow', 'Axe', 'Hammer', 'Dagger'], // Set 4
  102946: ['Hammer', 'Dagger', 'Speargun', 'Greatsword'], // Set 5
  103839: ['Speargun', 'Greatsword', 'Warhorn', 'LongBow'], // Set 6
  104004: ['Harpoon', 'Focus', 'LongBow', 'Warhorn'], // Set 7
  103827: ['Harpoon', 'Focus', 'Greatsword', 'Torch'], // Set 8
  103821: ['Trident', 'Shield', 'Greatsword', 'Torch'], // Set 9
  103847: ['Trident', 'Shield', 'Scepter', 'Staff'], // Set 10
  105331: [
    'Axe', 'Dagger', 'Mace', 'Pistol', 'Scepter', 'Sword', 'Focus', 'Shield', 'Torch',
    'Warhorn', 'Greatsword', 'Hammer', 'LongBow', 'Rifle', 'ShortBow', 'Staff', 'Harpoon',
    'Speargun', 'Trident',
  ], // Universal — lets you pick any gen-1 legendary weapon; discontinued, was Fractal Incursion-only
};

/** Item ID of the discontinued "Legendary Weapon Starter Key—Universal" kit. */
export const UNIVERSAL_STARTER_KIT_ID = 105331;

/**
 * Other item IDs that grant the exact same weapon choice as one of the canonical
 * IDs above (Wizard's Vault re-issues of the same Key set with a fresh item ID).
 * Maps alias ID -> canonical ID used everywhere else in the app.
 */
export const STARTER_KIT_ALIASES: Record<number, number> = {
  103927: 96054, // Set 1 Key, reissue
  104005: 96054, // Set 1 Key, reissue
  103832: 103839, // Set 6 Key, reissue
  104007: 104004, // Set 7 Key, reissue
  103921: 103827, // Set 8 Key, reissue
  103989: 103847, // Set 10 Key, reissue
};

/** Resolves any known kit/key item ID (canonical or alias) to its canonical set ID. */
export function resolveStarterKitId(itemId: number): number {
  return STARTER_KIT_ALIASES[itemId] ?? itemId;
}

export const STARTER_KIT_IDS = new Set([
  ...Object.keys(STARTER_KIT_WEAPONS).map(Number),
  ...Object.keys(STARTER_KIT_ALIASES).map(Number),
]);

export const STARTER_KIT_ORDER: number[] = [
  96054, 101123, 101623, 101938, 102946, 103839, 104004, 103827, 103821, 103847,
  UNIVERSAL_STARTER_KIT_ID,
];

/**
 * Given a list of owned kit/key IDs (canonical or alias), returns a map of
 * WeaponType → count of kits that cover that weapon type. A count > 0 means
 * the player has at least one kit ready for that weapon type.
 */
export function buildStarterKitMap(ownedKitIds: number[]): Map<WeaponType, number> {
  const result = new Map<WeaponType, number>();
  for (const id of ownedKitIds) {
    const weapons = STARTER_KIT_WEAPONS[resolveStarterKitId(id)];
    if (!weapons) continue;
    for (const wt of weapons) {
      result.set(wt, (result.get(wt) ?? 0) + 1);
    }
  }
  return result;
}
