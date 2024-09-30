import discord
from discord.ext import commands
import csv
from tabulate import tabulate
import json
from scraper import ArgosScraper
import threading
import asyncio
import time
from queue import Queue
from dotenv import load_dotenv
import os
from undetected_chromedriver import Chrome, ChromeOptions
load_dotenv()

# Define your intents
intents = discord.Intents.default()
intents.messages = True
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)
message_queue = Queue()

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}')

@bot.command()
async def hello(ctx):
    try:
        embed = discord.Embed(title="Hello", description="I am your bot!", color=0xeee657)
        await ctx.send(embed=embed)
    except Exception as e:
        print(e)

@bot.command()
async def store(ctx, action, store_number=None):
    if action == 'all':
        try:
            with open('store_numbers.csv', newline='') as csvfile:
                reader = csv.reader(csvfile, delimiter=',')
                data = [row for row in reader]

            # Create a table from the data
            table = tabulate(data, headers=['Store ID', 'Store Name'], tablefmt='pretty')

            # Split the table into chunks to fit within Discord's character limit
            max_chunk_length = 1900  # Adjust as needed
            chunks = [table[i:i+max_chunk_length] for i in range(0, len(table), max_chunk_length)]

            for chunk in chunks:
                # Send each chunk as a separate message
                await ctx.send(f'```\n{chunk}\n```')

        except Exception as e:
            print(e)
    elif action == 'add':
        if store_number is None:
            await ctx.send('Please provide a store number.')
        else:
            # check if store_number exists in store_numbers.csv
            with open('store_numbers.csv', newline='') as csvfile:
                reader = csv.reader(csvfile, delimiter=',')
                data_csv = [row for row in reader]
            store_number_exists = False
            for row in data_csv:
                if row[0] == store_number:
                    store_number_exists = True
                    break
            if not store_number_exists:
                await ctx.send(f'Store {store_number} does not exist.')
                return

            # store the store_id in data.json file
            with open('data.json', 'r') as f:
                data = json.load(f)
            try:
                data['stores']
            except:
                data['stores'] = []

            if store_number not in data['stores']:
                data['stores'].append(store_number)
                with open('data.json', 'w') as f:
                    json.dump(data, f)
                await ctx.send(f'Store {store_number} added.')
            else:
                await ctx.send(f'Store {store_number} already exists.')
    elif action == 'remove':
        if store_number is None:
            await ctx.send('Please provide a store number.')
        else:
            # store the store_id in data.json file
            with open('data.json', 'r') as f:
                data = json.load(f)

            try:
                data['stores']
            except:
                data['stores'] = []

            if store_number in data['stores']:
                data['stores'].remove(store_number)
                with open('data.json', 'w') as f:
                    json.dump(data, f)
                await ctx.send(f'Store {store_number} removed.')
            else:
                await ctx.send(f'Store {store_number} does not exist.')
    elif action == 'list':
        with open('data.json', 'r') as f:
            data = json.load(f)
        try:
            data['stores']
        except:
            data['stores'] = []

        # get csv data and filter by store numbers
        with open('store_numbers.csv', newline='') as csvfile:
            reader = csv.reader(csvfile, delimiter=',')
            data_csv = [row for row in reader]
        data_csv_filtered = []
        for row in data_csv:
            if row[0] in data['stores']:
                data_csv_filtered.append(row)

       # create a embed for each store
        for row in data_csv_filtered:
            embed = discord.Embed(title="Store", description=f"Store Id:  {row[0]}", color=0xeee657)
            embed.add_field(name="Store Name", value=row[1])
            await ctx.send(embed=embed)

@bot.command()
async def product(ctx, action, product_number=None):
    if action == 'add':
        if product_number is None:
            await ctx.send('Please provide a product number.')
        else:
            # store the product_id in data.json file
            with open('data.json', 'r') as f:
                data = json.load(f)
            try:
                data['products']
            except:
                data['products'] = {}

            scraper = ArgosScraper(product_number)
            product_name, product_image, product_price = scraper.getProductName()
            if not product_name:
                await ctx.send(f'Product {product_number} does not exist.')
                return
            if product_number not in data['products']:
                data['products'][product_number] = {
                    "title" : product_name,
                    "isAvailable" : False,
                    "image" : product_image,
                    "product_url" : f"https://www.argos.co.uk/product/{product_number}?clickCSR=slp:cannedSearch",
                    "price" : product_price
                }
                with open('data.json', 'w') as f:
                    json.dump(data, f)
                embed = discord.Embed(title="Product Added", description=f"Product {product_number} added.", color=0xeee657)
                embed.set_thumbnail(url=product_image)
                embed.add_field(name="Product Name", value=product_name)
                embed.add_field(name="Product URL", value=f"https://www.argos.co.uk/product/{product_number}?clickCSR=slp:cannedSearch")

                await ctx.send(embed=embed)
            else:
                await ctx.send(f'Product {product_number} already exists.')
    elif action == 'remove':
        if product_number is None:
            await ctx.send('Please provide a product number.')
        else:
            # store the product_id in data.json file
            with open('data.json', 'r') as f:
                data = json.load(f)

            try:
                data['products']
            except:
                data['products'] = {}

            if product_number in data['products']:
                del data['products'][product_number]

                with open('data.json', 'w') as f:
                    json.dump(data, f)
                await ctx.send(f'Product {product_number} removed.')
            else:
                await ctx.send(f'Product {product_number} does not exist.')
    elif action == 'list':
        try:
            with open('data.json', 'r') as f:
                data = json.load(f)
                products = data.get('products', {})

           # make a embed for each product
            for product in products:
                embed = discord.Embed(title="Product", description=f"Product Id:  {product}", color=0xeee657)
                embed.set_thumbnail(url=products[product]['image'])
                embed.add_field(name="Product Name", value=products[product]['title'])
                embed.add_field(name="Product Price", value=products[product]['price'])
                embed.add_field(name="Product URL", value=products[product]['product_url'])
                await ctx.send(embed=embed)

        except Exception as e:
            print(e)
    else:
        await ctx.send('Invalid action.')

@bot.command()
async def scrape(ctx, product_id):
    scraper = ArgosScraper(product_id, stores=[])
    stores, product_name = scraper.parse_data()

    if not stores:
        await ctx.send('No stores found.')
        return

    # Create a table from the data
    table = tabulate(stores, headers='keys', tablefmt='pretty')

    # Split the table into chunks to fit within Discord's character limit
    max_chunk_length = 1900
    chunks = [table[i:i+max_chunk_length] for i in range(0, len(table), max_chunk_length)]

    for chunk in chunks:
        # Send each chunk as a separate message
        await ctx.send(f'\n\n| {product_name} | {product_id} |\n\n```\n{chunk}\n```')

@bot.command()
async def config(ctx, action, value):
    if action == "maxDistance":
        with open('data.json', 'r') as f:
            data = json.load(f)
        data['config']['maxDistance'] = value
        with open('data.json', 'w') as f:
            json.dump(data, f)
        await ctx.send(f"maxDistance set to {value}")
    elif action == "maxResults":
        with open('data.json', 'r') as f:
            data = json.load(f)
        data['config']['maxResults'] = value
        with open('data.json', 'w') as f:
            json.dump(data, f)
        await ctx.send(f"maxResults set to {value}")
    else:
        await ctx.send("Invalid action.")

import time
from collections import deque

message_queue = deque()

@bot.command()
async def start(ctx, action):
    if action == "monitor":
        data = load_data()  # Load your data from the JSON file

        if not data['products']:
            await ctx.send("Please add products to monitor.")
            return

        if not data['stores']:
            await ctx.send("Please add stores to monitor.")
            return

        await ctx.send("Starting monitor...")

        # Start the monitor asynchronously
        await start_monitor(ctx, data['towns'], data['products'], data['stores'])

        await ctx.send("Monitor started.")

    else:
        await ctx.send("Invalid action.")

async def start_monitor(ctx, towns, products, stores):
    print("Called monitor...")

    def start_browser():
        options = ChromeOptions()
        options.add_argument(f"--user-data-dir={os.getcwd()}/profile")
        options.add_argument("--incognito")
        driver = Chrome(options=options)
        return driver

    # Initialize the browser
    driver = start_browser()

    async def monitor_product(product, town):
        try:
            scraper = ArgosScraper(product, town=town)
            stores, product_name = scraper.parse_data(driver)
            if stores == -1:
                return None

            data = load_data()
            if not stores:
                print(f"No stores found for {product_name} in {town}")
                if 'availability' not in data['products'][product]:
                    data['products'][product]['availability'] = {}
                data['products'][product]['availability'][town] = False
                save_data(data)
                return None

            print(f"Found {len(stores)} stores for {product_name} in {town}")
            if not data['products'][product]['availability'].get(town, False):
                data['products'][product]['availability'][town] = True

            await send_product_notifications(ctx, [(product, stores)], town)
            save_data(data)
            return product, stores

        except Exception as e:
            print(f"Error monitoring product {product} in {town}: {e}")
            return None

    async def send_product_notifications(ctx, available_products, town):
        message = discord.Embed(title=f"", color=0xeee657)
        for product, stores in available_products:
            product_data = data['products'][product]
            message.set_thumbnail(url=product_data['image'])
            message.add_field(name="Product Name", value=product_data['title'])
            for store in stores:
                if not store['isAvailable']:
                    continue
                if len(message.fields) > 21:
                    await ctx.send(embed=message)
                    message = discord.Embed(title=f"", color=0xeee657)
                    message.set_thumbnail(url=product_data['image'])
                    message.add_field(name="Product Name", value=product_data['title'])
                message.add_field(name="Store Name", value=store['name'])
        if len(message.fields) > 0:
            await ctx.send(embed=message)

    async def check_products():
        available_products = []
        for town in towns:
            tasks = [monitor_product(product, town) for product in products]
            results = await asyncio.gather(*tasks)
            for result in results:
                if result:
                    product, stores = result
                    if not data['products'][product].get('isAvailable', False):
                        data['products'][product]['isAvailable'] = True
                        available_products.append((product, stores))
        if available_products:
            await send_product_notifications(ctx, available_products, town)

    while True:
        try:
            restart_time = 1800  # Time in seconds (30 minutes)
            start_time = time.time()

            # Main product check loop
            await check_products()

            execution_time = time.time() - start_time
            print(f"Check complete. Execution time: {execution_time} seconds")

            # Calculate remaining time before restarting
            time_remaining = restart_time - execution_time
            if time_remaining > 0:
                print(f"Sleeping for {time_remaining} seconds before next check.")
                await asyncio.sleep(time_remaining)  # Make sure it's awaited properly
            else:
                print("Warning: Execution took longer than the restart interval. Restarting immediately.")

            # Restart the browser driver
            print("Restarting browser driver...")
            driver.quit()
            driver = start_browser()
            print("Browser restarted.")

            # Reload data for the next iteration
            data = load_data()

        except Exception as e:
            print(f"An error occurred during monitoring: {e}")
            await ctx.send("An error occurred during monitoring. Restarting...")
            # Optionally, restart the driver again if the error was critical
            driver.quit()
            driver = start_browser()

def save_data(data):
    # Save your data to the JSON file
    with open('data.json', 'w') as f:
        json.dump(data, f)

def load_data():
    # Load your data from the JSON file and return it as a Python dictionary
    with open('data.json', 'r') as f:
        return json.load(f)

# You can now run your bot
bot.run(os.getenv('DISCORD_TOKEN'))
