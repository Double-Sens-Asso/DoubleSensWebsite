import { serveDir } from '@std/http/file-server'

const port = Number(Deno.env.get('PORT') ?? 3000)

Deno.serve({ port }, (request) => serveDir(request, { fsRoot: 'dist' }))
