import requests
import json
from bs4 import BeautifulSoup
from httpx_socks import SyncProxyTransport
import httpx
from dotenv import load_dotenv
import os

class ArgosScraper():
    def __init__(self, product_id, town=''):
        load_dotenv()
        self.product_id = product_id
        self.town = town
        with open("data.json", "r") as f:
            self.data = json.load(f)
            self.maxDistance = self.data.get("config").get('maxDistance', 50)
            self.maxResults = self.data.get("config").get('maxResults', 50)
            self.towns = self.data.get('towns', [])
        self.headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
                'Referer': 'https://www.argos.co.uk/product/1406201?clickPR=plp:3:99',
            }
    
    def create_session(self):
        transport = SyncProxyTransport.from_url(os.getenv('PROXY_URL'))
        session = httpx.Client(transport=transport)
        return session

    def scrape(self):
        try:
            url = f"https://www.argos.co.uk/stores/api/orchestrator/v0/locator/availability?origin={self.town}&skuQty={self.product_id}_1&maxResults=10&maxDistance=50&save=pdp-ss%3A%2F&ssm=true"
            session = self.create_session()
            response = session.get(url, headers=self.headers)
            return response.json()
        except Exception as e:
            print(e)
            return {}

    def parse_data(self):
        try:
            data = self.scrape()
            if not data.get('stores'):
                print("No stores found")
                return False, False

            
            # get stores from json file data.json
            with open('data.json', 'r') as f:
                json_data = json.load(f)
            
            product_name = json_data.get('products', []).get(self.product_id, False).get('title', '')
            product_url = json_data.get('products', []).get(self.product_id, False).get('product_url', '')
            product_image = json_data.get('products', []).get(self.product_id, False).get('image', '')
            product_price = json_data.get('products', []).get(self.product_id, False).get('price', '')
            
            stores = data['stores']
            available_stores = []
            isAvailable = False
            for store in stores:
                if store['availability'][0]['quantityAvailable'] == 0:
                    current_store_availability = False
                    parsed_store = self.parseStoreData(store, current_store_availability)
                    available_stores.append(parsed_store)
                else:
                    isAvailable = True
                    current_store_availability = True
                    parsed_store = self.parseStoreData(store, current_store_availability)
                    available_stores.append(parsed_store)
                
                

            if isAvailable:
                return available_stores, product_name
            else:
                return False, False
            
        except Exception as e:
            print(e)
            return False, False    
    def parseStoreData(self, store, current_store_availability):
        distance = store['distance']
        id_ = store['storeinfo']['store_id']
        name = store['storeinfo']['legacy_name']
        location = store['storeinfo']['address_line'][0]
        longitude = store['storeinfo']['location']['longitude']
        latitude = store['storeinfo']['location']['latitude']
        postcode = store['storeinfo']['postcode']
    
        return {
            "distance": distance,
            "id_": id_,
            "name": name,
            "location": location,
            # "long,lang": f'{longitude}, {latitude}',
            "postcode": postcode,
            "isAvailable": current_store_availability
        }
        

    def getProductName(self):
        url = f"https://www.argos.co.uk/product/{self.product_id}?clickPR=plp:2:427"
        headers = {
            'authority': 'www.argos.co.uk',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML^, like Gecko) Chrome/88.0.4324.190 Safari/537.36',
        }
        response = requests.request("GET", url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')
        # get span with data-test product-title
        product_title = soup.find("span", {"data-test": "product-title"})
        product_image = soup.find_all("picture")[1].find("img").get("src").replace(" ", "%20")
        product_image = f'https://{product_image[2:]}'
        product_price = soup.find("li", {"itemprop": "price"}).text

        try:
            return product_title.text, product_image, product_price
        except:
            return False, False, False
    

    