# 🔐 Instructions pour pousser vers GitHub

## Option 1 : Token d'accès personnel (Recommandé)

1. **Créer un token GitHub** :
   - Allez sur https://github.com/settings/tokens
   - Cliquez sur **"Generate new token"** > **"Generate new token (classic)"**
   - Donnez un nom (ex: "EJS-Market")
   - Cochez **"repo"** (accès complet aux dépôts)
   - Cliquez sur **"Generate token"**
   - **COPIEZ LE TOKEN** (vous ne le reverrez plus !)

2. **Pousser avec le token** :
```bash
# Remplacez VOTRE_TOKEN par le token copié
git push -u origin main
# Quand demandé :
# Username: likmaa
# Password: VOTRE_TOKEN
```

## Option 2 : SSH (Plus sécurisé)

1. **Vérifier si vous avez une clé SSH** :
```bash
ls -al ~/.ssh
```

2. **Si pas de clé, en créer une** :
```bash
ssh-keygen -t ed25519 -C "votre-email@example.com"
# Appuyez sur Entrée pour accepter l'emplacement par défaut
# Entrez un mot de passe (optionnel mais recommandé)
```

3. **Ajouter la clé SSH à GitHub** :
```bash
# Copier la clé publique
cat ~/.ssh/id_ed25519.pub
# Copiez tout le contenu affiché
```

4. **Sur GitHub** :
   - Allez sur https://github.com/settings/keys
   - Cliquez sur **"New SSH key"**
   - Collez la clé publique
   - Cliquez sur **"Add SSH key"**

5. **Changer le remote en SSH** :
```bash
git remote set-url origin git@github.com:likmaa/EJS-Market.git
git push -u origin main
```

## Option 3 : GitHub CLI

```bash
# Installer GitHub CLI (si pas déjà fait)
brew install gh

# Se connecter
gh auth login

# Pousser
git push -u origin main
```

## ⚠️ Si le dépôt n'existe pas encore sur GitHub

Créez-le d'abord :
1. Allez sur https://github.com/new
2. Nom : `EJS-Market`
3. **NE COCHEZ PAS** "Initialize with README"
4. Cliquez sur "Create repository"
5. Puis exécutez les commandes de push

---

**Une fois le push réussi, vous pourrez déployer sur Vercel !** 🚀

