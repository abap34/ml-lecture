import os
import glob

pages = glob.glob('**/*.md', recursive=True)

def isexcluded(file):
    return file.startswith('2023/') or file.endswith('lecture.md')

pages = [page for page in pages if not isexcluded(page)]

for page in pages:
    basename = page.split('.')[0]
    cmd = f"almo-cli build {page} -o {basename}.html --config config.yaml"
    print(cmd)
    os.system(cmd)


slides = glob.glob('ch*/lecture.md', recursive=True)
imgs = glob.glob('ch*/img/*', recursive=True)

# すべての画像にチャンネル名の prefix をつけて img/ にコピー
os.makedirs('img', exist_ok=True)

for img in imgs:
    ch_prefix = img.split('/')[0]
    cmd = f'cp {img} img/{ch_prefix}_{img.split("/")[-1]}'
    print(cmd)
    os.system(cmd)

slides.sort()

def remove_frontmatter(content):
    lines = content.split('---')
    return '---' + '---'.join(lines[2:])
    
def replace_img_path(ch_prefix, content):
    # ![alt](img/... -> ![alt](img/chXX_...
    return content.replace('img/', f'img/{ch_prefix}_')

with open('slides.md', 'w') as f:
    # 先頭の frontyaml だけ残す
    with open(slides[0]) as f1:
        f.write(replace_img_path(slides[0].split('/')[0], f1.read()))



    for slide in slides[1:]:
        ch_prefix = slide.split('/')[0]
        with open(slide) as f1:
            f.write('\n\n<!-- PAGE BREAK -->\n\n')
            f.write(f'\n\n<!-- SLIDE: {slide} -->\n\n')
            content = f1.read()
            content = remove_frontmatter(content)
            content = replace_img_path(ch_prefix, content)
            f.write(content)
