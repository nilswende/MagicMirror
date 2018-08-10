rem set environment variables for compile
set GOOS=linux
set GOARCH=arm
set GOARM=7

cd %USERPROFILE%\go\src\github.com\nilswende\MagicMirror-server\main
go build -o MagicMirror-server main.go
