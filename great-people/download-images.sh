#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download Einstein images
wget -O images/einstein.jpg https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg
wget -O images/einstein-young.jpg https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg
wget -O images/einstein-blackboard.jpg https://upload.wikimedia.org/wikipedia/commons/8/84/Albert_Einstein_at_the_blackboard.jpg
wget -O images/einstein-princeton.jpg https://upload.wikimedia.org/wikipedia/commons/5/50/Albert_Einstein_at_Princeton_University.jpg
wget -O images/einstein-nobel.jpg https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg

# Make the script executable
chmod +x download-images.sh 