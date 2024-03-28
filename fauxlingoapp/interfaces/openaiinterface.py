from openai import OpenAI
import json
import os

def get_api_key():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, 'keys.json')) as f:
        keys_dict = json.load(f)
    return keys_dict["openai"]

class OpenAIInterface:
    def __init__(self):
        self.openai = OpenAI(api_key=get_api_key())
        self.messages = []
    
    def get_text_response_only(self, user_text):
        # Append user message to the list of messages
        self.messages.append({"role": "user", "content": user_text})

        # Create chat completions
        response = self.openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=self.messages,
            temperature=0.6,
            max_tokens=4000
        )

        # Update the list of messages with the assistant's reply
        response_message = response.choices[0].message.content

        # Return the content of the assistant's reply
        return response_message

    def get_messages(self):
        return self.messages

    def clear_messages(self):
        self.messages = []

    def get_openai(self):
        return self.openai

    def set_openai(self, openai):
        self.openai = openai