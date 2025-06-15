# Six Albums

This repository contains the source code for the Six Albums website (sixalbums.com).

## Stack

We use SvelteKit for the entire stack. Deployment is handled by Vercel, and Supabase is used as a database. In order to hit the scheduled API endpoints, we use AWS lamdas deployed using the Serverless Framework (the Vercel free plan has very limited cronjobs).
