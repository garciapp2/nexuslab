# 🚀 Deploy NexusLab no Vercel

## 📋 Pré-requisitos

1. **Conta no GitHub** (gratuita)
2. **Conta no Vercel** (gratuita) - https://vercel.com
3. **API Key da Riot Games** (já configurada)

## 🛠️ Passo a Passo Completo

### 1. **Preparar o Projeto para Git**

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - NexusLab projeto completo"
```

### 2. **Criar Repositório no GitHub**

1. Acesse: https://github.com
2. Clique em **"New repository"**
3. Nome: `nexuslab`
4. Deixe **público** ou **privado** (sua escolha)
5. **NÃO** marque "Initialize with README" (já temos)
6. Clique **"Create repository"**

### 3. **Conectar Projeto ao GitHub**

```bash
# Adicionar origin (substitua SEU-USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU-USUARIO/nexuslab.git

# Fazer push do código
git branch -M main
git push -u origin main
```

### 4. **Deploy no Vercel**

#### **Opção A: Via Site do Vercel (Mais Fácil)**

1. **Acesse**: https://vercel.com
2. **Faça login** com GitHub
3. Clique **"New Project"**
4. **Selecione** o repositório `nexuslab`
5. **Configure as variáveis de ambiente**:
   - `REACT_APP_RIOT_API_KEY`: Sua chave da Riot Games
   - `REACT_APP_API_BASE_URL`: `https://br1.api.riotgames.com`
   - `REACT_APP_DATA_DRAGON_URL`: `https://ddragon.leagueoflegends.com`
6. Clique **"Deploy"**

#### **Opção B: Via CLI do Vercel**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login

# Deploy do projeto
vercel

# Seguir as instruções:
# - Set up and deploy? Y
# - Which scope? (sua conta)
# - Link to existing project? N
# - What's your project's name? nexuslab
# - In which directory is your code located? ./
```

### 5. **Configurar Variáveis de Ambiente no Vercel**

#### **Via Dashboard:**
1. Acesse seu projeto no Vercel
2. Vá em **"Settings" → "Environment Variables"**
3. Adicione:
   - **Name**: `REACT_APP_RIOT_API_KEY`
   - **Value**: `RGAPI-sua-chave-aqui`
   - **Environment**: Production, Preview, Development

4. Adicione também:
   - `REACT_APP_API_BASE_URL`: `https://br1.api.riotgames.com`
   - `REACT_APP_DATA_DRAGON_URL`: `https://ddragon.leagueoflegends.com`

#### **Via CLI:**
```bash
# Definir variáveis de ambiente
vercel env add REACT_APP_RIOT_API_KEY

# Quando perguntado, cole sua API Key
# Selecione: Production, Preview, Development
```

### 6. **Redesploy Após Configurar Variáveis**

```bash
# Fazer novo deploy com as variáveis
vercel --prod
```

## 🎯 URLs do Projeto

Após o deploy, você terá:
- **URL de Produção**: `https://nexuslab-seu-usuario.vercel.app`
- **URL de Preview**: Para cada push no GitHub
- **Dashboard**: https://vercel.com/dashboard

## 🔧 Configurações Importantes

### **Domínio Customizado (Opcional)**
1. No Vercel Dashboard → **"Domains"**
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

### **Atualizações Automáticas**
- **Cada push** no GitHub = novo deploy automático
- **Branch main** = produção
- **Outras branches** = preview

### **Monitoramento**
- **Analytics**: Vercel Analytics (gratuito)
- **Logs**: Ver erros em tempo real
- **Performance**: Métricas automáticas

## 🚨 Problemas Comuns e Soluções

### **❌ "Build Failed"**
```bash
# Testar build localmente primeiro
npm run build

# Se der erro, corrigir e fazer novo commit
git add .
git commit -m "Fix build errors"
git push
```

### **❌ "API Key Not Found"**
- Verificar se variáveis de ambiente estão configuradas
- Fazer novo deploy: `vercel --prod`

### **❌ "CORS Errors"**
- Configurar proxy ou usar API backend (para produção séria)
- Para desenvolvimento, funciona com extensões CORS

### **❌ "Rate Limiting"**
- Solicitar API Key de produção no portal da Riot
- Implementar cache mais agressivo

## 📱 Recursos do Vercel Gratuito

- ✅ **100GB** bandwidth/mês
- ✅ **Unlimited** sites estáticos
- ✅ **Automatic SSL** (HTTPS)
- ✅ **Global CDN**
- ✅ **Analytics básico**
- ✅ **Deploy automático**

## 🔐 Segurança da API Key

### **⚠️ IMPORTANTE:**
- **NUNCA** faça commit da API Key no código
- **USE** variáveis de ambiente do Vercel
- **REGENERE** a chave se exposta acidentalmente

### **Para Produção Séria:**
```bash
# Criar backend proxy (opcional)
# Evita expor API Key no frontend
```

## 🎉 Comandos Úteis

```bash
# Ver logs do deploy
vercel logs

# Ver informações do projeto
vercel inspect

# Remover projeto
vercel remove

# Listar projetos
vercel list
```

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Status Page**: https://vercel-status.com
- **Community**: https://github.com/vercel/vercel/discussions

---

**🚀 Após seguir esses passos, seu NexusLab estará online e acessível para o mundo todo!**

**URL Final**: `https://nexuslab-[seu-usuario].vercel.app`
