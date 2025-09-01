import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, TrendingUp, Users, BarChart3, Zap, Shield, Target } from 'lucide-react';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  min-height: 80vh;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: #c89b3c;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #cdbe91;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #463714;
  backdrop-filter: blur(10px);
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #f0e6d2;
  padding: 1rem 1.5rem;
  width: 400px;
  font-size: 1.1rem;
  border-radius: 8px;
  border: 1px solid #463714;
  
  &::placeholder {
    color: #5bc0de;
  }
  
  &:focus {
    outline: none;
    border-color: #c89b3c;
    box-shadow: 0 0 0 2px rgba(200, 155, 60, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  background: linear-gradient(45deg, #c89b3c, #f0e6d2);
  border: none;
  color: #0f2027;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 155, 60, 0.4);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, rgba(30, 35, 40, 0.8) 0%, rgba(60, 60, 65, 0.8) 100%);
  padding: 2rem;
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

const FeatureIcon = styled.div`
  color: #c89b3c;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #f0e6d2;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #cdbe91;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: rgba(30, 35, 40, 0.6);
  padding: 3rem 2rem;
  border-radius: 12px;
  border: 1px solid #463714;
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 1200px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #c89b3c;
`;

const StatLabel = styled.div`
  color: #cdbe91;
  font-size: 1.1rem;
`;

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Para nomes com #, usar uma abordagem diferente
      const cleanQuery = searchQuery.trim();
      if (cleanQuery.includes('#')) {
        // Codificar apenas o # como %23, mas manter o resto legível
        const encodedQuery = cleanQuery.replace('#', '%23');
        navigate(`/player/${encodedQuery}`);
      } else {
        navigate(`/player/${encodeURIComponent(cleanQuery)}`);
      }
      setSearchQuery('');
    }
  };

  const features = [
    {
      icon: <Users size={48} />,
      title: 'Perfis de Jogadores',
      description: 'Visualize informações detalhadas sobre qualquer jogador: nível, elo, campeões favoritos e muito mais.',
    },
    {
      icon: <BarChart3 size={48} />,
      title: 'Estatísticas de Campeões',
      description: 'Analise dados completos sobre todos os campeões: taxa de vitória, KDA médio, popularidade e tendências.',
    },
    {
      icon: <TrendingUp size={48} />,
      title: 'Histórico de Partidas',
      description: 'Explore o histórico detalhado de partidas com gráficos interativos e insights avançados.',
    },
    {
      icon: <Target size={48} />,
      title: 'Análise de Performance',
      description: 'Identifique pontos fortes e áreas de melhoria com análises detalhadas de performance.',
    },
    {
      icon: <Shield size={48} />,
      title: 'Dados em Tempo Real',
      description: 'Informações atualizadas diretamente da API oficial da Riot Games em tempo real.',
    },
    {
      icon: <Zap size={48} />,
      title: 'Interface Moderna',
      description: 'Experiência de usuário intuitiva e responsiva com visualizações interativas.',
    },
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>NexusLab</Title>
        <Subtitle>
          A plataforma definitiva para análise de dados do League of Legends. 
          Explore perfis, estatísticas e insights detalhados com dados oficiais da Riot Games.
        </Subtitle>
      </Hero>

      <SearchSection>
        <SearchContainer onSubmit={handleSearch}>
          <SearchInput
            type="text"
            placeholder="Digite o nome do invocador (ex: NomeJogador#BR1)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            <Search size={20} />
            Pesquisar
          </SearchButton>
        </SearchContainer>
        <p style={{ color: '#5bc0de', fontSize: '0.9rem', textAlign: 'center', marginTop: '0.5rem' }}>
          💡 Dica: Use o formato completo "Nome#TAG" ou apenas "Nome" para contas antigas
        </p>
      </SearchSection>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatNumber>164</StatNumber>
            <StatLabel>Campeões Disponíveis</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>∞</StatNumber>
            <StatLabel>Jogadores Analisáveis</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>100%</StatNumber>
            <StatLabel>Dados Oficiais</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>24/7</StatNumber>
            <StatLabel>Disponibilidade</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home;
