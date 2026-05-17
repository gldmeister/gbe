# tools/dump_folder.py

import os
import sys
from datetime import datetime
from pathlib import Path

IGNORE_DIRS = {
    "venv",
    "__pycache__",
    ".pytest_cache",
    ".tmp",
    ".git",
    "patches",
    "migrations",
    ".next",
    "node_modules",
}

IGNORE_FILES = {
    "package-lock.json",
}

ALLOWED_EXTENSIONS = {
    ".py",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".html",
    ".md",
    ".mjs",
    ".cjs",
}

TMP_DIR = Path("tools/.tmp")


def should_ignore_dir(dirname: str) -> bool:
    return dirname in IGNORE_DIRS


def should_include_file(path: Path) -> bool:
    if path.name in IGNORE_FILES:
        return False

    return path.suffix in ALLOWED_EXTENSIONS


def read_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8", errors="replace")


def dump_folder(target_folder: str) -> Path:
    root = Path(target_folder)

    if not root.exists():
        raise FileNotFoundError(f"Folder not found: {target_folder}")

    if not root.is_dir():
        raise NotADirectoryError(f"Path is not a folder: {target_folder}")

    TMP_DIR.mkdir(parents=True, exist_ok=True)

    safe_name = str(root).replace("\\", "_").replace("/", "_").replace(":", "")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_path = TMP_DIR / f"dump_{safe_name}_{timestamp}.txt"

    with output_path.open("w", encoding="utf-8") as output:
        for current_root, dirs, files in os.walk(root):
            dirs[:] = sorted([d for d in dirs if not should_ignore_dir(d)])
            files = sorted(files)

            for filename in files:
                file_path = Path(current_root) / filename

                if not should_include_file(file_path):
                    continue

                relative_path = file_path.as_posix()

                output.write(f"// {relative_path}\n\n")
                output.write(read_file(file_path))
                output.write("\n\n")
                output.write("// " + "-" * 80)
                output.write("\n\n")

    return output_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python tools/dump_folder.py <folder_path>")
        print()
        print("Example:")
        print("  python tools/dump_folder.py src/app")
        sys.exit(1)

    target_folder = sys.argv[1]

    try:
        generated_file = dump_folder(target_folder)
        print(f"Generated: {generated_file}")
    except Exception as error:
        print(f"Error: {error}")
        sys.exit(1)