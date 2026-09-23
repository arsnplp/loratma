# Mise en ligne

`./deploy/deploy.sh "message"` pousse la branche `version-deux` sur GitHub puis
met a jour le VPS (217.65.144.174) via SSH avec la cle `~/.ssh/vps1_ed25519`.

Si le dossier web du VPS n'est pas un depot git, copier les fichiers a la main :

    rsync -avz --exclude .git --exclude deploy -e "ssh -i ~/.ssh/vps1_ed25519" ./ root@217.65.144.174:/var/www/loratma/loratma/

(le `root` nginx du site est `/var/www/loratma/loratma`).

Apres deploiement, verifier :
- https://loratma.fr/robots.txt
- https://loratma.fr/sitemap.xml

Puis dans Google Search Console > Sitemaps, soumettre : `https://loratma.fr/sitemap.xml`
