import React, { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Search, TrendingUp, Target, Shield, Sword } from 'lucide-react';
import { RiotApiService } from '../services/riotApi';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ChampionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
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

const FiltersContainer = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #463714;
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #f0e6d2;
  padding: 0.5rem;
  width: 100%;
  font-size: 1rem;
  
  &::placeholder {
    color: #5bc0de;
  }
  
  &:focus {
    outline: none;
  }
`;

const FilterSelect = styled.select`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #463714;
  color: #f0e6d2;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #c89b3c;
  }
  
  option {
    background: #1e2328;
    color: #f0e6d2;
  }
`;

const ChampionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChampionCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(200, 155, 60, 0.2);
    border-color: #c89b3c;
  }
`;

const ChampionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ChampionImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: 2px solid #c89b3c;
`;

const ChampionInfo = styled.div`
  flex: 1;
`;

const ChampionName = styled.h3`
  color: #f0e6d2;
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
`;

const ChampionTitle = styled.p`
  color: #cdbe91;
  font-size: 0.9rem;
  margin: 0;
  font-style: italic;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid #463714;
`;

const StatIcon = styled.div`
  color: #c89b3c;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #f0e6d2;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
`;

const StatLabel = styled.div`
  color: #cdbe91;
  font-size: 0.8rem;
  text-align: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(200, 155, 60, 0.2);
  color: #c89b3c;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid rgba(200, 155, 60, 0.3);
`;

const DifficultyBar = styled.div<{ difficulty: number }>`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  margin-top: 0.5rem;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => (props.difficulty / 10) * 100}%;
    background: linear-gradient(90deg, #5bc0de, #c89b3c, #dc143c);
    border-radius: 2px;
  }
`;

const ChampionStats: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterRole, setFilterRole] = useState('all');

  const {
    data: championsData,
    isLoading,
    error,
  } = useQuery('champions', RiotApiService.getChampionsData);

  const champions = useMemo(() => {
    if (!championsData) return [];
    return Object.values(championsData);
  }, [championsData]);

  const filteredAndSortedChampions = useMemo(() => {
    let filtered = champions.filter(champion => {
      const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          champion.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || champion.tags.includes(filterRole);
      
      return matchesSearch && matchesRole;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          return b.info.difficulty - a.info.difficulty;
        case 'attack':
          return b.info.attack - a.info.attack;
        case 'defense':
          return b.info.defense - a.info.defense;
        case 'magic':
          return b.info.magic - a.info.magic;
        default:
          return 0;
      }
    });

    return filtered;
  }, [champions, searchTerm, sortBy, filterRole]);

  if (isLoading) {
    return <LoadingSpinner message="Carregando dados dos campeões..." />;
  }

  if (error) {
    return <ErrorMessage message="Erro ao carregar dados dos campeões. Tente novamente mais tarde." />;
  }

  const getRoleDisplayName = (role: string) => {
    const roleNames: { [key: string]: string } = {
      'Fighter': 'Lutador',
      'Tank': 'Tanque',
      'Assassin': 'Assassino',
      'Mage': 'Mago',
      'Marksman': 'Atirador',
      'Support': 'Suporte',
    };
    return roleNames[role] || role;
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'attack':
        return <Sword size={20} />;
      case 'defense':
        return <Shield size={20} />;
      case 'magic':
        return <Target size={20} />;
      case 'difficulty':
        return <TrendingUp size={20} />;
      default:
        return <Target size={20} />;
    }
  };

  const uniqueRoles = Array.from(new Set(champions.flatMap(c => c.tags)));

  return (
    <ChampionsContainer>
      <Header>
        <Title>Estatísticas de Campeões</Title>
        <Subtitle>
          Explore dados detalhados sobre todos os campeões do League of Legends
        </Subtitle>
      </Header>

      <FiltersContainer>
        <SearchContainer>
          <Search size={20} color="#5bc0de" />
          <SearchInput
            type="text"
            placeholder="Pesquisar campeões..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>

        <FilterSelect
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">Todas as Classes</option>
          {uniqueRoles.map(role => (
            <option key={role} value={role}>
              {getRoleDisplayName(role)}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Ordenar por Nome</option>
          <option value="difficulty">Ordenar por Dificuldade</option>
          <option value="attack">Ordenar por Ataque</option>
          <option value="defense">Ordenar por Defesa</option>
          <option value="magic">Ordenar por Magia</option>
        </FilterSelect>
      </FiltersContainer>

      <ChampionGrid>
        {filteredAndSortedChampions.map((champion) => (
          <ChampionCard key={champion.id}>
            <ChampionHeader>
              <ChampionImage
                src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${champion.id}.png`}
                alt={champion.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/29.png';
                }}
              />
              <ChampionInfo>
                <ChampionName>{champion.name}</ChampionName>
                <ChampionTitle>{champion.title}</ChampionTitle>
              </ChampionInfo>
            </ChampionHeader>

            <StatsGrid>
              <StatItem>
                <StatIcon>{getStatIcon('attack')}</StatIcon>
                <StatValue>{champion.info.attack}/10</StatValue>
                <StatLabel>Ataque</StatLabel>
              </StatItem>
              <StatItem>
                <StatIcon>{getStatIcon('defense')}</StatIcon>
                <StatValue>{champion.info.defense}/10</StatValue>
                <StatLabel>Defesa</StatLabel>
              </StatItem>
              <StatItem>
                <StatIcon>{getStatIcon('magic')}</StatIcon>
                <StatValue>{champion.info.magic}/10</StatValue>
                <StatLabel>Magia</StatLabel>
              </StatItem>
              <StatItem>
                <StatIcon>{getStatIcon('difficulty')}</StatIcon>
                <StatValue>{champion.info.difficulty}/10</StatValue>
                <StatLabel>Dificuldade</StatLabel>
              </StatItem>
            </StatsGrid>

            <TagsContainer>
              {champion.tags.map((tag, index) => (
                <Tag key={index}>{getRoleDisplayName(tag)}</Tag>
              ))}
            </TagsContainer>

            <DifficultyBar difficulty={champion.info.difficulty} />
          </ChampionCard>
        ))}
      </ChampionGrid>

      {filteredAndSortedChampions.length === 0 && (
        <ErrorMessage message="Nenhum campeão encontrado com os filtros aplicados." />
      )}
    </ChampionsContainer>
  );
};

export default ChampionStats;
