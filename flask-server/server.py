from flask import Flask
from flask.globals import request
from flask_cors import CORS
import nlp_project_deployment as project

app = Flask(__name__)

CORS(app)

@app.route("/english/", methods=['POST'])
def emoji():
    print(request.json)
    return project.end_to_end_eng(request.json['text'])

if __name__ == "__main__":
    app.run(debug=True)
