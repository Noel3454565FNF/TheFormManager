# Define the URL of the website
$websiteUrl = "www.roblox.com"

# Send a web request to the website
$response = Invoke-WebRequest -Uri $websiteUrl

# The cookies are stored in the response's Cookies property
$cookies = $response.Cookies

# Find a specific cookie by name (replace "cookieName" with the actual cookie name)
$cookie = $cookies | Where-Object { $_.Name -eq ".ROBLOXSECURITY" }

# Display the cookie details
if ($cookie) {
    Write-Output "Cookie Name: $($cookie.Name)"
    Write-Output "Cookie Value: $($cookie.Value)"
} else {
    Write-Output "Cookie not found."
}
