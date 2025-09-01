# ⚡ Comandos Rápidos para Deploy

## 🚀 Deploy Rápido (5 minutos)

### **1. Preparar Git**
```bash
git init
git add .
git commit -m "Deploy NexusLab no Vercel"
```

### **2. GitHub (substitua SEU-USUARIO)**
```bash
git remote add origin https://github.com/SEU-USUARIO/nexuslab.git
git branch -M main
git push -u origin main
```

### **3. Vercel CLI**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login e deploy
vercel login
vercel

# Configurar variáveis de ambiente
vercel env add REACT_APP_RIOT_API_KEY
# Cole sua API Key quando perguntado

# Deploy final
vercel --prod
```

## 🌐 Ou Via Site (Mais Fácil)

1. **GitHub**: Criar repositório `nexuslab` e fazer push
2. **Vercel**: https://vercel.com → New Project → Selecionar repositório
3. **Environment Variables**:
   - `REACT_APP_RIOT_API_KEY`: `RGAPI-sua-chave`
   - `REACT_APP_API_BASE_URL`: `https://br1.api.riotgames.com`
   - `REACT_APP_DATA_DRAGON_URL`: `https://ddragon.leagueoflegends.com`
4. **Deploy**!

## ✅ Resultado Final

**URL**: `https://nexuslab-[seu-usuario].vercel.app`

---

**🎯 Escolha o método que preferir - ambos funcionam perfeitamente!**
