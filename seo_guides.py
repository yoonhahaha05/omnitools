"""Unique worked examples for tools that previously had only a one-line fallback."""

from seo_guides_text import TEXT_GUIDES
from seo_guides_dev import DEV_GUIDES
from seo_guides_math import MATH_GUIDES
from seo_guides_media import MEDIA_GUIDES, QUICK_GUIDES

EXTRA_TOOL_DETAILS = {}
for _part in (TEXT_GUIDES, DEV_GUIDES, MATH_GUIDES, MEDIA_GUIDES, QUICK_GUIDES):
    _overlap = set(EXTRA_TOOL_DETAILS) & set(_part)
    if _overlap:
        raise RuntimeError(f"duplicate guides: {sorted(_overlap)}")
    EXTRA_TOOL_DETAILS.update(_part)
