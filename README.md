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

Everything lives in the `LINES` object at the top of [app.js](app.js).

There are two lines. The `main` line is the misalignment case: the AI
itself is the threat. The `misuse` line is the case where people point
an obedient AI at us. A rider moves onto the misuse line by rejecting
stop 1 of the main line and then accepting its detour.

Each stop takes `id`, `label`, `question`, `subtext`, and an optional
`detour`. Answering "yes" always means the doom path stays open, and
"no" always means it closes.

A `detour` is the second chance: answering "no" to a stop that has one
asks the detour question instead of ending the ride. "Yes" on a detour
keeps the rider moving, and "no" ends the ride there. A detour with a
`switchTo` key moves the rider onto that named line instead of
continuing along the current one.

Each `id` doubles as a row key for the Supabase stats, so renaming an
`id` orphans the responses already recorded against the old name.
