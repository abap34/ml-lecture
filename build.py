import glob
import os

import requests


class ThemeSetup:
    @staticmethod
    def download_css(url, output_path):
        response = requests.get(url)
        with open(output_path, "w") as file:
            file.write(response.text)

class CommandBuilder:
    @staticmethod
    def build_marp_command(slide, css_file="marp-style.css"):
        basename = slide.split(".")[0]
        return f"marp {slide} --pdf --html --allow-local-files --theme-set {css_file} --output {basename}.pdf"

    @staticmethod
    def build_almo_command(page, config_file="config.yaml"):
        basename = page.split(".")[0]
        return f"almo-cli build {page} -o {basename}.html --config {config_file}"

class MarkdownProcessor:
    @staticmethod
    def remove_frontmatter(content):
        lines = content.split("---")
        return "---" + "---".join(lines[2:])

    @staticmethod
    def replace_img_path(ch_prefix, content):
        return content.replace("img/", f"img/{ch_prefix}_")

    @staticmethod
    def merge_slides(slides, output_file="slides.md"):
        with open(output_file, "w") as output:
            with open(slides[0]) as first_slide:
                output.write(MarkdownProcessor.replace_img_path(slides[0].split("/")[0], first_slide.read()))
            for slide in slides[1:]:
                ch_prefix = slide.split("/")[0]
                with open(slide) as slide_file:
                    output.write("\n\n<!-- PAGE BREAK -->\n\n")
                    output.write(f"\n\n<!-- SLIDE: {slide} -->\n\n")
                    content = slide_file.read()
                    content = MarkdownProcessor.remove_frontmatter(content)
                    content = MarkdownProcessor.replace_img_path(ch_prefix, content)
                    output.write(content)

    @staticmethod
    def copy_images_with_prefix(imgs, output_dir="img"):
        os.makedirs(output_dir, exist_ok=True)
        for img in imgs:
            ch_prefix = img.split("/")[0]
            cmd = f'cp {img} {output_dir}/{ch_prefix}_{img.split("/")[-1]}'
            os.system(cmd)

def main():
    css_url = "https://raw.githubusercontent.com/abap34/honwaka-theme/main/style.css"
    ThemeSetup.download_css(css_url, "marp-style.css")

    data = {
        "pages": [
            "supplement/colab.md",
            "supplement/preface.html"
        ],
        "slides": sorted(list(glob.glob("ch*/lecture.md", recursive=True))),
        "additional_slides": [
            "supplement/competetion.md"
        ]
    }

    print("--- pages ---")
    for page in data["pages"]:
        print(page)
        cmd = CommandBuilder.build_almo_command(page)
        os.system(cmd)

    print("--- slides ---")
    for slide in data["slides"]:
        print(slide)
        cmd = CommandBuilder.build_marp_command(slide)
        os.system(cmd)
    
    print("--- imgs ---")
    imgs = glob.glob("ch*/img/*", recursive=True)

    MarkdownProcessor.copy_images_with_prefix(imgs)

    MarkdownProcessor.merge_slides(data["slides"])

    print("--- additional slides ---")
    print('slides.md')
    cmd = CommandBuilder.build_marp_command("slides.md")
    os.system(cmd)

    for additional_slide in data["additional_slides"]:
        print(additional_slide)
        cmd = CommandBuilder.build_marp_command(additional_slide)
        os.system(cmd)

if __name__ == "__main__":
    main()
