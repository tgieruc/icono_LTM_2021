import pandas as pd
from sqlalchemy import create_engine
import json
import re


def create_img(id, url, description):
    return {"id": int(id), "url": url, "description": description}


def create_year_elem(year, images):
    return {"year": year, "images": images}


def create_marker(longitude, latitude, years, index):
    return {"title": index, "longitude": longitude, "latitude": latitude, "years": years}


filename = "data2.json"

ran = 0  # 0.0001

engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_all_latlong_year where Latitude is not null order by Latitude, Year asc",
                 engine)

marker_arr = []
marker = []
img_arr = []
year_arr = []
id = df.ID[0]
url = df.ImageUrl[0]
description = df.Description[0].replace("'", "\\'")
longitude = df.Longitude[0]
latitude = df.Latitude[0]
year = df.Year[0]
img_arr.append(create_img(id, url, description))
index_marker = 0
for index, row in df[1:].iterrows():
    print(index)
    # NEW MARKER
    if row["Latitude"] != latitude:
        year_arr.append(create_year_elem(year, img_arr))
        img_arr = []
        marker_arr.append(create_marker(longitude, latitude, year_arr, index_marker))
        index_marker += 1
        year_arr = []

        latitude = row["Latitude"]
        longitude = row["Longitude"]

        year = row["Year"]

        id = row["ID"]
        url = row["ImageUrl"]
        description = str(row["Description"]).replace("'", "\\'")
        img_arr.append(create_img(id, url, description))
    else:
        # NEW YEAR ELEMENT
        if row["Year"] != year:
            year_arr.append(create_year_elem(year, img_arr))
            img_arr = []

            year = row["Year"]

            id = row["ID"]
            url = row["ImageUrl"]
            description = str(row["Description"]).replace("'", "\\'")
            img_arr.append(create_img(id, url, description))
        else: #SAME COORDINATES, SAME YEAR
            id = row["ID"]
            url = row["ImageUrl"]
            description = str(row["Description"]).replace("'", "\\'")
            img_arr.append(create_img(id, url, description))


marker_arr.append(create_marker(longitude, latitude, year_arr, index_marker))

regex = r"\\\\'"
subst = r"\\'"

with open(filename, 'w') as f:
    json.dump(marker_arr, f, indent=4)

regex = r"\\\\'"
subst = r"\\'"
[re.sub(regex, subst, line, 0, re.MULTILINE)
 for line in open(filename)]

# Read in the file
with open(filename, 'r') as file:
    filedata = file.read()

filedata = filedata.replace("'images'", 'images')
filedata = filedata.replace(": \"[ ", ': [ ')
filedata = filedata.replace("] \",", '] ,')

filedata = re.sub(regex, subst, filedata, 0, re.MULTILINE)
# Write the file out again
with open(filename, 'w') as file:
    file.write(filedata)
