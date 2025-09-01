import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const StatusContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(30, 35, 40, 0.95);
  border: 1px solid #463714;
  border-radius: 8px;
  padding: 1rem;
  z-index: 1000;
  min-width: 300px;
  backdrop-filter: blur(10px);
`;

const StatusTitle = styled.h4`
  color: #c89b3c;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusItem = styled.div<{ status: 'success' | 'error' | 'loading' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${props => {
    switch (props.status) {
      case 'success': return '#5bc0de';
      case 'error': return '#dc143c';
      case 'loading': return '#c89b3c';
      default: return '#cdbe91';
    }
  }};
  font-size: 0.9rem;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #c89b3c;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

interface ApiStatusProps {
  show?: boolean;
}

const ApiStatus: React.FC<ApiStatusProps> = ({ show = false }) => {
  const [isVisible, setIsVisible] = useState(show);
  const [apiStatus, setApiStatus] = useState({
    riotApi: 'loading' as 'success' | 'error' | 'loading',
    dataDragon: 'loading' as 'success' | 'error' | 'loading',
    apiKey: 'loading' as 'success' | 'error' | 'loading',
  });

  useEffect(() => {
    checkApiStatus();
  }, []);

  const checkApiStatus = async () => {
    // Verificar se a API key está configurada
    const apiKey = process.env.REACT_APP_RIOT_API_KEY;
    if (!apiKey || apiKey === 'RGAPI-YOUR-API-KEY-HERE') {
      setApiStatus(prev => ({ ...prev, apiKey: 'error' }));
    } else {
      setApiStatus(prev => ({ ...prev, apiKey: 'success' }));
    }

    // Verificar Data Dragon
    try {
      const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
      if (response.ok) {
        setApiStatus(prev => ({ ...prev, dataDragon: 'success' }));
      } else {
        setApiStatus(prev => ({ ...prev, dataDragon: 'error' }));
      }
    } catch (error) {
      setApiStatus(prev => ({ ...prev, dataDragon: 'error' }));
    }

    // Verificar Riot API (teste com Riot ID)
    if (apiKey && apiKey !== 'RGAPI-YOUR-API-KEY-HERE') {
      try {
        // Testar novo sistema Riot ID
        const response = await fetch(
          `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/test/BR1`,
          {
            headers: {
              'X-Riot-Token': apiKey,
            },
          }
        );
        if (response.status === 404) {
          // 404 é esperado para um usuário inexistente, mas indica que a API está funcionando
          setApiStatus(prev => ({ ...prev, riotApi: 'success' }));
        } else if (response.status === 403) {
          setApiStatus(prev => ({ ...prev, riotApi: 'error' }));
        } else {
          setApiStatus(prev => ({ ...prev, riotApi: 'success' }));
        }
      } catch (error) {
        // Fallback para API antiga
        try {
          const fallbackResponse = await fetch(
            `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/test`,
            {
              headers: {
                'X-Riot-Token': apiKey,
              },
            }
          );
          if (fallbackResponse.status === 404 || fallbackResponse.status === 200) {
            setApiStatus(prev => ({ ...prev, riotApi: 'success' }));
          } else {
            setApiStatus(prev => ({ ...prev, riotApi: 'error' }));
          }
        } catch (fallbackError) {
          setApiStatus(prev => ({ ...prev, riotApi: 'error' }));
        }
      }
    } else {
      setApiStatus(prev => ({ ...prev, riotApi: 'error' }));
    }
  };

  const getStatusIcon = (status: 'success' | 'error' | 'loading') => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'loading':
        return <Clock size={16} />;
    }
  };

  const getStatusText = (status: 'success' | 'error' | 'loading') => {
    switch (status) {
      case 'success':
        return 'OK';
      case 'error':
        return 'Erro';
      case 'loading':
        return 'Verificando...';
    }
  };

  if (!isVisible) {
    return (
      <ToggleButton onClick={() => setIsVisible(true)}>
        <AlertCircle size={20} color="#0f2027" />
      </ToggleButton>
    );
  }

  return (
    <StatusContainer>
      <StatusTitle>
        <AlertCircle size={20} />
        Status da API
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#c89b3c',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          ✕
        </button>
      </StatusTitle>
      
      <StatusItem status={apiStatus.apiKey}>
        {getStatusIcon(apiStatus.apiKey)}
        API Key: {getStatusText(apiStatus.apiKey)}
        {apiStatus.apiKey === 'error' && ' (Configure no .env)'}
      </StatusItem>
      
      <StatusItem status={apiStatus.dataDragon}>
        {getStatusIcon(apiStatus.dataDragon)}
        Data Dragon: {getStatusText(apiStatus.dataDragon)}
      </StatusItem>
      
      <StatusItem status={apiStatus.riotApi}>
        {getStatusIcon(apiStatus.riotApi)}
        Riot API: {getStatusText(apiStatus.riotApi)}
        {apiStatus.riotApi === 'error' && ' (Verifique API Key)'}
      </StatusItem>

      <button
        onClick={checkApiStatus}
        style={{
          background: '#c89b3c',
          border: 'none',
          color: '#0f2027',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '0.5rem',
          width: '100%',
        }}
      >
        Verificar Novamente
      </button>
    </StatusContainer>
  );
};

export default ApiStatus;
