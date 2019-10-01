echo "Please make sure you've read the script before running it!"
echo "If you haven't, please press Ctrl-C to exit."

# For setting up the webiste on a new machine
# Developed and tested for Ubuntu 16.04
# Most installation steps can be skipped if already installed
# the sudo commands here are also used to pause the script to
# prevent someone from running without understanding it.
sudo apt-get update
sudo apt-get upgrade

# install mysql database
# in the process, you'll be asked to set root password
# be sure to remember it
sudo apt-get install mysql-server

# install node
# Please google on how to do this. Just make sure node is available in the system.
# tested on version: v10.16.3
# install npm

# install dependencies
npm i

# build
npm run build

# create user database
# login with the root password
mysql -u root -p

# inside mysql run
source data/scripts/createDB.sql

# Mount the confidential data directory somewhere in the system, and
# create symlink named "data" in this directory (where this setup.sh is)
# to point to its location, such as:
# ln -s ../aqip_memories_data/data data

# start server
npm run startserver

# should be able to connect via xxx.xxx.xxx.xxx:portNumber
