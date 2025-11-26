# 🔍 Vérification Étape par Étape - Problème de Connexion

## ✅ Test Local : RÉUSSI

Le test local avec la connection string du pooler fonctionne parfaitement :
- ✅ Connexion réussie
- ✅ Utilisateur admin trouvé
- ✅ Mot de passe valide

**Conclusion** : La connection string est correcte. Le problème est sur Vercel.

---

## 🔍 Vérifications sur Vercel

### Étape 1 : Vérifier DATABASE_URL sur Vercel

1. Allez dans **Vercel → Votre projet → Settings → Environment Variables**
2. Trouvez `DATABASE_URL`
3. Cliquez dessus pour voir la valeur (ou "Edit")

**Vérifiez que la valeur est EXACTEMENT** :
```
postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
```

**Points à vérifier** :
- [ ] Hostname contient `.pooler.supabase.com` (pas `db.xxx.supabase.co`)
- [ ] User est `postgres.suqglddnmdnizpjclqtl` (pas juste `postgres`)
- [ ] Le mot de passe est encodé : `3s%2FNB6i%2B%3FtVj%23uL`
- [ ] Port est `5432`
- [ ] `?schema=public` est à la fin

**Si ce n'est pas correct** :
1. Cliquez sur "Edit"
2. Copiez-collez la connection string complète ci-dessus
3. Cliquez sur "Save"

---

### Étape 2 : Vérifier NEXTAUTH_SECRET

1. Dans **Environment Variables**, trouvez `NEXTAUTH_SECRET`
2. Vérifiez qu'il existe et que la valeur est :
   ```
   VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=
   ```

**Si ce n'est pas correct** :
1. Cliquez sur "Edit" (ou "Add New" si n'existe pas)
2. Clé : `NEXTAUTH_SECRET`
3. Valeur : `VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=`
4. Environnements : ✅ Production, ✅ Preview, ✅ Development
5. Cliquez sur "Save"

---

### Étape 3 : Vérifier NEXTAUTH_URL

1. Dans **Environment Variables**, trouvez `NEXTAUTH_URL`
2. Vérifiez qu'il correspond EXACTEMENT à votre URL Vercel

**Pour trouver votre URL Vercel** :
1. Allez dans **Vercel → Votre projet**
2. L'URL est affichée en haut (ex: `ejs-market.vercel.app`)
3. Ajoutez `https://` devant

**Exemple** : Si votre projet s'appelle `ejs-market`, l'URL sera :
```
https://ejs-market.vercel.app
```

**Si ce n'est pas correct** :
1. Cliquez sur "Edit" (ou "Add New" si n'existe pas)
2. Clé : `NEXTAUTH_URL`
3. Valeur : `https://votre-projet.vercel.app` (sans slash à la fin)
4. Environnements : ✅ Production, ✅ Preview, ✅ Development
5. Cliquez sur "Save"

---

### Étape 4 : REDÉPLOYER (CRUCIAL)

⚠️ **IMPORTANT** : Après avoir modifié les variables, vous DEVEZ redéployer !

1. Allez dans **Deployments**
2. Trouvez le dernier déploiement
3. Cliquez sur les **3 points** (⋯) à droite
4. Sélectionnez **"Redeploy"**
5. Confirmez le redéploiement
6. **Attendez que le déploiement se termine** (peut prendre 2-3 minutes)

---

### Étape 5 : Vérifier les Logs Vercel

1. Allez dans **Vercel → Votre projet → Logs**
2. Filtrez par "Error" (cliquez sur le filtre "Error")
3. Regardez les dernières erreurs

**Cherchez ces messages** :

#### ✅ Si vous voyez `[NextAuth] Tentative de connexion pour: admin@ejsmarket.com`
→ NextAuth fonctionne, continuez à chercher l'erreur suivante

#### ❌ Si vous voyez `PrismaClientInitializationError`
→ La `DATABASE_URL` n'est pas correcte ou n'utilise pas le pooler

#### ❌ Si vous voyez `[NextAuth] Utilisateur introuvable`
→ Problème de connexion à la base de données

#### ❌ Si vous voyez `[NextAuth] Mot de passe invalide`
→ Le mot de passe dans la base ne correspond pas

#### ❌ Si vous voyez `NEXTAUTH_SECRET must be at least 32 characters`
→ `NEXTAUTH_SECRET` est manquant ou incorrect

---

## 🆘 Si Rien ne Fonctionne

### Option 1 : Partager les Logs

1. Allez dans **Vercel → Logs**
2. Filtrez par "Error"
3. Faites une capture d'écran des dernières erreurs
4. Partagez-la pour diagnostic

### Option 2 : Vérifier les Variables une par une

Créez un fichier `.env.local` avec ces valeurs et testez localement :

```env
DATABASE_URL=postgresql://postgres.suqglddnmdnizpjclqtl:3s%2FNB6i%2B%3FtVj%23uL@aws-1-eu-central-2.pooler.supabase.com:5432/postgres?schema=public
NEXTAUTH_SECRET=VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=
NEXTAUTH_URL=http://localhost:3000
```

Puis testez localement :
```bash
npm run dev
```

Si ça fonctionne localement mais pas sur Vercel, le problème vient de la configuration Vercel.

---

## 📋 Checklist Finale

- [ ] `DATABASE_URL` utilise le pooler (`.pooler.supabase.com`)
- [ ] `NEXTAUTH_SECRET` est configuré (32+ caractères)
- [ ] `NEXTAUTH_URL` correspond à l'URL Vercel
- [ ] L'application a été **redéployée** après les modifications
- [ ] Les logs Vercel ont été vérifiés
- [ ] Les identifiants testés : `admin@ejsmarket.com` / `Admin123!`

---

**Dernière mise à jour** : 2024

