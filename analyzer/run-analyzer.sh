#!/bin/bash -l

printf "\nRunning Triple Trenders Analyzer!\n"

# Load these for nvm and node.
source ~/.bashrc
source ~/.nvm/nvm.sh
source ~/.profile

# Navigate into the project directory.
cd ~/Git-Projects/Rippers-N-Dippers/analyzer

# Use project's preferred node version from .nvmrc file.
nvm use

# Run the unfollower script!
npm start