import os
import glob
import re

pages = glob.glob("**/*.md", recursive=True)


def get_used_imgs(page):
    with open(page) as f:
        content = f.read()
        return re.findall(r"!\[.*\]\(img/([^)]*)\)", content)


used_imgs = set()

for page in pages:
    used_imgs.update(get_used_imgs(page))


imgs = glob.glob("ch*/img/*", recursive=True)

unused_imgs = [img for img in imgs if img.split("/")[-1] not in used_imgs]

print("--- Unused images? ---")
for img in unused_imgs:
    print(img)

print("--- Total unused images ---")
print(len(unused_imgs))

remove = input("Remove unused images? (y/n): ")


if remove == "y":
    for img in unused_imgs:
        print(f"rm \"{img}\"")
        os.system(f"rm \"{img}\"")
else:
    print("No images removed.")

print("Done.")
