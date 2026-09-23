#!/usr/bin/env bash
# Met le site en ligne : push GitHub (branche version-deux), puis mise a jour du VPS.
# Usage : ./deploy/deploy.sh "message du commit"
set -euo pipefail

VPS="root@217.65.144.174"
KEY="$HOME/.ssh/vps1_ed25519"
BRANCH="version-deux"

cd "$(dirname "$0")/.."

MSG="${1:-Mise a jour du site}"

git add -A
if ! git diff --cached --quiet; then
  git commit -m "$MSG"
fi
git push origin "$BRANCH"

ssh -i "$KEY" -o IdentitiesOnly=yes "$VPS" "
  set -e
  # Dossier web pris dans la conf nginx de loratma.fr
  CONF=\$(grep -l 'loratma' /etc/nginx/sites-enabled/* | head -1)
  DIR=\$(grep -h ' root ' \"\$CONF\" | head -1 | awk '{print \$2}' | tr -d ';')
  echo \"Dossier web : \$DIR\"
  cd \"\$DIR\"
  if [ -d .git ]; then
    git fetch --quiet origin $BRANCH
    git reset --hard origin/$BRANCH
  else
    echo 'Pas de depot git sur le VPS : copie manuelle necessaire (voir deploy/README).'
    exit 1
  fi
  chown -R www-data:www-data \"\$DIR\"
  echo \"VPS a jour : \$(git log -1 --format='%h %s')\"
"

echo "En ligne : https://loratma.fr"
echo "Sitemap  : https://loratma.fr/sitemap.xml"
