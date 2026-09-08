/** A slot's choice is the specific legendary item ID the player picked, not just its weapon type — needed to tell apart weapon types with more than one legendary (e.g. Greatsword: Twilight vs. Sunrise). */
export type KitChoices = Record<number, (number | null)[]>;
export type FilterMode = 'all' | 'owned';
