import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Home, Trophy, BarChart3 } from 'lucide-react';

const HeaderContainer = styled.header`
  background: linear-gradient(90deg, #1e2328 0%, #3c3c41 50%, #1e2328 100%);
  border-bottom: 2px solid #c89b3c;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  color: #c89b3c;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f0e6d2;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #cdbe91;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(200, 155, 60, 0.1);
    color: #f0e6d2;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #463714;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #f0e6d2;
  padding: 0.5rem;
  width: 250px;
  font-size: 1rem;
  
  &::placeholder {
    color: #5bc0de;
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    width: 180px;
  }
`;

const SearchButton = styled.button`
  background: #c89b3c;
  border: none;
  color: #0f2027;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;
  
  &:hover {
    background: #f0e6d2;
  }
`;

const Header: React.FC = () => {
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

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <Trophy size={32} />
          NexusLab
        </Logo>
        
        <Navigation>
          <NavLink to="/">
            <Home size={18} />
            Início
          </NavLink>
          <NavLink to="/champions">
            <BarChart3 size={18} />
            Campeões
          </NavLink>
        </Navigation>

        <form onSubmit={handleSearch}>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Nome do invocador (ex: Nome#TAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <Search size={18} />
            </SearchButton>
          </SearchContainer>
        </form>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
