import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import simplekml
import random

def shouldNewDoc(year, year_prev, doc, n_doc):
    if year != "Unknown":
        if np.floor(int(year_prev) / 20) != np.floor(int(row["Year"]) / 20):
            doc = kml.newdocument(
                name=f'{int(np.floor(int(year_prev) / 20) * 20 + 20)}-{int(np.floor(int(year_prev) / 20) * 20 + 40)}')
            year_prev = year
            n_doc += 1
    return doc, year_prev, n_doc


n_doc = 0
color = ['2a4858', '1c6373', '008d8c', '3fb78d', '77d183', 'b5e877', 'd7f171', 'fafa6e']
engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_norue_latlong_year where Latitude is not null order by Year, Longitude asc",
                 engine)
kml = simplekml.Kml()
Unknown = 0
longitude_prev = df.Longitude[0]
latitude_prev = df.Latitude[0]
year_prev = df.Year[0]
ImageUrlArray = [f'{df.ImageUrl[0]} ']
doc = kml.newdocument(name=f'{int(np.floor(int(year_prev) / 20) * 20)}-{int(np.floor(int(year_prev) / 20) * 20 + 20)}')
for index, row in df[1:].iterrows():
    if row["Year"] == "Unknown":
        if Unknown == 0:
            doc = kml.newdocument(name="Unkown")
            Unknown = 1
            year_prev = row["Year"]
            n_doc += 1
        if row["Longitude"] != longitude_prev:
            pnt = doc.newpoint(name=year_prev, coords=[(longitude_prev + random.uniform(-0.0001, 0.0001), latitude_prev+random.uniform(-0.0001, 0.0001))], description=    df.Description[index - 1])
            pnt.style.iconstyle.icon.href = 'https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png'
            pnt.style.iconstyle.color = 'ffff00'
            pnt.extendeddata.newdata(name='gx_media_links', value=f'<![CDATA[{"".join(ImageUrlArray)}]]>')
            ImageUrlArray = [f'{row["ImageUrl"]} ']
            longitude_prev = row["Longitude"]
            latitude_prev = row["Latitude"]
            year_prev = row["Year"]
        else:
            ImageUrlArray.append(f'{row["ImageUrl"]} ')
            year_prev = row["Year"]
    else:
        [doc, year_prev, n_doc] = shouldNewDoc(row["Year"], year_prev, doc, n_doc)
        if row["Longitude"] != longitude_prev:
            pnt = doc.newpoint(name=year_prev, coords=[(longitude_prev+ random.uniform(-0.0001, 0.0001), latitude_prev+ random.uniform(-0.0001, 0.0001))],description=df.Description[index - 1])
            pnt.style.iconstyle.icon.href = 'https://www.gstatic.com/mapspro/images/stock/503-wht-blank_maps.png'
            pnt.style.iconstyle.color = color[n_doc]
            pnt.extendeddata.newdata(name='gx_media_links', value=f'<![CDATA[{"".join(ImageUrlArray)}]]>')
            ImageUrlArray = [f'{row["ImageUrl"]} ']
            longitude_prev = row["Longitude"]
            latitude_prev = row["Latitude"]
            year_prev = row["Year"]
        else:
            ImageUrlArray.append(f'{row["ImageUrl"]} ')
            year_prev = row["Year"]

kml.save('Saving.kml')
