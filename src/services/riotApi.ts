import axios, { AxiosResponse } from 'axios';
import { Summoner, RankedInfo, ChampionMastery, Match, Champion } from '../types/riot';

// Configuração da API
const API_KEY = process.env.REACT_APP_RIOT_API_KEY || 'RGAPI-YOUR-API-KEY-HERE';
const BASE_URL = 'https://br1.api.riotgames.com';
const DATA_DRAGON_URL = 'https://ddragon.leagueoflegends.com';

// Rate limiting
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number = 100;
  private readonly timeWindow: number = 120000; // 2 minutos

  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.requests.length < this.maxRequests;
  }

  addRequest(): void {
    this.requests.push(Date.now());
  }

  async waitIfNeeded(): Promise<void> {
    if (!this.canMakeRequest()) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (Date.now() - oldestRequest);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

const rateLimiter = new RateLimiter();

// Configurar axios
const api = axios.create({
  headers: {
    'X-Riot-Token': API_KEY,
  },
});

// Interceptor para rate limiting
api.interceptors.request.use(async (config) => {
  await rateLimiter.waitIfNeeded();
  rateLimiter.addRequest();
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.warn('Rate limit exceeded, waiting...');
      // Retry após delay
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api.request(error.config));
        }, 2000);
      });
    }
    return Promise.reject(error);
  }
);

export class RiotApiService {
  // Buscar summoner por nome (suporte ao novo sistema Riot ID)
  static async getSummonerByName(summonerName: string): Promise<Summoner> {
    try {
      // Limpar e formatar o nome do summoner
      const cleanName = summonerName.trim().replace(/\s+/g, ' ');
      console.log('🔍 Buscando summoner:', cleanName);
      
      // Verificar se é o novo formato com #
      if (cleanName.includes('#')) {
        const [gameName, tagLine] = cleanName.split('#');
        console.log('🆔 Riot ID detectado - Nome:', gameName, 'TAG:', tagLine);
        
        try {
          // Primeiro, buscar o PUUID usando o novo sistema Riot ID
          const riotIdUrl = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
          console.log('🌐 Chamando Riot ID API:', riotIdUrl);
          
          const accountResponse = await api.get(riotIdUrl, {
            headers: {
              'X-Riot-Token': API_KEY,
            },
          });
          
          console.log('✅ Riot ID encontrado, PUUID:', accountResponse.data.puuid);
          
          // Depois, buscar o summoner usando o PUUID
          const summonerUrl = `${BASE_URL}/lol/summoner/v4/summoners/by-puuid/${accountResponse.data.puuid}`;
          console.log('🌐 Chamando Summoner API:', summonerUrl);
          
          const response: AxiosResponse<Summoner> = await api.get(summonerUrl);
          console.log('✅ Summoner encontrado:', response.data.name);
          return response.data;
        } catch (riotIdError: any) {
          console.error('❌ Erro com Riot ID:', riotIdError.response?.status, riotIdError.response?.data);
          console.log('🔄 Tentando método antigo sem TAG...');
          
          // Fallback para o método antigo sem a #
          const fallbackName = gameName;
          const fallbackUrl = `${BASE_URL}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(fallbackName)}`;
          console.log('🌐 Chamando API antiga:', fallbackUrl);
          
          const response: AxiosResponse<Summoner> = await api.get(fallbackUrl);
          console.log('✅ Summoner encontrado via fallback:', response.data.name);
          return response.data;
        }
      } else {
        // Método antigo para nomes sem #
        console.log('📝 Nome antigo detectado, usando API clássica');
        const classicUrl = `${BASE_URL}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(cleanName)}`;
        console.log('🌐 Chamando API clássica:', classicUrl);
        
        const response: AxiosResponse<Summoner> = await api.get(classicUrl);
        console.log('✅ Summoner encontrado:', response.data.name);
        return response.data;
      }
    } catch (error: any) {
      console.error('Erro ao buscar summoner:', error);
      if (error.response?.status === 404) {
        throw new Error(`Invocador "${summonerName}" não encontrado. ${summonerName.includes('#') ? 'Tente usar apenas o nome sem a #TAG.' : 'Verifique se o nome está correto.'}`);
      } else if (error.response?.status === 403) {
        throw new Error('Chave de API inválida ou expirada. Verifique sua configuração.');
      } else if (error.response?.status === 429) {
        throw new Error('Muitas requisições. Aguarde alguns minutos e tente novamente.');
      }
      throw new Error('Erro ao buscar invocador. Tente novamente mais tarde.');
    }
  }

  // Buscar informações de ranked
  static async getRankedInfo(summonerId: string): Promise<RankedInfo[]> {
    try {
      const response: AxiosResponse<RankedInfo[]> = await api.get(
        `${BASE_URL}/lol/league/v4/entries/by-summoner/${summonerId}`
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar informações de ranked:', error);
      return [];
    }
  }

  // Buscar maestria de campeões
  static async getChampionMastery(summonerId: string): Promise<ChampionMastery[]> {
    try {
      const response: AxiosResponse<ChampionMastery[]> = await api.get(
        `${BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`
      );
      return response.data.slice(0, 5); // Top 5 campeões
    } catch (error) {
      console.error('Erro ao buscar maestria de campeões:', error);
      return [];
    }
  }

  // Buscar histórico de partidas
  static async getMatchHistory(puuid: string, count: number = 20): Promise<string[]> {
    try {
      const response: AxiosResponse<string[]> = await api.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`,
        {
          headers: {
            'X-Riot-Token': API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de partidas:', error);
      return [];
    }
  }

  // Buscar detalhes de uma partida
  static async getMatchDetails(matchId: string): Promise<Match | null> {
    try {
      const response: AxiosResponse<Match> = await api.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        {
          headers: {
            'X-Riot-Token': API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da partida:', error);
      return null;
    }
  }

  // Buscar dados estáticos de campeões
  static async getChampionsData(): Promise<{ [key: string]: Champion }> {
    try {
      const versionResponse = await axios.get(`${DATA_DRAGON_URL}/api/versions.json`);
      const latestVersion = versionResponse.data[0];
      
      const response = await axios.get(
        `${DATA_DRAGON_URL}/cdn/${latestVersion}/data/pt_BR/champion.json`
      );
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar dados de campeões:', error);
      // Fallback para versão em inglês se português falhar
      try {
        const versionResponse = await axios.get(`${DATA_DRAGON_URL}/api/versions.json`);
        const latestVersion = versionResponse.data[0];
        
        const response = await axios.get(
          `${DATA_DRAGON_URL}/cdn/${latestVersion}/data/en_US/champion.json`
        );
        return response.data.data;
      } catch (fallbackError) {
        console.error('Erro no fallback de campeões:', fallbackError);
        return {};
      }
    }
  }

  // Buscar URL da imagem do campeão
  static async getChampionImageUrl(championName: string): Promise<string> {
    try {
      const versionResponse = await axios.get(`${DATA_DRAGON_URL}/api/versions.json`);
      const latestVersion = versionResponse.data[0];
      return `${DATA_DRAGON_URL}/cdn/${latestVersion}/img/champion/${championName}.png`;
    } catch (error) {
      console.error('Erro ao buscar imagem do campeão:', error);
      return '';
    }
  }

  // Buscar URL da imagem do perfil
  static async getProfileIconUrl(iconId: number): Promise<string> {
    try {
      const versionResponse = await axios.get(`${DATA_DRAGON_URL}/api/versions.json`);
      const latestVersion = versionResponse.data[0];
      return `${DATA_DRAGON_URL}/cdn/${latestVersion}/img/profileicon/${iconId}.png`;
    } catch (error) {
      console.error('Erro ao buscar ícone de perfil:', error);
      return '';
    }
  }

  // Calcular estatísticas de campeões
  static calculateChampionStats(matches: Match[], championId: number) {
    const championMatches = matches.filter(match => 
      match.info.participants.some(p => p.championId === championId)
    );

    if (championMatches.length === 0) {
      return null;
    }

    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let wins = 0;

    championMatches.forEach(match => {
      const participant = match.info.participants.find(p => p.championId === championId);
      if (participant) {
        totalKills += participant.kills;
        totalDeaths += participant.deaths;
        totalAssists += participant.assists;
        if (participant.win) wins++;
      }
    });

    const totalGames = championMatches.length;
    const winRate = (wins / totalGames) * 100;
    const avgKills = totalKills / totalGames;
    const avgDeaths = totalDeaths / totalGames;
    const avgAssists = totalAssists / totalGames;
    const avgKDA = avgDeaths > 0 ? (avgKills + avgAssists) / avgDeaths : avgKills + avgAssists;

    return {
      championId,
      winRate: Math.round(winRate * 100) / 100,
      avgKDA: Math.round(avgKDA * 100) / 100,
      avgKills: Math.round(avgKills * 100) / 100,
      avgDeaths: Math.round(avgDeaths * 100) / 100,
      avgAssists: Math.round(avgAssists * 100) / 100,
      totalGames,
    };
  }
}
