const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const {unlink, mkdir} = require("node:fs");
const {exec} = require("node:child_process")
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

    const command = `pdftoppm -jpeg ${__dirname + store_path} ${sourcePath}/pages/p`

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.error(`stderr: ${stderr}`);
    })

    res.send('File uploaded!');
}

const getPagesCount = (req, res) => {
    const parsedPath = req.body.path

    exec(`ls -1 ${parsedPath} | ws -l`, (error, stdout, stderr) => {
        console.log(error)
        console.log(stdout)
        console.log(stderr)
        res.send(stdout)
    })
}

const addAudio = (req, res) => {
    const parsedPath = req.body.path.split('/')
    const sourcePath = __dirname + "/files/" + parsedPath.slice(0, 3).join('/')
    mkdir(sourcePath, () => {})

    const file = req.files.file
    const store_path = `/files/${req.body.path}`

    file.mv(__dirname + store_path, function(err) {
        if (err)
            return res.status(500).send(err);
    })
    res.send('ok')
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

//запрос на добавление аудиокниги
app.post("/add-audio", addAudio)

//запрос на кол-во страниц
app.post("/get-pages-count", getPagesCount)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

