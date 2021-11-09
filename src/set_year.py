import pandas as pd
from sqlalchemy import create_engine
import re


pd.options.mode.chained_assignment = None  # default='warn'


engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_sql("select * from icono_MHL_norue_latlong_year", engine)
print(df)
yr = re.compile('\D*([1-2][0-9]{3}|3000)\D*')
for index, row in df.iterrows():
    print(index)
    df.Year[index] = "Unknown"
    if (yr.search(str(row["DateFabrication"])) != None):
        if int(yr.search(str(row["DateFabrication"])).group(1)) > 1800 and int(yr.search(str(row["DateFabrication"])).group(1)) < 2021:
            df.Year[index] = yr.search(row["DateFabrication"]).group(1)
    if (yr.search(str(row["DebutFabrication"])) != None):
        if int(yr.search(str(row["DebutFabrication"])).group(1)) > 1800 and int(yr.search(str(row["DebutFabrication"])).group(1)) < 2021:
            df.Year[index] = yr.search(row["DebutFabrication"]).group(1)
    if (yr.search(str(row["FinFabrication"])) != None):
        if int(yr.search(str(row["FinFabrication"])).group(1)) > 1800 and int(yr.search(str(row["FinFabrication"])).group(1)) < 2021:
             df.Year[index] = yr.search(row["FinFabrication"]).group(1)




print(df)


df.to_sql('icono_MHL_norue_latlong_year_2', engine)
