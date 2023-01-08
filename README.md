# YouTube-Fetch-Api

An API to fetch latest videos in every 10 seconds in sorted reverse chronological order of the publishing date from YouTube in paginated response.

# Basic Functionalities

- Cron Job to constantly fetch data in the background every 10 Second.
- GET API, `/` for fetching the videos stored in the Database in reverse order of publishing date.
- GET API, `/page=page` for fetching the videos stored in the Database in reverse order of publishing date for particular page, every page will have 10 objects by default.
- GET API, `/?search='EG'&page='0'` for fetching videos supporting options like search to search on the basis of title and description with partial matching and also paginated.

### Development

1. Clone the project

`git clone https://github.com/punitjain9615/YouTube-Fetch.git`


Follow the instructions on [API](https://developers.google.com/youtube/v3/getting-started) to get one API for fetching youtube videos.

> **Instructions to run Application:** 
> - Default values of environment variables, refer [.env.defaults](https://github.com/punitjain9615/YouTube-Fetch/blob/master/.env.defaults) file
> - Please provide values to all those variabes. 
> - In case of multiple API keys, provide them as "," delimited list of keys like so:

```
YOUTUBE_API_KEY = "<API_KEY1>, <API_KEY2>..."
```

3. Install dependencies

`npm install`

4. Run in development mode

`npm run start`

### Running with Docker Compose

When using Docker Compose, 

1. Create a `config.env` file using the instructions mentioned above
2. Set the `DATABASE_URI` environment variable in your `config.env` file to

```
MONGODB_URI = mongodb://mongo:27017
```
3. Please run:

```
docker-compose up 
```
4. Navigate to `http://localhost:3000` to see the app live in local machine

### Resources

1. https://developers.google.com/youtube/v3
2. https://developers.google.com/youtube/v3/docs/search/list
3. https://hub.docker.com/