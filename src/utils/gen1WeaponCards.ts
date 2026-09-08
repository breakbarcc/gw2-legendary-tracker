import type { WeaponType } from '@/types/gw2-api';

export interface WeaponCardInfo {
  id: number;
  name: string;
  icon: string;
  description?: string;
}

export interface Gen1Legendary {
  id: number;
  weaponType: WeaponType;
  nameEn: string;
  nameDe: string;
  icon: string;
}

// Canonical registry of every gen1 legendary weapon — one entry per real GW2 item.
// Icon URLs are permanent GW2 render CDN assets. Names fetched from GW2 API on 2026-06-17.
// Greatsword has two legendaries (Twilight, Sunrise); every other weapon type has exactly one.
export const GEN1_LEGENDARIES: Gen1Legendary[] = [
  { id: 30684, weaponType: 'Axe',        nameEn: 'Frostfang',                   nameDe: 'Frostfang',                        icon: 'https://render.guildwars2.com/file/0F9C08DE12ADD1082A103DC6EF7401281B23985E/456009.png' },
  { id: 30685, weaponType: 'LongBow',    nameEn: 'Kudzu',                       nameDe: 'Kudzu',                            icon: 'https://render.guildwars2.com/file/B604C764D3E19E391F5E24CCFBC414500606BD29/456010.png' },
  { id: 30686, weaponType: 'ShortBow',   nameEn: 'The Dreamer',                 nameDe: 'Der Träumer',                      icon: 'https://render.guildwars2.com/file/98F0ED6A7F7A310FCE6D161C0B36B0071E4D1917/456011.png' },
  { id: 30687, weaponType: 'Dagger',     nameEn: 'Incinerator',                 nameDe: 'Verbrenner',                       icon: 'https://render.guildwars2.com/file/D9B12A1EBEDC04047295CF0A66E43E650297D429/456012.png' },
  { id: 30688, weaponType: 'Focus',      nameEn: 'The Minstrel',                nameDe: 'Der Minnesänger',                  icon: 'https://render.guildwars2.com/file/D3DBEB4FE4C81401AF6EA905FE16E4F3050F540B/456013.png' },
  { id: 30704, weaponType: 'Greatsword', nameEn: 'Twilight',                    nameDe: 'Düsternis',                        icon: 'https://render.guildwars2.com/file/CE3AF0B7B9BB6244726779F5B6A930541BA6C15F/456031.png' },
  { id: 30703, weaponType: 'Greatsword', nameEn: 'Sunrise',                     nameDe: 'Sonnenaufgang',                    icon: 'https://render.guildwars2.com/file/EFF16C4F19792627355DC294E6D7093F544921E7/456030.png' },
  { id: 30690, weaponType: 'Hammer',     nameEn: 'The Juggernaut',              nameDe: 'Der Moloch',                       icon: 'https://render.guildwars2.com/file/F9FAEDF77052A514E876145908B3B3346314A13E/456015.png' },
  { id: 30691, weaponType: 'Harpoon',    nameEn: "Kamohoali'i Kotaki",          nameDe: "Kamohoali'i Kotaki",               icon: 'https://render.guildwars2.com/file/4705EC549A3296F493312C4018754816175E5D28/456016.png' },
  { id: 30692, weaponType: 'Mace',       nameEn: 'The Moot',                    nameDe: 'Der Bierrat',                      icon: 'https://render.guildwars2.com/file/C0302BC8DDD84D20F0B73C1D702438F5534F3308/456017.png' },
  { id: 30693, weaponType: 'Pistol',     nameEn: 'Quip',                        nameDe: 'Knaller',                          icon: 'https://render.guildwars2.com/file/03342FFE0E35B35D5207B65ECB0C1D06442377AB/456018.png' },
  { id: 30694, weaponType: 'Rifle',      nameEn: 'The Predator',                nameDe: 'Das Raubtier',                     icon: 'https://render.guildwars2.com/file/3ECD99482DD865AA7D42B2EF6AFEFA705294555C/456019.png' },
  { id: 30695, weaponType: 'Scepter',    nameEn: 'Meteorlogicus',               nameDe: 'Meteorlogikus',                    icon: 'https://render.guildwars2.com/file/AC940BF377C5D3EF13B2060D53EF19F1BC34BE48/456020.png' },
  { id: 30696, weaponType: 'Shield',     nameEn: 'The Flameseeker Prophecies',  nameDe: 'Die Flammensucher-Prophezeiungen', icon: 'https://render.guildwars2.com/file/BE58181BEA0559E60873ED940D0408D0596B4464/456021.png' },
  { id: 30697, weaponType: 'Speargun',   nameEn: 'Frenzy',                      nameDe: 'Raserei',                          icon: 'https://render.guildwars2.com/file/67EB25E29BA73D96B34523C02B256516DD60DA06/456024.png' },
  { id: 30698, weaponType: 'Staff',      nameEn: 'The Bifrost',                 nameDe: 'Der Bifröst',                      icon: 'https://render.guildwars2.com/file/FD221A90427ADBD29B7E2DF8BDAF98BB16391162/456025.png' },
  { id: 30699, weaponType: 'Sword',      nameEn: 'Bolt',                        nameDe: 'Blitz',                            icon: 'https://render.guildwars2.com/file/FE47E046D10DF27508910869B5EB040F6BBBE793/456026.png' },
  { id: 30700, weaponType: 'Torch',      nameEn: 'Rodgort',                     nameDe: 'Rodgort',                          icon: 'https://render.guildwars2.com/file/B1D6CB3AB4017633280ACDB36470F46829FDDD13/456027.png' },
  { id: 30701, weaponType: 'Trident',    nameEn: 'Kraitkin',                    nameDe: 'Kraitkin',                         icon: 'https://render.guildwars2.com/file/1FAD3D4BE1FA503C49FCF532582867FB060664E4/456028.png' },
  { id: 30702, weaponType: 'Warhorn',    nameEn: 'Howler',                      nameDe: 'Heuler',                           icon: 'https://render.guildwars2.com/file/19E01CC637F4F370B43E132ACEBFD7C6E1570DE7/456029.png' },
];

const GEN1_LEGENDARIES_BY_ID = new Map(GEN1_LEGENDARIES.map((entry) => [entry.id, entry]));

export function getGen1Legendary(id: number): Gen1Legendary | undefined {
  return GEN1_LEGENDARIES_BY_ID.get(id);
}

function toCardInfo(entry: Gen1Legendary, useDe: boolean): WeaponCardInfo {
  return { id: entry.id, name: useDe ? entry.nameDe : entry.nameEn, icon: entry.icon };
}

export interface WeaponChoice {
  weaponType: WeaponType;
  card: WeaponCardInfo;
}

/**
 * Builds the list of (weaponType, card) pairs for a list of legendary item IDs — every
 * legendary gets its own entry, so a type with more than one legendary (e.g. Greatsword:
 * Twilight & Sunrise) appears once per legendary instead of collapsing to one representative.
 */
export function getWeaponCardList(legendaryIds: number[], lang: string): WeaponChoice[] {
  const useDe = lang.startsWith('de');
  const choices: WeaponChoice[] = [];
  for (const id of legendaryIds) {
    const entry = GEN1_LEGENDARIES_BY_ID.get(id);
    if (entry) choices.push({ weaponType: entry.weaponType, card: toCardInfo(entry, useDe) });
  }
  return choices;
}
