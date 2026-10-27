import type { Endpoint, PayloadRequest } from 'payload'

function cleanBlock(block: Record<string, any>): Record<string, any> {
    const { id, blockName, blockType, image, ...rest } = block

    const clean: Record<string, any> = {
        type: blockType,  
        ...rest,
    }

    if (image && typeof image === 'object') {
        clean.image = {
            src: image.url,
            alt: image.alt,
        }
    }

    return clean
}

export const commonEndpoint: Endpoint = {
    path: '/common',
    method: 'get',
    handler: async (req) => {
        const common = await req.payload.findGlobal({
            slug: 'common',
        })

        return Response.json({
            siteName: common.siteName,
            menu: (common.menu ?? []).map(({ label, link }: any) => ({ label, link })),
            footer: common.footer?.text ?? '',
        })
    },
}

export const pageEndpoint: Endpoint = {
    path: '/page',
    method: 'get',
    handler: async (req: PayloadRequest) => {
       
        const path = req.query?.path as string ?? '/'

        const pages = await req.payload.find({
            collection: 'pages',
            where: {
                path: { equals: path },
            },
            // Hero uses a static frontend image, so Media records do not need
            // to be fetched when serving public page data.
            depth: 0,
            limit: 1,
        })

  
        if (!pages.docs.length) {
            return Response.json({ error: 'Page not found' }, { status: 404 })
        }

        const page = pages.docs[0]


        const cleanBlocks = (page.blocks ?? []).map((block: Record<string, any>) => {
            const { id, blockName, blockType, ...rest } = block
            return {
                type: block.blockType, 
                ...rest,
            }
        })

        return Response.json({
            path: page.path,
            title: page.title,
            blocks:  (page.blocks ?? []).map(cleanBlock),
        })
    },
}
