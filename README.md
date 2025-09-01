# NexusLab 🎮

**Aplicação completa para análise de dados da API oficial da Riot Games**

NexusLab é uma plataforma moderna e interativa que permite visualizar perfis de jogadores, estatísticas de campeões e histórico de partidas com gráficos e insights detalhados. O projeto integra análise de dados, visualização interativa e integração com APIs externas em tempo real.

## ✨ Funcionalidades

### 🏆 Perfis de Jogadores
- Visualização completa do perfil do invocador
- Informações de nível, elo e ranking
- Top campeões com maestria
- Estatísticas de ranked (Solo/Duo e Flex)

### 📊 Estatísticas de Campeões
- Base de dados completa com todos os campeões
- Filtros por classe e pesquisa
- Estatísticas de ataque, defesa, magia e dificuldade
- Interface visual moderna com imagens oficiais

### 📈 Histórico de Partidas
- Análise das últimas 20 partidas
- Gráficos interativos de KDA
- Estatísticas de vitórias vs derrotas
- Campeões mais jogados
- Timeline de performance

### 🎨 Interface Moderna
- Design responsivo e elegante
- Tema inspirado no League of Legends
- Animações suaves e transições
- Experiência de usuário intuitiva

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Styled Components
- **Gráficos**: Chart.js + React-Chartjs-2
- **Roteamento**: React Router DOM
- **Estado**: React Query para cache e sincronização
- **API**: Integração com Riot Games API
- **Ícones**: Lucide React

## 📋 Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Chave de API da Riot Games

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/nexuslab.git
cd nexuslab
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configuração da API Key

1. Acesse o [Portal de Desenvolvedores da Riot Games](https://developer.riotgames.com/)
2. Faça login com sua conta da Riot
3. Gere uma chave de API de desenvolvimento
4. Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_RIOT_API_KEY=RGAPI-sua-chave-aqui
REACT_APP_API_BASE_URL=https://br1.api.riotgames.com
REACT_APP_DATA_DRAGON_URL=https://ddragon.leagueoflegends.com
```

### 4. Execute o projeto
```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em `http://localhost:3000`

## 🎯 Como Usar

### Pesquisar Jogador
1. Na página inicial, digite o nome do invocador no campo de pesquisa
2. Clique em "Pesquisar" ou pressione Enter
3. Visualize o perfil completo com estatísticas e rankings

### Explorar Campeões
1. Acesse a aba "Campeões" no menu
2. Use os filtros para encontrar campeões específicos
3. Ordene por diferentes critérios (nome, dificuldade, etc.)

### Analisar Histórico
1. No perfil do jogador, clique em "Histórico de Partidas"
2. Visualize gráficos interativos e estatísticas
3. Analise performance ao longo do tempo

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── Footer.tsx      # Rodapé com disclaimer
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── pages/              # Páginas principais
│   ├── Home.tsx        # Página inicial
│   ├── PlayerProfile.tsx
│   ├── ChampionStats.tsx
│   └── MatchHistory.tsx
├── services/           # Integração com APIs
│   └── riotApi.ts      # Serviço da Riot Games API
├── types/              # Definições TypeScript
│   └── riot.ts         # Tipos da API da Riot
└── App.tsx            # Componente principal
```

## 🌟 Funcionalidades Avançadas

### Rate Limiting
- Sistema inteligente de controle de requisições
- Respeita os limites da API da Riot Games
- Retry automático em caso de rate limit

### Cache Inteligente
- React Query para otimização de requisições
- Cache de dados estáticos (campeões, itens)
- Atualização automática de dados dinâmicos

### Responsividade
- Design adaptável para desktop, tablet e mobile
- Componentes flexíveis e grid responsivo
- Experiência otimizada em todos os dispositivos

## 📊 Métricas e Analytics

### Estatísticas Calculadas
- Taxa de vitória por campeão
- KDA médio e por partida
- Performance ao longo do tempo
- Tendências de picks

### Visualizações
- Gráficos de linha para KDA
- Gráficos de pizza para vitórias/derrotas
- Gráficos de barras para campeões mais jogados
- Cards informativos com métricas

## 🔒 Conformidade e Políticas

Este projeto está em conformidade com as [Políticas da Riot Games](https://developer.riotgames.com/docs/portal):

- ✅ Uso adequado da API oficial
- ✅ Disclaimer obrigatório presente
- ✅ Rate limiting implementado
- ✅ Não oferece vantagens injustas
- ✅ Dados atualizados em tempo real

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ⚠️ Disclaimer

NexusLab não é endossado pela Riot Games e não reflete as opiniões ou opiniões da Riot Games ou de qualquer pessoa oficialmente envolvida na produção ou gerenciamento das propriedades da Riot Games. Riot Games e todas as propriedades associadas são marcas comerciais ou registradas da Riot Games, Inc.

## 📞 Suporte

- 📧 Email: contato@nexuslab.dev
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/nexuslab/issues)
- 📖 Documentação: [Wiki do Projeto](https://github.com/seu-usuario/nexuslab/wiki)

---

Desenvolvido com ❤️ para a comunidade do League of Legends