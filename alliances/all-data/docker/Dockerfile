FROM alliances-base  AS BUILDER
WORKDIR home/mattermost/all-data
COPY . .
ARG CONFIG_FILE_NAME=config.yml
RUN make CONFIG_FILE_NAME=$CONFIG_FILE_NAME

FROM mattermost/mattermost-enterprise-edition:7.8.0
WORKDIR /mattermost
COPY --from=BUILDER /home/mattermost/alliances/dist/alliances-+.tar.gz ./prepackaged_plugins/alliances-+.tar.gz
COPY docker/plugins/com.github.matterpoll.matterpoll.tar.gz ./prepackaged_plugins/com.github.matterpoll.matterpoll-1.6.1.tar.gz
