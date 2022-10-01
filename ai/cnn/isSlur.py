from turtle import down
import numpy as np
import pickle
import gdown
import tensorflow as tf
from tensorflow.keras import layers, models
from PIL import Image, ImageDraw
import os
import sys

def word2img(rw, rh, txt):
  img = Image.new('RGB', (rw, rh))
  d = ImageDraw.Draw(img)
  txtw, txth = d.textsize(txt)
  d.text((rw/2 - txtw/2, rh/2 - txth/2), txt, fill=(1, 0, 0))
  return np.array(img)[:,:,0]


def isSlur(word, threshold=0.7):
    if (!os.path.exists('./isSlurModel')):
        url = 'https://drive.google.com/file/d/1xIJ9aSKsIMzn1NtDEwwMdZIzhr5jM8pf/view?usp=sharing'
        output = 'isSlurModel'
        gdown.download(url, output, quiet=True)
    model = pickle.load(open('isSlurModel', 'rb'))
    rs = 200
    prediction = model.predict(word2img(rs, rs, word.lower()).reshape((1, rs, rs, 1)))
    return np.all(prediction >= threshold)


if len(sys.argv) > 3:
    print('you have specified too many arguments')
    sys.exit()
if len(sys.argv) == 2:
    print(isSlur(sys.argv[1]))
else:
    print(isSlur(sys.argv[1], float(sys.argv[2])))
exit()