# Abstract2Title

Abstract2Title is a Seq2Seq Model finetuned from T5-base that generates titles for your machine learning papers using the abstract. The model is trained using a subset of the arXiv dataset categorized in the `cs.AI` category that has 40k articles. _(The full arXiv dataset contains 1.7 million scientific articles)_

## Check out the Live Demo

This model is hosted as an API on [CellStrat Hub](https://cellstrathub.com/) and the Interactive Web Demo can be accessed at [htttps://abstract2title.netlify.app]

## Usage

### Dataset

This repository contains the processed dataset already in [arxiv_AI_dataset/](arxiv_AI_dataset). If you want to train on new categories, you can follow the steps below to obtain the original and full dataset.

1. Download the arXiv dataset from [kaggle](https://www.kaggle.com/Cornell-University/arxiv)
2. Extract the downloaded zip file to get a json file and put it in a folder called _data_. The path should look something like this `data/arxiv-metadata-oai-snapshot.json`
3. Run the [PrepareData.ipynb](PrepareData.ipynb) notebook to filter any specific categories you might want to train on.

### Training

TBD

### Inference

TBD

### Deployment

TBD
