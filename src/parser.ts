import * as cheerio from 'cheerio';

function parseElement(_index: number, element: any): string {
  const $ = cheerio.load(element)
  const el = $(element).get(0)

  if (el.type === 'text') {
    const text = el.data
    return `${text}`
  }
  
  if (el.type === 'tag') {
    if (el.name === 'h1') {
      return `# ${el.children[0].data}`
    }

    if (el.name === 'figure') {
      const src = $('div > img').last().attr('src')
      return `\n![alt text](${src})\n`
    }


    if (el.name === 'p') {
      const p  = el.children.map((e, _i) => {
        parseElement(_i, e)
      })
      log(p)
      return p.join('')
    }

    if (el.name === 'h4') {
      return `#### ${el.children[0].data}\n`
    }
    
    if (el.name === 'strong') {
      return `**${el.children[0].data}**`
    }

    return paragraph;
  }

  return ''
}


function log(element: any): void {
  console.log('---------------')
  console.log(element)
  console.log('---------------')
}
export default parseElement
