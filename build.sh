export NVM_DIR="/Users/bror/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use 0.12
npm install
compass clean && compass compile
npm run build
cd docs
npm install && npm run build
mv build/* ../
cd ..
open index.html
