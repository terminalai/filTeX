from PIL import Image, ImageFont, ImageDraw, ImageFilter
import pathlib
import pytesseract
import math
import os

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Takes in text and returns a blurred Image of the text
def text_to_image(text):
    # create an image
    iw, ih = 1000, 1000
    out = Image.new("RGB", (iw, ih), (255, 255, 255))

    # get a font
    fnt = ImageFont.load_default()
    # get a drawing context
    d = ImageDraw.Draw(out)

    # Get size
    w, h = d.textsize(text)

    # draw multiline text
    d.multiline_text((0, 0), text, font=fnt, fill=(0, 0, 0))

    return out.filter(ImageFilter.GaussianBlur(radius=3.5))

# Simple image to string, takes in an Image
def get_text(image):
    return pytesseract.image_to_string(image)

"""
Full proess of turning ascii text art into text data 
ascii_text - text input
temp_directory - directory for temporary file storage, temporary files will be deleted afterwards
"""
def ascii_to_text(ascii_text):
    return get_text(text_to_image(ascii_text))

