# 🔧 Solução de Problemas - NexusLab

## 🚨 Problemas Mais Comuns e Soluções

### 1. 🔑 "API Key inválida ou expirada"

**Sintomas:**
- Erro ao pesquisar jogadores
- Mensagem: "Chave de API inválida ou expirada"
- Status da API mostra erro

**Soluções:**
1. **Gere uma nova API Key**:
   - Acesse: https://developer.riotgames.com/
   - Clique em "REGENERATE API KEY"
   - Copie a nova chave

2. **Atualize o arquivo .env**:
   ```
   REACT_APP_RIOT_API_KEY=RGAPI-nova-chave-aqui
   ```

3. **Reinicie o servidor**:
   ```bash
   # Pare o servidor (Ctrl+C)
   npm start
   ```

### 2. 🖼️ "Imagens dos campeões não aparecem"

**Sintomas:**
- Ícones genéricos no lugar das imagens dos campeões
- Imagens quebradas

**Soluções:**
1. **Aguarde o carregamento** - as imagens podem demorar alguns segundos
2. **Verifique sua conexão com a internet**
3. **Limpe o cache do navegador** (Ctrl+F5)
4. **Teste com diferentes campeões**

### 3. 🔍 "Pesquisa de invocador não funciona"

**Sintomas:**
- "Invocador não encontrado"
- Erro ao buscar perfil
- Página não carrega

**Soluções:**
1. **Verifique o nome exato**:
   - Sem espaços extras
   - Case-sensitive em alguns casos
   - Caracteres especiais podem causar problemas

2. **Teste com invocadores conhecidos**:
   - `Brtt` (Brasil)
   - `Faker` (Coreia)
   - `Doublelift` (América do Norte)

3. **Verifique a região**:
   - O projeto está configurado para BR
   - Invocadores de outras regiões não funcionarão

### 4. 📊 "Gráficos não aparecem ou estão quebrados"

**Sintomas:**
- Área vazia onde deveria ter gráfico
- Erros no console do navegador

**Soluções:**
1. **Aguarde carregar os dados** - gráficos dependem das partidas
2. **Verifique se o jogador tem partidas recentes**
3. **Recarregue a página**

### 5. ⚡ "Rate limit excedido"

**Sintomas:**
- "Muitas requisições. Aguarde alguns minutos"
- Erro 429

**Soluções:**
1. **Aguarde 2-3 minutos** antes de nova tentativa
2. **Evite pesquisas muito rápidas consecutivas**
3. **Para uso intenso**, considere uma API Key de produção

### 6. 🌐 "Problemas de CORS"

**Sintomas:**
- Erros de CORS no console
- Requisições bloqueadas

**Soluções:**
1. **Instale extensão de CORS**:
   - Chrome: "CORS Unblock"
   - Firefox: "CORS Everywhere"

2. **Para desenvolvimento**, use proxy:
   ```bash
   # Instalar proxy
   npm install -g local-cors-proxy
   # Executar
   lcp --proxyUrl https://br1.api.riotgames.com
   ```

## 🔍 Como Debuggar

### 1. **Console do Navegador**
```bash
# Abrir DevTools
F12 (ou Ctrl+Shift+I)
# Ir para aba Console
# Procurar por erros em vermelho
```

### 2. **Status da API**
- Clique no ícone no canto superior direito
- Verifique se todos os status estão "OK"
- Use "Verificar Novamente" se necessário

### 3. **Network Tab**
```bash
# No DevTools, aba Network
# Filtrar por "XHR" ou "Fetch"
# Ver requisições falhando
# Verificar status codes
```

## 📋 Checklist de Verificação

Antes de reportar um problema, verifique:

- [ ] **API Key configurada** no arquivo .env
- [ ] **Servidor reiniciado** após configurar .env
- [ ] **Nome do invocador correto** (sem espaços extras)
- [ ] **Conexão com internet** funcionando
- [ ] **Console sem erros** críticos
- [ ] **Status da API** mostrando "OK"

## 🛠️ Problemas Técnicos

### "Module not found"
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### TypeScript errors
```bash
# Verificar erros
npx tsc --noEmit
# Ou ignorar temporariamente
# @ts-ignore
```

## 📞 Quando Pedir Ajuda

Se o problema persistir, forneça:

1. **Erro exato** (copie a mensagem completa)
2. **Console do navegador** (screenshot ou texto)
3. **Passos para reproduzir** o problema
4. **Sistema operacional** e navegador
5. **Status da API** (screenshot do componente de status)

## 🎯 Testes Rápidos

### Teste 1: API Key
```javascript
// Cole no console do navegador
fetch('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Brtt', {
  headers: { 'X-Riot-Token': 'SUA-API-KEY-AQUI' }
}).then(r => r.json()).then(console.log);
```

### Teste 2: Data Dragon
```javascript
// Cole no console do navegador
fetch('https://ddragon.leagueoflegends.com/api/versions.json')
  .then(r => r.json()).then(console.log);
```

### Teste 3: Variáveis de Ambiente
```javascript
// Cole no console do navegador
console.log('API Key configurada:', !!process.env.REACT_APP_RIOT_API_KEY);
```

---

**💡 Dica**: A maioria dos problemas é resolvida configurando corretamente a API Key e aguardando alguns segundos para carregar os dados!
