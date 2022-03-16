import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from geojson import Feature, Point, FeatureCollection, dump
import random
import re

filename = "data2.geojson"

ran = 0 # 0.0001

engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_all_latlong_year where Latitude is not null order by Year, Longitude asc",
                 engine)

feature_collections_names = df["Year"].unique()
feature_collections_size  = feature_collections_names.shape[0]
features = []
features_collections = []
description = ""
longitude_prev = df.Longitude[0]
latitude_prev = df.Latitude[0]
actual_collection = 0
year_prev = df.Year[0]
des = df.Description[0].replace("'", "\\'")
description = f'[\'{df.ImageUrl[0]}\', \'{df.ID[0]}\', \'{des}\'],'
for index, row in df[1:].iterrows():
    print(index)
    if row["Year"] == year_prev:
        if row["Latitude"] == latitude_prev:
            des = str(row["Description"]).replace("'", "\\'")
            description += f'[\'{row["ImageUrl"]}\', \'{row["ID"]}\', \'{des}\'],'
        else:
            features.append(Feature(geometry=Point((longitude_prev + random.uniform(-ran, ran), latitude_prev+random.uniform(-0.0001, 0.0001))), properties={'images': f'[ {description}] ', 'Title':row["Year"]}))
            des = str(row["Description"]).replace("'", "\\'")
            description = f'[\'{row["ImageUrl"]}\' , \'{row["ID"]}\', \'{des}\'],'
            latitude_prev = row["Latitude"]
            longitude_prev = row["Longitude"]
    else:
        features.append(Feature(geometry=Point(
            (longitude_prev + random.uniform(-ran, ran), latitude_prev + random.uniform(-ran, ran))),
                                properties={f'\'images\'': f'[ {description}] ', "Title": year_prev}))
        des = str(row["Description"]).replace("'", "\\'")
        description = f'[\'{row["ImageUrl"]}\',\'{row["ID"]}\', \'{des}\'],'
        latitude_prev = row["Latitude"]
        longitude_prev = row["Longitude"]
        year_prev = row["Year"]
        # features_collections.append(FeatureCollection(features))
        # features = []
features_collections.append(FeatureCollection(features))

regex = r"\\\\'"
subst = r"\\'"

with open(filename, 'w') as f:
   # dump(features_collections, f)
   dump(features_collections, f,indent = 4)

regex = r"\\\\'"
subst = r"\\'"
[re.sub(regex, subst, line, 0, re.MULTILINE)
    for line in open(filename)]

# Read in the file
with open(filename, 'r') as file :
  filedata = file.read()


filedata = filedata.replace("'images'", 'images')
filedata = filedata.replace(": \"[ ", ': [ ')
filedata = filedata.replace("] \",", '] ,')

filedata = re.sub(regex, subst, filedata, 0, re.MULTILINE)
# Write the file out again
with open(filename, 'w') as file:
  file.write(filedata)