import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('sqlite:///icono_MHL.db')
df = pd.read_excel('icono_MHL_filtered.xlsx')
df.to_sql('icono_MHL_filtered', engine)