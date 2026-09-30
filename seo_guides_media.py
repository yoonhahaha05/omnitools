"""Worked guides for media, CSS, and quick tools."""

MEDIA_GUIDES = {
    "color-converter": {
        "deep_dive": """The page keeps one color in three notations. Hex is three bytes, red, green, and blue, written as six digits. RGB writes those bytes as decimals from 0 to 255. HSL rewrites the same color as a hue in degrees, a saturation, and a lightness. Moving any one control updates the others. A random color replaces all three.

Worked example. Pure red is #FF0000, rgb(255, 0, 0), and hsl(0, 100%, 50%). White is #FFFFFF and hsl(0, 0%, 100%). Black is #000000 and hsl(0, 0%, 0%). A mid gray #808080 is rgb(128, 128, 128) and hsl(0, 0%, 50%). Hue is undefined for a gray because saturation is zero. The CSS you copy is whichever notation you click.""",
        "use_cases": [
            "<strong>Brand red:</strong> #FF0000 is rgb(255, 0, 0) and hsl(0, 100%, 50%).",
            "<strong>A gray:</strong> #808080 is rgb(128, 128, 128) and hsl(0, 0%, 50%)."
        ],
        "extra_faqs": [
            {"q": "Why does HSL look different from RGB for the same hex?", "a": "It is the same color. HSL is a different coordinate system. #FF0000 and hsl(0, 100%, 50%) paint the same red."},
            {"q": "Can I enter an 8-digit hex with alpha?", "a": "Use six digits, RRGGBB. Alpha is not part of the conversion."}
        ]
    },
    "palette-generator": {
        "deep_dive": """Each click builds five colors from a harmony rule. Analogous colors sit next to each other on the hue wheel, about 30 degrees apart. Complementary colors sit opposite, 180 degrees apart. A lock freezes a swatch so the next click changes only the unlocked ones. Copy CSS writes custom properties, --color-1 through --color-5, with the current hex values.

Worked example. A base hue of 210 (a blue) in an analogous set stays in the blue-cyan range. The same base in a complementary set adds a hue near 30, which is orange. Locking swatch 3 and generating again keeps that hex and replaces the other four. The variables paste into :root { --color-1: #1d4ed8; … }.""",
        "use_cases": [
            "<strong>A blue interface:</strong> Analogous harmony stays around hue 210 instead of jumping to a random opposite.",
            "<strong>One color you want to keep:</strong> Lock that swatch. Generate replaces the other four."
        ],
        "extra_faqs": [
            {"q": "Are the palettes saved?", "a": "No. Copy the hex values or the CSS variables before you generate again."},
            {"q": "Does harmony guarantee a contrast ratio?", "a": "No. Check a text color against its background on the contrast checker. Harmony is about hue spacing."}
        ]
    },
    "barcode-generator": {
        "deep_dive": """Code 128 encodes ASCII in bars of four widths. The page uses code set B, which covers letters, digits, and the usual punctuation. A start symbol, the data, a checksum symbol, and a stop symbol are painted on a canvas. You can download that canvas as a PNG. The scanner needs quiet space on both sides of the bars. The page does not look up a product database.

Worked example. The payload SKU-1042 is legal Code 128B because every character is ASCII. The checksum depends on the start code and on a weighted sum of the symbol values, so changing one character changes bars in more than one place. A module width of 2 device pixels is easier to scan when printed than a width of 1. Height does not carry data. It only needs to be tall enough for the scanner.""",
        "use_cases": [
            "<strong>A shelf label:</strong> SKU-1042 as Code 128, downloaded as a PNG.",
            "<strong>A small printer:</strong> Raise the module width if a 1-pixel bar disappears on paper."
        ],
        "extra_faqs": [
            {"q": "Is this a UPC or an EAN?", "a": "No. Those are fixed-digit product codes with their own check digits. This page draws Code 128."},
            {"q": "Why will a phone not scan a very short bar?", "a": "The quiet zone or the bar height is too small. Leave margin around the image and keep the bars at least a couple of millimeters tall when printed."}
        ]
    },
    "box-shadow-generator": {
        "deep_dive": """The CSS is box-shadow: x y blur spread color. X and Y are offsets in pixels. Positive X moves the shadow right. Positive Y moves it down. Blur spreads the edge. Spread grows or shrinks the shadow before the blur. A negative spread pulls the shadow inward. The shadow does not change layout. It paints outside the border box, unless inset is set.

Worked example. box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18) is a soft drop under a card: no horizontal shift, 8 pixels down, 24 pixels of blur, no spread, 18% black. A hairline lift is 0 1px 2px rgba(0, 0, 0, 0.08). A hard offset, the kind used in brutalist layouts, is 8px 8px 0 #111, with zero blur.""",
        "use_cases": [
            "<strong>A card:</strong> 0 8px 24px rgba(0, 0, 0, 0.18).",
            "<strong>A hard offset:</strong> 8px 8px 0 #111, with the blur left at 0."
        ],
        "extra_faqs": [
            {"q": "What does a negative Y do?", "a": "The shadow sits above the box. Use it when the light source is below the element."},
            {"q": "Can I stack two shadows?", "a": "CSS allows a comma-separated list. This generator writes one shadow. Paste a second declaration yourself if you need both a tight edge and a wide glow."}
        ]
    },
    "border-radius-generator": {
        "deep_dive": """A single radius such as 12px rounds every corner equally. The eight-value form is more specific. Before the slash, four values set the horizontal radii of the top-left, top-right, bottom-right, and bottom-left corners. After the slash, four values set the vertical radii in the same order. When the two radii of a corner differ, the corner is a quarter ellipse, which is how a blob is built.

Worked example. border-radius: 60% 40% 30% 70% / 50% 60% 30% 40% squashes each corner differently and reads as an organic blob. border-radius: 999px on a button with a fixed height makes a pill, because the radius is larger than half the height and CSS clamps it. 50% on a square element makes a circle.""",
        "use_cases": [
            "<strong>A pill button:</strong> border-radius: 999px on a short, wide button.",
            "<strong>A circle avatar:</strong> border-radius: 50% on a square image."
        ],
        "extra_faqs": [
            {"q": "Why does 50% not look like a circle?", "a": "50% follows the element's own width and height. On a rectangle it makes an ellipse. The box has to be square."},
            {"q": "What does the slash separate?", "a": "Horizontal radii before the slash, vertical radii after it."}
        ]
    },
    "gradient-generator": {
        "deep_dive": """A linear gradient paints along a line. The angle 0deg points up, 90deg points right, and 180deg points down. Color stops are positions along that line. A radial gradient paints outward from the center. The page writes the modern syntax without vendor prefixes.

Worked example. linear-gradient(180deg, #0f172a, #334155) is a dark slate fade from top to bottom. The same colors at 90deg fade from left to right. Two stops at 0% and 100% are a smooth blend. A hard stripe is two stops at the same position: #0f172a 50%, #334155 50%. radial-gradient(circle, #fff, #0f172a) is light in the middle and dark at the edges.""",
        "use_cases": [
            "<strong>A page background:</strong> linear-gradient(180deg, #0f172a, #334155).",
            "<strong>A hard split:</strong> Put both color stops at 50%."
        ],
        "extra_faqs": [
            {"q": "Do I still need -webkit-linear-gradient?", "a": "Not for current browsers. The unprefixed linear-gradient and radial-gradient are enough."},
            {"q": "Which property does the CSS belong on?", "a": "Usually background-image, or the background shorthand. It is not a color value by itself."}
        ]
    },
    "glassmorphism-generator": {
        "deep_dive": """The frosted look is a translucent background plus backdrop-filter: blur(). The element's own background is a white or black with a low alpha, such as rgba(255, 255, 255, 0.18). The blur applies to whatever is behind the element, not to its text. A 1-pixel border at low alpha sells the edge of the glass. Safari still wants the -webkit-backdrop-filter prefix, so the snippet includes both.

Worked example. background: rgba(255, 255, 255, 0.18); border: 1px solid rgba(255, 255, 255, 0.35); backdrop-filter: blur(16px); is a light card. A dark card uses rgba(15, 23, 42, 0.45) and a white border at about 0.12 alpha. If the parent behind the card is a flat color, the blur has nothing to frost. Put a photo or a gradient behind it.""",
        "use_cases": [
            "<strong>A light card:</strong> 18% white, a 16px blur, and a faint white border.",
            "<strong>A dark card:</strong> A slate background around 0.45 alpha over a bright gradient."
        ],
        "extra_faqs": [
            {"q": "Why is the blur invisible?", "a": "backdrop-filter blurs the backdrop. A solid color behind the card looks the same blurred or not. Add a pattern or a gradient underneath."},
            {"q": "Does the text get blurred?", "a": "No. The filter affects content behind the element. Text inside the card stays sharp."}
        ]
    },
    "svg-path-visualizer": {
        "deep_dive": """The d attribute is a list of commands. M x y moves the pen. L x y draws a straight line. H and V draw horizontal and vertical lines. C takes two control points and an end point for a cubic Bézier. Q is the quadratic version. Z closes the path back to the last move. Lowercase commands are relative to the current point. Uppercase commands are absolute.

Worked example. M 10 10 L 90 10 L 90 90 Z is a right triangle missing the hypotenuse drawn as two sides and a close, actually a triangle once Z returns to the start. A rectangle is M 10 10 H 90 V 90 H 10 Z. The page strokes and fills that path and can copy a full <svg> wrapper around it. The viewBox has to contain the coordinates or the shape sits outside the visible area.""",
        "use_cases": [
            "<strong>A triangle:</strong> M 10 80 L 50 10 L 90 80 Z.",
            "<strong>A rectangle:</strong> M 10 10 H 90 V 90 H 10 Z."
        ],
        "extra_faqs": [
            {"q": "Why is the shape clipped?", "a": "The coordinates are larger than the viewBox. Raise the viewBox width and height, or scale the path down."},
            {"q": "What is the difference between M and m?", "a": "M jumps to an absolute point. m jumps by a delta from the current point."}
        ]
    },
    "image-resizer": {
        "deep_dive": """The file is decoded in the browser and drawn onto a canvas at the pixel size you set. Aspect lock computes the other side so the ratio stays constant: new height = new width × (original height / original width). The canvas is then encoded as PNG, JPEG, or WebP and downloaded. The bytes never leave the machine.

Worked example. A 4000×3000 photo locked to width 1200 becomes 1200×900, because 3000/4000 = 0.75. Unlocked, you can force 1200×1200 and the picture stretches. JPEG output is lossy and usually smaller. PNG is lossless and larger. A canvas still has a browser size limit. A photo tens of thousands of pixels on a side can fail to allocate.""",
        "use_cases": [
            "<strong>A 4000×3000 photo to 1200 wide:</strong> The locked height is 900.",
            "<strong>A thumbnail:</strong> Export JPEG. Use PNG when you need hard edges or transparency."
        ],
        "extra_faqs": [
            {"q": "Does resizing a JPEG make it sharper?", "a": "No. You can only throw pixels away or stretch the ones you have. There is no new detail."},
            {"q": "Is the original file modified?", "a": "No. The download is a new file. The original stays where it was."}
        ]
    },
    "image-cropper": {
        "deep_dive": """The crop is a centered window at a fixed aspect ratio. 1:1 is a square, used for avatars. 4:3 is the old photo and slide ratio. 16:9 is widescreen. The zoom slider scales the image behind that window. Export draws the window to a PNG. Faces outside the window are not in the file.

Worked example. A 4000×3000 photo is already 4:3, so a 4:3 crop at zoom 1 keeps the whole frame. A 1:1 crop of the same photo uses the middle 3000×3000 and drops 500 pixels from each side. A 16:9 crop uses the full width and a shorter height: 4000 × (9/16) = 2250 pixels tall, centered vertically.""",
        "use_cases": [
            "<strong>An avatar:</strong> 1:1, zoomed until the face fills the square.",
            "<strong>A 16:9 still from a 4:3 photo:</strong> The full width stays. The top and bottom are cut."
        ],
        "extra_faqs": [
            {"q": "Can I drag the crop rectangle to the corner?", "a": "The window stays centered. Use zoom to choose how much of the middle you keep."},
            {"q": "What format is the download?", "a": "PNG. Convert it afterward if you need JPEG."}
        ]
    },
    "image-filter-tool": {
        "deep_dive": """Filters run on a canvas. Grayscale drops color. Sepia maps the pixels toward brown. Invert swaps each channel for 255 minus itself. Brightness and contrast scale the sample. Blur averages neighbors. The download is the filtered canvas as a PNG, at the source pixel size up to what the browser can allocate.

Worked example. A white pixel rgb(255, 255, 255) stays white in grayscale and in invert. A red pixel rgb(255, 0, 0) in invert becomes rgb(0, 255, 255), which is cyan. Grayscale of that red is a mid-dark gray, because red is weighted less than green in the usual luminance mix. Applying invert twice returns the original color. The source file is not overwritten.""",
        "use_cases": [
            "<strong>A document scan:</strong> Grayscale, then raise contrast, then download a PNG.",
            "<strong>A negative:</strong> Invert once. Invert again if you need the original colors back."
        ],
        "extra_faqs": [
            {"q": "Are the filters the same as CSS filter()?", "a": "The look matches those effects. The result here is baked into the downloaded pixels. It is not a CSS rule on an img element."},
            {"q": "Does a filter change the pixel dimensions?", "a": "No. Width and height stay the same. Blur does not crop the edges."}
        ]
    },
    "favicon-generator": {
        "deep_dive": """A favicon is the small icon in a tab. 32×32 covers current desktop tabs. 16×16 is the legacy size. 180×180 is the Apple touch icon used when someone saves the site to a home screen. This page draws a letter or emoji on a colored tile in one of three masks: square, rounded square, or circle, then exports a PNG. It also prints a link tag you can put in the document head.

Worked example. A white letter O on #0f172a, rounded square, exported at 32×32, is referenced as <link rel=\"icon\" type=\"image/png\" href=\"/favicon.png\">. The 180×180 file is <link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\">. Emoji rendering depends on the operating system font, so the same character can look different on Apple and Windows. For a brand mark, prefer a letter or a simple shape.""",
        "use_cases": [
            "<strong>A browser tab:</strong> A 32×32 PNG of one letter.",
            "<strong>An iOS home screen:</strong> The same design at 180×180, with rel apple-touch-icon."
        ],
        "extra_faqs": [
            {"q": "Do I need an .ico file?", "a": "Modern browsers accept the PNG. An .ico is only for very old clients."},
            {"q": "Why is the emoji cropped?", "a": "Some emoji are wider than a single square. Use one character, or switch to a letter."}
        ]
    },
    "quote-card-maker": {
        "deep_dive": """The card is drawn at 1200×630 pixels, which is a 1.91:1 image. That size is the usual Open Graph and Twitter large-card image, and it also fits a LinkedIn link preview. The page wraps the quote, paints the author line, and exports a PNG. The pixels are produced on a canvas in the browser.

Worked example. A 1200×630 PNG is about 1.91 times as wide as it is tall. Displayed in a timeline it is often scaled down, so a 24-pixel font on the canvas becomes hard to read. Keep the quote under about 180 characters and the author on one line. A dark theme uses a light text color. Check that pair on the contrast checker if the theme color is custom. The download is the full 1200×630 frame, not a screenshot of the page around it.""",
        "use_cases": [
            "<strong>A link preview:</strong> Export 1200×630 and use it as the og:image.",
            "<strong>A short quote:</strong> Stay under about 180 characters so the wrap does not shrink the type."
        ],
        "extra_faqs": [
            {"q": "Why 1200×630 and not a square?", "a": "Square images suit Instagram. Link previews on X and LinkedIn crop or letterbox a square. 1200×630 matches those cards."},
            {"q": "Is the text selectable in the PNG?", "a": "No. It is painted pixels. Keep the source sentence elsewhere if you need to edit it later."}
        ]
    },
    "clip-path-generator": {
        "deep_dive": """clip-path: polygon() keeps the part of the element inside a polygon and hides the rest. Each vertex is a pair of percentages of the element box. The first value is X, from the left. The second is Y, from the top. The shape does not change the layout box. Text and hit testing follow the clipped region in supporting browsers. The snippet includes the -webkit- prefix for older Safari.

Worked example. A downward triangle is polygon(50% 100%, 0 0, 100% 0). An upward triangle is polygon(50% 0, 100% 100%, 0 100%). A diamond is polygon(50% 0, 100% 50%, 50% 100%, 0 50%). Dragging a handle rewrites that vertex. Adding a point inserts another pair. A rectangle with four corners at the edges looks unchanged, because the polygon covers the whole box.""",
        "use_cases": [
            "<strong>An upward triangle:</strong> polygon(50% 0, 100% 100%, 0 100%).",
            "<strong>A diamond:</strong> polygon(50% 0, 100% 50%, 50% 100%, 0 50%)."
        ],
        "extra_faqs": [
            {"q": "Does clip-path make the element smaller for flex layout?", "a": "No. The border box stays the same. Only painting and hit testing are clipped."},
            {"q": "Can I use pixel vertices?", "a": "The generator writes percentages so the shape scales with the element. Pixels are valid CSS, but they will not stretch."}
        ]
    },
}

QUICK_GUIDES = {
    "diceware-generator": {
        "deep_dive": """The generator picks from its own list of 332 entries, using crypto.getRandomValues. Entropy on the page is the word count times log2(332), which is about 8.4 bits per word. That is the list this page actually uses. The classic Diceware and EFF lists are 7,776 words and about 12.9 bits per word. This page is not those lists.

Worked example. Five words are about 41.9 bits. Six words are about 50.3 bits. The optional number is an integer from 10 to 99, which adds log2(90), about 6.5 bits, not a full extra word. A hyphen or space adds no entropy. It only changes how the phrase is typed. Choosing the words yourself also adds no entropy the page can count, because the math assumes the generator picked uniformly. For a master password, prefer a longer phrase or a generator with a larger list.""",
        "use_cases": [
            "<strong>Five words from this list:</strong> About 42 bits.",
            "<strong>Six words plus a number from 10 to 99:</strong> About 50 bits from the words and about 6.5 bits from the number."
        ],
        "extra_faqs": [
            {"q": "Why is this lower than the 64-bit figure people quote?", "a": "64 bits is five words from a 7,776-word list. This page has 332 entries, so five words are about 42 bits."},
            {"q": "Do separators change the strength?", "a": "No. They change memorability and typing. The entropy is in the word choices and the optional number."}
        ]
    },
    "stopwatch-timer": {
        "deep_dive": """Elapsed time is the difference of two performance timestamps, not a count of timer ticks. That is why switching tabs does not make the clock fall behind: when the page wakes up it subtracts the start time from the current time. A lap stores that elapsed value. A split is the difference between this lap and the previous one.

Worked example. Start, wait, and lap at 10.00 seconds, then lap again at 26.50 seconds. Lap 1 is 10.00 cumulative and 10.00 split. Lap 2 is 26.50 cumulative and 16.50 split. The CSV contains those rows. Pausing freezes the displayed elapsed time. Reset drops the laps.""",
        "use_cases": [
            "<strong>Two laps:</strong> Cumulative 10.00 and 26.50 means splits of 10.00 and 16.50.",
            "<strong>A hidden tab:</strong> The next paint catches up to the real elapsed time instead of skipping ticks."
        ],
        "extra_faqs": [
            {"q": "How precise is the millisecond digit?", "a": "The clock source is sub-millisecond. The display rounds to milliseconds. A busy page can delay painting, not the underlying timestamp."},
            {"q": "Does reset keep the CSV?", "a": "Export before you reset. Reset clears the lap list."}
        ]
    },
    "countdown-timer": {
        "deep_dive": """You set minutes and seconds, or you use a preset of 1, 5, 10, 15, or 30 minutes. The deadline is computed when you press start. Each frame shows the remaining time until that deadline, so a stalled tab does not extend the countdown. At zero the page plays a short chime through the Web Audio oscillator. The tab has to stay open for the sound to play. Locking the screen or closing the tab silences it.

Worked example. A 5-minute preset is 300 seconds. Start it at 12:00:00 and it reaches zero at 12:05:00. Pausing at 12:02:00 with 3:00 left, then starting again, schedules a new deadline 3 minutes out. It does not try to hit the original 12:05:00.""",
        "use_cases": [
            "<strong>A 5-minute preset:</strong> 300 seconds from the moment you press start.",
            "<strong>A kitchen timer:</strong> Set 12 minutes. Leave the tab in the foreground so the chime can play."
        ],
        "extra_faqs": [
            {"q": "Will the chime fire if the tab is in the background?", "a": "Browsers throttle background timers and often block audio. Keep the tab open and focused if you need the sound."},
            {"q": "Can I set hours?", "a": "Enter the total in minutes. 90 minutes is an hour and a half."}
        ]
    },
    "pomodoro-timer": {
        "deep_dive": """The Pomodoro method, written up by Francesco Cirillo, alternates a work interval with a short break. This page's presets are 25 minutes of focus, 5 minutes of short break, and 15 minutes of long break. It does not count sessions for you. After four focus blocks, switch to the long break yourself. The end of an interval plays the same kind of Web Audio chime as the countdown timer, which requires the tab to stay open.

Worked example. One cycle is 25 + 5 = 30 minutes. Four cycles plus a 15-minute long break is 4 × 30 + 15 = 135 minutes, or 2 hours 15 minutes, for 100 minutes of actual focus. Starting a focus block at 09:00 ends it at 09:25. The following short break ends at 09:30.""",
        "use_cases": [
            "<strong>A morning block:</strong> Focus from 09:00 to 09:25, break until 09:30.",
            "<strong>Four blocks:</strong> 100 minutes of focus inside 2 hours 15 minutes, including the long break."
        ],
        "extra_faqs": [
            {"q": "Does the page start the break automatically?", "a": "No. When the chime sounds, select the break preset and press start."},
            {"q": "Can I change 25 minutes?", "a": "Use the minute field for a custom interval. The labeled presets are 25, 5, and 15."}
        ]
    },
    "metronome": {
        "deep_dive": """The click is scheduled on the Web Audio clock, which keeps running when the main thread is busy. Spacing between clicks is 60 / BPM seconds. Beat 1 of the bar is a higher pitch so you can hear the downbeat. The time signature sets how many clicks are in the bar: 4 for 4/4, 3 for 3/4, 2 for 2/4, 6 for 6/8.

Worked example. 120 BPM is 60/120 = 0.5 seconds between clicks, which is 500 milliseconds. 60 BPM is 1,000 milliseconds. 90 BPM is 666.7 milliseconds. In 4/4 at 120 BPM, a bar lasts 2 seconds. Tap tempo fills the BPM from gaps between your taps, which is the same idea as the separate tap-tempo tool.""",
        "use_cases": [
            "<strong>120 BPM in 4/4:</strong> A click every 500 ms, and a bar every 2 seconds.",
            "<strong>A waltz:</strong> 3/4 at 90 BPM is a click every 667 ms, with the accent every third click."
        ],
        "spec_table": {
            "headers": ["BPM", "Gap between clicks"],
            "rows": [
                ["60", "1000 ms"],
                ["90", "667 ms"],
                ["120", "500 ms"],
                ["140", "429 ms"],
                ["180", "333 ms"]
            ]
        },
        "extra_faqs": [
            {"q": "Why not use setInterval?", "a": "setInterval drifts when the tab is busy. AudioContext scheduling does not."},
            {"q": "What does 6/8 change?", "a": "The accent pattern. Six clicks complete a bar. The BPM control still sets the click spacing."}
        ]
    },
    "scratchpad": {
        "deep_dive": """The note is saved in localStorage on this origin, under a key the page owns. Each change writes the current text. Closing the tab does not clear localStorage. Clearing site data, using a private window, or opening a different browser profile does. The word count is the same whitespace split used elsewhere: trimmed text, split on spaces. Download writes a .txt file of the current contents. The text is not sent to a server.

Worked example. A 1,200-character note is a few kilobytes. Browsers typically allow about 5 MB for an origin's localStorage, so the pad is for notes, not a document archive. If storage is full, the write throws and the latest edit stays only on screen. Export a copy before you clear browsing data.""",
        "use_cases": [
            "<strong>A draft you reopen tomorrow:</strong> It is still in localStorage on this browser.",
            "<strong>A backup:</strong> Download the .txt. Clearing site data deletes the stored copy."
        ],
        "extra_faqs": [
            {"q": "Does this sync to my phone?", "a": "No. localStorage stays on this browser profile. Move the text with the download, or copy it."},
            {"q": "Can another website read the note?", "a": "No. The browser only exposes localStorage to the same origin."}
        ]
    },
    "screen-inspector": {
        "deep_dive": """The viewport is the browser's layout window, in CSS pixels, and it changes when you resize. The screen size is the display, also reported in CSS pixels. Device pixel ratio is physical pixels per CSS pixel. A ratio of 2 means a 1440-wide layout viewport is 2880 device pixels across, which is the usual Retina case. The breakpoint label matches the width to the common Tailwind bounds: sm 640, md 768, lg 1024, xl 1280, 2xl 1536.

Worked example. A laptop at DPR 2 with a maximized window might show a viewport near 1440×800, a screen of 1440×900, and DPR 2. Narrow the window to 700 pixels and the breakpoint label moves to sm, because 700 is at least 640 and below 768. Color depth is the screen.colorDepth value, often 24. Touch is whether the browser reports a touch screen. It can be true on a laptop with a touch panel even when you are using a mouse.""",
        "use_cases": [
            "<strong>A Retina laptop:</strong> DPR 2. A 1440 CSS-pixel width is 2880 physical pixels.",
            "<strong>A responsive check:</strong> Drag the window across 768 and 1024 and watch the breakpoint label change."
        ],
        "extra_faqs": [
            {"q": "Why is the screen narrower than the monitor I bought?", "a": "The page reports CSS pixels. A 2880-wide panel at DPR 2 is 1440 CSS pixels."},
            {"q": "Do the Tailwind labels change my page?", "a": "No. They only name the width you are at. They do not load Tailwind."}
        ]
    },
    "storage-cleaner": {
        "deep_dive": """The browser isolates storage by origin. This page can list and delete localStorage and sessionStorage for getomnitools.com only. It cannot see keys saved by other sites. A cookie on this host can be listed when it is not HttpOnly. HttpOnly cookies are hidden from JavaScript and will not appear. Session storage dies when the tab closes. Local storage stays until something deletes it.

Worked example. A scratchpad key might hold a few thousand characters. The size column is the length of the stored string, not a compressed size. Deleting that one key removes the note and leaves other keys. Clearing localStorage removes every key for this origin, including the scratchpad and the ad-consent choice. Cookies for the host are separate. Clearing storage does not log you out of other websites.""",
        "use_cases": [
            "<strong>One bad key:</strong> Delete that row. Other keys stay.",
            "<strong>A full reset of this site:</strong> Clear localStorage. The scratchpad and the consent choice are removed."
        ],
        "extra_faqs": [
            {"q": "Why is a cookie missing from the list?", "a": "HttpOnly cookies are not visible to scripts. The browser still sends them. This page cannot delete what it cannot see."},
            {"q": "Does this clear the service-worker cache?", "a": "No. It clears web storage and visible cookies. Cached files are a different store."}
        ]
    },
    "network-latency-checker": {
        "deep_dive": """Each sample is the time for a cache-busted request to a nearby edge and back. That is HTTP round-trip time, not an ICMP ping, and it includes TLS and server time. Five samples produce a minimum, an average, and a jitter figure. Jitter here is the spread of those samples. A stable line has a small spread. A line that alternates between fast and slow has a large one.

Worked example. Samples of 28, 31, 30, 29, and 90 milliseconds have a minimum of 28 and an average of 41.6. The 90 ms sample is an outlier, and the spread is large even though four of the five were near 30. A video call wants the average under about 100 ms and the spread small. A game wants the minimum and the average close together. The number is from your browser to the edge this page uses, not to a game server.""",
        "use_cases": [
            "<strong>Five close samples:</strong> 28 to 33 ms means low jitter.",
            "<strong>One slow sample:</strong> A single 90 ms reading pulls the average up and shows an unstable hop."
        ],
        "extra_faqs": [
            {"q": "Is this the ping a game would show?", "a": "No. Games measure UDP to their own server. This measures HTTP to a CDN edge."},
            {"q": "What is a good result?", "a": "Under 50 ms average with a spread under 15 ms is a solid home connection to a nearby edge. Higher numbers can still be fine for web browsing."}
        ]
    },
    "tap-tempo-bpm": {
        "deep_dive": """BPM is 60 divided by the average gap between taps, in seconds. The page keeps a rolling window of recent gaps so the first tap does not lock the number. Delay times for music follow the beat: a quarter note is 60,000 / BPM milliseconds. An eighth is half of that. A sixteenth is a quarter of that. A triplet eighth is two thirds of the eighth, or one third of the quarter.

Worked example. Taps every 0.5 seconds are 120 BPM. The quarter-note delay is 500 ms. The eighth is 250 ms. The sixteenth is 125 ms. The eighth-note triplet is 500 / 3 = 166.7 ms. Four steady taps are enough for the average to settle within about 1 BPM. Uneven taps move the number. Wait one beat before the first tap so you do not include the time spent finding the button.""",
        "use_cases": [
            "<strong>120 BPM:</strong> Quarter-note delay 500 ms, eighth 250 ms, sixteenth 125 ms.",
            "<strong>90 BPM:</strong> Quarter-note delay 667 ms, eighth 333 ms."
        ],
        "spec_table": {
            "headers": ["BPM", "1/4 ms", "1/8 ms", "1/16 ms", "1/8 triplet ms"],
            "rows": [
                ["80", "750", "375", "188", "250"],
                ["100", "600", "300", "150", "200"],
                ["120", "500", "250", "125", "167"],
                ["140", "429", "214", "107", "143"]
            ]
        },
        "extra_faqs": [
            {"q": "How many taps should I give it?", "a": "Four to eight steady taps. The reading is a rolling average of the gaps, not a single interval."},
            {"q": "What is the triplet column for?", "a": "Delay and reverb times that should land on triplet eighths. At 120 BPM that is 167 ms."}
        ]
    },
}
