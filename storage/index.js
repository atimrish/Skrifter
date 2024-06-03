const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const {unlink, mkdir} = require("node:fs");
const {exec} = require("node:child_process")
const {parse} = require("node-html-parser");
const fs = require("node:fs");
const port = 8000

const addFileHandler = (req, res) => {
    const file = req.files.file
    const store_path = `/files/${req.body.path}`
    file.mv(__dirname + store_path, function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    })
}

const updateFileHandler = (req, res) => {
    const file = req.files.file
    const new_path = `/files/${req.body.new_path}`
    const old_path = `/files/${req.body.old_path}`

    unlink(__dirname + old_path, () => {})

    file.mv(__dirname + new_path, function(err) {
        if (err)
            return res.status(500).send(err);
        res.send('File uploaded!');
    })
}

const deleteFileHandler = (req, res) => {
    const store_path = `/files/${req.headers['x-datapath']}`
    unlink(__dirname + store_path, () => {
        res.send('File deleted!');
    })
}

const addBookSource = (req, res) => {
    const parsedPath = req.body.path.split('/')
    const sourcePath = __dirname + "/files/" + parsedPath.slice(0, 3).join('/')
    mkdir(sourcePath, () => {})

    const file = req.files.file
    const store_path = `/files/${req.body.path}`

    file.mv(__dirname + store_path, function(err) {
        if (err)
            return res.status(500).send(err);
    })
    mkdir(sourcePath + "/pages", () => {})

    const command = `pdftohtml -c ${__dirname + store_path} ${sourcePath}/pages/p.html`

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.error(`stderr: ${stderr}`);
    })

    res.send('File uploaded!');
}

const getBookPage = (req, res) => {
    ///TODO: реализовать получение страницы
    const dir = req.query.dir
    const page = req.query.p


    const path = `/srv/files/product/source/${dir}/pages/p-${page}.html`;

    const file = fs.readFileSync(path)
    const html = parse(file.toString())
    const pageSend = html.querySelector(`#page${page}-div`)

    res.send(pageSend.innerHTML)
}

app.use(fileUpload())
app.use(express.static('files'))
app.use(express.urlencoded({limit:'100mb'}))

//обычные запросы
app.post("/add-file", addFileHandler)
app.put("/update-file", updateFileHandler)
app.delete("/delete-file", deleteFileHandler)

//запрос на добавление книги
app.post("/add-book", addBookSource)

//запрос на получение страницы книги
app.get("/book-page", getBookPage)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

