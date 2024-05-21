package util

import (
	"io/fs"
	"strings"

	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/data"
)

func GetEmbeddedFilePath(fileName, extension string) (string, error) {
	filePaths, err := fs.Glob(data.Data, extension)
	if err != nil {
		return "", err
	}
	for _, filePath := range filePaths {
		if strings.Contains(filePath, fileName) {
			return filePath, nil
		}
	}
	return "", err
}
