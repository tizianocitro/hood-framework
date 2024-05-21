FROM mattermost/mattermost-enterprise-edition:7.8.0
WORKDIR /mattermost
COPY docker/package/alliances-+.tar.gz ./prepackaged_plugins/alliances-+.tar.gz
COPY docker/plugins/com.github.matterpoll.matterpoll.tar.gz ./prepackaged_plugins/com.github.matterpoll.matterpoll-1.6.1.tar.gz
