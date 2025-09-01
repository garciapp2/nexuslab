# 🆔 Sistema Riot ID - Novo Formato de Nomes

## 🔄 O que mudou?

A Riot Games implementou um novo sistema de identificação chamado **Riot ID**, que substitui o sistema antigo de nomes únicos.

### ⚡ Formato Antigo (Descontinuado)
```
NomeDoJogador
```
- Nome único por servidor
- Limitado a caracteres específicos
- Difícil conseguir nomes desejados

### ✨ Formato Novo (Riot ID)
```
NomeDoJogador#TAG
```
- Nome + TAG de identificação
- Permite nomes repetidos (diferenciados pela TAG)
- Mais flexibilidade na escolha de nomes

## 🎯 Como Usar no NexusLab

### ✅ **Formatos Suportados:**

#### 1. **Riot ID Completo** (Recomendado)
```
takumi#eita
Faker#KR1  
Brtt#BR1
Doublelift#NA1
```

#### 2. **Nome Antigo** (Fallback)
```
Faker
Brtt  
Doublelift
```

### 🔍 **Como Encontrar seu Riot ID:**

1. **No Cliente do League of Legends:**
   - Seu nome aparece como `Nome#TAG` no canto superior direito
   - Exemplo: `SeuNome#BR1`

2. **No Jogo:**
   - Pressione Tab durante uma partida
   - Veja os nomes completos dos jogadores

3. **Sites de Estatísticas:**
   - OP.GG, U.GG, etc. mostram o Riot ID completo

## 🛠️ Implementação Técnica

### Como o NexusLab Funciona:

1. **Detecta o formato:**
   ```
   takumi#eita → Riot ID detectado
   takumi      → Nome antigo detectado
   ```

2. **Para Riot ID:**
   - Usa API `/riot/account/v1/accounts/by-riot-id/`
   - Obtém PUUID do jogador
   - Busca dados do summoner via PUUID

3. **Para Nome Antigo:**
   - Usa API `/lol/summoner/v4/summoners/by-name/`
   - Método direto (pode falhar para contas novas)

## 🚨 Problemas Comuns

### ❌ **"Invocador não encontrado"**

**Possíveis causas:**
1. **TAG incorreta** - `takumi#eita` vs `takumi#BR1`
2. **Servidor errado** - Jogador de outra região
3. **Nome antigo** que não existe mais

**Soluções:**
1. **Verifique a TAG exata** no cliente do jogo
2. **Teste sem a TAG** (apenas o nome)
3. **Confirme o servidor** (NexusLab é BR)

### ❌ **Caracteres Especiais**

**Problema:**
```
Nome#TAG com espaços ou símbolos especiais
```

**Solução:**
```
Use exatamente como aparece no jogo
```

## 📝 Exemplos de Teste

### ✅ **Jogadores Brasileiros Conhecidos:**
```
Brtt#BR1
Kami#BR1
Robo#BR1
```

### ✅ **Jogadores Internacionais:**
```
Faker#KR1
Caps#EUW
Doublelift#NA1
```

### ✅ **Fallback (Nomes Antigos):**
```
Faker
Brtt
Caps
```

## 🔧 Debugging

### Console do Navegador (F12):
```javascript
// Teste manual da API
fetch('https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/takumi/eita', {
  headers: { 'X-Riot-Token': 'SUA-API-KEY' }
}).then(r => r.json()).then(console.log);
```

### Logs do NexusLab:
- Abra o console (F12)
- Procure por mensagens de erro
- Veja se está usando Riot ID ou nome antigo

## 🌍 Regiões e Tags

### Tags Comuns por Região:
- **Brasil**: `#BR1`, `#LAS`
- **América do Norte**: `#NA1`
- **Europa**: `#EUW`, `#EUNE`
- **Coreia**: `#KR1`
- **Oceania**: `#OC1`

### ⚠️ **Importante:**
- O NexusLab está configurado para **Brasil (BR)**
- Jogadores de outras regiões podem não aparecer
- A TAG não determina necessariamente a região do servidor

## 🚀 Futuro

### Melhorias Planejadas:
- [ ] Suporte a múltiplas regiões
- [ ] Auto-detecção de região pela TAG
- [ ] Histórico de pesquisas recentes
- [ ] Sugestões de nomes similares

---

**💡 Dica**: Se não souber sua TAG exata, tente primeiro sem a `#TAG` - o sistema fará fallback para o método antigo!
