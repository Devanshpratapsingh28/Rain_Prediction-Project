import pickle
from flask import Flask, request, jsonify, render_template
import numpy as np

app = Flask(__name__)

# Load the model and scaler
scalar = pickle.load(open('scalar.pkl', 'rb'))
model = pickle.load(open('rainsvcmodel.pkl', 'rb'))

@app.route("/", methods=["GET"])
def home():
    return render_template('home.html')

@app.route('/predict_api', methods=['POST'])
def predict_api():
    data = request.get_json(force=True)
    new_data = np.array(list(data.values())).reshape(1, -1)
    scaled_data = scalar.transform(new_data)
    output = model.predict(scaled_data)
    temp=int(output[0])
    res=""
    if temp==1:
        res="Rainfall will occur."
    else:
       res="Rainfall will not occur." 
    return jsonify(res)   

if __name__ == "__main__":
    app.run(debug=True)
