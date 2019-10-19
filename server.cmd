cd %GOPATH%\src\github.com\nilswende\MagicMirror\main
go build main.go
main.exe -port 80 -dir %GOPATH%\src\github.com\nilswende\MagicMirror\MagicMirror -test true
@pause rem keep window open until user input
