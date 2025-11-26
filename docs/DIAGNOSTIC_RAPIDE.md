# 🔍 Diagnostic Rapide - Sans Routes de Test

Puisque les routes de test ne sont pas encore déployées, utilisons les logs Vercel directement.

## 📋 Méthode 1 : Vérifier les Logs Vercel

1. Allez dans **Vercel → Votre projet → Logs**
2. Filtrez par **"Error"**
3. Regardez les **dernières erreurs**

**Quelle erreur voyez-vous ?**

### A. `PrismaClientInitializationError: Invalid prisma`
→ Problème de connexion à la base de données
→ **Solution** : Vérifier `DATABASE_URL` utilise le pooler

### B. `[NextAuth] Utilisateur introuvable`
→ L'utilisateur n'existe pas dans la base
→ **Solution** : Exécuter le seed sur Supabase

### C. `[NextAuth] Mot de passe invalide`
→ Le mot de passe ne correspond pas
→ **Solution** : Réinitialiser le mot de passe

### D. `NEXTAUTH_SECRET must be at least 32 characters`
→ `NEXTAUTH_SECRET` manquant ou incorrect
→ **Solution** : Vérifier la variable sur Vercel

### E. Aucune erreur mais connexion échoue
→ Problème de configuration NextAuth
→ **Solution** : Vérifier `NEXTAUTH_URL`

---

## 📋 Méthode 2 : Vérifier les Variables d'Environnement

Dans **Vercel → Settings → Environment Variables**, vérifiez :

### DATABASE_URL
- [ ] Existe
- [ ] Contient `.pooler.supabase.com`
- [ ] User est `postgres.suqglddnmdnizpjclqtl` (avec "l" à la fin)

### NEXTAUTH_SECRET
- [ ] Existe
- [ ] Fait au moins 32 caractères
- [ ] Valeur : `VC7E/WeTI5IXwt1UlUBZlG1LoCFIx/0LopGKNdJZU5k=` (avec "l" pas "1")

### NEXTAUTH_URL
- [ ] Existe
- [ ] Valeur : `https://ejs-market-181a.vercel.app`
- [ ] Pas de slash à la fin

---

## 🔄 Alternative : Utiliser Neon (Plus Simple)

Si Supabase continue de poser problème, **Neon est plus simple pour Vercel** :

### Étapes

1. **Créer un compte Neon** :
   - Allez sur [neon.tech](https://neon.tech)
   - Créez un compte gratuit
   - Créez un nouveau projet PostgreSQL

2. **Récupérer la Connection String** :
   - Neon vous donne directement la connection string
   - Format : `postgresql://user:password@host/database?sslmode=require`

3. **Mettre à Jour sur Vercel** :
   - Remplacez `DATABASE_URL` par la connection string Neon
   - Redéployez

4. **Initialiser la Base** :
   ```bash
   DATABASE_URL="votre-connection-neon" npx tsx prisma/seed.ts
   ```

5. **Tester** :
   - Les connexions devraient fonctionner immédiatement

### Avantages de Neon

- ✅ Optimisé pour Vercel
- ✅ Pas besoin de connection pooler
- ✅ Connection string simple
- ✅ Gratuit pour commencer

---

## 🆘 Si Rien ne Fonctionne

**Partagez-moi** :
1. Les **dernières erreurs** dans les logs Vercel (screenshot ou copier-coller)
2. Si vous voyez des messages `[Prisma]` ou `[NextAuth]` dans les logs
3. Le résultat quand vous essayez de vous connecter

Cela m'aidera à identifier le problème exact.

---

**Dernière mise à jour** : 2024

