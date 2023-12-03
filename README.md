# sveltekit-elastic-newsreader

A lightweight newsreader built with SvelteKit, Elasticsearch, and TailwindCSS.

Project created from [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

### Deployed on Vercel at [https://sveltekit-elastic-newsreader.vercel.app/](https://sveltekit-elastic-newsreader.vercel.app/)

## Features

- Search, read and display RSS feeds.
- Integration with Elasticsearch for storage and advanced searching.
- Filter by Category.
- Sync via API endpoint for continuous updates.

## Elasticsearch Setup

This project stores RSS feeds in Elasticsearch. You can use either a local Elasticsearch instance or an Elasticsearch Cloud deployment.

### Environment variables

For local development, create a `.env` file in the root of the project.

For production, set the environment variables in your hosting environment.

Add the following variables to the file:

```bash
SECRET_ELASTIC_USE_CLOUD=false              # set to true if using Elasticsearch Cloud
SECRET_ELASTIC_HOST=http://localhost:9200   # local insecure Elasticsearch without SSL
SECRET_ELASTIC_CLOUD_ID=my_deployment_name  # Elasticsearch Cloud deployment name
SECRET_ELASTIC_CLOUD_USERNAME=elastic       # Elasticsearch Cloud username
SECRET_ELASTIC_CLOUD_PASSWORD=secret        # Elasticsearch Cloud password
```

### Cloud Elasticsearch

1. [Sign up for an Elasticsearch Cloud account](https://cloud.elastic.co/).
2. Create a deployment. The free tier is sufficient for development.

### Local Insecure Elasticsearch

Run Elasticsearch in a Docker container:

```bash
docker run \
       -p 9200:9200 \
       -p 9300:9300 \
       -e "discovery.type=single-node" \
       -e "xpack.security.enabled=false" \
       docker.elastic.co/elasticsearch/elasticsearch:8.10.0
```

(Only suitable for local development, without SSL.)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Elasticsearch Initialization

The first time you run the app, the necessary Elasticsearch index, articles, does not exist.

To create the index and populate the articles, run the following command (or load the URL in your browser):

```bash
curl "http://localhost:5173/api/sync?secret=9Fl48lvMx4hED3MV4RqKQaKs76xOR3"
```

(`npm run dev` must be running for this to work.)

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Continuous sync

You can use a cron job to sync the RSS feeds on a regular basis. Articles are upserted. The sync endpoint is protected by an insecure secret.

```bash
curl "http://localhost:5173/api/sync?secret=9Fl48lvMx4hED3MV4RqKQaKs76xOR3"
```

For Vercel, add a vercel.json file to the root of the project:

```json
{
	"crons": [
		{
			"path": "/api/sync?secret=9Fl48lvMx4hED3MV4RqKQaKs76xOR3",
			"schedule": "0 * * * *"
		}
	]
}
```

This cron job will run once every hour at the start of the hour. 
