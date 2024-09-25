import pickle
from flask import Flask, request, app, jsonify, url_for, render_template,redirect,url_for,jsonify
import numpy as np
import pandas as pd

app=Flask(__name__)

@app.route("/",methods=["GET"])


if __name__ == "__main__":
    app.run(debug=True) 