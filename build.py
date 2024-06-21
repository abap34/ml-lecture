import os
import glob

files = glob.glob('**/*.md', recursive=True)

def isexcluded(file):
    return file.startswith('2023/') or file.endswith('slide.md')

files = [file for file in files if not isexcluded(file)]

for file in files:
    basename = file.split('.')[0]
    cmd = f"almo-cli build {file} -o {basename}.html --config config.yaml"
    print(cmd)
    os.system(cmd)

