import os

import requests
from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)

os.environ['OPENAI_API_KEY'] = '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'

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],
)


def get_letters_to_improve(letter_difficulty):
    letters_to_improve = ""
    for letter, difficulty in letter_difficulty.items():
        if difficulty == "improve":
            letters_to_improve += letter + ", "
    return letters_to_improve

@app.route('/ask', methods=['POST'])
def ask():
    try:
        # Extract the question from the incoming JSON request
        data = request.json
        print("Received data:", data)  # Print the received data

        word_difficulty = data.get('word_difficulty', '')
        letter_difficulty = data.get('letter_difficulty', {})
        theme = data.get('theme', '')

        letters_to_improve = get_letters_to_improve(letter_difficulty)
        question = "Generate a sentence where you use more of letters " + letters_to_improve + " on theme " + theme + "."
        print("Question to OpenAI:", question)

        # Sending the question to OpenAI's API using the chat endpoint
        response = client.chat.completions.create(
            model="gpt-3.5-turbo", messages=[{"role": "user", "content": question}],
        )
        # Extracting the text response
        answer = response.choices[0].message.content
        print(answer)
        response = requests.post('http://localhost:5173', json=answer)
        # Returning the response to the Flash application
        return jsonify({'answer': answer})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    # It's not recommended to expose your API key in the code
    app.run(debug=True, port=5001)


#export OPENAI_API_KEY='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'
#set OPENAI_API_KEY=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
