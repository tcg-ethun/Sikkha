# Create images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path images

# Download Einstein images
$images = @{
    "einstein.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
    "einstein-young.jpg" = "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg"
    "einstein-blackboard.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/84/Albert_Einstein_at_the_blackboard.jpg"
    "einstein-princeton.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/50/Albert_Einstein_at_Princeton_University.jpg"
    "einstein-nobel.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
}

foreach ($image in $images.GetEnumerator()) {
    $outFile = Join-Path -Path "images" -ChildPath $image.Key
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $image.Value -OutFile $outFile
} 