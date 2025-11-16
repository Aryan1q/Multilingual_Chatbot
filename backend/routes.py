from flask import Flask, request, jsonify
from flask_cors import CORS
from chatbot import chatbot_response, PRODUCT_DATABASE, faq_data   # ← ADD faq_data

app = Flask(__name__)
CORS(app)

@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(PRODUCT_DATABASE)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_query = data.get("query", "")
    answer = chatbot_response(user_query)
    return jsonify({"answer": answer})

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    customer_id = data.get("customer_id")
    user_query = data.get("query", "")
    if customer_id:
        user_query += f" cid {customer_id}"
    answer = chatbot_response(user_query)
    return jsonify({"answer": answer})

# ✅ Add FAQ endpoint
@app.route("/faq", methods=["GET"])
def get_faq():
    # Convert "answer" -> "response" to match frontend FAQPanel
    formatted = [
        {"question": item.get("question", ""), "response": item.get("answer", "")}
        for item in faq_data
    ]
    return jsonify(formatted)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
