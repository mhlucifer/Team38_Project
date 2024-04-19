from flask import Flask, render_template, request, jsonify

app = Flask(__name__) 


@app.route('/index')
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


@app.route('/test')
def test_page():
    return render_template('main.html')


@app.route('/')
def login_page1():
    return render_template('login.html')


@app.route('/main')
def main_page1():
    return render_template('main.html')


@app.route('/login-password', methods=['POST'])
def login_page():
    password = request.form['password']
    if password == '1234':
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid password,Please try again"}), 401


if __name__ == '__main__':
    app.run(debug=True)  
