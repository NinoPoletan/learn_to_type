import requests
from flask import Flask, request, jsonify
from fuzzy_system import run_whole_control_system_json

app = Flask(__name__)
@app.route('/run-fuzzy', methods=['POST'])
def run_fuzzy():
    try:
        # Extract JSON data from the request
        input_data = request.get_json()

        # Call your control system function with the new data
        output_word_diff, output_letter_dict = run_whole_control_system_json(input_data)
        print(output_word_diff, output_letter_dict)

        # Create a dictionary with the results
        results = {
            'word_difficulty': output_word_diff,
            'letter_difficulty': output_letter_dict
        }

        # Send the results to another local server on port 5001
        response = requests.post('http://localhost:5001/ask', json=results)

        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

#curl -X POST http://localhost:5000/run-fuzzy -H "Content-Type: application/json" -d '{"theme":"dune", "speed": 120.5, "difficulty_word": 22.3, "accuracy_global": 95.2, "accuracy_letters": {"a": 20.56, "b": 81.2, "c": 94.78, "č": 80.55, "ć": 95.36, "d": 92.07, "đ": 82.64, "e": 98.05, "f": 98.84, "g": 98.19, "h": 81.42, "i": 96.23, "j": 84.25, "k": 92.62, "l": 86.9, "lj": 86.47, "m": 88.25, "n": 84.22, "nj": 84.09, "o": 84.64, "p": 98.94, "r": 96.9, "s": 82.91, "š": 89.01, "t": 80.98, "u": 81.04, "v": 81.36, "z": 87.63, "ž": 84.43}}'
