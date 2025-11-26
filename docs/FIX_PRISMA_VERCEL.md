# 🔧 Correction Rapide : Erreurs Prisma sur Vercel

## ❌ Problème Actuel

Vous voyez ces erreurs dans les logs Vercel :
```
PrismaClientInitializationError: Invalid prisma
```

## ✅ Solution : Utiliser le Connection Pooler de Supabase

### Étape 1 : Récupérer la Connection String du Pooler

1. Allez sur [supabase.com](https://supabase.com) et connectez-vous
2. Sélectionnez votre projet
3. Allez dans **Settings** → **Database**
4. Cherchez la section **"Connection Pooler"** ou **"Connection string"**
5. Cliquez sur l'onglet **"Session mode"** (recommandé pour Prisma)
6. Copiez la connection string qui utilise le hostname `pooler.supabase.com`

**Format attendu (Session mode)** :
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres
```

⚠️ **Important** : 
- **Session mode** utilise le port **5432** avec le hostname `pooler.supabase.com`
- **Transaction mode** utilise le port **6543** avec le hostname `pooler.supabase.com`
- Pour Prisma, utilisez le **Session mode** (port 5432)

### Étape 2 : Encoder le Mot de Passe (si nécessaire)

Si votre mot de passe contient des caractères spéciaux (`/`, `+`, `?`, `#`, etc.), encodez-le :

```bash
node -e "console.log(encodeURIComponent('VOTRE_MOT_DE_PASSE'))"
```

**Exemple** : Si votre mot de passe est `3s/NB6i+?tVj#uL`, il devient `3s%2FNB6i%2B%3FtVj%23uL`

### Étape 3 : Construire la Connection String Complète

Prenez la connection string du pooler (Session mode) et remplacez `[YOUR-PASSWORD]` par le mot de passe encodé, puis ajoutez `?schema=public` à la fin.

**Exemple complet (Session mode)** :
```
postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
```

**Note** : Remplacez `aws-1-eu-central-2` par votre région réelle (visible dans votre connection string Supabase).

### Étape 4 : Mettre à Jour sur Vercel

1. Allez dans Vercel → Votre projet → **Settings** → **Environment Variables**
2. Trouvez `DATABASE_URL`
3. Cliquez sur **"Edit"** (ou les 3 points → Edit)
4. Remplacez la valeur par la nouvelle connection string (avec le pooler, port 6543)
5. Cliquez sur **"Save"**
6. **Important** : Redéployez l'application :
   - Allez dans **Deployments**
   - Cliquez sur les **3 points** (⋯) du dernier déploiement
   - Sélectionnez **"Redeploy"**

### Étape 5 : Vérifier

1. Attendez que le redéploiement se termine
2. Allez dans **Logs** sur Vercel
3. Vérifiez qu'il n'y a plus d'erreurs `PrismaClientInitializationError`

---

## 🔍 Comment Identifier Votre Connection String Pooler

Dans Supabase, la connection string du pooler ressemble à ceci :

**Session mode** (recommandé pour Prisma) :
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:5432/postgres
```

**Transaction mode** :
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Différences avec la connexion directe** :
- ✅ Hostname contient **`.pooler.supabase.com`** (au lieu de `db.xxx.supabase.co`)
- ✅ Format : `postgres.[PROJECT-REF]` (au lieu de juste `postgres`)
- ✅ **Session mode** : Port **5432** (même port que la connexion directe, mais via le pooler)
- ✅ **Transaction mode** : Port **6543** (spécifique au pooler)

---

## ⚠️ Important

- Le connection pooler est **recommandé pour Vercel** car il gère mieux les connexions serverless
- La connexion directe (port 5432) peut échouer sur Vercel à cause des limites de connexions
- Après avoir modifié `DATABASE_URL`, **vous devez redéployer** pour que les changements prennent effet

---

## 🆘 Si ça ne Fonctionne Toujours Pas

1. **Vérifiez les restrictions réseau** :
   - Supabase → Settings → Database → Network Restrictions
   - Désactivez temporairement les restrictions ou ajoutez les IPs de Vercel

2. **Vérifiez que le projet Supabase est actif** :
   - Supabase → Settings → General
   - Le projet ne doit pas être en pause

3. **Testez la connection string localement** :
   ```bash
   DATABASE_URL="votre-connection-string-pooler" npx prisma db push --skip-generate
   ```

4. **Vérifiez les logs Vercel** pour des erreurs plus détaillées

---

**Dernière mise à jour** : 2024

