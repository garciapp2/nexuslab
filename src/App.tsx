import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import PlayerProfile from './pages/PlayerProfile';
import ChampionStats from './pages/ChampionStats';
import MatchHistory from './pages/MatchHistory';
import Footer from './components/Footer';
import ApiStatus from './components/ApiStatus';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0a1428 0%, #1e2328 100%);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player/:playerName" element={<PlayerProfile />} />
          <Route path="/champions" element={<ChampionStats />} />
          <Route path="/matches/:playerId" element={<MatchHistory />} />
        </Routes>
      </MainContent>
      <Footer />
      <ApiStatus />
    </AppContainer>
  );
};

export default App;
