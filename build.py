import glob
import os
import requests


# テーマセットアップ
css_url = "https://raw.githubusercontent.com/abap34/honwaka-theme/main/style.css"
r = requests.get(css_url)
with open("style.css", "w") as f:
    f.write(r.text)

def remove_frontmatter(content):
    lines = content.split("---")
    return "---" + "---".join(lines[2:])


def replace_img_path(ch_prefix, content):
    # ![alt](img/... -> ![alt](img/chXX_...
    return content.replace("img/", f"img/{ch_prefix}_")


def marp_cmd(slide):
    basename = slide.split(".")[0]
    return f"marp {slide} --pdf --html --allow-local-files --theme-set style.css --output {basename}.pdf"

def almo_cmd(page):
    basename = page.split(".")[0]
    return f"almo-cli build {page} -o {basename}.html --config config.yaml"

pages = [
    "supplement/colab.md",
    "supplement/preface.html"
]

for page in pages:
    cmd = almo_cmd(page)
    print(cmd)
    os.system(cmd)



slides = list(glob.glob("ch*/lecture.md", recursive=True))
slides.insert(0, "header.md")
slides.sort(key=(lambda x: "" if x == "header.md" else x), reverse=False)

print("--- slides ---")
for slide in slides:
    print(slide)
    cmd = marp_cmd(slide)
    print(cmd)
    os.system(cmd)
print("--- imgs ---")
imgs = glob.glob("ch*/img/*", recursive=True)

# すべての画像にチャンネル名の prefix をつけて img/ にコピー
os.makedirs("img", exist_ok=True)
for img in imgs:
    ch_prefix = img.split("/")[0]
    cmd = f'cp {img} img/{ch_prefix}_{img.split("/")[-1]}'
    print(cmd)
    os.system(cmd)


# 画像置換しつつ slides.md に結合
with open("slides.md", "w") as f:
    # 先頭の frontyaml だけ残す
    with open(slides[0]) as f1:
        f.write(replace_img_path(slides[0].split("/")[0], f1.read()))
    for slide in slides[1:]:
        ch_prefix = slide.split("/")[0]
        with open(slide) as f1:
            f.write("\n\n<!-- PAGE BREAK -->\n\n")
            f.write(f"\n\n<!-- SLIDE: {slide} -->\n\n")
            content = f1.read()
            content = remove_frontmatter(content)
            content = replace_img_path(ch_prefix, content)
            f.write(content)


# 全体スライド
cmd = marp_cmd("slides.md")
print(cmd)
os.system(cmd)

# コンペについて
cmd = marp_cmd("supplement/competetion.md")
print(cmd)
os.system(cmd)
