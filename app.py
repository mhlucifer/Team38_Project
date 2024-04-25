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


@app.route('/')
def login_page1():
    return render_template('login.html')


@app.route('/login-password', methods=['POST'])
def login_page():
    password = request.form['password']
    if password == '1234':
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid password,Please try again"}), 401


@app.route('/main')
def main1_page():
    return render_template('main.html')


@app.route('/take_action')
def tack_action():
    return render_template('take_action.html')


@app.route('/about_us')
def about_us():
    return render_template('about_us.html')


@app.route('/history')
def history():
    return render_template('history.html')


@app.route('/identifier')
def identifier():
    return render_template('identifier.html')


@app.route('/test_your_knowlege')
def test_your_knowledge():
    return render_template('test_your_knowlege.html')


if __name__ == '__main__':
    app.run(debug=True)  
