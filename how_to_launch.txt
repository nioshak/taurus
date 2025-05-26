#Step 1: Build the latest version
npm run build
#This creates your optimized static site output (typically in ./build or ./dist).

#Step 2: Sync the build output to GCS
gsutil rsync -R ./build gs://taurusspace-www

#Optional: Force refresh if cache is stale
#If you ever push updates but they don’t show (due to CDN caching), you can invalidate the cache manually:
gcloud compute url-maps invalidate-cdn-cache [URL_MAP_NAME] \
  --path "/*" \
  --global

#To find [URL_MAP_NAME]:
gcloud compute url-maps list


#🛠️ Optional: Automate with GitHub Actions (later)
name: Deploy to GCS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build
      - uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}
      - uses: google-github-actions/upload-cloud-storage@v1
        with:
          path: ./build
          destination: taurusspace-www
