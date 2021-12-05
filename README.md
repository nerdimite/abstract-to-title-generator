# Abstract2Title

Abstract2Title is a Seq2Seq Model finetuned from T5-base that generates titles for your machine learning papers using the abstract. The model is trained using a subset of the arXiv dataset categorized in the `cs.AI` category that has 40k articles. _(The full arXiv dataset contains 1.7 million scientific articles)_

## Live Demo and Experiment Details

This model is hosted as an API on [CellStrat Hub](https://cellstrathub.com/) and the Interactive Web Demo can be accessed at [https://abstract2title.netlify.app](https://abstract2title.netlify.app)

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

Before proceeding, make sure to install the required libraries with,
```bash
pip install -r requirements.txt
```

### Dataset

This repository contains the processed dataset already in [arxiv_AI_dataset/](arxiv_AI_dataset). If you want to train on new categories, you can follow the steps below to obtain the original and full dataset.

1. Download the arXiv dataset from [kaggle](https://www.kaggle.com/Cornell-University/arxiv)
2. Extract the downloaded zip file to get a json file and put it in a folder called _data_. The path should look something like this `data/arxiv-metadata-oai-snapshot.json`
3. Run the [PrepareData.ipynb](PrepareData.ipynb) notebook to filter any specific categories you might want to train on.

### Training

To train the model, run the [Train.ipynb](Train.ipynb) notebook. For logging in weights and biases, you would want to change the username in the `wandb.init()` cell in the beginning.

### Inference

1. Download and extract the model weights from [here](https://gradient-fire.s3.amazonaws.com/abstract2title-model.zip)
2. Run the [Predict.ipynb](Predict.ipynb) notebook to perform inference using the [inference.py](inference.py) module.

### Deployment

- The model is deployed as an API using [CellStrat Hub](https://cellstrathub.com/). You can learn more about deployment [here](https://docs.cellstrathub.com/hubapi%20deployment%20%F0%9F%9A%80/quickstart/)
- The Next.js Frontend App's source code can be found at [a2t-app/](a2t-app/)

## References

- [Hugging Face Course](https://huggingface.co/course/chapter7/5?fw=pt)
