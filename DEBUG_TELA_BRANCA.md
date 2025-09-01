# 🔍 Debug Tela Branca no Vercel

## 🚨 Problema: Tela Branca no Deploy

### 📋 Possíveis Causas:
1. **Erro de roteamento** (React Router no Vercel)
2. **Erro JavaScript** não capturado
3. **Problema de build** ou assets
4. **Variáveis de ambiente** não configuradas

## ✅ Correções Aplicadas

### **1. Corrigido vercel.json**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### **2. Adicionado Loading Fallback**
- Tela de carregamento enquanto React não carrega
- Mostra "⚡ NexusLab - Carregando aplicação..."

### **3. Tratamento de Erro Global**
- Captura erros JavaScript
- Mostra mensagem de erro em caso de falha
- Logs detalhados no console

## 🔍 Como Debuggar

### **1. Abrir DevTools no Site**
```
F12 → Console
```

### **2. Verificar Mensagens:**
- ✅ `✅ NexusLab carregado com sucesso!`
- ❌ `❌ Erro ao renderizar aplicação:`
- ❌ Outros erros em vermelho

### **3. Verificar Network Tab:**
- Se arquivos JS/CSS estão carregando
- Se há erros 404 ou 500

## 🚀 Comandos para Aplicar Correções

```bash
# 1. Commit das correções
git add .
git commit -m "Fix: Corrigir tela branca - roteamento e debug"
git push

# 2. Aguardar deploy automático (2-3 minutos)
```

## 🎯 Verificações Adicionais

### **No Vercel Dashboard:**

1. **Build Logs:**
   - Verificar se build completou com sucesso
   - Procurar por warnings ou erros

2. **Function Logs:**
   - Ver se há erros em runtime
   - Verificar console logs

3. **Environment Variables:**
   - Confirmar se API Key está configurada
   - Verificar se todas as variáveis estão presentes

## 🔧 Se Ainda Estiver Branco

### **Teste 1: URL Direta**
```
https://seu-site.vercel.app/
```

### **Teste 2: Forçar Refresh**
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### **Teste 3: Modo Incógnito**
- Abrir em aba anônima
- Verificar se funciona sem cache

### **Teste 4: Console Logs**
```javascript
// No console do navegador, verificar:
console.log('React:', typeof React);
console.log('ReactDOM:', typeof ReactDOM);
console.log('Root element:', document.getElementById('root'));
```

## 📊 Estados Esperados

### **✅ Funcionando:**
- Loading inicial aparece
- Depois carrega a página do NexusLab
- Console mostra: `✅ NexusLab carregado com sucesso!`

### **⚠️ Loading Infinito:**
- Fica na tela "Carregando aplicação..."
- Problema no JavaScript ou dependências

### **❌ Erro Visível:**
- Mostra "❌ Erro - Falha ao carregar NexusLab"
- Verificar console para detalhes

## 🆘 Última Opção: Rebuild

### **No Vercel Dashboard:**
1. Ir em **Deployments**
2. Clicar nos **3 pontos** do último deploy
3. **Redeploy**
4. Aguardar novo build

---

**🎯 Com essas correções, a tela branca deve ser resolvida. Se persistir, verifique o console para mensagens de erro específicas!**
