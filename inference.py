import numpy as np
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class Abstract2Title():
    def __init__(self, model_path):
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        
        self.temperature = 1
        self.num_beams = 4
        self.max_gen_length = 128
        
    def preprocess(self, abstract):
        '''Tokenize and convert to ids'''
        return self.tokenizer([abstract], max_length=512, return_tensors='pt')
    
    def generate(self, inputs):
        '''Generate the output ids'''
        return self.model.generate(
            inputs['input_ids'], 
            num_beams=self.num_beams, 
            temperature=self.temperature, 
            max_length=self.max_gen_length, 
            early_stopping=True
        )
    
    def post_process(self, output):
        '''Decode raw output ids to text'''
        return self.tokenizer.decode(output[0].tolist(), skip_special_tokens=True, clean_up_tokenization_spaces=False)
    
    def __call__(self, abstract):
        '''Complete prediction pipeline'''
        
        inputs = self.preprocess(abstract)
        output = self.generate(inputs)
        title = self.post_process(output)
        
        return title