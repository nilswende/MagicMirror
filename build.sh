#!/usr/bin/env bash

# set environment variables for compile
export GOOS=linux
export GOARCH=arm
export GOARM=7

cd ./main
go build -o MagicMirror-server main.go
