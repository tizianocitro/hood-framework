# Alliances

A collaboration platform based on Mattermost and Hyperlinked Object-Oriented Discussion (HOOD) to discuss European University Alliances.

# Install
- Build the packages by following the steps for each project.
- Execute the command: `./start.sh` to clean the compose and run Mattermost and the alliances plugin with the data provider.

# Develop
Run in `alliances` directory:

```sh
$ docker build -t alliances-base -f docker/dev.Dockerfile .
```

Run in `all-data-provider` directory:

```sh
$ ./build.sh
```

Build and deploy (change the config file as needed by choosing from the existing files in alliances/config):

```sh
$ ./make.sh -b -p config.yml
```

Deploy (change the config file as needed by choosing from the existing files in alliances/config):

```sh
$ ./make.sh -p config.yml
```

# Troubleshooting
If you're developing on Windows through WSL2, you may have to fix some permissions first. It is recommended to clone the project on the WSL filesystem to avoid incurring in slowdowns caused by the Windows - WSL filesystem synchronization overhead.
Be sure that:
1) The `config/config` and `config/logs` folder are owned by the user 2000 (the Mattermost container user);
2) The `alliances/build/manifest` and `alliances/build/pluginctl` files should have the execute flag (this might be needed if you cloned the project on the Windows filesystem and later moved it to the WSL filesystem)
