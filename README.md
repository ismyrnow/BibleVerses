Bible memory verse app, which works offline using AppCache and LocalStorage.

![Screenshot](screenshot.png)

## Setup

```
npm install
```

## Running

- Run `npm run dev-client` to compile js and css.
- Run `npm start` for server.
- Run `npm run dev-server` for server and watch task, with AppCache disabled.
- Open `http://localhost:3000`.

## Deploying

```
npm run build-client
git push heroku master
heroku open
```

## Credits

Basis for the Bible icon designed by [Bruno Gätjens González](http://www.thenounproject.com/gatjensb) from the [Noun Project](http://www.thenounproject.com).
