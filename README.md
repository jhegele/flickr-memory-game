# Flickr Memory Game

My daughter loves playing memory so I thought it would be fun to build a game where she could provide a key word and a memory game would be built using images.

This is partially me exploring JS a little more and partially trying to entertain my daughter.

## Dependencies

* Node JS
* Python 3.6
* Flask
* Requests

## Building Locally

1) Sign up for a Flickr API key
2) Add your Flickr API key to an environment variable named `FLICKR_MEMORY_GAME`.
3) Clone this repo
4) Run `npm install` to install JS dependencies
5) Run `pip install -r app/requirements.txt` to install Python dependencies
6) Run `npm run build` to bundle and build JS
7) Run `python app/app.py`
8) Navigate to `http://localhost:5000` in your browser

## Other Info

* By default, Flickr's Safe Search is enabled. Since this was created for a kid, there is no interface option to change this. If you want to disable Safe Search, you'll need to modify the `flickr.py` file to remove the `safe_search` param.

## Heroku Deploy

These are mostly notes for me, since I'll never remember the details of deploying a Docker image to Heroku.

1) Login using the Heroku CLI: `heroku login`
2) Login to the Heroku Container Registry: `heroku container:login`
3) Set the environment var for the Heroku app: `heroku config:set FLICKR_MEMORY_GAME=<API KEY HERE>`
4) Deploy the Docker container: `heroku container:push web`