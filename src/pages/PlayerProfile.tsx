import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Trophy, Star, Award, TrendingUp, Target, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { RiotApiService } from '../services/riotApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.9) 0%, rgba(60, 60, 65, 0.9) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #c89b3c;
  box-shadow: 0 0 20px rgba(200, 155, 60, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PlayerName = styled.h1`
  font-size: 2.5rem;
  color: #c89b3c;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PlayerLevel = styled.div`
  font-size: 1.2rem;
  color: #cdbe91;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RankedSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const RankedCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
`;

const QueueType = styled.h3`
  color: #c89b3c;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RankInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Tier = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f0e6d2;
`;

const RankDetails = styled.div`
  color: #cdbe91;
  font-size: 1rem;
`;

const WinRate = styled.div`
  color: #5bc0de;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

const MasterySection = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  color: #c89b3c;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChampionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ChampionCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #463714;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #c89b3c;
    transform: translateY(-2px);
  }
`;

const ChampionImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-bottom: 0.5rem;
`;

const ChampionName = styled.div`
  color: #f0e6d2;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const MasteryInfo = styled.div`
  color: #cdbe91;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MatchHistorySection = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
`;

const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #463714;
  text-align: center;
`;

const StatIcon = styled.div`
  color: #c89b3c;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #f0e6d2;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  color: #cdbe91;
  font-size: 0.8rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #463714;
`;

const ChartTitle = styled.h4`
  color: #c89b3c;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const RecentMatches = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MatchCard = styled.div<{ isWin: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${props => props.isWin ? '#5bc0de' : '#dc143c'};
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.isWin ? 'rgba(91, 192, 222, 0.3)' : 'rgba(220, 20, 60, 0.3)'};
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const MatchChampionImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  border: 2px solid #c89b3c;
`;

const MatchInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const MatchResult = styled.div<{ isWin: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.isWin ? '#5bc0de' : '#dc143c'};
`;

const MatchDetails = styled.div`
  color: #cdbe91;
  font-size: 0.8rem;
`;

const MatchKDA = styled.div`
  color: #f0e6d2;
  font-weight: bold;
  font-size: 0.9rem;
`;

interface PlayerProfileProps {}

const PlayerProfile: React.FC<PlayerProfileProps> = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const location = useLocation();
  
  // Extrair o nome do jogador da URL de forma mais robusta
  const getPlayerNameFromUrl = () => {
    // Primeiro, tentar usar o parâmetro normal
    if (playerName) {
      return decodeURIComponent(playerName);
    }
    
    // Se não funcionar, extrair diretamente da URL
    const pathParts = location.pathname.split('/');
    if (pathParts.length >= 3 && pathParts[1] === 'player') {
      return decodeURIComponent(pathParts[2]);
    }
    
    return undefined;
  };
  
  const decodedPlayerName = getPlayerNameFromUrl();

  const {
    data: summoner,
    isLoading: summonerLoading,
    error: summonerError,
  } = useQuery(
    ['summoner', decodedPlayerName],
    () => RiotApiService.getSummonerByName(decodedPlayerName!),
    { enabled: !!decodedPlayerName }
  );

  const {
    data: rankedInfo,
    isLoading: rankedLoading,
  } = useQuery(
    ['ranked', summoner?.id],
    () => RiotApiService.getRankedInfo(summoner!.id),
    { enabled: !!summoner?.id }
  );

  const {
    data: championMastery,
    isLoading: masteryLoading,
  } = useQuery(
    ['mastery', summoner?.id],
    () => RiotApiService.getChampionMastery(summoner!.id),
    { enabled: !!summoner?.id }
  );

  const {
    data: championsData,
  } = useQuery('champions', RiotApiService.getChampionsData);

  const {
    data: profileIconUrl,
  } = useQuery(
    ['profileIcon', summoner?.profileIconId],
    () => RiotApiService.getProfileIconUrl(summoner!.profileIconId),
    { enabled: !!summoner?.profileIconId }
  );

  // Buscar histórico de partidas
  const {
    data: matchIds,
    isLoading: matchIdsLoading,
  } = useQuery(
    ['matchHistory', summoner?.puuid],
    () => RiotApiService.getMatchHistory(summoner!.puuid, 10),
    { enabled: !!summoner?.puuid }
  );

  const {
    data: matches,
    isLoading: matchesLoading,
  } = useQuery(
    ['matches', matchIds],
    async () => {
      if (!matchIds || matchIds.length === 0) return [];
      const matchPromises = matchIds.slice(0, 10).map(matchId => 
        RiotApiService.getMatchDetails(matchId)
      );
      const results = await Promise.all(matchPromises);
      return results.filter(match => match !== null);
    },
    { enabled: !!matchIds && matchIds.length > 0 }
  );

  // Calcular estatísticas das partidas (hook deve vir antes dos returns)
  const matchStats = useMemo(() => {
    if (!matches || matches.length === 0 || !summoner?.puuid) return null;

    const playerMatches = matches.map(match => {
      const participant = match!.info.participants.find(p => p.puuid === summoner.puuid);
      return { match: match!, participant };
    }).filter(({ participant }) => participant);

    const totalMatches = playerMatches.length;
    const wins = playerMatches.filter(({ participant }) => participant!.win).length;
    const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

    const totalKills = playerMatches.reduce((sum, { participant }) => sum + participant!.kills, 0);
    const totalDeaths = playerMatches.reduce((sum, { participant }) => sum + participant!.deaths, 0);
    const totalAssists = playerMatches.reduce((sum, { participant }) => sum + participant!.assists, 0);

    const avgKills = totalMatches > 0 ? totalKills / totalMatches : 0;
    const avgDeaths = totalMatches > 0 ? totalDeaths / totalMatches : 0;
    const avgAssists = totalMatches > 0 ? totalAssists / totalMatches : 0;
    const avgKDA = avgDeaths > 0 ? (avgKills + avgAssists) / avgDeaths : avgKills + avgAssists;

    return {
      totalMatches,
      wins,
      losses: totalMatches - wins,
      winRate,
      avgKills,
      avgDeaths,
      avgAssists,
      avgKDA,
      playerMatches,
    };
  }, [matches, summoner?.puuid]);

  // Dados para gráficos (hook deve vir antes dos returns)
  const chartData = useMemo(() => {
    if (!matchStats) return null;

    const last10Matches = matchStats.playerMatches.slice(0, 10).reverse();
    
    // Gráfico de KDA
    const kdaData = {
      labels: last10Matches.map((_, index) => `${index + 1}`),
      datasets: [
        {
          label: 'Kills',
          data: last10Matches.map(({ participant }) => participant!.kills),
          borderColor: '#5bc0de',
          backgroundColor: 'rgba(91, 192, 222, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Deaths',
          data: last10Matches.map(({ participant }) => participant!.deaths),
          borderColor: '#dc143c',
          backgroundColor: 'rgba(220, 20, 60, 0.2)',
          tension: 0.4,
        },
        {
          label: 'Assists',
          data: last10Matches.map(({ participant }) => participant!.assists),
          borderColor: '#c89b3c',
          backgroundColor: 'rgba(200, 155, 60, 0.2)',
          tension: 0.4,
        },
      ],
    };

    // Gráfico de vitórias vs derrotas
    const winLossData = {
      labels: ['Vitórias', 'Derrotas'],
      datasets: [
        {
          data: [matchStats.wins, matchStats.losses],
          backgroundColor: ['#5bc0de', '#dc143c'],
          borderColor: ['#5bc0de', '#dc143c'],
          borderWidth: 2,
        },
      ],
    };

    return { kdaData, winLossData };
  }, [matchStats]);

  // Early returns após todos os hooks
  if (summonerLoading) {
    return <LoadingSpinner message="Carregando perfil do jogador..." />;
  }

  if (summonerError || !summoner) {
    const errorMessage = summonerError instanceof Error 
      ? summonerError.message 
      : "Jogador não encontrado. Verifique o nome e tente novamente.";
    return <ErrorMessage message={errorMessage} />;
  }

  const getQueueTypeName = (queueType: string) => {
    switch (queueType) {
      case 'RANKED_SOLO_5x5':
        return 'Ranked Solo/Duo';
      case 'RANKED_FLEX_SR':
        return 'Ranked Flex';
      case 'RANKED_FLEX_TT':
        return 'Ranked Flex 3v3';
      default:
        return queueType;
    }
  };

  const getChampionName = (championId: number) => {
    if (!championsData) return `Champion ${championId}`;
    const champion = Object.values(championsData).find(
      (champ) => parseInt(champ.key) === championId
    );
    return champion?.name || `Champion ${championId}`;
  };

  const getChampionImageUrl = (championId: number) => {
    if (!championsData) return 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
    const champion = Object.values(championsData).find(
      (champ) => parseInt(champ.key) === championId
    );
    if (champion) {
      return `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`;
    }
    return 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#cdbe91',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#cdbe91',
        },
        grid: {
          color: 'rgba(70, 55, 20, 0.3)',
        },
      },
      y: {
        ticks: {
          color: '#cdbe91',
        },
        grid: {
          color: 'rgba(70, 55, 20, 0.3)',
        },
      },
    },
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        {profileIconUrl && (
          <ProfileIcon src={profileIconUrl} alt="Profile Icon" />
        )}
        <ProfileInfo>
          <PlayerName>{summoner.name}</PlayerName>
          <PlayerLevel>
            <Star size={20} />
            Nível {summoner.summonerLevel}
          </PlayerLevel>

        </ProfileInfo>
      </ProfileHeader>

      {!rankedLoading && rankedInfo && rankedInfo.length > 0 && (
        <RankedSection>
          {rankedInfo.map((rank, index) => {
            const winRate = ((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1);
            return (
              <RankedCard key={index}>
                <QueueType>
                  <Trophy size={20} />
                  {getQueueTypeName(rank.queueType)}
                </QueueType>
                <RankInfo>
                  <Tier>{rank.tier} {rank.rank}</Tier>
                  <RankDetails>{rank.leaguePoints} LP</RankDetails>
                  <RankDetails>{rank.wins}V / {rank.losses}D</RankDetails>
                  <WinRate>{winRate}% de vitórias</WinRate>
                </RankInfo>
              </RankedCard>
            );
          })}
        </RankedSection>
      )}

      {!masteryLoading && championMastery && championMastery.length > 0 && (
        <MasterySection>
          <SectionTitle>
            <Award size={24} />
            Top Campeões (Maestria)
          </SectionTitle>
          <ChampionGrid>
            {championMastery.slice(0, 10).map((mastery, index) => (
              <ChampionCard key={index}>
                <ChampionImage
                  src={getChampionImageUrl(mastery.championId)}
                  alt={getChampionName(mastery.championId)}
                  onError={(e) => {
                    e.currentTarget.src = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
                  }}
                />
                <ChampionName>{getChampionName(mastery.championId)}</ChampionName>
                <MasteryInfo>
                  <div>Nível {mastery.championLevel}</div>
                  <div>{mastery.championPoints.toLocaleString()} pontos</div>
                </MasteryInfo>
              </ChampionCard>
            ))}
          </ChampionGrid>
        </MasterySection>
      )}

      {/* Histórico de Partidas Integrado */}
      {!matchIdsLoading && !matchesLoading && matchStats && (
        <MatchHistorySection>
          <SectionTitle>
            <Activity size={24} />
            Histórico de Partidas (Últimas 10)
          </SectionTitle>

          {/* Estatísticas Resumidas */}
          <StatsOverview>
            <StatCard>
              <StatIcon>
                <Activity size={24} />
              </StatIcon>
              <StatValue>{matchStats.totalMatches}</StatValue>
              <StatLabel>Partidas</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon>
                <TrendingUp size={24} />
              </StatIcon>
              <StatValue>{matchStats.winRate.toFixed(1)}%</StatValue>
              <StatLabel>Taxa de Vitória</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon>
                <Target size={24} />
              </StatIcon>
              <StatValue>{matchStats.avgKDA.toFixed(2)}</StatValue>
              <StatLabel>KDA Médio</StatLabel>
            </StatCard>
            <StatCard>
              <StatIcon>
                <Award size={24} />
              </StatIcon>
              <StatValue>
                {matchStats.avgKills.toFixed(1)}/{matchStats.avgDeaths.toFixed(1)}/{matchStats.avgAssists.toFixed(1)}
              </StatValue>
              <StatLabel>K/D/A Médio</StatLabel>
            </StatCard>
          </StatsOverview>

          {/* Gráficos */}
          {chartData && (
            <ChartsGrid>
              <ChartCard>
                <ChartTitle>
                  <TrendingUp size={16} />
                  KDA das Últimas 10 Partidas
                </ChartTitle>
                <div style={{ height: '200px' }}>
                  <Line data={chartData.kdaData} options={chartOptions} />
                </div>
              </ChartCard>

              <ChartCard>
                <ChartTitle>
                  <Target size={16} />
                  Vitórias vs Derrotas
                </ChartTitle>
                <div style={{ height: '200px' }}>
                  <Doughnut 
                    data={chartData.winLossData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: '#cdbe91',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </ChartCard>
            </ChartsGrid>
          )}

          {/* Lista de Partidas Recentes */}
          <RecentMatches>
            <h4 style={{ color: '#c89b3c', marginBottom: '1rem' }}>Partidas Recentes</h4>
            {matchStats.playerMatches.slice(0, 5).map(({ match, participant }, index) => {
              if (!participant) return null;
              
              const gameDate = new Date(match.info.gameCreation);
              const gameDuration = Math.floor(match.info.gameDuration / 60);
              
              return (
                <MatchCard key={index} isWin={participant.win}>
                  <MatchChampionImage
                    src={getChampionImageUrl(participant.championId)}
                    alt={getChampionName(participant.championId)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
                    }}
                  />
                  <MatchInfo>
                    <MatchResult isWin={participant.win}>
                      {participant.win ? 'VITÓRIA' : 'DERROTA'}
                    </MatchResult>
                    <MatchDetails>
                      {getChampionName(participant.championId)} • {match.info.gameMode}
                    </MatchDetails>
                    <MatchDetails>
                      {gameDate.toLocaleDateString('pt-BR')} • {gameDuration}min
                    </MatchDetails>
                  </MatchInfo>
                  <MatchKDA>
                    {participant.kills}/{participant.deaths}/{participant.assists}
                  </MatchKDA>
                </MatchCard>
              );
            })}
          </RecentMatches>
        </MatchHistorySection>
      )}

      {/* Loading do histórico */}
      {(matchIdsLoading || matchesLoading) && (
        <MatchHistorySection>
          <LoadingSpinner message="Carregando histórico de partidas..." />
        </MatchHistorySection>
      )}
    </ProfileContainer>
  );
};

export default PlayerProfile;
