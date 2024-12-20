from flask import Flask, render_template  # Import Flask and template renderer

app = Flask(__name__)  # Create a Flask app instance

@app.route('/')  # Define the route for the home page
def home():
    return render_template('index.html') 

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/blog')
def blog():
    return render_template('blog.html', posts=BLOG_POSTS)

if __name__ == "__main__":
    app.run(debug=True)  # Run the app in debug mode
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)

# Sample blog data (you can later connect this to a database)
BLOG_POSTS = [
    {
        "id": 1,
        "title": "The World is Lopsided",
        "content": "The world is not at all what it seems",
        "date": "November 27, 2024"
    },
    
]

 