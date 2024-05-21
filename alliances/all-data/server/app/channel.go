package app

import mattermost "github.com/mattermost/mattermost-server/v6/model"

type Channel struct {
	ChannelID      string `json:"channelId"`
	ParentID       string `json:"parentId"`
	SectionID      string `json:"sectionId"`
	OrganizationID string `json:"organizationId"`
}

// Unifies channel data with mattermost data we're interested about
type FullChannel struct {
	ChannelID      string `json:"channelId"`
	ParentID       string `json:"parentId"`
	SectionID      string `json:"sectionId"`
	OrganizationID string `json:"organizationId"`
	DeleteAt       int64  `json:"deletedAt"`
}

type ChannelFilterOptions struct {
	Sort       SortField
	Direction  SortDirection
	SearchTerm string

	// Pagination options
	Page    int
	PerPage int
}

type GetChannelsResults struct {
	Items []Channel `json:"items"`
}

type GetMattermostChannelsResults struct {
	Items []mattermost.Channel `json:"items"`
}

type GetChannelByIDResult struct {
	Channel FullChannel `json:"channel"`
}

type AddChannelParams struct {
	UserID              string `json:"userId"`
	ChannelID           string `json:"channelId"`
	ChannelName         string `json:"channelName"`
	CreatePublicChannel bool   `json:"createPublicChannel"`
	ParentID            string `json:"parentId"`
	SectionID           string `json:"sectionId"`
	TeamID              string `json:"teamId"`
	OrganizationID      string `json:"organizationId"`
}

type AddChannelResult struct {
	ChannelID string `json:"channelId"`
	ParentID  string `json:"parentId"`
	SectionID string `json:"sectionId"`
}

type ArchiveChannelsParams struct {
	SectionID string `json:"sectionId"`
}

type Backlink struct {
	ID          string `json:"id"`
	Message     string `json:"message"`
	AuthorName  string `json:"authorName"`
	ChannelName string `json:"channelName"`
	SectionName string `json:"sectionName"`
	CreateAt    int64  `json:"createAt"`
}

type GetBacklinksResult struct {
	Items        []Backlink       `json:"items"`
	ChannelCount []*ChannelsCount `json:"channelsCount"`
}

type ChannelsCount struct {
	Name        string `json:"name"`
	Count       int    `json:"count"`
	SectionName string `json:"sectionName"`
}

type BacklinkData struct {
	MarkdownText string
	MarkdownLink string
}

type BacklinkEntity struct {
	ID        string
	PostID    string
	ChannelID string
}

type ExportReference struct {
	SourceName  string   `json:"source_name"`
	ExternalIds []string `json:"external_ids"`
	URLs        []string `json:"urls"`
}

type ExportChannelParams struct {
	Format     string            `json:"format"`
	PinnedOnly bool              `json:"pinnedOnly"`
	References []ExportReference `json:"references"`
}
