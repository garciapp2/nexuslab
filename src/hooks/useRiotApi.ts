import { useQuery, UseQueryResult } from 'react-query';
import { RiotApiService } from '../services/riotApi';
import { Summoner, RankedInfo, ChampionMastery, Match, Champion } from '../types/riot';
import { APP_CONFIG } from '../utils/constants';

// Hook para buscar summoner
export const useSummoner = (summonerName: string | undefined) => {
  return useQuery(
    ['summoner', summonerName],
    () => RiotApiService.getSummonerByName(summonerName!),
    {
      enabled: !!summonerName,
      staleTime: APP_CONFIG.STALE_TIME,
      cacheTime: APP_CONFIG.CACHE_TIME,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  );
};

// Hook para buscar informações de ranked
export const useRankedInfo = (summonerId: string | undefined) => {
  return useQuery(
    ['ranked', summonerId],
    () => RiotApiService.getRankedInfo(summonerId!),
    {
      enabled: !!summonerId,
      staleTime: APP_CONFIG.STALE_TIME,
      cacheTime: APP_CONFIG.CACHE_TIME,
    }
  );
};

// Hook para buscar maestria de campeões
export const useChampionMastery = (summonerId: string | undefined) => {
  return useQuery(
    ['mastery', summonerId],
    () => RiotApiService.getChampionMastery(summonerId!),
    {
      enabled: !!summonerId,
      staleTime: APP_CONFIG.STALE_TIME,
      cacheTime: APP_CONFIG.CACHE_TIME,
    }
  );
};

// Hook para buscar histórico de partidas
export const useMatchHistory = (puuid: string | undefined, count: number = APP_CONFIG.MAX_MATCHES_HISTORY) => {
  return useQuery(
    ['matchHistory', puuid, count],
    () => RiotApiService.getMatchHistory(puuid!, count),
    {
      enabled: !!puuid,
      staleTime: APP_CONFIG.STALE_TIME,
      cacheTime: APP_CONFIG.CACHE_TIME,
    }
  );
};

// Hook para buscar detalhes de múltiplas partidas
export const useMatchDetails = (matchIds: string[] | undefined) => {
  return useQuery(
    ['matches', matchIds],
    async () => {
      if (!matchIds || matchIds.length === 0) return [];
      
      // Buscar partidas em lotes para evitar sobrecarga
      const batchSize = 5;
      const batches = [];
      
      for (let i = 0; i < matchIds.length; i += batchSize) {
        const batch = matchIds.slice(i, i + batchSize);
        batches.push(batch);
      }
      
      const results: (Match | null)[] = [];
      
      for (const batch of batches) {
        const batchPromises = batch.map(matchId => 
          RiotApiService.getMatchDetails(matchId)
        );
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Pequeno delay entre lotes para respeitar rate limits
        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      return results.filter(match => match !== null) as Match[];
    },
    {
      enabled: !!matchIds && matchIds.length > 0,
      staleTime: APP_CONFIG.STALE_TIME,
      cacheTime: APP_CONFIG.CACHE_TIME,
    }
  );
};

// Hook para buscar dados de campeões (cache longo pois são dados estáticos)
export const useChampionsData = () => {
  return useQuery(
    'champions',
    RiotApiService.getChampionsData,
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 horas
      cacheTime: 24 * 60 * 60 * 1000, // 24 horas
      retry: 3,
    }
  );
};

// Hook para buscar URL de ícone de perfil
export const useProfileIcon = (iconId: number | undefined) => {
  return useQuery(
    ['profileIcon', iconId],
    () => RiotApiService.getProfileIconUrl(iconId!),
    {
      enabled: !!iconId,
      staleTime: 24 * 60 * 60 * 1000, // 24 horas
      cacheTime: 24 * 60 * 60 * 1000, // 24 horas
    }
  );
};

// Hook para buscar URL de imagem de campeão
export const useChampionImage = (championName: string | undefined) => {
  return useQuery(
    ['championImage', championName],
    () => RiotApiService.getChampionImageUrl(championName!),
    {
      enabled: !!championName,
      staleTime: 24 * 60 * 60 * 1000, // 24 horas
      cacheTime: 24 * 60 * 60 * 1000, // 24 horas
    }
  );
};

// Hook combinado para perfil completo do jogador
export const usePlayerProfile = (summonerName: string | undefined) => {
  const summonerQuery = useSummoner(summonerName);
  const rankedQuery = useRankedInfo(summonerQuery.data?.id);
  const masteryQuery = useChampionMastery(summonerQuery.data?.id);
  const profileIconQuery = useProfileIcon(summonerQuery.data?.profileIconId);
  
  return {
    summoner: summonerQuery,
    ranked: rankedQuery,
    mastery: masteryQuery,
    profileIcon: profileIconQuery,
    isLoading: summonerQuery.isLoading,
    error: summonerQuery.error,
    isSuccess: summonerQuery.isSuccess && !summonerQuery.error,
  };
};

// Hook para estatísticas completas de partidas
export const useMatchStats = (puuid: string | undefined) => {
  const matchHistoryQuery = useMatchHistory(puuid);
  const matchDetailsQuery = useMatchDetails(matchHistoryQuery.data);
  
  return {
    matchHistory: matchHistoryQuery,
    matchDetails: matchDetailsQuery,
    isLoading: matchHistoryQuery.isLoading || matchDetailsQuery.isLoading,
    error: matchHistoryQuery.error || matchDetailsQuery.error,
    matches: matchDetailsQuery.data,
  };
};
