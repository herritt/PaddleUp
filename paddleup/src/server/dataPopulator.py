import os
import requests
import pandas as pd
import tabula
import json
from datetime import datetime, timedelta
import re

config = {
    'downloadSchedule': False,
}

print("Python build script initialized")

data_dir = "data"
json_path = os.path.join(data_dir, "schedule2023.json")
schedule_pdf_path = os.path.join(data_dir, "schedule2023.pdf")

if config['downloadSchedule']:
    # Create the data directory if it doesn't exist
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    # Download the Schedule
    print("Downloading the Schedule PDF")

    url = "https://static1.squarespace.com/static/5bbcb894704680568ece5555/t/646cc949a6079d0fc8ac2483/1684851017531/2023+ADCKC+Competition+Summary+-+3.1.pdf"
    response = requests.get(url)

    with open(schedule_pdf_path, "wb") as file:
        file.write(response.content)

# Read the table in the PDF file
tables = tabula.read_pdf(schedule_pdf_path, pages="all")

table = tables[0]

# Drop the top row
table = table.iloc[1:]

# Manually set the column headers
table.columns = ["Date", "Event", "Location"]

# Convert the table to JSON
json_string = table.to_json(orient="records")

# Clean the dates field and create separate objects for date ranges
data = json.loads(json_string)

new_data = []
current_year = datetime.now().year  # Get the current year

def splitOnHyphen(date_str, new_data):
    dates = date_str.split("-")
    start_date = dates[0].strip()
    end_date = dates[1].strip()

    start_date_obj = datetime.strptime(start_date, "%B %d")
    end_date_obj = datetime.strptime(end_date, "%B %d")
    
    delta = timedelta(days=1)
    
    
    while start_date_obj <= end_date_obj:
            new_obj = {
                "Date": start_date_obj.replace(year=current_year).date().isoformat(),
                "Event": obj["Event"],
                "Location": obj["Location"]
            }
            new_data.append(new_obj)
            start_date_obj += delta

for obj in data:
    date_str = obj["Date"]
    dateHyphenNum = r"^(January|February|March|April|May|June|July|August|September|October|November|December) ([1-3]?[0-9])\s*-\s*([1-3]?[0-9])$"
    dateHyphenDate = r"^(January|February|March|April|May|June|July|August|September|October|November|December) ([1-3]?[0-9])\s*-\s*(January|February|March|April|May|June|July|August|September|October|November|December).*$" 
    singleDate = r"^(January|February|March|April|May|June|July|August|September|October|November|December) ([1-3]?[0-9])*$" 
    
    dateHyphenNumMatch = re.match(dateHyphenNum, date_str)
    dateHypenDateMatch = re.match(dateHyphenDate, date_str)
    singleDateMatch = re.match(singleDate, date_str)


    if (dateHyphenNumMatch is not None):  
        # date hyphen number
        month, start_day, end_day = dateHyphenNumMatch.groups()
        date_str = f"{month} {start_day}-{month} {end_day}"
        
        #now split on hypen
        splitOnHyphen(date_str, new_data)
        
    elif (dateHypenDateMatch is not None):
        #now split on hypen
        splitOnHyphen(date_str, new_data)

    elif (singleDateMatch is not None):
        # Handle single dates
        date_obj = datetime.strptime(date_str, "%B %d")
        date_obj = date_obj.replace(year=current_year)
        obj["Date"] = date_obj.date().isoformat()
        new_data.append(obj)
    else:
         #handle date with word after hyphen
        dates = date_str.split("-")
        the_date = dates[0].strip()
        date_obj = datetime.strptime(the_date, "%B %d")
        date_obj = date_obj.replace(year=current_year)
        obj["Date"] = date_obj.date().isoformat()
        new_data.append(obj)
    
   
# Print the updated JSON data
print("Trying to load and print the Schedule")

for obj in new_data:
    print(json.dumps(obj, indent=4))
    #pass
    

# Save the JSON file
with open(json_path, "w") as file:
    json.dump(new_data, file, indent=4)
