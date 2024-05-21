package api

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/tizianocitro/hood-framework/alliances/all-data/server/config"
)

const ConfigBasePath = "/configs"

// ConfigHandler is the API handler.
type ConfigHandler struct {
	*ErrorHandler
	platformService *config.PlatformService
	configuration   *config.MattermostConfig
}

// ConfigHandler returns a new platform config api handler
func NewConfigHandler(router *mux.Router, platformService *config.PlatformService, configuration *config.MattermostConfig) *ConfigHandler {
	handler := &ConfigHandler{
		ErrorHandler:    &ErrorHandler{},
		platformService: platformService,
		configuration:   configuration,
	}

	platformRouter := router.PathPrefix(ConfigBasePath).Subrouter()
	platformRouter.HandleFunc("/platform", withContext(handler.getPlatformConfig)).Methods(http.MethodGet)
	platformRouter.HandleFunc("/system_console", withContext(handler.getSystemConfig)).Methods(http.MethodGet)

	return handler
}

func (h *ConfigHandler) getPlatformConfig(c *Context, w http.ResponseWriter, r *http.Request) {
	config, err := h.platformService.GetPlatformConfig()
	if err != nil {
		h.HandleError(w, c.logger, err)
		return
	}
	ReturnJSON(w, config, http.StatusOK)
}

func (h *ConfigHandler) getSystemConfig(c *Context, w http.ResponseWriter, r *http.Request) {
	config := h.configuration.GetConfiguration()
	ReturnJSON(w, config.ToPublicConfiguration(), http.StatusOK)
}
