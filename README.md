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

L'image utilise Deno, expose le site sur le port `3000`, et peut etre ciblee par Traefik.

```bash
docker build -t doublesens-website .
docker run --rm -p 3000:3000 doublesens-website
```
