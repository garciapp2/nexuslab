// Constantes da aplicação

export const API_ENDPOINTS = {
  RIOT_BASE: 'https://br1.api.riotgames.com',
  RIOT_AMERICAS: 'https://americas.api.riotgames.com',
  DATA_DRAGON: 'https://ddragon.leagueoflegends.com',
} as const;

export const QUEUE_TYPES = {
  RANKED_SOLO_5x5: 'Ranked Solo/Duo',
  RANKED_FLEX_SR: 'Ranked Flex',
  RANKED_FLEX_TT: 'Ranked Flex 3v3',
  NORMAL_BLIND: 'Normal Blind Pick',
  NORMAL_DRAFT: 'Normal Draft Pick',
  ARAM: 'ARAM',
} as const;

export const CHAMPION_ROLES = {
  Fighter: 'Lutador',
  Tank: 'Tanque',
  Assassin: 'Assassino',
  Mage: 'Mago',
  Marksman: 'Atirador',
  Support: 'Suporte',
} as const;

export const TIER_COLORS = {
  IRON: '#8B4513',
  BRONZE: '#CD7F32',
  SILVER: '#C0C0C0',
  GOLD: '#FFD700',
  PLATINUM: '#00CED1',
  DIAMOND: '#B9F2FF',
  MASTER: '#9932CC',
  GRANDMASTER: '#FF6347',
  CHALLENGER: '#F0E68C',
} as const;

export const APP_CONFIG = {
  MAX_MATCHES_HISTORY: 20,
  RATE_LIMIT_REQUESTS: 100,
  RATE_LIMIT_WINDOW: 120000, // 2 minutos
  CACHE_TIME: 10 * 60 * 1000, // 10 minutos
  STALE_TIME: 5 * 60 * 1000, // 5 minutos
} as const;

export const GAME_MODES = {
  CLASSIC: 'Summoner\'s Rift',
  ODIN: 'Dominion',
  ARAM: 'Howling Abyss',
  TUTORIAL: 'Tutorial',
  URF: 'Ultra Rapid Fire',
  DOOMBOTSTEEMO: 'Doom Bots',
  ONEFORALL: 'One for All',
  ASCENSION: 'Ascension',
  FIRSTBLOOD: 'Snowdown Showdown',
  KINGPORO: 'King Poro',
  SIEGE: 'Nexus Siege',
  ASSASSINATE: 'Blood Hunt Assassin',
  ARSR: 'All Random Summoner\'s Rift',
  DARKSTAR: 'Dark Star: Singularity',
  STARGUARDIAN: 'Star Guardian Invasion',
  PROJECT: 'PROJECT: Hunters',
  GAMEMODEX: 'Nexus Blitz',
  ODYSSEY: 'Odyssey: Extraction',
  NEXUSBLITZ: 'Nexus Blitz',
  ULTBOOK: 'Ultimate Spellbook',
} as const;
