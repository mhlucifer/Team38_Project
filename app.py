from flask import Flask, render_template, request, jsonify
from Backend_code.yearsearcher import year_searcher
from Backend_code.suburbsearcher import suburb_searcher
from datetime import datetime
import os
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


from datetime import datetime
import os

# Globally store the last file name
last_generated_file = None


@app.route('/generate_map', methods=['POST'])
def generate_map():
    global last_generated_file
    map_type = request.args.get('type')
    value = request.args.get('value')
    try:
        if map_type == 'suburb':
            filename = suburb_searcher(value)
        elif map_type == 'year':
            filename = year_searcher(value)

        if filename:
            # Add timestamp to the filename to ensure it is unique
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            unique_filename = f"{filename.split('.')[0]}_{timestamp}.html"
            full_path = f'templates/{unique_filename}'
            os.rename(f'templates/{filename}', full_path)

            # delete the last file
            if last_generated_file and os.path.exists(last_generated_file):
                os.remove(last_generated_file)

            # add the file name
            last_generated_file = full_path

            return render_template(unique_filename)
        else:
            return jsonify({'error': 'No data found for the provided input'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)  
