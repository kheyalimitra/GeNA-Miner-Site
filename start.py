#! /usr/bin/env python
# coding=utf-8
import os
from datetime import date
import logging

from flask import Flask, jsonify, request, render_template, redirect, url_for
from flask.ext.cache import Cache

#log = logging.getLogger('werkzeug')
#log.setLevel(logging.ERROR)

def str2bool(s):
    return s.lower() in ["1", "true"]

app = Flask(__name__)
cache = Cache(app,config={'CACHE_TYPE': 'simple', 'CACHE_THRESHOLD': 1000, 'CACHE_DEFAULT_TIMEOUT': 3600})
#cache = Cache(app,config={'CACHE_TYPE': 'null', 'CACHE_NO_NULL_WARNING': True})

def makeCacheKey():
    return request.url;

@app.route('/')
def index():
    return redirect("query")

@app.route('/query')
@cache.cached(key_prefix=makeCacheKey)
def query():
    return render_template('query.html')

@app.route('/main')
@cache.cached(key_prefix=makeCacheKey)
def main():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)

    return render_template('main.html', query=query, yearFrom=yearFrom, yearTo=yearTo)

@app.route('/kwic')
@cache.cached(key_prefix=makeCacheKey)
def kwic():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)

    keywords = request.args.get('keywords', "", type=str).strip()
    return render_template('kwic.html', query=query, yearFrom=yearFrom, yearTo=yearTo, keywords=keywords)

@app.route('/topk')
@cache.cached(key_prefix=makeCacheKey)
def topk():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)
    k = request.args.get('k', 10, type=int)
    minLen = request.args.get('minlen', 1, type=int)
    maxLen = request.args.get('maxlen', 5, type=int)

    return render_template('topk.html', query=query, yearFrom=yearFrom, yearTo=yearTo, k=k, minLen=minLen, maxLen=maxLen)

@app.route('/topic')
@cache.cached(key_prefix=makeCacheKey)
def topic():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)
    k = request.args.get('k', 5, type=int)
    wordNum = request.args.get('wordnum', 10, type=int)

    topicNames = ["Topic #" + str(i + 1) for i in xrange(k)]

    return render_template('topic.html', query=query, yearFrom=yearFrom, yearTo=yearTo, k=k, wordNum=wordNum, topicNames=topicNames)

@app.route('/trend')
@cache.cached(key_prefix=makeCacheKey)
def trend():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)
    interval = request.args.get('interval', 5, type=int)

    locFileName = query.replace(' ', '+') + "_" + str(yearFrom) + "-" + str(yearTo) + "_interval=" + str(interval) + ".svg"

    return render_template('trend.html', query=query, yearFrom=yearFrom, yearTo=yearTo, interval=interval, img=locFileName)

@app.route('/theme')
@cache.cached(key_prefix=makeCacheKey)
def theme():
    query = request.args.get('query', "", type=str)
    yearFrom = request.args.get('from', 1900, type=int)
    yearTo = request.args.get('to', date.today().year - 1, type=int)
    fileName = request.args.get('name', "", type=str)

    return render_template('theme.html', query=query, yearFrom=yearFrom, yearTo=yearTo, fileName=fileName)

@app.route('/theme/upload')
@cache.cached(key_prefix=makeCacheKey)
def theme_upload():
    fileName = request.args.get('name', "", type=str)
    success = request.args.get('success', False, type=str2bool)
    overwrite = request.args.get('overwrite', False, type=str2bool)

    return jsonify(name=fileName, success=success, overwrite=overwrite);

if __name__ == '__main__':
    app.run(debug=True, port=5001)
