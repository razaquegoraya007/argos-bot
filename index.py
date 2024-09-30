import requests
import json
import time
url = "https://www.argos.co.uk/stores/api/orchestrator/v0/locator/availability?origin=london&skuQty=1406201_1&maxResults=10&maxDistance=50&save=pdp-ss%3A%2F&ssm=true"


# url = "https://www.argos.co.uk/stores/api/orchestrator/v0/locator/availability/basket?origin=WN3%206XA&skuQty=2913580_1&orderId=arg-cfb85a80-3084-4e58-8a7d-bbd0a6e70605&maxResults=10&maxDistance=50&save=tlp-ss%3A%2F&ssm=true"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    'Referer': 'https://www.argos.co.uk/product/1406201?clickPR=plp:3:99',
}

# sessionId=VNkg/YDpfnJZ6PlEGhwXXGcKC25+2PnFfG9eO7EHYxq+YWdllJZ+Ctl3SFTXIdUC;cisId=dd406188ed9845a594a76d6d1f855c08


# calculate time taken to make request
start = time.time()
for _ in range(124):
    response = requests.request("GET", url, headers=headers)
    print(response.text)
end = time.time()
print(end - start)