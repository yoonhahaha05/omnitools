"""Worked guides for developer tools."""

DEV_GUIDES = {
    "json-minifier": {
        "deep_dive": """Minifying deletes whitespace that JSON does not treat as data: spaces, tabs, and line breaks outside strings. Keys, values, and types stay the same. A space inside a string is kept. The page also reports the byte size before and after.

Worked example. The pretty object {\"a\": 1, \"b\": [2, 3]} minifies to {\"a\":1,\"b\":[2,3]}. Parsing either string gives the same object. A string value \"hello world\" still contains the space. If the input is not valid JSON, there is nothing to minify. Fix the syntax in the beautifier first.""",
        "use_cases": [
            "<strong>A small object:</strong> {\"a\": 1, \"b\": [2, 3]} becomes {\"a\":1,\"b\":[2,3]}.",
            "<strong>A string field:</strong> The space in \"hello world\" remains. Only formatting whitespace is removed."
        ],
        "extra_faqs": [
            {"q": "Does key order change?", "a": "No. Keys stay in the order they appeared."},
            {"q": "Are comments removed?", "a": "JSON has no comments. A file with // comments is invalid and will not minify until the comments are gone."}
        ]
    },
    "url-encoder-decoder": {
        "deep_dive": """encodeURIComponent percent-encodes a component so reserved characters cannot break a query string. A space becomes %20. & becomes %26. = becomes %3D. encodeURI is looser: it leaves : / ? # & so a whole URL keeps its structure. Decoding reverses percent sequences. The parameter table splits a query on & and then on the first = in each pair.

Worked example. The component \"a b&c=d\" encodes to a%20b%26c%3D. A full URL https://example.com/a b is encodeURI output https://example.com/a%20b, with the colon and slashes left alone. The query ?q=red&size=large is two rows: q = red, and size = large.""",
        "use_cases": [
            "<strong>A query value:</strong> \"a b&c=d\" becomes a%20b%26c%3D with encodeURIComponent.",
            "<strong>A query string:</strong> q=red&size=large splits into two parameters."
        ],
        "spec_table": {
            "headers": ["Character", "encodeURIComponent", "encodeURI"],
            "rows": [
                ["space", "%20", "%20"],
                ["&", "%26", "left as &"],
                ["=", "%3D", "left as ="],
                ["/", "%2F", "left as /"],
                ["?", "%3F", "left as ?"]
            ]
        },
        "extra_faqs": [
            {"q": "Why is a space %20 and not +?", "a": "encodeURIComponent uses %20. A + for space is the older application/x-www-form-urlencoded rule. This page follows the URI functions."},
            {"q": "What does a bare % mean when decoding?", "a": "A percent not followed by two hex digits is invalid encoding. The decoder leaves it or fails that sequence rather than inventing a character."}
        ]
    },
    "csv-to-json": {
        "deep_dive": """The first row is the header. Each later row becomes an object. Cells are split on the delimiter you choose: comma, tab, semicolon, or pipe. A field wrapped in double quotes may contain the delimiter and a newline. A quote inside a quoted field is written as two quotes, which is the RFC 4180 rule. Numbers and booleans can be converted from text.

Worked example. The sheet name,age followed by Ada,36 and Bo,41 becomes [{\"name\":\"Ada\",\"age\":36},{\"name\":\"Bo\",\"age\":41}] when numeric conversion is on. The cell \"hello, world\" stays one field because of the quotes. A row with fewer cells than the header gets empty values for the missing keys.""",
        "use_cases": [
            "<strong>Two people:</strong> name,age / Ada,36 / Bo,41 becomes an array of two objects.",
            "<strong>A comma inside a name:</strong> Quote the cell so it stays one field."
        ],
        "extra_faqs": [
            {"q": "What if two columns share a header name?", "a": "Later cells overwrite earlier ones for that key. Rename the duplicate header before converting."},
            {"q": "Does a trailing comma add a column?", "a": "A trailing delimiter produces an extra empty field. Delete it if you did not mean an empty column."}
        ]
    },
    "json-to-csv": {
        "deep_dive": """The input must be an array of objects. The header row is the union of keys, so an object that omits a key still gets a column. Missing values are empty cells. Fields that contain a comma, a quote, or a newline are wrapped in double quotes, and quotes inside are doubled.

Worked example. [{\"name\":\"Ada\",\"city\":\"Paris\"},{\"name\":\"Bo\",\"note\":\"hello, world\"}] becomes a header name,city,note and a second data row whose note cell is quoted: \"hello, world\". Bo has no city, so that cell is empty. Ada has no note, so her note cell is empty.""",
        "use_cases": [
            "<strong>Two objects:</strong> Keys are merged into one header even when one object lacks city.",
            "<strong>A comma in a value:</strong> hello, world is quoted so a spreadsheet keeps it in one cell."
        ],
        "extra_faqs": [
            {"q": "Can I convert one object that is not in an array?", "a": "Wrap it in [ ]. The converter expects a list of rows."},
            {"q": "What happens to nested objects?", "a": "A nested object is not flattened into columns. Stringify it first, or it will appear as a single cell."}
        ]
    },
    "html-entity-encoder": {
        "deep_dive": """Encoding replaces characters that HTML treats as markup. < becomes &lt;, > becomes &gt;, & becomes &amp;, and quotes can become &quot;. Decoding reverses named and numeric entities through the browser parser. The result of encoding is safe to place in HTML text. It is not a complete policy for URLs or event-handler attributes.

Worked example. The text Tom & Jerry <script> encodes to Tom &amp; Jerry &lt;script&gt;. A browser shows that as the original words and does not start a script. The entity &amp;amp; decodes once to &amp; and a second decode would produce &. Numeric &#60; is the same character as &lt;.""",
        "use_cases": [
            "<strong>A label:</strong> The words Tom &amp; Jerry followed by a script tag are encoded so the brackets show as text.",
            "<strong>A double-encoded string:</strong> &amp;amp; decodes once to &amp;."
        ],
        "extra_faqs": [
            {"q": "Should I encode a whole HTML document?", "a": "No. Encoding the tags of a document you want the browser to render will show the tags as text. Encode untrusted text, not the template."},
            {"q": "Does this encode every non-ASCII letter?", "a": "Named encoding targets the markup characters. Letters such as é can stay as themselves in a UTF-8 page."}
        ]
    },
    "css-minifier": {
        "deep_dive": """The minifier removes CSS comments and collapses whitespace around punctuation. Selectors, properties, and values stay. It does not rename classes, merge duplicate rules, or drop vendor prefixes. A comment inside a string is not a comment.

Worked example. A rule written as .card { color: #111; /* title */ margin: 0; } minifies toward .card{color:#111;margin:0}. The declaration count does not change. An @media (min-width: 600px) block stays valid because the space inside the query is not required between every token, and the parentheses are preserved. Compression percent is (original bytes - minified bytes) / original bytes.""",
        "use_cases": [
            "<strong>A card rule:</strong> Comments and extra spaces drop. color and margin stay.",
            "<strong>A media query:</strong> The condition remains. The block is not deleted."
        ],
        "extra_faqs": [
            {"q": "Will this break a calc() expression?", "a": "Spaces required by CSS, such as the spaces around + and - inside calc(), are the ones to keep. The minifier collapses whitespace that the grammar does not need."},
            {"q": "Are source maps produced?", "a": "No. You get the minified text only."}
        ]
    },
    "js-minifier": {
        "deep_dive": """This compressor strips comments and extra blank space. It does not rename variables, inline functions, or rewrite syntax. That is why it is safer than a full bundler and also why the savings are smaller. A URL in a string that contains // is not a comment.

Worked example. The function function add(a, b) { return a + b; } // sum loses the comment and the extra spaces, and the name add is still add. If the minifier had shortened add to e, every caller would break. Strings and template literals keep their contents, including spaces you typed on purpose.""",
        "use_cases": [
            "<strong>A small function:</strong> The comment is removed and the name add stays add.",
            "<strong>A string with //:</strong> Those slashes are data, not a comment, and they remain."
        ],
        "extra_faqs": [
            {"q": "Can I use the output as a production bundle?", "a": "Only as a light pass. It will not tree-shake, mangle, or transpile. Use a bundler for that."},
            {"q": "Are regex literals treated as comments?", "a": "A regex such as /\\s+/ is syntax, not a comment. Comment removal targets // and /* */ outside strings."}
        ]
    },
    "sql-formatter": {
        "deep_dive": """The formatter uppercases recognized keywords and puts major clauses on their own lines. SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, and LIMIT are the usual breaks. It does not connect to a database and it does not check that tables exist. Identifiers you quoted stay as you wrote them.

Worked example. select id, name from users where active = 1 order by name becomes a SELECT list, a FROM line, a WHERE line, and an ORDER BY line, with the keywords in capitals. A string literal 'select' is not uppercased, because it is data. A missing comma is still a missing comma after formatting.""",
        "use_cases": [
            "<strong>A one-line query:</strong> SELECT, FROM, WHERE, and ORDER BY each land on their own line.",
            "<strong>A keyword inside a string:</strong> 'select' stays lowercase."
        ],
        "extra_faqs": [
            {"q": "Will this add missing commas or fix a bad join?", "a": "No. It only changes whitespace and keyword case."},
            {"q": "Which dialects are the keywords from?", "a": "The shared core used by PostgreSQL, MySQL, and SQLite. Vendor-specific functions are left as identifiers."}
        ]
    },
    "xml-to-json": {
        "deep_dive": """Each element becomes a key. Attributes are collected under @attributes so they are not confused with child elements. When the same child tag appears more than once, those children become an array. Text content is the value when an element has no child elements. The converter does not fetch remote DTDs.

Worked example. <user id=\"7\"><name>Ada</name></user> becomes {\"user\":{\"@attributes\":{\"id\":\"7\"},\"name\":\"Ada\"}}. Two <item>a</item><item>b</item> siblings become \"item\": [\"a\", \"b\"]. A single item stays a string or an object, not a one-element array, so check the shape before you iterate.""",
        "use_cases": [
            "<strong>An element with an id:</strong> id lands in @attributes. The name element stays a child.",
            "<strong>Repeated tags:</strong> Two item elements become a JSON array."
        ],
        "extra_faqs": [
            {"q": "Where do namespaces go?", "a": "The prefix stays on the key as written, such as soap:Body. xmlns declarations are attributes."},
            {"q": "Are CDATA sections kept as tags?", "a": "The text inside CDATA becomes a string value. The CDATA wrapper is not a JSON key."}
        ]
    },
    "yaml-to-json": {
        "deep_dive": """Indentation defines nesting. A key and value sit on one line, or the value is a nested block under a deeper indent. A line starting with - is a list item. true, false, null, and numbers are converted to JSON types. Quoted strings stay strings, so \"01\" does not become the number 1.

Worked example. A Kubernetes-style fragment replicas: 2 and image: nginx:1.25 becomes {\"replicas\": 2, \"image\": \"nginx:1.25\"}. A list ports:\\n  - 80\\n  - 443 becomes \"ports\": [80, 443]. Tabs are not valid YAML indentation. Use spaces.""",
        "use_cases": [
            "<strong>A deployment snippet:</strong> replicas: 2 becomes the number 2, and the image tag stays a string.",
            "<strong>A port list:</strong> Two dash lines become a JSON array of numbers."
        ],
        "extra_faqs": [
            {"q": "Does this convert JSON back to YAML?", "a": "No. The direction is YAML to JSON only."},
            {"q": "Why did 1.10 become 1.1?", "a": "An unquoted 1.10 is a number, and JSON will not keep the trailing zero. Quote it if the zeros matter."}
        ]
    },
    "base64-image-tool": {
        "deep_dive": """An image file is read in the browser and printed as a data URI: data:image/png;base64, followed by the standard Base64 of the bytes. The same string can be used as an img src or as a CSS url(). Decoding parses that URI and lets you download the bytes as a file again. Nothing is uploaded.

Worked example. A 1-pixel PNG is a short Base64 body beginning iVBORw0KGgo, which is the PNG signature in Base64. The URI is larger than the file by about 4/3, so a 30 KB icon becomes roughly 40 KB of text. That trade is reasonable for a tiny icon in an email. It is a poor trade for a photograph.""",
        "use_cases": [
            "<strong>A small icon:</strong> The data URI starts with data:image/png;base64, and can be an img src.",
            "<strong>A round trip:</strong> Decode that URI to download the same PNG bytes."
        ],
        "extra_faqs": [
            {"q": "Why does the text look longer than the file?", "a": "Base64 uses four characters for every three bytes, plus the data: prefix. Expect about a 33% increase."},
            {"q": "Which image types are accepted?", "a": "The file is encoded as the type the browser reports, commonly PNG, JPEG, WebP, or GIF."}
        ]
    },
    "http-status-codes": {
        "deep_dive": """The first digit is the class. 1xx means the server accepted the request and is still working. 2xx means success. 3xx means the client should look elsewhere. 4xx means the request is bad or not allowed. 5xx means the server failed. The page lists the standard codes and a short debugging note for each.

Worked example. 200 is OK, the usual success for GET. 201 is Created, the usual success for a POST that made a resource. 301 is a permanent redirect. 302 is temporary. 404 means this server has no resource at that path. 401 means you are not authenticated. 403 means you are authenticated and still not allowed. 500 is an unhandled server error. 502 and 504 point at a proxy that could not get a good response from upstream.""",
        "use_cases": [
            "<strong>A missing page:</strong> 404 is the code. 401 and 403 are different problems.",
            "<strong>A gateway:</strong> 502 and 504 blame the hop in front of the app, not the client's URL syntax."
        ],
        "spec_table": {
            "headers": ["Code", "Class", "Meaning"],
            "rows": [
                ["200", "Success", "OK"],
                ["201", "Success", "Created"],
                ["301", "Redirect", "Moved permanently"],
                ["304", "Redirect", "Not modified, use cache"],
                ["400", "Client", "Bad request"],
                ["401", "Client", "Not authenticated"],
                ["403", "Client", "Authenticated, not allowed"],
                ["404", "Client", "No resource at this path"],
                ["429", "Client", "Too many requests"],
                ["500", "Server", "Unhandled server error"],
                ["502", "Server", "Bad gateway"],
                ["504", "Server", "Gateway timeout"]
            ]
        },
        "extra_faqs": [
            {"q": "Is 200 a promise that the JSON is correct?", "a": "No. 200 means the HTTP transaction succeeded. The body can still contain an application error."},
            {"q": "What is 418?", "a": "418 is unused in real APIs. It was reserved as a joke in the teapot RFC. Do not build on it."}
        ]
    },
    "mime-types": {
        "deep_dive": """A MIME type is the Content-Type value, a type, a slash, and a subtype. Browsers use it to decide whether to show an image, run a script, or download a file. The file extension is only a hint. This page maps common extensions to the type you would send.

Worked example. index.html is text/html. styles.css is text/css. app.js is text/javascript. photo.jpg is image/jpeg, not image/jpg. data.json is application/json. font.woff2 is font/woff2. archive.zip is application/zip. A missing or wrong Content-Type is why a PDF sometimes downloads as text or an image opens as a download.""",
        "use_cases": [
            "<strong>A JPEG:</strong> The header value is image/jpeg.",
            "<strong>A stylesheet:</strong> The header value is text/css."
        ],
        "spec_table": {
            "headers": ["Extension", "Content-Type"],
            "rows": [
                [".html", "text/html"],
                [".css", "text/css"],
                [".js", "text/javascript"],
                [".json", "application/json"],
                [".png", "image/png"],
                [".jpg", "image/jpeg"],
                [".svg", "image/svg+xml"],
                [".woff2", "font/woff2"],
                [".pdf", "application/pdf"],
                [".zip", "application/zip"]
            ]
        },
        "extra_faqs": [
            {"q": "Is image/jpg a real type?", "a": "No. The registered subtype is jpeg. jpg is only a filename extension."},
            {"q": "Where does charset go?", "a": "As a parameter, for example text/html; charset=utf-8. The type and subtype stay text/html."}
        ]
    },
    "chmod-calculator": {
        "deep_dive": """Three digits record owner, group, and everyone else. Each digit is a sum: read is 4, write is 2, execute is 1. Symbolic form uses r, w, x, or a dash, in that order, three times.

Worked example. 755 is rwxr-xr-x. The owner digit 7 is 4+2+1. The group and other digits are 5, which is 4+1, so they can read and execute and cannot write. 644 is rw-r--r--, the usual file mode: owner can edit, others can only read. 600 is rw-------, owner only. 700 is rwx------, a private directory the owner can enter. The command line is chmod 644 filename.""",
        "use_cases": [
            "<strong>A public file:</strong> 644, shown as rw-r--r--.",
            "<strong>A script others may run:</strong> 755, shown as rwxr-xr-x."
        ],
        "spec_table": {
            "headers": ["Octal", "Symbolic", "Who can do what"],
            "rows": [
                ["644", "rw-r--r--", "Owner writes. Others read."],
                ["755", "rwxr-xr-x", "Owner writes. Others read and execute."],
                ["600", "rw-------", "Owner reads and writes. Nobody else."],
                ["700", "rwx------", "Owner only, including execute."],
                ["664", "rw-rw-r--", "Owner and group write. Others read."]
            ]
        },
        "extra_faqs": [
            {"q": "Why do directories need execute?", "a": "Execute on a directory means you may enter it and reach files inside. A directory that is 644 cannot be opened, even if the files inside are readable."},
            {"q": "What is the fourth digit?", "a": "A leading digit sets setuid (4), setgid (2), or the sticky bit (1). 1777 is the sticky /tmp mode. This page's three checkboxes are the ordinary 3-digit mode."}
        ]
    },
    "curl-converter": {
        "deep_dive": """A curl command from DevTools already contains the method, URL, headers, and body. This page reads those pieces and prints the same request as fetch or as Python requests. It does not send the request.

Worked example. curl -X POST https://example.com/api -H 'Content-Type: application/json' -d '{\"a\":1}' becomes a fetch call with method POST, that header, and body '{\"a\":1}', plus a requests.post call with the same header and a json or data argument. A -H 'Authorization: Bearer …' is copied through. Treat the output as a secret if the curl you pasted contained one.""",
        "use_cases": [
            "<strong>A POST from DevTools:</strong> method, URL, JSON header, and body land in fetch and in requests.",
            "<strong>A bearer token:</strong> The Authorization header is copied. Do not commit it."
        ],
        "extra_faqs": [
            {"q": "Where do I copy curl in Chrome?", "a": "DevTools, Network, right-click the request, Copy, Copy as cURL."},
            {"q": "Are cookies turned into a cookie jar?", "a": "A Cookie header is copied as a header. The page does not create a requests session or a browser cookie store."}
        ]
    },
    "markdown-table-generator": {
        "deep_dive": """GitHub-flavored Markdown tables need a header row, a separator row of dashes, and then the body. A colon on the separator sets alignment: :--- is left, :---: is center, ---: is right. This page edits the cells in a grid and prints that text.

Worked example. Headers Tool and Status, and one body row word counter and ready, become:

| Tool | Status |
| --- | --- |
| word counter | ready |

A pipe typed inside a cell is escaped so it does not start a new column. Extra spaces are padded so the raw Markdown lines up in a monospace editor. The alignment does not change the values.""",
        "use_cases": [
            "<strong>A two-column status:</strong> A header, a dash row, and one body row.",
            "<strong>A right-aligned number column:</strong> The separator uses ---: under that column."
        ],
        "extra_faqs": [
            {"q": "Do I need the outer pipes?", "a": "GitHub accepts a leading and trailing pipe. The generator includes them so the row is obvious."},
            {"q": "Can a cell contain a newline?", "a": "Markdown table cells are one line. Put a <br> in the cell only if the renderer you use allows inline HTML."}
        ]
    },
    "hash-generator": {
        "deep_dive": """A hash maps bytes to a fixed digest. SHA-256 is 32 bytes, printed as 64 hex characters. SHA-512 is 64 bytes, 128 hex characters. SHA-1 is 20 bytes, 40 hex characters. MD5 is 16 bytes, 32 hex characters. The same input always produces the same digest. A one-bit change produces a different digest. These are not encryption: you cannot turn the digest back into the text.

Worked example. The UTF-8 bytes of hello are SHA-256 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824. The empty string is e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855. hello with a trailing space is a different digest. SHA-1 and MD5 are shown for compatibility checks. Do not use them for new passwords or signatures.""",
        "use_cases": [
            "<strong>hello:</strong> SHA-256 starts 2cf24dba5fb0a30e.",
            "<strong>The empty string:</strong> SHA-256 starts e3b0c44298fc1c14."
        ],
        "extra_faqs": [
            {"q": "Does this hash a file?", "a": "It hashes the text you type, as UTF-8. It does not read a file from disk."},
            {"q": "Is a matching SHA-256 proof that the text is safe?", "a": "It only proves the bytes match a digest you already trust. It does not mean the content is correct or benign."}
        ]
    },
    "user-agent-parser": {
        "deep_dive": """A User-Agent header is a single line the browser sends with each request. This page tokenizes that line into a browser name, a version, an engine, an OS, and a device class. The same parser runs on your current navigator.userAgent or on a string you paste from a log.

Worked example. A current Chrome on Windows line contains Mozilla/5.0, Windows NT 10.0, AppleWebKit, Chrome/ and a version, and Safari/537.36. The Safari token is historical compatibility, not proof of Safari. The browser is Chrome because the Chrome token is present. A Googlebot line contains Googlebot and a browser compatibility section. Treat the result as a hint. Clients can send any string they want.""",
        "use_cases": [
            "<strong>Your browser:</strong> The page reads navigator.userAgent and labels the browser and OS.",
            "<strong>A log line:</strong> Paste a captured header to see the same fields without running that browser."
        ],
        "extra_faqs": [
            {"q": "Why do Chrome and Edge both mention Safari?", "a": "They kept the historical tokens so old server checks would not reject them. The parser uses the Chrome or Edg token to pick the real browser."},
            {"q": "Can I rely on this for access control?", "a": "No. The header is not authenticated. Use it for statistics and debugging."}
        ]
    },
    "keycode-inspector": {
        "deep_dive": """A keydown event has three different names for the key. event.key is the character or the named key, such as a or Enter. event.code is the physical position, such as KeyA or Enter, and it does not follow the typed character when the layout changes. event.keyCode is the legacy numeric code. Modifiers are booleans: shiftKey, ctrlKey, altKey, metaKey. metaKey is Command on a Mac.

Worked example. Pressing A with Shift on a US keyboard sets event.key to A, event.code to KeyA, and shiftKey to true. Pressing the same physical key on a different layout can change event.key and leave event.code at KeyA. keyCode 13 is Enter. New code should ignore keyCode and read event.key or event.code.""",
        "use_cases": [
            "<strong>Shift+A on a US keyboard:</strong> event.key is A, event.code is KeyA, shiftKey is true.",
            "<strong>Enter:</strong> event.key is Enter and the legacy keyCode is 13."
        ],
        "extra_faqs": [
            {"q": "Why is keyCode 0 or missing for some keys?", "a": "Newer keys were never given a keyCode. Read event.key and event.code."},
            {"q": "Does this page listen while I type in another window?", "a": "No. It only sees keys pressed while its capture area is focused."}
        ]
    },
    "http-header-parser": {
        "deep_dive": """Paste the raw header block, one field per line, in the form Name: value. The page splits on the first colon and lists the pairs. The audit then looks for a short set of response headers that change browser behavior: Strict-Transport-Security, Content-Security-Policy, X-Frame-Options or a CSP frame-ancestors, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.

Worked example. A block that contains Strict-Transport-Security: max-age=31536000; includeSubDomains and X-Content-Type-Options: nosniff records those as present. A block with no Content-Security-Policy is flagged missing. The audit does not request the URL. It only reads what you pasted. A request header block from curl -I is the response status line plus headers. The status line is not a Name: value pair.""",
        "use_cases": [
            "<strong>HSTS:</strong> max-age=31536000 is one year in seconds.",
            "<strong>A missing CSP:</strong> The audit marks Content-Security-Policy absent. It does not invent a policy."
        ],
        "extra_faqs": [
            {"q": "Does a high score mean the site is secure?", "a": "It means those headers were in the paste. A weak CSP still counts as present. Read the directive, not only the checkmark."},
            {"q": "How do I copy response headers?", "a": "curl -I https://example.com, or DevTools, Network, the document request, Response Headers. Copy the lines, not the HTML body."}
        ]
    },
}
