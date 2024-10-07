from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://dhruv:Dhruv123@cluster0.bfycuor.mongodb.net/yourDBname?retryWrites=true&w=majority"
mongo = PyMongo(app)
CORS(app)

# Create
@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    overlay = request.json
    result = mongo.db.overlays.insert_one(overlay)
    return jsonify({"id": str(result.inserted_id)}), 201

# Read (all)
@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    try:
        overlays = list(mongo.db.overlays.find())
        return jsonify([{**overlay, "_id": str(overlay["_id"])} for overlay in overlays])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Read (single)
@app.route('/api/overlays/<id>', methods=['GET'])
def get_overlay(id):
    try:
        overlay = mongo.db.overlays.find_one({"_id": ObjectId(id)})
        if overlay:
            return jsonify({**overlay, "_id": str(overlay["_id"])})
        return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update
@app.route('/api/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    try:
        overlay = request.json
        result = mongo.db.overlays.update_one({"_id": ObjectId(id)}, {"$set": overlay})
        if result.modified_count:
            return jsonify({"message": "Updated successfully"}), 200
        return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete
@app.route('/api/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    try:
        result = mongo.db.overlays.delete_one({"_id": ObjectId(id)})
        if result.deleted_count:
            return jsonify({"message": "Deleted successfully"}), 200
        return jsonify({"error": "Overlay not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
