import os
import glob

# 2023/ 以下を除く全ての *.md ファイルを取得
files = glob.glob('**/*.md', recursive=True)
files = [f for f in files if not f.startswith('2023/')]

for file in files:
    basename = file.split('.')[0]
    cmd = f"almo-cli build {file} -o {basename}.html --config config.yaml"
    print(cmd)
    os.system(cmd)

