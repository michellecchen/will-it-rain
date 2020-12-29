#!/usr/bin/env python3

import csv
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from tempfile import mkdtemp
import os
import joblib
#import pickle

# Preliminary loading & initialization.

savedir = mkdtemp()
filename = os.path.join(savedir, 'clf.joblib')

df = pd.read_csv("Weather.csv")

# Filter out WindDirs of 0 by converting them to NaNs, then dropping all NaNs in the DF.

df['WindGustDir'].replace('0', np.nan, inplace=True)
df['WindDir9am'].replace('0', np.nan, inplace=True)
df['WindDir3pm'].replace('0', np.nan, inplace=True)
df['RainToday'].replace('0', np.nan, inplace=True)

df.dropna(axis=0, how='any', inplace=True)
df.reset_index(inplace=True, drop=True)

df.head() # DEBUG
    
X = df.drop(['RainTomorrow'], axis=1)
y = df['RainTomorrow']

# Convert 0's to No's and 1's to Yes's in RainToday.
X['RainToday'] = X['RainToday'].map({"Yes": 1, "No": 0})

# Configuring numerical representations for cardinal directions of wind in X.

X['WindGustDir'] = X['WindGustDir'].map({"N": 1, "NNE": 2, "NE": 3, 
                                        "ENE": 4, "E": 5, "ESE": 6, 
                                        "SE": 7, "SSE": 8, "S": 9, 
                                        "SSW": 10, "SW": 11, "WSW": 12, 
                                        "W": 13, "WNW": 14, "NW": 15, 
                                        "NNW": 16})

X['WindDir9am'] = X['WindDir9am'].map({"N": 1, "NNE": 2, "NE": 3, 
                                        "ENE": 4, "E": 5, "ESE": 6, 
                                        "SE": 7, "SSE": 8, "S": 9, 
                                        "SSW": 10, "SW": 11, "WSW": 12, 
                                        "W": 13, "WNW": 14, "NW": 15, 
                                        "NNW": 16})

X['WindDir3pm'] = X['WindDir3pm'].map({"N": 1, "NNE": 2, "NE": 3, 
                                        "ENE": 4, "E": 5, "ESE": 6, 
                                        "SE": 7, "SSE": 8, "S": 9, 
                                        "SSW": 10, "SW": 11, "WSW": 12, 
                                        "W": 13, "WNW": 14, "NW": 15, 
                                        "NNW": 16})

# Split X & y into X_train/test, y_train/test

X.reset_index(inplace=True, drop=True)
y.reset_index(inplace=True, drop=True)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.75, random_state = 5)

clf = MultinomialNB()
clf.fit(X_train, y_train)

# Save model to disk
filename = 'clf.joblib'
# pickle.dump(clf, open(filename, 'wb'))
joblib.dump(clf, filename)



# Split the dataset into training (80%) and testing (20%) data
# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0, shuffle = True)

# # Build the classifier and make prediction
# classifier = DecisionTreeClassifier()
# classifier.fit(X_train, y_train)
# prediction = classifier.predict(X_test)

# # Print the confusion matrix
# print("Confusion Matrix:")
# print(confusion_matrix(y_test, prediction))

# Save the model to disk
# joblib.dump(classifier, 'classifier.joblib')





