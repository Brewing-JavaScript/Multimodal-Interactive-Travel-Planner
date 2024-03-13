from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf
import pandas as pd

app = Flask(__name__)

model_url = 'https://tfhub.dev/google/on_device_vision/classifier/landmarks_classifier_asia_V1/1'
labels_path = 'landmarks_classifier_asia_V1_label_map.csv'

# Load the label mapping
labels_df = pd.read_csv(labels_path)
labels = dict(zip(labels_df.id, labels_df.name))

def image_processing(image_path):
    try:
        # Load the TensorFlow model
        model = tf.saved_model.load(model_url)

        # Load and preprocess the image
        img = Image.open(image_path)
        img = img.resize((321, 321))
        img = np.array(img) / 255.0
        img = img[np.newaxis]

        # Get prediction from the model
        prediction = model.predict(img)
        predicted_class = np.argmax(prediction[0])

        return labels[predicted_class]
    except Exception as e:
        return str(e)

@app.route('/process_image', methods=['POST'])
def process_image():
    if 'image_path' not in request.json:
        return jsonify({'error': 'No image path provided'}), 400

    image_path = request.json['image_path']

    # Process the image
    result = image_processing(image_path)

    # Return the result as JSON
    return jsonify({'prediction': result})
    print(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
