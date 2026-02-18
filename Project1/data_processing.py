import pandas as pd
internet_use = pd.read_csv('data/share-of-individuals-using-the-internet.csv')
having_friends = pd.read_csv('data/people-who-report-having-friends-or-relatives-they-can-count-on.csv')
internet_use_filtered = internet_use.query('Year==2016')
internet_use_filtered.to_csv('data/share-of-individuals-using-the-internet-2016.csv', index=False)

internet_use_filtered.drop(["Entity", "Year"], axis=1, inplace=True)
data_combined = pd.merge(having_friends, internet_use_filtered, on='Code')
data_combined.to_csv('data/combined_data.csv', index=False)