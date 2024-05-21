package data

import "embed"

//go:embed *.json *.csv
var Data embed.FS
