# Abstract2Title

Abstract2Title is a Seq2Seq Model finetuned from T5-base that generates titles for your machine learning papers using the abstract. The model is trained using a subset of the arXiv dataset categorized in the `cs.AI` category that has 40k articles. _(The full arXiv dataset contains 1.7 million scientific articles)_

## Live Demo and Experiment Details

This model is hosted as an API on [CellStrat Hub](https://cellstrathub.com/) and the Interactive Web Demo can be accessed at [htttps://abstract2title.netlify.app](htttps://abstract2title.netlify.app)

Checkout the [Weights and Biases Experiment](https://wandb.ai/nerdimite/abstract-to-title) for complete training and evaluation results. TLDR; The final evaluation results are:

```
{'eval_loss': 1.6707532405853271,
 'eval_rouge1': 47.1746,
 'eval_rouge2': 26.8231,
 'eval_rougeL': 41.7727,
 'eval_rougeLsum': 41.8263,
 'eval_runtime': 220.717,
 'eval_samples_per_second': 9.084,
 'eval_steps_per_second': 1.137}
```

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
