import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import parseElement from './parser'

const MEDIUM_URL = "https://medium.freecodecamp.org/typescript-javascript-with-super-powers-a333b0fcabc9"

async function htmlToMardown(url: string) {
  const res = await fetch(url)
  const body = await res.text()
  const $ = cheerio.load(body)
  const elements = $('.section-inner').contents().map(parseElement).toArray().join('\n')
  return body;
}

htmlToMardown(MEDIUM_URL) 