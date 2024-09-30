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


@bot.command()
async def start(ctx, action):
    if action == "monitor":
        with open('data.json', 'r') as f:
            data = json.load(f)
        try:
            data['products']
        except:
            
            data['products'] = []
        
        towns = data['towns']

        if len(data['products']) == 0:
            await ctx.send("Please add products to monitor.")
            return
        if len(data['stores']) == 0:
            await ctx.send("Please add stores to monitor.")
            return
        

        await ctx.send("Starting monitor...")
        
        await start_monitor(towns, list(data['products'].keys()), data['stores'], data)

        await ctx.send("Monitor started.")


        
    else:
        await ctx.send("Invalid action.")


async def start_monitor(towns, products, stores, data):
    print("Called monitor...")
    def monitor(towns, products, stores):
            if len(products) == 0:
                return
            while True:
                start = time.time()
                available_stores = []
                for town in towns:
                    print(f"Monitoring {town}")
                    for product in products:
                        scraper = ArgosScraper(product, town=town)
                        stores, product_name = scraper.parse_data()
                        if not stores:
                            data['products'][product]['isAvailable'] = False
                            with open('data.json', 'w') as f:
                                json.dump(data, f)
                            continue

                        print(f"Found {len(stores)} stores for {product_name} in {town}")

                        
                        if data['products'][product]['isAvailable'] == True:
                            continue
                        else:
                            data['products'][product]['isAvailable'] = True
                            with open('data.json', 'w') as f:
                                json.dump(data, f)
                                
                        available_stores.append(stores)
                
                print(available_stores)
                if len(available_stores) > 0:
                    message = discord.Embed(title="Product Available", description=f"Product {product} available.", color=0xeee657)
                    message.set_thumbnail(url=data['products'][product]['image'])
                    message.add_field(name="Product Name", value=data['products'][product]['title'])
                    message.add_field(name="Product Price", value=data['products'][product]['price'])
                    message.add_field(name="Product URL", value=data['products'][product]['product_url'])
                    for stores in available_stores:
                        for town_store in stores:
                            if len(message) > 3700:
                                message_queue.put(message)
                                message = discord.Embed(title="Product Available", description=f"Product {product} available.", color=0xeee657)
                                message.set_thumbnail(url=data['products'][product]['image'])
                                message.add_field(name="Product Name", value=data['products'][product]['title'])
                                message.add_field(name="Product Price", value=data['products'][product]['price'])
                                message.add_field(name="Product URL", value=data['products'][product]['product_url'])
                            
                            message.add_field(name="Store Name", value=town_store['name'])
                            message.add_field(name="Availability", value='In-Stock' if town_store['isAvailable'] else 'Out of Stock')
                            message.add_field(name="Store Id", value=town_store['id_'])
                            # check for 4000 character limit in embed
                    if message:
                        message_queue.put(message)

                
                print(f"Time taken: {time.time() - start} seconds")

    # divide products into 5 lists and run monitor in 5 threads
    products_list = []
    for i in range(0, len(products), 5):
        products_list.append(products[i:i+5])
    
    threads = []
    for i in range(len(products_list)):
        t = threading.Thread(target=monitor, args=(towns, products_list[i], stores))
        threads.append(t)
        t.start()
    



    
    await send_message()


async def send_message():
    while True:
        if not message_queue.empty():
            message = message_queue.get()
            print(message)
            await bot.get_channel(1158286582630068324).send(embed=message)
        await asyncio.sleep(1)

# Replace 'YOUR_BOT_TOKEN' with your actual bot token
bot.run(os.getenv('DISCORD_TOKEN'))
