from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/livestream_app"
mongo = PyMongo(app)

@app.route('/api/overlays', methods=['GET', 'POST'])
def handle_overlays():
    if request.method == 'POST':
        overlay = request.json
        result = mongo.db.overlays.insert_one(overlay)
        return jsonify({"id": str(result.inserted_id)}), 201
    else:
        overlays = list(mongo.db.overlays.find())
        return jsonify([{**overlay, "_id": str(overlay["_id"])} for overlay in overlays])

@app.route('/api/overlays/<id>', methods=['PUT', 'DELETE'])
def handle_overlay(id):
    if request.method == 'PUT':
        overlay = request.json
        mongo.db.overlays.update_one({"_id": ObjectId(id)}, {"$set": overlay})
        return jsonify({"message": "Updated successfully"}), 200
    else:
        mongo.db.overlays.delete_one({"_id": ObjectId(id)})
        return jsonify({"message": "Deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)