# Guia de Instalação Rápida - NexusLab

## 🚀 Instalação Automática

Execute os comandos abaixo no terminal:

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo de ambiente
echo "REACT_APP_RIOT_API_KEY=RGAPI-YOUR-API-KEY-HERE" > .env
echo "REACT_APP_API_BASE_URL=https://br1.api.riotgames.com" >> .env
echo "REACT_APP_DATA_DRAGON_URL=https://ddragon.leagueoflegends.com" >> .env

# 3. Editar a API Key (substitua YOUR-API-KEY-HERE pela sua chave)
# Obtenha sua chave em: https://developer.riotgames.com/

# 4. Iniciar o projeto
npm start
```

## 📋 Checklist de Configuração

- [ ] Node.js 16+ instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` criado
- [ ] API Key da Riot Games configurada
- [ ] Projeto rodando em `http://localhost:3000`

## 🔧 Solução de Problemas

### Erro de API Key
Se você receber erros relacionados à API:
1. Verifique se sua chave está correta no arquivo `.env`
2. Certifique-se de que a chave não expirou (chaves de desenvolvimento expiram em 24h)
3. Gere uma nova chave em https://developer.riotgames.com/

### Erro de CORS
Se houver problemas de CORS:
1. Use uma extensão de navegador para desabilitar CORS temporariamente
2. Ou configure um proxy reverso
3. Para produção, implemente um backend que faça as chamadas da API

### Problemas de Rate Limiting
- O sistema já possui controle de rate limiting integrado
- Aguarde alguns minutos se receber erro 429
- Considere usar uma chave de produção para limites maiores

## 🎯 Primeiros Passos

1. Acesse `http://localhost:3000`
2. Digite um nome de invocador na pesquisa
3. Explore as funcionalidades:
   - Perfil do jogador
   - Estatísticas de campeões
   - Histórico de partidas com gráficos

## 📞 Suporte

Se precisar de ajuda:
- Consulte o README.md principal
- Verifique a documentação da API da Riot Games
- Abra uma issue no repositório
