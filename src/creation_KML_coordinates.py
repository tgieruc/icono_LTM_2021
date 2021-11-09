import pandas as pd
# import numpy as np
from sqlalchemy import create_engine
import simplekml

engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_norue_latlong_year where Longitude is not null order by Year, Longitude asc", engine)
kml = simplekml.Kml()

longitude_prev = df.Longitude[0]
latitude_prev = df.Latitude[0]
ImageUrlArray = [f'{df.ImageUrl[0]} ']

for index, row in df[1:].iterrows():
    if row["Longitude"] != longitude_prev:
        pnt = kml.newpoint(coords=[(longitude_prev, latitude_prev)])
        pnt.extendeddata.newdata(name='gx_media_links', value=f'<![CDATA[{"".join(ImageUrlArray)}]]>')
        ImageUrlArray = [f'{row["ImageUrl"]} ']
        longitude_prev = row["Longitude"]
        latitude_prev = row["Latitude"]
    else:
        ImageUrlArray.append(f'{row["ImageUrl"]} ')
kml.save("Saving.kml")
