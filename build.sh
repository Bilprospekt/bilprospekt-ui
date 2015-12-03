npm install
compass clean && compass compile
npm run build
cd docs
npm install && npm run build
mv build/* ../
cd ..
open index.html
