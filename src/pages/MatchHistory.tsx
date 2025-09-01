import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
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
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Clock, TrendingUp, Target, Award, Activity } from 'lucide-react';
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

const MatchHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #c89b3c;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  color: #cdbe91;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
  text-align: center;
`;

const StatIcon = styled.div`
  color: #c89b3c;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #f0e6d2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #cdbe91;
  font-size: 0.9rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
`;

const ChartTitle = styled.h3`
  color: #c89b3c;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const MatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MatchCard = styled.div<{ isWin: boolean }>`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid ${props => props.isWin ? '#5bc0de' : '#dc143c'};
  backdrop-filter: blur(10px);
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

const ChampionImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 2px solid #c89b3c;
`;

const MatchInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MatchResult = styled.div<{ isWin: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.isWin ? '#5bc0de' : '#dc143c'};
`;

const MatchDetails = styled.div`
  color: #cdbe91;
  font-size: 0.9rem;
`;

const KDA = styled.div`
  color: #f0e6d2;
  font-size: 1.1rem;
  font-weight: bold;
`;

const MatchHistory: React.FC = () => {
  const { playerId } = useParams<{ playerId: string }>();
  
  // Decodificar o ID do jogador da URL
  const decodedPlayerId = playerId ? decodeURIComponent(playerId) : undefined;

  const {
    data: matchIds,
    isLoading: matchIdsLoading,
    error: matchIdsError,
  } = useQuery(
    ['matchHistory', decodedPlayerId],
    () => RiotApiService.getMatchHistory(decodedPlayerId!, 20),
    { enabled: !!decodedPlayerId }
  );

  const {
    data: matches,
    isLoading: matchesLoading,
  } = useQuery(
    ['matches', matchIds],
    async () => {
      if (!matchIds || matchIds.length === 0) return [];
      const matchPromises = matchIds.map(matchId => 
        RiotApiService.getMatchDetails(matchId)
      );
      const results = await Promise.all(matchPromises);
      return results.filter(match => match !== null);
    },
    { enabled: !!matchIds && matchIds.length > 0 }
  );

  const {
    data: championsData,
  } = useQuery('champions', RiotApiService.getChampionsData);

  const playerStats = useMemo(() => {
    if (!matches || matches.length === 0 || !playerId) return null;

    const playerMatches = matches.map(match => {
      const participant = match!.info.participants.find(p => p.puuid === playerId);
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
  }, [matches, playerId]);

  const chartData = useMemo(() => {
    if (!playerStats) return null;

    const last10Matches = playerStats.playerMatches.slice(0, 10).reverse();
    
    // Gráfico de KDA ao longo do tempo
    const kdaData = {
      labels: last10Matches.map((_, index) => `Partida ${index + 1}`),
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
          data: [playerStats.wins, playerStats.losses],
          backgroundColor: ['#5bc0de', '#dc143c'],
          borderColor: ['#5bc0de', '#dc143c'],
          borderWidth: 2,
        },
      ],
    };

    // Gráfico de campeões mais jogados
    const championStats = playerStats.playerMatches.reduce((acc, { participant }) => {
      const championId = participant!.championId;
      if (!acc[championId]) {
        acc[championId] = { count: 0, wins: 0 };
      }
      acc[championId].count++;
      if (participant!.win) acc[championId].wins++;
      return acc;
    }, {} as Record<number, { count: number; wins: number }>);

    const topChampions = Object.entries(championStats)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5);

    const championData = {
      labels: topChampions.map(([championId]) => {
        if (!championsData) return `Champion ${championId}`;
        const champion = Object.values(championsData).find(
          champ => parseInt(champ.key) === parseInt(championId)
        );
        return champion?.name || `Champion ${championId}`;
      }),
      datasets: [
        {
          label: 'Partidas Jogadas',
          data: topChampions.map(([, stats]) => stats.count),
          backgroundColor: '#c89b3c',
          borderColor: '#c89b3c',
          borderWidth: 1,
        },
      ],
    };

    return { kdaData, winLossData, championData };
  }, [playerStats, championsData]);

  if (matchIdsLoading || matchesLoading) {
    return <LoadingSpinner message="Carregando histórico de partidas..." />;
  }

  if (matchIdsError || !matches) {
    return <ErrorMessage message="Erro ao carregar histórico de partidas. Verifique se o ID do jogador está correto." />;
  }

  if (!playerStats) {
    return <ErrorMessage message="Nenhuma partida encontrada para este jogador." />;
  }

  const getChampionName = (championId: number) => {
    if (!championsData) return `Champion ${championId}`;
    const champion = Object.values(championsData).find(
      champ => parseInt(champ.key) === championId
    );
    return champion?.name || `Champion ${championId}`;
  };

  const getChampionImageUrl = (championId: number) => {
    if (!championsData) return 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
    const champion = Object.values(championsData).find(
      champ => parseInt(champ.key) === championId
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
    <MatchHistoryContainer>
      <Header>
        <PageTitle>Histórico de Partidas</PageTitle>
        <Subtitle>Análise detalhada das últimas partidas com gráficos e insights</Subtitle>
      </Header>

      <StatsOverview>
        <StatCard>
          <StatIcon>
            <Activity size={32} />
          </StatIcon>
          <StatValue>{playerStats.totalMatches}</StatValue>
          <StatLabel>Total de Partidas</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <TrendingUp size={32} />
          </StatIcon>
          <StatValue>{playerStats.winRate.toFixed(1)}%</StatValue>
          <StatLabel>Taxa de Vitória</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <Target size={32} />
          </StatIcon>
          <StatValue>{playerStats.avgKDA.toFixed(2)}</StatValue>
          <StatLabel>KDA Médio</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>
            <Award size={32} />
          </StatIcon>
          <StatValue>{playerStats.avgKills.toFixed(1)}/{playerStats.avgDeaths.toFixed(1)}/{playerStats.avgAssists.toFixed(1)}</StatValue>
          <StatLabel>K/D/A Médio</StatLabel>
        </StatCard>
      </StatsOverview>

      {chartData && (
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>
              <TrendingUp size={20} />
              KDA das Últimas 10 Partidas
            </ChartTitle>
            <div style={{ height: '300px' }}>
              <Line data={chartData.kdaData} options={chartOptions} />
            </div>
          </ChartCard>

          <ChartCard>
            <ChartTitle>
              <Target size={20} />
              Vitórias vs Derrotas
            </ChartTitle>
            <div style={{ height: '300px' }}>
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

          <ChartCard>
            <ChartTitle>
              <Award size={20} />
              Campeões Mais Jogados
            </ChartTitle>
            <div style={{ height: '300px' }}>
              <Bar data={chartData.championData} options={chartOptions} />
            </div>
          </ChartCard>
        </ChartsGrid>
      )}

      <ChartCard>
        <ChartTitle>
          <Clock size={20} />
          Últimas Partidas
        </ChartTitle>
        <MatchesList>
          {playerStats.playerMatches.slice(0, 10).map(({ match, participant }, index) => {
            if (!participant) return null;
            
            const gameDate = new Date(match.info.gameCreation);
            const gameDuration = Math.floor(match.info.gameDuration / 60);
            
            return (
              <MatchCard key={index} isWin={participant.win}>
                <ChampionImage
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
                <KDA>
                  {participant.kills}/{participant.deaths}/{participant.assists}
                </KDA>
              </MatchCard>
            );
          })}
        </MatchesList>
      </ChartCard>
    </MatchHistoryContainer>
  );
};

export default MatchHistory;
