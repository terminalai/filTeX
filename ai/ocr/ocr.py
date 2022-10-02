from PIL import Image
import pathlib
import pytesseract
from wand.image import Image as WandImage
import math

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def blur_image(file_input_name, file_output_name):
    with WandImage(filename=file_input_name) as img:
        img.blur(radius=0, sigma=5)
        img.save(filename=file_output_name)


# Simple image to string
def get_text(file_input_name):
    return pytesseract.image_to_string(Image.open(file_input_name))