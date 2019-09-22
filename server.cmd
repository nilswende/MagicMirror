cd %GOPATH%\src\github.com\nilswende\MagicMirror-server\main
go build main.go
main.exe -port 80 -dir %Desktop%\MagicMirror\MagicMirror -test true
@pause rem keep window open until user input
