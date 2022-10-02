from PIL import Image, ImageFont, ImageDraw
import pathlib
import pytesseract
from wand.image import Image as WandImage
import math

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Turns a text into image and saves it to a file.
def text_to_image(text, file_output_name):
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

    out.save(file_output_name, "JPEG")

# Blurs an image
def blur_image(file_input_name, file_output_name):
    with WandImage(filename=file_input_name) as img:
        img.blur(radius=0, sigma=5)
        img.save(filename=file_output_name)


# Simple image to string
def get_text(file_input_name):
    return pytesseract.image_to_string(Image.open(file_input_name))