#!/bin/bash

# Check if the destination folder is provided as an argument
if [ -z "$1" ]; then
  echo "Usage: sudo ./move_folder.sh <destination_folder>"
  exit 1
fi

# Variables
SCRIPT_DIR=$(pwd)          # Directory of the script
DESTINATION_FOLDER="$1"              # Destination folder passed as an argument

echo "The Destination is $SCRIPT_DIR ";


# copy the folder contents with sudo and overwrite existing files
sudo cp -rf "$SCRIPT_DIR"/* "$DESTINATION_FOLDER"

# Check if the move was successful
if [ $? -eq 0 ]; then
  echo "Files moved successfully to $DESTINATION_FOLDER"
else
  echo "Failed to move files"
fi