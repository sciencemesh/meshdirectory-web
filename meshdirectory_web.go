package meshdirectory_web

import (
	"embed"
	"net/http"
)

//go:embed dist/*
var spaDist embed.FS

func ServeMeshDirectorySPA(w http.ResponseWriter, r *http.Request) {
	var server = http.FileServer(http.FS(spaDist))
	server.ServeHTTP(w, r)
}
