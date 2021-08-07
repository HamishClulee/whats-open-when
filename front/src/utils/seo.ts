interface Meta {
  title?: string,
  description?: string,
  index: boolean,
}

const overwritemetas = (meta: Meta | null = null, next: any): void => {
    
    if (process.env.NODE_ENV === 'development' && next) return next()

    const des: HTMLMetaElement = document.getElementById('__meta_description') as HTMLMetaElement
    const title: HTMLTitleElement = document.getElementsByTagName('title')[0] as HTMLTitleElement

    if (meta) {

        title.text = meta.title ? meta.title : ''
        des.content = meta.description ? meta.description : ''

        if (meta.index === false) {

            const robots: HTMLMetaElement = document.createElement('meta') as HTMLMetaElement
            robots.name = 'robots'
            robots.content = 'noindex'
            document.getElementsByTagName('head')[0].appendChild(robots)

        } else { // meta noindex doesn't exist

            try {

                const metas: HTMLCollectionOf<HTMLMetaElement> = document.getElementsByTagName('meta') as HTMLCollectionOf<HTMLMetaElement>
                for (let i = 0; i < metas.length; i += 1) {

                    if (metas[i] && metas[i].parentNode && metas[i].name === 'robots') metas[i].parentNode!.removeChild(metas[i])

                }

            } catch (e) {

                // suppress any console errors
                if (next) {

                    return next()

                }

            }

        }

    }

    return next ? next() : false

}

export default overwritemetas
