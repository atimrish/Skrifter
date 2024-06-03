package actions

import (
	"api/config"
	"bytes"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"strings"
)

var conf = config.InitConfig().StorageServer

func AddToStorage(file multipart.File, path, filename, action string)  {
	addr := fmt.Sprintf(
		"http://%s:%s/%s",
		conf.Host,
		conf.Port,
		action,
	)

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)

	fw, err := writer.CreateFormFile("file", filename)
	IfLogFatal(err)
	_, err = io.Copy(fw, file)
	IfLogFatal(err)
	fw, err = writer.CreateFormField("path")
	IfLogFatal(err)
	_, err = io.Copy(fw, strings.NewReader(path))
	writer.Close()

	req, err := http.NewRequest("POST", addr, &body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	IfLogFatal(err)
	client := http.Client{}
	res, err := client.Do(req)
	IfLogFatal(err)

	log.Println("status: ", res.Status, " filename: ", filename)

}

func UpdateStoredFile(file multipart.File, oldPath, newPath, filename string)  {
	DeleteFromStorage(oldPath)
	AddToStorage(file, newPath, filename, "add-file")
}

func DeleteFromStorage(path string)  {
	client := &http.Client{}

	addr := fmt.Sprintf(
		"http://%s:%s/%s",
		conf.Host,
		conf.Port,
		"delete-file",
	)

	req, err := http.NewRequest("DELETE", addr, nil)
	IfLogFatal(err)

	req.Header.Add("x-datapath", path)

	resp, err := client.Do(req)
	IfLogFatal(err)
	defer resp.Body.Close()
}
