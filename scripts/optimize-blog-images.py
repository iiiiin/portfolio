#!/usr/bin/env python3
from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import sys
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert PNG blog images to WebP with cwebp."
    )
    parser.add_argument(
        "inputs",
        nargs="+",
        help="PNG file paths or globs (e.g. public/blog/2026-03-01/*.png)",
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=int(os.environ.get("QUALITY", "82")),
        help="WebP quality (default: 82 or env QUALITY)",
    )
    parser.add_argument(
        "--keep-original",
        action="store_true",
        help="Keep original PNG files after conversion",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    if shutil.which("cwebp") is None:
        print("cwebp is required. Install with: brew install webp", file=sys.stderr)
        return 1

    matched_files: list[Path] = []
    for pattern in args.inputs:
        for path in glob.glob(pattern):
            file_path = Path(path)
            if file_path.is_file() and file_path.suffix.lower() == ".png":
                matched_files.append(file_path)

    if not matched_files:
        print("No PNG files matched.")
        return 0

    for png_path in matched_files:
        webp_path = png_path.with_suffix(".webp")
        result = subprocess.run(
            ["cwebp", "-q", str(args.quality), str(png_path), "-o", str(webp_path)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            text=True,
            check=False,
        )

        if result.returncode != 0:
            print(
                f"Failed: {png_path}\n{result.stderr.strip()}",
                file=sys.stderr,
            )
            continue

        print(f"Converted: {png_path} -> {webp_path}")
        if not args.keep_original:
            png_path.unlink(missing_ok=True)
            print(f"Removed original: {png_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
