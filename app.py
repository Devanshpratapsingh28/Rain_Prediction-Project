import pickle
from flask import Flask, request, app, jsonify, url_for, render_template,redirect,url_for,jsonify
import numpy as np
import pandas as pd

app=Flask(__name__)
# Load the model
scalar=pickle.load(open('scalar.pkl','rb'))
model=pickle.load(open('rainsvcmodel.pkl','rb'))

@app.route("/",methods=["GET"])
def home():
    return render_template('home.html')

@app.route('/predict_api',methods=['POST'])
def predict_api():
    data=request.json['data']
    new_data=np.array(list(data.values())).reshape(1,-1)
    scaled_data=scalar.transform(new_data)
    output=model.predict(scaled_data)
    print(output[0])
    return jsonify(output[0])


if __name__ == "__main__":
    app.run(debug=True) 