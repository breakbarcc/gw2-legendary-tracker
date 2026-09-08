import type { WeaponType } from '@/types/gw2-api';
import { GEN1_LEGENDARIES, getGen1Legendary, getWeaponCardList } from './gen1WeaponCards';
import type { WeaponChoice } from './gen1WeaponCards';

/**
 * Maps each Legendary Weapon Starter Kit/Key "set" to the gen1 legendaries it lets you
 * craft (by their real item ID — see gen1WeaponCards.ts for the canonical registry).
 * Each kit/key lets the player choose ONE of the four, so all of them count as
 * "craftable via this kit". This is the single source of truth for a kit's contents;
 * the weapon types it unlocks (STARTER_KIT_WEAPONS) are derived from it below, so a
 * set can never disagree with the legendary registry about which weapon type an item is.
 *
 * Sets 1-5 originally shipped as "Legendary Weapon Starter Kit" items (now discontinued).
 * Starting with Set 6, Anet switched to "Legendary Weapon Starter Key" items sold via the
 * Wizard's Vault, and Set 1 was later re-sold as a Key too. The keys are keyed here by
 * their first-seen item ID; STARTER_KIT_ALIASES below maps every other item ID that grants
 * the same choice (re-issues of the same set through later Wizard's Vault historical
 * rotations) back to that canonical ID, so the UI shows one row per set regardless of
 * whether the account holds the Kit or any Key variant of it.
 */
export const STARTER_KIT_LEGENDARIES: Record<number, number[]> = {
  96054: [30695, 30698, 30699, 30693], // Set 1: Meteorlogicus, The Bifrost, Bolt, Quip
  101123: [30699, 30693, 30692, 30694], // Set 2: Bolt, Quip, The Moot, The Predator
  101623: [30692, 30694, 30686, 30684], // Set 3: The Moot, The Predator, The Dreamer, Frostfang
  101938: [30686, 30684, 30690, 30687], // Set 4: The Dreamer, Frostfang, The Juggernaut, Incinerator
  102946: [30690, 30687, 30691, 30704], // Set 5: The Juggernaut, Incinerator, Kamohoali'i Kotaki, Twilight
  103839: [30691, 30704, 30702, 30685], // Set 6: Kamohoali'i Kotaki, Twilight, Howler, Kudzu
  104004: [30702, 30685, 30697, 30688], // Set 7: Howler, Kudzu, Frenzy, The Minstrel
  103827: [30697, 30688, 30700, 30703], // Set 8: Frenzy, The Minstrel, Rodgort, Sunrise
  103821: [30700, 30703, 30701, 30696], // Set 9: Rodgort, Sunrise, Kraitkin, The Flameseeker Prophecies
  103847: [30701, 30696, 30695, 30698], // Set 10: Kraitkin, The Flameseeker Prophecies, Meteorlogicus, The Bifrost
  // Universal — lets you pick any gen1 legendary weapon; discontinued, was Fractal
  // Incursion-only. Includes every legendary, so both Greatswords (Twilight and Sunrise)
  // are listed individually.
  105331: GEN1_LEGENDARIES.map((l) => l.id),
};

/** Item ID of the discontinued "Legendary Weapon Starter Key—Universal" kit. */
export const UNIVERSAL_STARTER_KIT_ID = 105331;

/**
 * Weapon types unlocked by each kit/key, derived from STARTER_KIT_LEGENDARIES and
 * deduplicated — a type is either craftable via a kit or it isn't, regardless of how
 * many of its legendaries (e.g. Greatsword: Twilight and Sunrise) the kit contains.
 */
export const STARTER_KIT_WEAPONS: Record<number, WeaponType[]> = Object.fromEntries(
  Object.entries(STARTER_KIT_LEGENDARIES).map(([kitId, legendaryIds]) => {
    const types = legendaryIds.map((id) => getGen1Legendary(id)?.weaponType).filter((wt): wt is WeaponType => !!wt);
    return [Number(kitId), Array.from(new Set(types))];
  })
);

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

/**
 * Builds the full list of selectable legendaries for a kit's slot picker — every
 * legendary the kit contains gets its own entry, so a weapon type with more than one
 * legendary (e.g. the Universal kit's Twilight and Sunrise) lists both individually.
 */
export function getStarterKitWeaponChoices(kitId: number, lang: string): WeaponChoice[] {
  return getWeaponCardList(STARTER_KIT_LEGENDARIES[kitId] ?? [], lang);
}
