const express = require('express')
const app = express()
const fileUpload = require('express-fileupload');
const {unlink} = require("node:fs");
const port = 8000

const addFileHandler = (req, res) => {
    console.log(req)
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


app.use(fileUpload())
app.use(express.static('files'))
app.post("/add-file", addFileHandler)
app.put("/update-file", updateFileHandler)
app.delete("/delete-file", deleteFileHandler)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

