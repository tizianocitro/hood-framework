package sqlstore

type ChannelEntity struct {
	ChannelID      string  `json:"channelId"`
	ParentID       string  `json:"parentId"`
	SectionID      string  `json:"sectionId"`
	OrganizationID *string `json:"organizationId"` // nullable for backwards compatibility
}
