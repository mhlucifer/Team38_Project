from werkzeug.utils import secure_filename, send_from_directory
import app
from flask import Flask, render_template, request, jsonify
from Backend_code.year_searcher import year_searcher
from Backend_code.suburb_searcher import suburb_searcher
from Backend_code.classify import main
import os
from datetime import datetime, time
from PIL import Image


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = './static/uploads/'
def create_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)


create_folder(app.config['UPLOAD_FOLDER'])

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
    if password == 'tptt':
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


@app.route('/test_your_knowledge')
def test_your_knowledge():
    return render_template('test_your_knowledge.html')

@app.route('/terms')
def termsofuse():
    return render_template('terms.html')


@app.errorhandler(404) 
def not_found(e):   return render_template('404.html'), 404

@app.route('/model_identifier', methods=['POST'])
def model_identifier():
    if 'imageFile' not in request.files:
        return jsonify({'error': 'No file has been uploaded'}), 400
    file = request.files['imageFile']
    print(file)
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    if file:

        # Check if the file is larger than 5MB
        if int(request.headers['Content-Length']) > 5 * 1024 * 1024: # 5MB
            clear_upload_folder()
            return jsonify({'error': 'File size is too large. Maximum file size is 5MB'}), 400

        # Check if the file is an image
        if file.filename.split('.')[-1] in ['jpg', 'png', '.jpeg', '.gif', '.tiff', '.bmp', '.ppm']:
            # Try converting other image types to jpeg - comment out for now
            try:
                pass
                # img = Image.open(file)
                # img = img.convert('RGB')
                # new_filename = file.filename.split('.')[0] + '.jpeg'
                # # save file under static/uploads
                # img.save(os.path.join(app.config['UPLOAD_FOLDER'], new_filename))
                # file.filename = new_filename
            # If it fails, return an error
            except Exception as e:
                clear_upload_folder()
                return jsonify({'error': 'Invalid file type. Supported file types are: .jpg, .jpeg, .png, .gif, .tiff, .bmp, .ppm'}), 400
        else:
            clear_upload_folder()
            return jsonify({'error': 'Invalid file type. Supported file types are: .jpg, .jpeg, .png, .gif, .tiff, .bmp, .ppm'}), 400
            
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        result = main(file_path, debug=False)  # Make sure this function returns a dictionary or some data that can be converted to JSON
        response = jsonify(result)
        response.headers['Content-Type'] = 'application/json'
        clear_upload_folder()
        print(response)
        return response

def clear_upload_folder():
    # Remove everything in static/uploads
    for file in os.listdir(app.config['UPLOAD_FOLDER']):
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], file))


# Globally store the last file name
last_generated_file = None


@app.route('/generate_map', methods=['POST'])
def generate_map():
    global last_generated_file
    map_type = request.args.get('type')
    value = request.args.get('value')

    # Check for default map requests
    if map_type == 'suburb' and value == 'default':
        return render_template('default_suburb_map.html')
    elif map_type == 'year' and value == 'default':
        return render_template('default_year_map.html')

    try:
        if map_type == 'suburb':
            filename = suburb_searcher(value)
        elif map_type == 'year':
            filename = year_searcher(value)

        if filename:
            full_path = f'templates/{filename}'

            # Update the last generated file
            last_generated_file = full_path

            return render_template(filename)
        else:
            return jsonify({'error': 'No data found for the provided input'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/clear_maps', methods=['POST'])
def clear_maps():
    try:
        for file in os.listdir('templates'):
            if ('suburb_map' in file or 'year_map' in file) and not (
                    file == 'default_suburb_map.html' or file == 'default_year_map.html'):
                os.remove(os.path.join('templates', file))
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500



def load_locations():
    with open("./static/api/location.txt", "r") as file:
        return [line.strip() for line in file]


@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '').lower()
    suggestions = [line for line in load_locations() if query in line.lower()]
    return jsonify(suggestions)


@app.route('/handling_header')
def home():
    return render_template('handling_header.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
