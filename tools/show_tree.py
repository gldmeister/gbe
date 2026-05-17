# tools/show_tree.py

import os

IGNORE_DIRS = {"venv", "__pycache__", ".pytest_cache", ".tmp", ".git", "tools", "patches", "migrations", ".next", "node_modules"}

def show_tree(path=".", prefix=""):
    entries = sorted(os.listdir(path))
    entries = [e for e in entries if e not in IGNORE_DIRS]
    for i, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        connector = "└── " if i == len(entries) - 1 else "├── "
        print(prefix + connector + entry)
        if os.path.isdir(full_path):
            extension = "    " if i == len(entries) - 1 else "│   "
            show_tree(full_path, prefix + extension)

if __name__ == "__main__":
    show_tree(".")