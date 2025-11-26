# ✅ Checklist Vercel - Vérification Complète

## 🔍 Vérifications à Faire MAINTENANT

### 1. ✅ Vérifier DATABASE_URL sur Vercel

**Allez dans** : Vercel → Votre projet → Settings → Environment Variables

**Vérifiez que `DATABASE_URL`** :
- [ ] Utilise le **Connection Pooler** (hostname contient `.pooler.supabase.com`)
- [ ] Utilise le port **5432** (Session mode)
- [ ] Le format est : `postgresql://postgres.suqglddnmdnizpjclqtl:...@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public`
- [ ] Le mot de passe est **encodé en URL** (ex: `3s%2FNB6i%2B%3FtVj%23uL`)

**❌ Format INCORRECT** (connexion directe) :
```
postgresql://postgres:...@db.suqglddnmdnizpjclqtl.supabase.co:5432/postgres
```

**✅ Format CORRECT** (connection pooler) :
```
postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
```

---

### 2. ✅ Vérifier NEXTAUTH_SECRET

**Vérifiez que `NEXTAUTH_SECRET`** :
- [ ] Existe sur Vercel
- [ ] Fait au moins 32 caractères
- [ ] Valeur : `VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=`
- [ ] Est activé pour : Production, Preview, Development

---

### 3. ✅ Vérifier NEXTAUTH_URL

**Vérifiez que `NEXTAUTH_URL`** :
- [ ] Existe sur Vercel
- [ ] Correspond **exactement** à votre URL Vercel
- [ ] Format : `https://votre-projet.vercel.app` (sans slash à la fin)
- [ ] Exemple : `https://ejs-market-dja5gzvs.vercel.app`

**Pour trouver votre URL Vercel** :
1. Allez dans Vercel → Votre projet
2. L'URL est affichée en haut (ex: `ejs-market.vercel.app`)
3. Ajoutez `https://` devant

---

### 4. ✅ Vérifier les Logs Vercel

**Allez dans** : Vercel → Votre projet → Logs

**Cherchez ces erreurs** :

#### Erreur : `PrismaClientInitializationError: Invalid prisma`
**Cause** : `DATABASE_URL` n'utilise pas le connection pooler ou est incorrecte.

**Solution** :
1. Vérifiez que `DATABASE_URL` utilise `.pooler.supabase.com`
2. Vérifiez que le mot de passe est encodé
3. Redéployez après modification

#### Erreur : `[NextAuth] Utilisateur introuvable`
**Cause** : L'utilisateur n'existe pas dans Supabase (mais on a vérifié qu'il existe ✅).

**Solution** : Vérifiez que vous utilisez la bonne base de données.

#### Erreur : `[NextAuth] Mot de passe invalide`
**Cause** : Le mot de passe dans la base ne correspond pas.

**Solution** : Réinitialisez le mot de passe avec le script.

#### Erreur : `NEXTAUTH_SECRET must be at least 32 characters`
**Cause** : Le secret est manquant ou trop court.

**Solution** : Ajoutez `NEXTAUTH_SECRET` sur Vercel.

---

### 5. ✅ Redéployer après Modifications

**⚠️ IMPORTANT** : Après avoir modifié les variables d'environnement :

1. [ ] Allez dans **Deployments**
2. [ ] Cliquez sur les **3 points** (⋯) du dernier déploiement
3. [ ] Sélectionnez **"Redeploy"**
4. [ ] Attendez la fin du déploiement
5. [ ] Testez la connexion
6. [ ] Vérifiez les logs pour les messages NextAuth

---

## 📋 Identifiants de Test

**Email** : `admin@ejsmarket.com`  
**Mot de passe** : `Admin123!`

✅ **Confirmé** : L'utilisateur existe dans Supabase (voir capture d'écran)

---

## 🔧 Actions à Faire

1. **Vérifiez les 3 variables d'environnement** sur Vercel (voir ci-dessus)
2. **Assurez-vous que `DATABASE_URL` utilise le connection pooler**
3. **Redéployez l'application**
4. **Testez la connexion**
5. **Vérifiez les logs Vercel** pour voir les messages NextAuth

---

## 🆘 Si ça ne Fonctionne Toujours Pas

1. **Partagez les logs Vercel** (screenshot ou copier-coller)
2. **Vérifiez que Supabase n'est pas en pause**
3. **Vérifiez les restrictions réseau** sur Supabase
4. **Testez avec le script de diagnostic** :
   ```bash
   DATABASE_URL="votre-connection-string-pooler" npx tsx scripts/test-db-connection.ts
   ```

---

**Dernière mise à jour** : 2024

