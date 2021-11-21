from flask import Flask
from flask.globals import request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def emoji():
    print(request.args)
    return {
        "emoji": ["😂", "😒", "😐"],
        "confidence": [1, 0.9, 0.02]
    }

if __name__ == "__main__":
    app.run(debug=True)
