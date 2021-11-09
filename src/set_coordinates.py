import pandas as pd
from sqlalchemy import create_engine
import certifi
import ssl
import time
import geopy.geocoders
from geopy.geocoders import Nominatim
ctx = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = ctx
pd.options.mode.chained_assignment = None  # default='warn'


engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_filtered where (GeoNoRue is not null or GeoRue is not null)and ImageUrl is not null", engine)

locator = geopy.Nominatim(user_agent="myGeocoder")
location = locator.geocode("Champ de Mars, Paris, France")

for index, row in df.iterrows():
    Rue = row['GeoRue']
    if Rue == None:
        Rue = ""
    NoRue = row['GeoNoRue']
    if NoRue == None:
        NoRue = ""
    loc = row['GeoLocalite']
    if loc == None:
        loc = ""
    pays = row['GeoPays']
    if pays == None:
        pays = ""
    NPA = row['GeoNPA']
    if NPA == None:
        pays = ""
    location = locator.geocode(Rue + " " + NoRue + " " + loc + " " + pays)
    if location is not None:
        df.Latitude[index] = location.latitude
        df.Longitude[index] = location.longitude
        print(f'{index}/15950\n')
        # time.sleep(0.3)
    else:
        print("error")


df.to_sql('icono_MHL_all_latlong', engine)
print(df)
