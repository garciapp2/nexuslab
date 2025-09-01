# 🔑 Configuração da API da Riot Games - OBRIGATÓRIO

## ⚠️ IMPORTANTE: Sem API Key, a aplicação não funcionará!

### 1. Obter API Key da Riot Games

1. **Acesse**: https://developer.riotgames.com/
2. **Faça login** com sua conta da Riot Games (a mesma do League of Legends)
3. **Clique em "REGENERATE API KEY"** (ou "GENERATE API KEY" se for a primeira vez)
4. **Copie a chave** que aparecerá (formato: `RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2. Configurar no Projeto

#### Método 1: Arquivo .env (Recomendado)
1. **Crie um arquivo** chamado `.env` na raiz do projeto (mesmo local do package.json)
2. **Adicione a linha**:
```
REACT_APP_RIOT_API_KEY=RGAPI-sua-chave-copiada-aqui
```

#### Método 2: Windows PowerShell
```powershell
# Execute no terminal dentro da pasta do projeto
echo "REACT_APP_RIOT_API_KEY=RGAPI-sua-chave-aqui" > .env
```

#### Método 3: Prompt de Comando
```cmd
echo REACT_APP_RIOT_API_KEY=RGAPI-sua-chave-aqui > .env
```

### 3. Exemplo de arquivo .env completo:
```
REACT_APP_RIOT_API_KEY=RGAPI-12345678-1234-1234-1234-123456789abc
REACT_APP_API_BASE_URL=https://br1.api.riotgames.com
REACT_APP_DATA_DRAGON_URL=https://ddragon.leagueoflegends.com
```

### 4. Verificar se está funcionando

1. **Reinicie o servidor** (Ctrl+C e depois `npm start`)
2. **Abra a aplicação** em http://localhost:3000
3. **Clique no ícone de alerta** no canto superior direito para ver o status da API
4. **Todos os itens devem aparecer como "OK"**

## 🔧 Solução de Problemas

### ❌ "API Key: Erro (Configure no .env)"
- **Problema**: Arquivo .env não existe ou está mal configurado
- **Solução**: Crie o arquivo .env com a linha correta

### ❌ "Riot API: Erro (Verifique API Key)"
- **Problema**: API Key inválida ou expirada
- **Soluções**:
  1. Gere uma nova chave em https://developer.riotgames.com/
  2. Verifique se copiou a chave completa
  3. Certifique-se de não ter espaços extras

### ❌ "Invocador não encontrado"
- **Problema**: Nome do invocador incorreto ou não existe
- **Soluções**:
  1. Verifique se o nome está correto (sem espaços extras)
  2. Teste com invocadores conhecidos como "Faker" ou "Brtt"
  3. Certifique-se de que o invocador existe no servidor BR

### ❌ "Muitas requisições"
- **Problema**: Rate limit da API excedido
- **Solução**: Aguarde 2 minutos antes de fazer novas pesquisas

### ❌ Imagens dos campeões não aparecem
- **Problema**: Conexão com Data Dragon ou nomes incorretos
- **Soluções**:
  1. Verifique sua conexão com a internet
  2. Aguarde alguns segundos para carregar
  3. Recarregue a página

## 📝 Dicas Importantes

### 🕐 **Expiração da API Key**
- **Chaves de desenvolvimento expiram em 24 horas**
- **Para uso prolongado**, solicite uma chave de produção no portal da Riot
- **Regenere diariamente** se necessário

### 🌍 **Servidores**
- **Este projeto está configurado para o servidor BR (Brasil)**
- **Para outros servidores**, altere a URL em `src/services/riotApi.ts`:
  - NA: `https://na1.api.riotgames.com`
  - EUW: `https://euw1.api.riotgames.com`
  - KR: `https://kr.api.riotgames.com`

### 🔒 **Segurança**
- **NUNCA compartilhe sua API Key**
- **NUNCA faça commit do arquivo .env**
- **Para produção**, use variáveis de ambiente do servidor

## ✅ Teste Rápido

Depois de configurar, teste com estes invocadores conhecidos:
- **Brtt** (jogador brasileiro famoso)
- **Faker** (jogador coreano famoso)
- **Doublelift** (jogador americano famoso)

## 🆘 Ainda não funciona?

1. **Verifique o console do navegador** (F12 → Console) para ver erros
2. **Teste a API Key manualmente**:
   ```
   https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Brtt?api_key=SUA-CHAVE-AQUI
   ```
3. **Confirme que o arquivo .env está na raiz** (mesmo nível do package.json)
4. **Reinicie completamente** o servidor de desenvolvimento

---

**Após configurar corretamente, a aplicação funcionará perfeitamente! 🎮✨**
