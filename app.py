from flask import Flask, render_template

app = Flask(__name__) 


@app.route('/')
def index_page():
    return render_template('index.html')


@app.route('/handle')
def handling_page():
    return render_template('handling.html')


@app.route('/location')
def location_page():
    return render_template('Location.html')


@app.route('/behaviour')
def behaviour_page():
    return render_template('behaviour.html')


if __name__ == '__main__':
    app.run(debug=True)  
