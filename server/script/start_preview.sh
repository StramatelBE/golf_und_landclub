#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Charger les variables d'environnement depuis le fichier .env situé dans le répertoire parent
cd ../preview
DISPLAY=:0 pnpm run electron &
dotenvx run --env-file=../.env -- sh -c 'serve -s dist -l $PREVIEW_PORT'
