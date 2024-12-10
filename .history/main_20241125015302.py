from flask import Flask, render_template  # Import Flask and template renderer

app = Flask(__name__)  # Create a Flask app instance

@app.route('/')  # Define the route for the home page
def home():
    return render_template('index.html') 

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)  # Run the app in debug mode
