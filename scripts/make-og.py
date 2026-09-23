#!/usr/bin/env python3
"""Génère les aperçus de partage 1200x630.

Le texte est converti en tracés : l'image ne dépend donc d'aucune police
installée sur la machine qui la rasterise. C'est ce qui permet d'utiliser
rsvg-convert sans registrer les woff2 dans fontconfig.

Prérequis : fonttools[woff] et rsvg-convert.
    python3 -m venv .venv && .venv/bin/pip install "fonttools[woff]"
    .venv/bin/python scripts/make-og.py

Les PNG produits sont versionnés dans public/og/ : on ne les régénère
que si le nom, la ligne de positionnement ou un titre de case study
changent.
"""

import subprocess
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "public" / "fonts"
OUT = ROOT / "public" / "og"

W, H = 1200, 630
BG = "#F4F2EE"
LINE = "#D8D3C9"
TEXT = "#0C0C0C"
DIM = "#6B675F"
MARGIN = 72


def load(name, wght=None):
    font = TTFont(FONTS / name)
    if wght is not None and "fvar" in font:
        font = instancer.instantiateVariableFont(font, {"wght": wght})
    return font


def runs(font, text, size, tracking=0.0, fallback=None):
    """Rend `text` en tracés SVG. Retourne (liste de <path>, largeur).

    Un glyphe absent de la police primaire — la flèche U+2192 manque au
    subset latin de JetBrains Mono — est pris dans `fallback` plutôt que
    laissé en blanc."""
    paths, x = [], 0.0
    for ch in text:
        src = font
        name = font.getBestCmap().get(ord(ch))
        if name is None and fallback is not None:
            name = fallback.getBestCmap().get(ord(ch))
            src = fallback
        if name is None:
            x += size * 0.5
            continue
        scale = size / src["head"].unitsPerEm
        pen = SVGPathPen(src.getGlyphSet())
        src.getGlyphSet()[name].draw(pen)
        d = pen.getCommands()
        if d:
            paths.append((d, x, scale))
        x += src["hmtx"][name][0] * scale + tracking
    return paths, x


def draw(font, text, size, x, y, fill, tracking=0.0, anchor="start", fallback=None):
    paths, width = runs(font, text, size, tracking, fallback)
    if anchor == "end":
        x -= width
    out = []
    for d, dx, scale in paths:
        out.append(
            f'<path d="{d}" fill="{fill}" '
            f'transform="translate({x + dx:.2f} {y:.2f}) scale({scale:.5f} {-scale:.5f})"/>'
        )
    return "\n".join(out), width


def wrap(font, text, size, max_width, tracking=0.0):
    words, lines, cur = text.split(" "), [], ""
    for word in words:
        trial = f"{cur} {word}".strip()
        _, width = runs(font, trial, size, tracking)
        if width > max_width and cur:
            lines.append(cur)
            cur = word
        else:
            cur = trial
    if cur:
        lines.append(cur)
    return lines


def card(label, title, line, foot, out_name):
    display = load("Satoshi-Variable.woff2", wght=500)
    body = load("Satoshi-Variable.woff2", wght=400)
    mono = load("JetBrainsMono-latin.woff2", wght=400)

    parts = [
        f'<rect width="{W}" height="{H}" fill="{BG}"/>',
        f'<rect x="0" y="96" width="{W}" height="1" fill="{LINE}"/>',
    ]

    svg, _ = draw(mono, label.upper(), 18, MARGIN, 60, DIM, tracking=2.2)
    parts.append(svg)

    # le titre descend d'un cran s'il est long, pour ne jamais déborder
    size = 112
    while runs(display, title, size)[1] > W - 2 * MARGIN and size > 48:
        size -= 4
    svg, _ = draw(display, title, size, MARGIN, 300, TEXT)
    parts.append(svg)

    for i, text in enumerate(wrap(body, line, 34, W - 2 * MARGIN - 260)):
        svg, _ = draw(body, text, 34, MARGIN, 390 + i * 48, DIM)
        parts.append(svg)

    parts.append(f'<rect x="0" y="{H - 96}" width="{W}" height="1" fill="{LINE}"/>')
    svg, _ = draw(mono, foot.upper(), 18, MARGIN, H - 52, DIM, tracking=2.2, fallback=body)
    parts.append(svg)

    svg_text = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}">\n' + "\n".join(parts) + "\n</svg>\n"
    )

    OUT.mkdir(parents=True, exist_ok=True)
    svg_path = OUT / f"{out_name}.svg"
    png_path = OUT / f"{out_name}.png"
    svg_path.write_text(svg_text, encoding="utf-8")
    subprocess.run(
        ["rsvg-convert", "-w", str(W), "-h", str(H), "-o", str(png_path), str(svg_path)],
        check=True,
    )
    svg_path.unlink()
    print(f"  {png_path.relative_to(ROOT)}  {png_path.stat().st_size // 1024} kB")


CARDS = [
    dict(
        label="(00) — Alex Panta",
        title="Alex Panta",
        line="Du capteur embarqué à l’infrastructure qui le tient en production.",
        foot="Paris · 2026",
        out_name="home",
    ),
    dict(
        label="(01) — Case study",
        title="ZoeCare / ZoeFall",
        line="Plateforme IoT de détection de chute. Déployée en production dans 2 EHPAD.",
        foot="Alternance · SATT Paris-Saclay · 2024 → 2026",
        out_name="zoecare",
    ),
    dict(
        label="(02) — Case study",
        title="AB Tasty — EmotionsAI",
        line="Tag de tracking EmotionsAI. Blocking time ramené de 120 ms à 53 ms.",
        foot="Stage · AB Tasty · 2023 → 2024",
        out_name="ab-tasty",
    ),
    # -- en -----------------------------------------------------------
    dict(
        label="(00) — Alex Panta",
        title="Alex Panta",
        line="From the embedded sensor to the infrastructure that keeps it running in production.",
        foot="Paris · 2026",
        out_name="home-en",
    ),
    dict(
        label="(01) — Case study",
        title="ZoeCare / ZoeFall",
        line="IoT fall-detection platform. Deployed and in production in 2 care homes.",
        foot="Apprenticeship · SATT Paris-Saclay · 2024 → 2026",
        out_name="zoecare-en",
    ),
    dict(
        label="(02) — Case study",
        title="AB Tasty — EmotionsAI",
        line="EmotionsAI tracking tag. Blocking time cut from 120 ms to 53 ms.",
        foot="Internship · AB Tasty · 2023 → 2024",
        out_name="ab-tasty-en",
    ),
]

if __name__ == "__main__":
    if not FONTS.exists():
        sys.exit("public/fonts introuvable")
    print("Aperçus de partage 1200×630 :")
    for spec in CARDS:
        card(**spec)
