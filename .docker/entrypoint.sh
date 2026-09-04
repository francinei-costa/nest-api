#!/bin/bash
echo "Initializing app nest-api..."
npm install
rm -rf dist
npm run build
npm run migration:run
exec npm run start:dev
echo "All processes nest-api initialization done!"
