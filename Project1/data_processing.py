import pandas as pd
internet_use = pd.read_csv('data/share-of-individuals-using-the-internet.csv')
having_friends = pd.read_csv('data/people-who-report-having-friends-or-relatives-they-can-count-on.csv')
internet_use_filtered = internet_use.query('Year==2016')
internet_use_filtered.to_csv('data/share-of-individuals-using-the-internet-2016.csv', index=False)

internet_use_filtered.drop("Year", axis=1, inplace=True)
having_friends.drop("Year", axis=1, inplace=True)
data_combined = pd.merge(internet_use_filtered, having_friends, how='outer')
data_combined.to_csv('data/combined-data-2016.csv', index=False)