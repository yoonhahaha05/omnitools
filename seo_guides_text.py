"""Worked guides for text tools."""

TEXT_GUIDES = {
    "reading-time-estimator": {
        "deep_dive": """This page times a draft at four fixed speeds. Silent reading uses 225 words per minute. Deep study uses 150. Skimming uses 300. A spoken presentation uses 130. Words are split on whitespace. Syllables are estimated by counting vowel groups, which is a rough count, not a dictionary lookup.

Worked example. A 900-word talk is 900 / 225 = 4 minutes of silent reading, 900 / 150 = 6 minutes of study, 900 / 300 = 3 minutes of skimming, and 900 / 130 = about 6 minutes 55 seconds when spoken. The level label looks at words per sentence: over 22 is marked Advanced, over 14 is Standard, and shorter sentences are Easy.""",
        "use_cases": [
            "<strong>A 900-word talk:</strong> About 4 minutes to read silently and about 6 minutes 55 seconds to speak at 130 wpm.",
            "<strong>A 1,500-word essay:</strong> 10 minutes at the 150 wpm study speed, 5 minutes if you only skim at 300 wpm."
        ],
        "spec_table": {
            "headers": ["Mode", "Speed", "900 words"],
            "rows": [
                ["Silent reading", "225 wpm", "4 min"],
                ["Deep study", "150 wpm", "6 min"],
                ["Skimming", "300 wpm", "3 min"],
                ["Spoken", "130 wpm", "6 min 55 sec"]
            ]
        },
        "extra_faqs": [
            {"q": "Does the timer change if I edit the speeds?", "a": "No. The four speeds are fixed at 225, 150, 300, and 130 words per minute."},
            {"q": "How is a word counted?", "a": "The text is trimmed and split on whitespace. Punctuation stuck to a word still counts as one word."}
        ]
    },
    "case-converter": {
        "deep_dive": """Each button rewrites the same string with a different word boundary. Spaces, hyphens, and underscores are treated as separators. camelCase and PascalCase then delete the separators and capitalize the following word. snake_case and kebab-case lowercase everything and join with _ or -.

Worked example. The input \"user login count\" becomes USER LOGIN COUNT, user login count, User Login Count, userLoginCount, UserLoginCount, user_login_count, and user-login-count. Going the other way, a lowercase letter followed by an uppercase letter is a word break, so userLoginCount becomes user_login_count. Consecutive capitals stay together: XMLHttpRequest becomes xmlhttp_request, not xml_http_request.""",
        "use_cases": [
            "<strong>A JSON key:</strong> \"user login count\" becomes userLoginCount or user_login_count.",
            "<strong>A URL fragment:</strong> The same phrase becomes user-login-count in kebab-case."
        ],
        "spec_table": {
            "headers": ["Input", "Case", "Result"],
            "rows": [
                ["user login count", "camelCase", "userLoginCount"],
                ["user login count", "PascalCase", "UserLoginCount"],
                ["user login count", "snake_case", "user_login_count"],
                ["user login count", "kebab-case", "user-login-count"],
                ["user login count", "Title Case", "User Login Count"]
            ]
        },
        "extra_faqs": [
            {"q": "Will camelCase split XMLHttpRequest?", "a": "Only if the words are already separated by spaces, hyphens, or underscores. Inner capitals in a single token are left together."},
            {"q": "What happens to digits?", "a": "Digits are their own word when spaces separate them. \"http 2 client\" becomes http2Client in camelCase and http_2_client in snake_case."}
        ]
    },
    "remove-whitespace": {
        "deep_dive": """The cleaner collapses runs of spaces and tabs. A trailing-space option strips spaces at the end of each line, which is the usual cause of noisy git diffs. Tabs can be turned into a fixed run of spaces so a pasted table lines up.

Worked example. The line \"  hello   world  \" with collapse and trim becomes \"hello world\". Two lines that end with three spaces lose those spaces and keep the line break. A tab between \"a\" and \"b\" becomes spaces if you choose that option, so the bytes change even when the words look the same.""",
        "use_cases": [
            "<strong>A pasted paragraph:</strong> \"  hello   world  \" becomes \"hello world\".",
            "<strong>A diff cleanup:</strong> Trailing spaces on each line are removed and the line breaks stay."
        ],
        "extra_faqs": [
            {"q": "Are line breaks removed?", "a": "No. This tool only changes spaces and tabs. Use Remove Line Breaks if you want one paragraph."},
            {"q": "Does it remove non-breaking spaces?", "a": "It targets ordinary spaces and tabs. A non-breaking space (U+00A0) is a different character. Use the invisible-character tool for those."}
        ]
    },
    "remove-line-breaks": {
        "deep_dive": """PDF and email text often inserts a break at the end of every visual line. This tool joins those lines with a delimiter you choose, usually a single space. A paragraph option keeps a blank line (two breaks in a row) so real paragraphs do not merge.

Worked example. Three PDF lines \"The quick\\nbrown fox\\njumps\" joined with a space become \"The quick brown fox jumps\". If you keep paragraph breaks, \"Line one\\n\\nLine two\" stays two paragraphs, while single breaks inside each paragraph still join.""",
        "use_cases": [
            "<strong>A PDF paragraph:</strong> \"The quick\" / \"brown fox\" / \"jumps\" becomes one sentence.",
            "<strong>Two paragraphs:</strong> A blank line between them is kept when paragraph preservation is on."
        ],
        "extra_faqs": [
            {"q": "Which line endings are recognized?", "a": "Both LF and CRLF count as a break. A trailing break at the end of the paste does not add an extra empty paragraph."},
            {"q": "Can I join lines with a comma?", "a": "Yes. Set the delimiter to a comma or any other string. The default is a space, which is what you want for prose."}
        ]
    },
    "sort-lines": {
        "deep_dive": """Each line is one record. Alphabetical sort uses Unicode code points, so uppercase letters sort before lowercase in a plain A–Z pass. Natural sort compares digit runs as numbers, so file2 comes before file10. Length sort orders by character count, shortest first, unless you reverse it.

Worked example. The lines file1, file10, file2 sort alphabetically as file1, file10, file2. Natural order is file1, file2, file10. Reversed alphabetical order is file2, file10, file1. Blank lines stay as empty records unless you remove them first.""",
        "use_cases": [
            "<strong>File names:</strong> file1, file10, file2 become file1, file2, file10 with natural sort.",
            "<strong>A word list:</strong> Reverse alphabetical order puts zebra above apple."
        ],
        "spec_table": {
            "headers": ["Lines", "Alphabetical", "Natural"],
            "rows": [
                ["file1, file10, file2", "file1, file10, file2", "file1, file2, file10"],
                ["item2, item10", "item10, item2", "item2, item10"]
            ]
        },
        "extra_faqs": [
            {"q": "Does alphabetical sort ignore case?", "a": "A plain A–Z sort does not. \"Apple\" sorts before \"apple\" because uppercase code points come first. Use a case-insensitive option when the list should ignore that."},
            {"q": "Are leading spaces part of the sort key?", "a": "Yes. A line that starts with a space sorts differently from the same word without it. Trim lines first if the spaces are accidental."}
        ]
    },
    "reverse-text": {
        "deep_dive": """Character reversal flips the string in memory order, so \"hello\" becomes \"olleh\". Word reversal keeps each word intact and flips their order, so \"hello world\" becomes \"world hello\". Line reversal flips the order of lines and leaves each line readable. Upside-down mode does not reverse the string. It substitutes letters with Unicode characters that look flipped, such as u for n-like shapes.

Worked example. \"cafe time\" reversed by characters is \"emit efac\". Reversed by words it is \"time cafe\". The upside-down style is a different string of code points, so a search for \"cafe\" will not match it.""",
        "use_cases": [
            "<strong>Character flip:</strong> \"hello\" becomes \"olleh\".",
            "<strong>Word order:</strong> \"one two three\" becomes \"three two one\"."
        ],
        "extra_faqs": [
            {"q": "Does character reversal split emoji?", "a": "Emoji that use a modifier or a zero-width joiner can break into separate code points. The flip is by code unit order, not by grapheme."},
            {"q": "Is upside-down text the same as a reversal?", "a": "No. Upside-down text substitutes lookalike Unicode letters. The original reading order is usually kept."}
        ]
    },
    "remove-duplicate-lines": {
        "deep_dive": """The first time a line appears, it is kept. Later copies are dropped. Order of the kept lines matches the original list. Case-insensitive mode treats \"Apple\" and \"apple\" as the same line and keeps whichever came first. A trim option ignores leading and trailing spaces when deciding that two lines match.

Worked example. The list apple, banana, apple, Apple keeps apple, banana, Apple when matching is case-sensitive. The same list keeps only apple and banana when matching ignores case, because Apple is a repeat of apple. A blank line is kept once if blank lines are not filtered.""",
        "use_cases": [
            "<strong>A log of hosts:</strong> The second and third copies of the same hostname are dropped. The first one stays where it was.",
            "<strong>Mixed case:</strong> \"Apple\" after \"apple\" is removed only when case-insensitive matching is on."
        ],
        "extra_faqs": [
            {"q": "Can I keep the last copy instead of the first?", "a": "No. The kept line is always the first occurrence."},
            {"q": "Do spaces make two lines different?", "a": "Yes, unless you turn on trim. \"cat\" and \"cat \" are different until trailing space is ignored."}
        ]
    },
    "markdown-previewer": {
        "deep_dive": """The left pane is the Markdown source. The right pane is the HTML it renders. Headings, lists, links, emphasis, and fenced code blocks follow the usual CommonMark-style mapping. Copy HTML gives the fragment. Download writes a small HTML file you can open on its own.

Worked example. The source \"# Notes\\n\\n- alpha\\n- beta\" renders as an h1 followed by a ul with two li elements. A fenced block marked js stays a code block. It is not executed. An inline link [OmniTools](https://getomnitools.com/) becomes an anchor with that href.""",
        "use_cases": [
            "<strong>A short note:</strong> \"# Notes\" plus two list items becomes an h1 and a ul.",
            "<strong>A README check:</strong> Copy the HTML fragment to see the tags before you commit the Markdown."
        ],
        "extra_faqs": [
            {"q": "Are raw HTML tags in the Markdown rendered?", "a": "The preview shows the formatted document. Do not paste untrusted HTML if you plan to reuse the exported markup on a site."},
            {"q": "Does a fenced code block run?", "a": "No. It is displayed as code."}
        ]
    },
    "lorem-ipsum-generator": {
        "deep_dive": """The generator repeats the standard Lorem ipsum passage, starting \"Lorem ipsum dolor sit amet, consectetur adipiscing elit\". You pick paragraphs, sentences, words, or a bullet list, then a count. The words are filler. They are not translated Latin and they are not unique on each click beyond the length you asked for.

Worked example. Three sentences start with \"Lorem ipsum dolor sit amet\" and stop after the third period. Five words return the first five tokens of that passage. A bullet list of four items is four lines, each starting with a hyphen or list marker, drawn from the same passage.""",
        "use_cases": [
            "<strong>A layout mock:</strong> Three paragraphs fill a card without using real copy.",
            "<strong>A button label test:</strong> Five words is enough to see whether the control truncates."
        ],
        "extra_faqs": [
            {"q": "Is the text random each time?", "a": "It is the classical Lorem ipsum sequence, cut to the count you set. It is not a random dictionary."},
            {"q": "Should I publish Lorem ipsum?", "a": "No. It is a placeholder. Replace it before a page is indexed or shown to users."}
        ]
    },
    "slug-generator": {
        "deep_dive": """A slug is the path segment of a URL. This tool lowercases the title, strips accents, removes characters that are not letters or digits, and joins the remaining words with the separator you pick. The default separator is a hyphen.

Worked example. \"Crème Brûlée — 10 Tips!\" becomes \"creme-brulee-10-tips\". The é and û lose their accents, the em dash and exclamation mark are dropped, and the number stays. With an underscore separator the same title is \"creme_brulee_10_tips\". Leading and trailing separators are removed, so a title that is only punctuation becomes an empty string.""",
        "use_cases": [
            "<strong>A blog title:</strong> \"Crème Brûlée — 10 Tips!\" becomes creme-brulee-10-tips.",
            "<strong>A file-style key:</strong> The same title with underscores is creme_brulee_10_tips."
        ],
        "extra_faqs": [
            {"q": "Are apostrophes kept?", "a": "No. \"Don't stop\" becomes dont-stop. The apostrophe is not a word separator that leaves a gap. It is removed."},
            {"q": "What about non-Latin letters?", "a": "Accented Latin letters are folded to ASCII. Scripts that have no ASCII fold are dropped, so add your own transliteration first if the title is not Latin."}
        ]
    },
    "regex-find-replace": {
        "deep_dive": """The pattern is a JavaScript regular expression. Parentheses create capture groups. In the replacement, $1 is the first group, $2 the second, and $& is the whole match. The g flag replaces every match. Without g, only the first match changes. The i flag ignores case. The m flag makes ^ and $ match at each line.

Worked example. Text \"id=4; id=12\" with pattern id=(\\d+) and replacement item-$1 and the g flag becomes \"item-4; item-12\". The same replacement without g changes only \"id=4\". A pattern of ^\\s+ with an empty replacement and the m flag strips leading space on every line.""",
        "use_cases": [
            "<strong>Rename ids:</strong> id=(\\d+) replaced with item-$1 turns id=4 and id=12 into item-4 and item-12.",
            "<strong>Trim each line:</strong> ^\\s+ replaced with nothing, with the m flag, removes leading spaces."
        ],
        "extra_faqs": [
            {"q": "Why did $1 print literally?", "a": "The pattern needs parentheses around the part you want to keep. $1 is empty when there is no first capture group."},
            {"q": "Which regex dialect is this?", "a": "JavaScript. Lookbehind works in current browsers. Possessive quantifiers and some Perl verbs do not."}
        ]
    },
    "strip-html-tags": {
        "deep_dive": """Tags are removed and the text nodes are kept. script and style elements are dropped entirely, including the code inside them, so a page does not leak JavaScript into the plain text. br and block tags can become newlines so paragraphs do not run together. Named entities such as &amp; and &nbsp; are decoded.

Worked example. The fragment \"<p>Tom &amp; Jerry</p><script>alert(1)</script><p>End</p>\" becomes \"Tom & Jerry\" followed by \"End\". The alert source is gone. \"Price&nbsp;&lt; 5\" becomes \"Price < 5\" after entity decoding, with a normal space where the non-breaking space was.""",
        "use_cases": [
            "<strong>A copied article:</strong> Paragraph tags come off and Tom &amp; Jerry is readable text.",
            "<strong>A page with a script:</strong> The script body is discarded, not printed as text."
        ],
        "extra_faqs": [
            {"q": "Does this make HTML safe to insert back into a page?", "a": "It produces plain text. If you put that text back into HTML, you still need to escape it. Stripping is not a sanitizer for attributes or URLs."},
            {"q": "What happens to images?", "a": "The img tag is removed. Alt text is not automatically substituted unless it was already a text node."}
        ]
    },
    "discord-markdown-styler": {
        "deep_dive": """Discord uses its own Markdown. **text** is bold, *text* is italic, __text__ is underline, ~~text~~ is strikethrough, and ||text|| is a spoiler. A timestamp uses the Unix time in seconds: <t:1719792000:R> renders as a relative time in each viewer's zone, <t:1719792000:F> as a full date. ANSI colors only work inside a code block tagged ansi, using escape sequences such as \\u001b[31m for red.

Worked example. Wrapping a score in || || produces ||12||, which other people must click. The instant 1 July 2024 00:00 UTC is 1719792000. The relative token is <t:1719792000:R>. A red word in an ansi block starts with the red SGR code and ends with the reset code.""",
        "use_cases": [
            "<strong>A spoiler:</strong> ||12|| hides the score until someone clicks it.",
            "<strong>A timestamp:</strong> t:1719792000:R, written inside angle brackets, is 1 July 2024 00:00 UTC, shown relative to each reader."
        ],
        "extra_faqs": [
            {"q": "Why do colors fail in a normal message?", "a": "Discord only applies ANSI colors inside a code fence whose language is ansi. Bold and spoilers work outside that fence."},
            {"q": "Which timestamp style is :t versus :F?", "a": ":t is a short time, :T adds seconds, :d is a short date, :D a long date, :f a date and time, :F a long date and time, and :R a relative phrase such as 'in 2 hours'."}
        ]
    },
    "invisible-character-remover": {
        "deep_dive": """Some characters take no visible space. U+200B is zero-width space, U+200C zero-width non-joiner, U+200D zero-width joiner, and U+FEFF is the byte-order mark. U+00A0 is a non-breaking space, which looks like a space but does not match a normal space in search. Trojan Source attacks use bidi controls such as U+202E to display code in a different order than the compiler reads.

Worked example. The word \"hel\\u200Blo\" looks like hello and has length 6, not 5. After a strip of zero-width characters the length is 5 and a search for hello matches. A file that starts with U+FEFF loses that mark, which matters when a hash or a shebang check fails on an otherwise identical script.""",
        "use_cases": [
            "<strong>A search miss:</strong> hello with a U+200B in the middle looks normal and does not match until the mark is removed.",
            "<strong>A BOM:</strong> U+FEFF at the start of a script is removed so the first visible character is the real start of the file."
        ],
        "spec_table": {
            "headers": ["Code point", "Name", "What you see"],
            "rows": [
                ["U+200B", "Zero-width space", "Nothing"],
                ["U+200C", "Zero-width non-joiner", "Nothing"],
                ["U+200D", "Zero-width joiner", "Nothing"],
                ["U+FEFF", "Byte order mark", "Nothing"],
                ["U+00A0", "No-break space", "A space that does not wrap"],
                ["U+202E", "Right-to-left override", "Following text drawn backwards"]
            ]
        },
        "extra_faqs": [
            {"q": "Will this remove emoji skin-tone joiners?", "a": "U+200D is also used to join emoji into one glyph, such as a family sequence. Stripping it splits those emoji."},
            {"q": "Does the counter include ordinary spaces?", "a": "Ordinary spaces are visible. The counter is for the hidden and non-breaking characters the cleaner targets."}
        ]
    },
    "text-binary-converter": {
        "deep_dive": """Text to binary encodes each byte of the UTF-8 string as eight bits, separated by spaces. The letter A is byte 0x41, which is 01000001. A space character is 00100000. Multi-byte UTF-8 characters use more than one group of eight. The euro sign € is UTF-8 bytes E2 82 AC, so it becomes three binary groups, not one.

Worked example. \"Hi\" is 01001000 01101001. Decoding that pair returns Hi. A binary paste must be groups of eight 0/1 digits. A missing bit or a group of seven digits does not decode as the character you expect.""",
        "use_cases": [
            "<strong>The letter A:</strong> 01000001.",
            "<strong>Hi:</strong> 01001000 01101001."
        ],
        "spec_table": {
            "headers": ["Text", "UTF-8 bytes", "Binary groups"],
            "rows": [
                ["A", "41", "01000001"],
                ["Hi", "48 69", "01001000 01101001"],
                ["space", "20", "00100000"]
            ]
        },
        "extra_faqs": [
            {"q": "Why is € more than eight bits?", "a": "The converter writes UTF-8 bytes. € is three bytes, so you get three 8-bit groups."},
            {"q": "Can I paste binary without spaces?", "a": "Groups need a separator so each byte is eight bits. Split the stream into eights before decoding if your source has no spaces."}
        ]
    },
    "text-hex-converter": {
        "deep_dive": """Hex shows each byte as two digits from 0-9 and a-f. \"Hi\" is UTF-8 bytes 48 69. The same bytes can be printed with spaces, as a raw string 4869, or in C-style 0x48 0x69. Decoding reverses that. Odd-length hex is incomplete, because a byte is always two digits.

Worked example. \"A\" is 41. The word \"cat\" is 63 61 74. A C-style dump of \"A\" is 0x41. URL-style percent encoding is a different notation: %41 is also \"A\", but this page prints hex bytes, not percent escapes. Use the URL encoder for percent encoding.""",
        "use_cases": [
            "<strong>A:</strong> hex 41, or 0x41 in C style.",
            "<strong>cat:</strong> 63 61 74."
        ],
        "extra_faqs": [
            {"q": "Are letters case-sensitive when decoding?", "a": "No. 4A and 4a are the same byte."},
            {"q": "What if the hex string has an odd number of digits?", "a": "The last digit is not a full byte. Drop it or add a leading zero before you trust the decode."}
        ]
    },
    "nato-phonetic-converter": {
        "deep_dive": """The ICAO spelling alphabet maps each Latin letter to one word so a noisy channel does not confuse B and D. Digits have their own words: 9 is Niner, not Nine. This page spells the characters you type and leaves other symbols as themselves.

Worked example. \"kb7\" is Kilo Bravo Seven. \"SOS\" is Sierra Oscar Sierra. A space is kept as a pause between words so \"a b\" is Alfa, then Bravo, not one token. The letter of the word is the first letter, except Alfa and Juliett, which are spelled that way on purpose.""",
        "use_cases": [
            "<strong>A call sign:</strong> kb7 is spoken Kilo Bravo Seven.",
            "<strong>A confirmation code:</strong> SOS is Sierra Oscar Sierra."
        ],
        "spec_table": {
            "headers": ["Letter", "Word", "Letter", "Word"],
            "rows": [
                ["A", "Alfa", "N", "November"],
                ["B", "Bravo", "O", "Oscar"],
                ["C", "Charlie", "S", "Sierra"],
                ["D", "Delta", "W", "Whiskey"],
                ["M", "Mike", "Z", "Zulu"]
            ]
        },
        "extra_faqs": [
            {"q": "Why Alfa and Juliett, not Alpha and Juliet?", "a": "Those are the ICAO spellings. Alfa avoids an English-only pronunciation of Alpha. Juliett keeps the final t audible in French."},
            {"q": "How is 9 spoken?", "a": "Niner. The extra syllable separates it from five on a radio."}
        ]
    },
    "morse-code-translator": {
        "deep_dive": """A dot is a short mark and a dash is a long mark, three times the dot. Letters in a word are separated by a space. Words are separated by a slash. The audio uses the Web Audio oscillator. At the default 16 words per minute, the dot length is 1200 / 16 = 75 milliseconds. A dash is 225 milliseconds.

Worked example. SOS is ... --- ... with no extra letter spaces inside the prosign if you type it as one run, and the page's letter mode prints S as ..., O as ---, S as .... The letter A is .- and E is a single dot. Decoding \".... . .-.. .-.. ---\" returns HELLO.""",
        "use_cases": [
            "<strong>SOS:</strong> ... --- ...",
            "<strong>HELLO:</strong> .... . .-.. .-.. ---"
        ],
        "spec_table": {
            "headers": ["Character", "Morse", "Character", "Morse"],
            "rows": [
                ["A", ".-", "E", "."],
                ["S", "...", "O", "---"],
                ["N", "-.", "T", "-"]
            ]
        },
        "extra_faqs": [
            {"q": "How long is a dot at 16 WPM?", "a": "75 milliseconds. The page uses 1200 divided by the WPM value."},
            {"q": "What separates words?", "a": "A slash in the Morse text. A single space separates letters inside a word."}
        ]
    },
    "fancy-unicode-fonts": {
        "deep_dive": """These styles are other Unicode letters, not a font file. Mathematical bold A is U+1D400, which looks like A and is a different character. That is why the text pastes into Instagram, Discord, and a tweet without installing anything. It also means a search for the plain word will miss the styled word, and a screen reader may spell the letters oddly.

Worked example. Plain \"Hi\" in mathematical bold is two characters from the bold range, not the ASCII bytes 0x48 and 0x69. The string length in code points stays 2. A password field that rejects non-ASCII will reject the styled copy. Use plain text for passwords, URLs, and code.""",
        "use_cases": [
            "<strong>A display name:</strong> Styled letters paste into a bio because they are Unicode, not an image.",
            "<strong>A search:</strong> The styled word will not match the ASCII spelling. Keep a plain copy if people need to find it."
        ],
        "extra_faqs": [
            {"q": "Why do some letters stay plain?", "a": "A few styles have no character for every letter, digit, or accent. Those characters are left unchanged."},
            {"q": "Can I use this in source code?", "a": "You can paste it, and it will confuse readers and some tools. Keep identifiers in ASCII."}
        ]
    },
    "line-numberer": {
        "deep_dive": """Each non-empty line, or every line if you include blanks, gets a prefix. The start number and the step are integers. Padding adds leading zeros so that 1 and 10 line up: width 2 prints 01, width 3 prints 001. The separator is the text between the number and the line, often a period, a pipe, or a tab.

Worked example. Three lines starting at 1 with padding 2 and separator \". \" become \"01. first\", \"02. second\", \"03. third\". Starting at 10 with the same padding prints 10, 11, and 12, because those values already have two digits. Blank lines are skipped when that option is on, and the counter does not increment for them.""",
        "use_cases": [
            "<strong>A short list:</strong> 01. first, 02. second, 03. third.",
            "<strong>A snippet starting at line 40:</strong> Set the start to 40 and the labels follow the source."
        ],
        "extra_faqs": [
            {"q": "Does padding change the number's value?", "a": "No. 01 is still line 1. The zeros are only there so the prefixes have the same width."},
            {"q": "What if a line already starts with a number?", "a": "The prefix is added in front. The old number stays part of the line text."}
        ]
    },
    "extract-urls": {
        "deep_dive": """The scan keeps strings that start with http:// or https://. Surrounding punctuation that is not part of a URL, such as a closing parenthesis or a comma at the end of a sentence, is not included. Duplicates collapse to one line. The result is one URL per line.

Worked example. The sentence \"See https://getomnitools.com/tools/word-counter, and again https://getomnitools.com/tools/word-counter.\" yields one line, https://getomnitools.com/tools/word-counter. A bare www.example.com without a scheme is not matched. A mailto link is not an http URL and is left out.""",
        "use_cases": [
            "<strong>A paragraph with the same link twice:</strong> The list contains that URL once.",
            "<strong>A link before a comma:</strong> The comma stays in the sentence and out of the URL."
        ],
        "extra_faqs": [
            {"q": "Are ftp and mailto links included?", "a": "No. Only http and https are extracted."},
            {"q": "Does the order change?", "a": "URLs stay in the order they first appeared."}
        ]
    },
    "extract-emails": {
        "deep_dive": """The pattern looks for a local part, an @, and a domain with a dot. Matches are lowercased and de-duplicated, so Ada@Example.com and ada@example.com become one row. The scan does not send the text anywhere. It only reads the string in the page.

Worked example. \"Write ada@example.com or ADA@example.com by Friday\" produces a single line, ada@example.com. \"not-an-email\" and \"a@b\" without a dotted domain are skipped. An address wrapped in angle brackets, <ada@example.com>, still yields ada@example.com.""",
        "use_cases": [
            "<strong>A messy signature:</strong> ada@example.com and ADA@example.com become one lowercase address.",
            "<strong>A thread:</strong> Each distinct address is one line, in first-seen order."
        ],
        "extra_faqs": [
            {"q": "Will this catch every address the RFC allows?", "a": "No. Quoted local parts and rare domain forms are outside the pattern. Ordinary name@domain addresses are the ones it is built for."},
            {"q": "Are addresses inside image names ignored?", "a": "No. Any matching string is extracted, including one that appears in a filename or a code comment."}
        ]
    },
    "emoji-stripper": {
        "deep_dive": """Emoji are removed and the remaining text is closed up so you do not get a double space where the picture was. Flags, skin-tone modifiers, and joined sequences count as emoji. Digits, punctuation, and letters stay.

Worked example. \"Ship it 🚀 now\" becomes \"Ship it now\" with one space. \"café\" keeps the é, because it is a letter, not an emoji. A line that is only emoji becomes empty. Older utf8mb3 MySQL columns reject 4-byte characters, which is why a strip is used before that kind of insert. A current utf8mb4 column can store the emoji, so stripping is a product choice, not a database requirement.""",
        "use_cases": [
            "<strong>A status line:</strong> \"Ship it 🚀 now\" becomes \"Ship it now\".",
            "<strong>A name field:</strong> Letters and accents stay. Emoji in the name are removed."
        ],
        "extra_faqs": [
            {"q": "Are #, *, and other typed emoticons removed?", "a": "The strip targets Unicode emoji. A typed :-) is three ASCII characters and stays."},
            {"q": "Does the text direction change?", "a": "No. Remaining characters stay in their original order."}
        ]
    },
}
