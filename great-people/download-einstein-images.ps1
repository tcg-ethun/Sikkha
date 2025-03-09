# Create images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path images

# Download Einstein images
$images = @{
    "einstein-young.jpg" = "https://upload.wikimedia.org/wikipedia/commons/5/50/Albert_Einstein_as_a_child.jpg"
    "einstein-blackboard.jpg" = "https://upload.wikimedia.org/wikipedia/commons/d/d7/Albert_Einstein_at_the_blackboard.jpg"
    "einstein-princeton.jpg" = "https://upload.wikimedia.org/wikipedia/commons/f/f0/Einstein_at_Princeton.jpg"
    "einstein-nobel.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/3e/Einstein_1921_by_F_Schmutzer_-_restoration.jpg"
    "einstein-office.jpg" = "https://upload.wikimedia.org/wikipedia/commons/1/14/Albert_Einstein_1947.jpg"
    "einstein-sailing.jpg" = "https://upload.wikimedia.org/wikipedia/commons/3/3c/Einstein_summer_1939.jpg"
    "einstein-family.jpg" = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Einstein_with_his_wife.jpg"
    "einstein-lecture.jpg" = "https://upload.wikimedia.org/wikipedia/commons/8/86/Einstein_giving_lecture.jpg"
    "einstein-study.jpg" = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Einstein_at_his_desk.jpg"
}

Write-Host "Starting to download Einstein images..."

foreach ($image in $images.GetEnumerator()) {
    $outFile = Join-Path -Path "images" -ChildPath $image.Key
    Write-Host "Downloading $($image.Key)..."
    try {
        Invoke-WebRequest -Uri $image.Value -OutFile $outFile
        Write-Host "Successfully downloaded $($image.Key)"
    }
    catch {
        Write-Host "Failed to download $($image.Key): $_"
    }
}

Write-Host "Download process completed!" 