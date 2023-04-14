# Folk Art

This is THE SKETCHIEST self-ish-hosted music sharing solution I could throw together over the course of a few days. It uses the notion parser I originally built for my portfolio that I haven't published yet either. Oh well.

Anyway, It relies on the Notion API as a backend, meaning maintaining the library is as easy as dropping files into a notes app. It rules. Seriously.

## Todo

- [x] Pull songs from notion DB
- [x] Player controls with nicer buttons
- [x] Implement youtubish hotkeys
- [x] Store autoplay and stuff in localstorage
- [x] Drop in ~~wavesurfer~~ Peaks.js for waveform view
- [x] Give it some semblance of style 
- [ ] Proxy s3 urls so we can use ISR (notion expires urls after an hour)
- [ ] Add remote play (i.e. chromecast, miracast, appleplay, etc)
- [ ] Automatically update cached waveforms (blocked by notion api)
- [ ] Animate obi image somehow (Artbreeder video?)
- [ ] Different obi image/video per song
- [ ] Collections/albums/playlists

## Bugs

- [x] Layout's wonky at mobile widths. Make it less wonky
- [x] Waveform takes FOOOOORRRREEEEEEVER

## Developing

First you need a [Notion API Key for an integration with read permissions](https://developers.notion.com/docs/getting-started) and a Notion table with at least `Name`, `Latest` (for audio files), and `Published` (Checkbox) columns. You can add whatever other metadata you want.

```bash
touch .env

# Add NOTION_API_KEY and NOTION_RECORDINGS_DB for the table you created earlier.
NOTION_API_KEY=
NOTION_RECORDINGS_DB=
```

Now you can actually run the app.

```bash
yarn install
yarn dev
```

## Building

Build and preview the production build with `yarn build && yarn preview`

## Deploying

I strongly prefer vercel for these kinds of mini projects. Fork this repo, add it as a vercel app, add your .env variables, and push to `main` (or whatever branch you specify in Vercel. Maybe `production`?).
