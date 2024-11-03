import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/dashboard')
def dashboard():
    return render_template('index.html')

@app.route('/learn')
def learn():
    return render_template('learn.html')

# Health check route
@app.route('/health')
def health():
    return "OK", 200

if __name__ == '__main__':
    # Bind to the port provided by the environment or use 8080 by default
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
