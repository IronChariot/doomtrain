# The Doom Train

A minimalist quiz site. Each screen asks one yes/no crux about AI
existential risk. A "no" ends the ride and asks for a P(doom), shown
against the average for that stop.

## Setup

1. In your Supabase project, open the SQL editor and run [schema.sql](schema.sql).
2. In Supabase, go to Settings > API and copy the Project URL and the
   `anon` public key.
3. Paste them into [config.js](config.js):

   ```js
   window.DOOMTRAIN_CONFIG = {
     supabaseUrl: "https://xxxx.supabase.co",
     supabaseAnonKey: "eyJ...",
   };
   ```

4. Open `index.html` directly in a browser to test locally, or serve
   the folder with any static file server.

## Deploy to Netlify

Push this folder to a git repo and connect it in Netlify, or drag the
folder onto Netlify's deploy page. No build step is needed — `netlify.toml`
already points the publish directory at the project root.

## Editing the questions

The stop order and wording live in the `STOPS` array at the top of
[app.js](app.js). Each stop's `id` doubles as its row key in Supabase
stats, so change an `id` and re-run `schema.sql` reasoning only if you
also want to reset historical data for that stop.
