# DoubleSens Website

Site vitrine DoubleSens construit avec React, TypeScript et Vite.

## Stack

- React 19
- TypeScript
- Vite
- Deno
- CSS Modules pour les composants
- CSS global centralise dans `src/styles`

## Structure

```txt
src/
  app/                 # Entree applicative React
  assets/              # Images importees par le bundle
  config/              # Configuration et contenus globaux
  pages/               # Pages de l'application
  styles/              # Styles globaux
```

## Scripts

```bash
deno task dev      # Demarre le serveur local Vite
deno task build    # Verifie TypeScript puis genere le build
deno task lint     # Lance ESLint
deno task preview  # Sert le build Vite localement
deno task start    # Sert le dossier dist avec Deno
```

## Docker

L'image utilise Deno et sert le site sur la variable d'environnement `PORT`.
Par defaut, `PORT=3000`.

```bash
docker build -t doublesens-website .
docker run --rm -p 3000:3000 doublesens-website
```

Avec un port personnalise :

```bash
docker run --rm -e PORT=3030 -p 3030:3030 doublesens-website
```

## Traefik

Si le conteneur est lance par Docker Compose derriere Traefik, le port doit etre donne au conteneur et au label Traefik.

Exemple dans le `.env` du dossier compose du VPS :

```env
DSWEBSITE_PORT=3000
```

Exemple de service :

```yaml
dswebsite:
  container_name: dsWebsite
  image: ghcr.io/double-sens-asso/dswebsite:latest
  pull_policy: always
  restart: always
  environment:
    PORT: ${DSWEBSITE_PORT:-3000}
  networks:
    - proxy
  labels:
    - "com.centurylinklabs.watchtower.enable=true"
    - "traefik.enable=true"
    - "traefik.docker.network=proxy"
    - "traefik.http.routers.dswebsite.rule=Host(`asso-doublesens.fr`) || Host(`www.asso-doublesens.fr`)"
    - "traefik.http.routers.dswebsite.entrypoints=websecure"
    - "traefik.http.routers.dswebsite.tls.certresolver=letsencrypt"
    - "traefik.http.routers.dswebsite.middlewares=secure-chain@file"
    - "traefik.http.services.dswebsite.loadbalancer.server.port=${DSWEBSITE_PORT:-3000}"
```

Note : `env_file` injecte les variables dans le conteneur, mais Docker Compose ne les utilise pas toujours pour remplacer les `${...}` dans les labels. Pour les labels Traefik, mets le port dans le `.env` du dossier ou tu lances `docker compose`.
