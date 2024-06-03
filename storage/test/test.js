const {parseFromString} = require('dom-parser')
const {parse} = require('node-html-parser')
const DOMParser = require('xmldom').DOMParser
const fs = require("node:fs")

const file = fs.readFileSync('/srv/files/product/source/1717227770/pages/p-10.html')

// const html = parseFromString(file.toString())
// const page = html.getElementById("page10-div")
// console.log(html)

// const parser = new DOMParser()
// const html =  parser.parseFromString(file.toString(), "text/html")
// const page = html.getElementById("page10-div")
// console.log(page.)

const html = parse(file.toString())
const page = html.querySelector("#page10-div")
console.log(page.innerHTML)
