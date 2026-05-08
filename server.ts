const port = Number(Deno.env.get('PORT') ?? 3000)
const publicDir = new URL('./dist/', import.meta.url)

const contentTypes: Record<string, string> = {
  css: 'text/css; charset=utf-8',
  gif: 'image/gif',
  html: 'text/html; charset=utf-8',
  ico: 'image/x-icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  js: 'text/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  mjs: 'text/javascript; charset=utf-8',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
}

function getExtension(pathname: string) {
  const extension = pathname.split('.').pop() ?? ''
  return extension === pathname ? '' : extension.toLowerCase()
}

function isSafePath(pathname: string) {
  return !pathname.includes('\\') && !pathname.split('/').includes('..')
}

function getFileUrl(requestUrl: string) {
  const { pathname } = new URL(requestUrl)
  const decodedPathname = decodeURIComponent(pathname)

  if (!isSafePath(decodedPathname)) {
    return new URL('./index.html', publicDir)
  }

  return new URL(decodedPathname === '/' ? './index.html' : `.${decodedPathname}`, publicDir)
}

async function getResponseFile(requestUrl: string) {
  const fileUrl = getFileUrl(requestUrl)
  const pathname = new URL(requestUrl).pathname
  const extension = getExtension(pathname)

  try {
    const fileInfo = await Deno.stat(fileUrl)

    if (fileInfo.isFile) {
      return { fileUrl, extension, status: 200 }
    }
  } catch {
    if (extension && extension !== 'html') {
      return { extension: 'txt', fileUrl: undefined, status: 404 }
    }
  }

  return {
    extension: 'html',
    fileUrl: new URL('./index.html', publicDir),
    status: 200,
  }
}

Deno.serve({ hostname: '0.0.0.0', port }, async (request) => {
  const { pathname } = new URL(request.url)

  if (pathname === '/healthz') {
    return new Response('ok', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const { extension, fileUrl, status } = await getResponseFile(request.url)

  if (!fileUrl) {
    return new Response('Not found', {
      status,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const file = await Deno.open(fileUrl, { read: true })
  const isHashedAsset = pathname.startsWith('/assets/')
  const headers = new Headers({
    'cache-control': isHashedAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    'content-type': contentTypes[extension] ?? 'application/octet-stream',
  })

  return new Response(file.readable, { headers, status })
})
