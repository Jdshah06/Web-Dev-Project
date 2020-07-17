import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/election_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

poll_data = Base.classes.poll_data

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('map_index.html')

# @app.route("/route")
# def welcome():
#     """List all available api routes."""
#     routes =  {
#         'title': "Available Routes:", 
#         'poll_data': "Below route list Election 2020 Poll Data",       
#         'poll_data_link':"/api/v1.0/Poll_Data", 
#         'state_name': "Below route takes state name and list election 2020 poll for the state", 
#         'state_name_link': f"/api/v1.0/statename/<state_name>", 
#         'state_abbv': "Below route takes state abbrevation and list election 2020 poll for the state", 
#         'state_abbv_link': f"/api/v1.0/stateabbrevation/<state_abbv>"
#     }
    
#     return render_template('api.html', routes = routes)

@app.route("/route")
def route():
    """List all available api routes."""
    return (
        f"API Documentation:<br/>"
        f"<br/>"
        f"Below route list Election 2020 Poll Data <br/>"        
        f"/api/v1.0/Poll_Data<br/>"
        f"<br/>"
        f"Below route takes state name and list election 2020 poll for the state <br/>"
        f"/api/v1.0/statename/<state_name><br/>"
        f"<br/>"
        f"Below route takes state abbrevation and list election 2020 poll for the state <br/>"
        f"/api/v1.0/stateabbrevation/<state_abbv><br/>"
      
    )

@app.route("/api/v1.0/Poll_Data")
def data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all date as the key and prcp as the value."""
    # Query all dates
    result = session.query(poll_data.id, poll_data.name, poll_data.abbv, poll_data.candidate_name,poll_data.candidate_party,poll_data.pct).all()

    session.close()

    return jsonify(result) 


@app.route("/api/v1.0/statename/<state_name>")
def filter_data(state_name):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(poll_data.abbv, poll_data.candidate_name,poll_data.candidate_party,poll_data.pct).filter(poll_data.name == state_name).all()
    session.close()
    
    return jsonify(results)

@app.route("/api/v1.0/stateabbrevation/<state_abbv>")
def filter_data_abbv(state_abbv):
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(poll_data.name, poll_data.candidate_name,poll_data.candidate_party,poll_data.pct).filter(poll_data.abbv == state_abbv).all()
    session.close()
    
    return jsonify(results)


if __name__ == '__main__':
    app.run(debug=True)