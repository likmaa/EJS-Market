# 📍 Où Voir les Logs Prisma sur Vercel

## 🔍 Étapes pour Voir les Logs

### 1. Allez dans les Logs Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet **"ejs-market"**
4. Cliquez sur l'onglet **"Logs"** dans la barre de navigation

### 2. Filtrer les Logs

Une fois dans les logs :

1. **Cherchez la section "Filters"** (à gauche)
2. **Timeline** : Sélectionnez "Last 30 minutes" ou "Last hour"
3. **Contains Console Level** : 
   - Décochez "Error" temporairement pour voir tous les logs
   - Ou laissez "Error" pour voir seulement les erreurs

### 3. Chercher les Messages Prisma

Dans les logs, cherchez les messages qui commencent par `[Prisma]` :

**Messages à chercher** :
- `[Prisma] DATABASE_URL: postgresql://postgres.suqglddnmdnizpjclqtl:****@...`
- `[Prisma] Using pooler: YES` ou `[Prisma] Using pooler: NO`

### 4. Quand Voir ces Logs

Ces logs apparaissent :
- **Lors du démarrage de l'application** (quand Prisma se connecte)
- **Lors d'une requête API** qui utilise Prisma
- **Après un redéploiement**

### 5. Si Vous Ne Voyez Pas les Logs Prisma

Si vous ne voyez pas les messages `[Prisma]` :

1. **Vérifiez que vous avez redéployé** après avoir ajouté le logging
2. **Attendez quelques minutes** après le redéploiement
3. **Faites une requête** sur votre site (ex: accédez à la page d'accueil)
4. **Rechargez les logs** (bouton refresh ou "Live")

---

## 📋 Exemple de Logs Attendus

### ✅ Si DATABASE_URL est Correcte

```
[Prisma] DATABASE_URL: postgresql://postgres.suqglddnmdnizpjclqtl:****@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
[Prisma] Using pooler: YES
```

### ❌ Si DATABASE_URL n'Utilise Pas le Pooler

```
[Prisma] DATABASE_URL: postgresql://postgres:****@db.suqglddnmdnizpjclqtl.supabase.co:5432/postgres
[Prisma] Using pooler: NO
```

---

## 🔧 Alternative : Voir les Logs en Temps Réel

1. Dans les logs Vercel, activez le bouton **"Live"** (en haut à droite)
2. Les logs s'actualiseront automatiquement
3. Faites une requête sur votre site pour déclencher les logs

---

## 🆘 Si Vous Ne Trouvez Toujours Pas

1. **Vérifiez que le code a été déployé** :
   - Allez dans **Deployments**
   - Vérifiez que le dernier déploiement est récent
   - Vérifiez qu'il n'y a pas d'erreurs de build

2. **Vérifiez les logs de build** :
   - Allez dans **Deployments**
   - Cliquez sur le dernier déploiement
   - Regardez les logs de build

3. **Faites une requête** :
   - Accédez à votre site Vercel
   - Allez sur la page d'accueil
   - Cela déclenchera des requêtes API qui utiliseront Prisma

---

**Dernière mise à jour** : 2024

