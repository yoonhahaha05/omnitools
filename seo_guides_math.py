"""Worked guides for math and converter tools."""

MATH_GUIDES = {
    "discount-tax-calculator": {
        "deep_dive": """Discount comes off the original price first. Tax is applied to what remains, which is how most US sales-tax rules work. Savings = price × discount / 100. Subtotal = price − savings. Tax amount = subtotal × tax / 100. Total = subtotal + tax amount.

Worked example. A $120 item at 25% off and 8.5% tax. Savings are 120 × 0.25 = $30.00. Subtotal is $90.00. Tax is 90 × 0.085 = $7.65. The total is $97.65. Tax on the original $120 would have been $10.20, which is the wrong base once a discount exists.""",
        "use_cases": [
            "<strong>$120 at 25% off and 8.5% tax:</strong> You save $30.00 and pay $97.65.",
            "<strong>Tax only:</strong> Set the discount to 0. A $120 item at 8.5% tax totals $130.20."
        ],
        "extra_faqs": [
            {"q": "What if the tax is included in the shelf price?", "a": "This page adds tax on top of the discounted price. It does not back tax out of a tax-inclusive price."},
            {"q": "Can the discount be over 100%?", "a": "The discount input is capped at 100, so the subtotal cannot go below zero."}
        ]
    },
    "tip-splitter-calculator": {
        "deep_dive": """Tip = bill × percent / 100. Total = bill + tip. Each person's share is the total divided by the number of people. The page rounds money to cents at the end, so the per-person figures can be off by a cent from a hand split.

Worked example. A $86.40 bill at 18% is a tip of $15.55 and a total of $101.95. Split three ways, each person pays $33.98, and 3 × $33.98 = $101.94, one cent under the total because of rounding. At 20% the tip is $17.28 and the total is $103.68, which divides to $34.56 exactly.""",
        "use_cases": [
            "<strong>$86.40 at 18% for 3 people:</strong> Tip $15.55. Each share rounds to $33.98.",
            "<strong>The same bill at 20%:</strong> Tip $17.28. Each of 3 people pays $34.56."
        ],
        "spec_table": {
            "headers": ["Tip", "On $86.40", "Common use"],
            "rows": [
                ["15%", "$12.96", "Adequate service"],
                ["18%", "$15.55", "A usual sit-down tip"],
                ["20%", "$17.28", "A strong default in many US cities"],
                ["25%", "$21.60", "Excellent service or a bar tab"]
            ]
        },
        "extra_faqs": [
            {"q": "Is the tip calculated on the pre-tax bill?", "a": "It uses the bill amount you type. If that amount already includes tax, the tip includes tax too."},
            {"q": "Why is the split a cent short?", "a": "Each share is rounded to the nearest cent. Add the leftover cent to one person's share."}
        ]
    },
    "length-converter": {
        "deep_dive": """The page converts through exact international factors. One inch is 2.54 centimeters. One foot is 0.3048 meters. One yard is 0.9144 meters. One mile is 1,609.344 meters. One nautical mile is 1,852 meters.

Worked example. 5 feet 10 inches is 70 inches. 70 × 2.54 = 177.8 centimeters, or 1.778 meters. A marathon, 42.195 kilometers, is 42.195 × 0.621371192 = 26.2188 miles, the usual 26.2 mile figure. One meter is 3.280839895 feet.""",
        "use_cases": [
            "<strong>5 feet 10 inches:</strong> 70 inches, which is 177.8 cm.",
            "<strong>A 10 km race:</strong> 6.2137 miles."
        ],
        "spec_table": {
            "headers": ["From", "Exact factor", "To"],
            "rows": [
                ["1 inch", "2.54", "centimeters"],
                ["1 foot", "0.3048", "meters"],
                ["1 mile", "1.609344", "kilometers"],
                ["1 meter", "3.280839895", "feet"],
                ["1 nautical mile", "1.852", "kilometers"]
            ]
        },
        "extra_faqs": [
            {"q": "Is the inch definition exact?", "a": "Yes. Since 1959 the international inch has been exactly 2.54 centimeters."},
            {"q": "Why is a US survey foot different?", "a": "The old US survey foot was slightly longer. This page uses the international foot, 0.3048 meters exactly."}
        ]
    },
    "weight-converter": {
        "deep_dive": """The international avoirdupois pound is exactly 0.45359237 kilograms. One kilogram is about 2.2046226218 pounds. One ounce is 1/16 pound, exactly 28.349523125 grams. A metric ton is 1,000 kilograms.

Worked example. 70 kilograms is 154.32398353 pounds, which rounds to 154.32 lb on a bathroom scale that shows two decimals. 8 ounces is 226.796185 grams. A 5-pound bag is 2.26796185 kilograms. The page updates every unit from the one you edit, using these factors.""",
        "use_cases": [
            "<strong>70 kg:</strong> 154.32 pounds at two decimal places.",
            "<strong>8 ounces:</strong> 226.8 grams."
        ],
        "spec_table": {
            "headers": ["Unit", "In grams"],
            "rows": [
                ["1 milligram", "0.001"],
                ["1 gram", "1"],
                ["1 ounce", "28.349523125"],
                ["1 pound", "453.59237"],
                ["1 kilogram", "1000"],
                ["1 metric ton", "1,000,000"]
            ]
        },
        "extra_faqs": [
            {"q": "Is a pound of feathers the same as a pound of gold?", "a": "A grocery pound is the avoirdupois pound used here. Troy ounces, used for precious metals, are a different unit and are not on this page."},
            {"q": "Does the page convert mass or weight?", "a": "It converts the named units as masses. It does not apply local gravity."}
        ]
    },
    "temperature-converter": {
        "deep_dive": """Celsius and Kelvin share the same step size. Kelvin = Celsius + 273.15. Fahrenheit has a different step: F = C × 9/5 + 32, and C = (F − 32) × 5/9. The three boxes stay in sync. Editing one rewrites the other two.

Worked example. Water freezes at 0 °C, 32 °F, and 273.15 K. Water boils at 100 °C, 212 °F, and 373.15 K. Body temperature 37 °C is 98.6 °F and 310.15 K. −40 is the same number on Celsius and Fahrenheit, because −40 × 9/5 + 32 = −40.""",
        "use_cases": [
            "<strong>A fever:</strong> 37 °C is 98.6 °F.",
            "<strong>An oven at 180 °C:</strong> 356 °F."
        ],
        "spec_table": {
            "headers": ["Point", "Celsius", "Fahrenheit", "Kelvin"],
            "rows": [
                ["Equal point", "-40", "-40", "233.15"],
                ["Water freezes", "0", "32", "273.15"],
                ["Body temperature", "37", "98.6", "310.15"],
                ["Water boils", "100", "212", "373.15"]
            ]
        },
        "extra_faqs": [
            {"q": "Why is absolute zero −273.15 °C?", "a": "0 K is defined as absolute zero, and the kelvin step equals the Celsius step, so 0 K is −273.15 °C."},
            {"q": "Does the page convert Rankine?", "a": "No. Only Celsius, Fahrenheit, and Kelvin."}
        ]
    },
    "data-storage-converter": {
        "deep_dive": """Decimal units count thousands. 1 KB = 1,000 bytes, 1 MB = 1,000,000 bytes, 1 GB = 1,000,000,000 bytes, 1 TB = 10^12 bytes. Binary units count powers of 1,024. 1 KiB = 1,024 bytes, 1 MiB = 1,048,576 bytes, 1 GiB = 1,073,741,824 bytes. Drive makers use decimal. Windows file sizes use binary and label them GB.

Worked example. A drive sold as 1 TB holds 1,000,000,000,000 bytes. Divided by 1,073,741,824 that is 931.32 GiB, which is why Windows reports about 931 GB. A 500,000,000-byte file is 500 MB decimal and 476.84 MiB.""",
        "use_cases": [
            "<strong>A 1 TB drive:</strong> 931.32 GiB in Windows.",
            "<strong>A 500,000,000-byte file:</strong> 500 MB decimal, or 476.84 MiB."
        ],
        "spec_table": {
            "headers": ["Name", "Bytes", "Where you see it"],
            "rows": [
                ["1 KB", "1,000", "File sizes in SI / macOS"],
                ["1 KiB", "1,024", "Memory"],
                ["1 MB", "1,000,000", "Decimal megabyte"],
                ["1 MiB", "1,048,576", "Binary megabyte"],
                ["1 GB", "1,000,000,000", "Drive labels"],
                ["1 GiB", "1,073,741,824", "Windows 'GB'"],
                ["1 TB", "1,000,000,000,000", "Drive labels"],
                ["1 TiB", "1,099,511,627,776", "Binary terabyte"]
            ]
        },
        "extra_faqs": [
            {"q": "Is a kilobyte 1,024 bytes?", "a": "In the binary naming it is a kibibyte, 1,024 bytes. A kilobyte in the decimal system used on drive labels is 1,000 bytes. This page shows both."},
            {"q": "Why not 1,024 for drive capacity?", "a": "Manufacturers use powers of 10. The 931 GB figure is the same byte count written in powers of 1,024."}
        ]
    },
    "speed-converter": {
        "deep_dive": """Every value is converted through meters per second. 1 km/h = 1/3.6 m/s. 1 mph = 0.44704 m/s. 1 knot = 0.514444 m/s. 1 ft/s = 0.3048 m/s. The page does not convert Mach, because the speed of sound depends on temperature and altitude.

Worked example. 60 mph is 60 × 0.44704 × 3.6 = 96.56064 km/h. 100 km/h is 27.7778 m/s and 62.137 mph. One knot is 0.514444 / 0.44704 = 1.15078 mph. A 6-minute kilometer is 10 km/h, which is 6.2137 mph.""",
        "use_cases": [
            "<strong>A 60 mph road:</strong> 96.56 km/h.",
            "<strong>100 km/h:</strong> 62.14 mph."
        ],
        "spec_table": {
            "headers": ["Speed", "m/s", "km/h", "mph"],
            "rows": [
                ["1 m/s", "1", "3.6", "2.2369"],
                ["100 km/h", "27.7778", "100", "62.137"],
                ["60 mph", "26.8224", "96.561", "60"],
                ["1 knot", "0.514444", "1.852", "1.1508"]
            ]
        },
        "extra_faqs": [
            {"q": "Is the knot factor exact?", "a": "The international knot is exactly 1.852 km/h. The page uses 0.514444 m/s, which is that value rounded to six decimals."},
            {"q": "Where is Mach?", "a": "It is not in the conversion table. Mach 1 is about 343 m/s only at 20 °C at sea level, so a single factor would be wrong at altitude."}
        ]
    },
    "timezone-converter": {
        "deep_dive": """The page takes one civil date and time and formats it in eight zones with the browser Intl API: UTC, New York, Los Angeles, London, Paris, Tokyo, Sydney, and Kolkata. Daylight-saving rules come from the time-zone database in the browser, not from a fixed offset written on this page.

Worked example. 2026-01-15 12:00 in New York is 17:00 UTC, 09:00 in Los Angeles, 22:00 in Paris, and 02:00 on 16 January in Tokyo. In January, New York is UTC−5 and Los Angeles is UTC−8. In July those become UTC−4 and UTC−7. London in July is UTC+1, not UTC+0. The same clock time typed in July will not match the January offsets.""",
        "use_cases": [
            "<strong>Noon in New York on 15 January:</strong> 17:00 UTC, 09:00 in Los Angeles, 02:00 next day in Tokyo.",
            "<strong>A July meeting:</strong> New York is four hours behind UTC, not five. Recheck summer dates."
        ],
        "extra_faqs": [
            {"q": "Which zone is the input in?", "a": "The datetime-local value is read as a time in the computer's own zone, then shown in the eight cities."},
            {"q": "Does Kolkata observe daylight saving?", "a": "No. Asia/Kolkata stays at UTC+5:30 all year."}
        ]
    },
    "human-date-to-unix": {
        "deep_dive": """Unix time is seconds since 1970-01-01 00:00:00 UTC, ignoring leap seconds. A 10-digit number is seconds. A 13-digit number is milliseconds, which is what Date.now() returns in JavaScript. Multiplying seconds by 1,000 switches between them.

Worked example. 2024-01-01 00:00:00 UTC is 1704067200 seconds and 1704067200000 milliseconds. 2000-01-01 00:00:00 UTC is 946684800. A timestamp of 0 is the start of 1970 UTC. Times before that are negative. The picker on this page builds those numbers from the date and time you select.""",
        "use_cases": [
            "<strong>New Year 2024 UTC:</strong> 1704067200 seconds.",
            "<strong>JavaScript:</strong> The same instant in milliseconds is 1704067200000."
        ],
        "extra_faqs": [
            {"q": "Why is my local midnight a different number?", "a": "Unix time is UTC. Midnight in New York in January is 05:00 UTC, so the number is five hours later than UTC midnight."},
            {"q": "Do leap seconds appear?", "a": "No. Unix time repeats or skips so that each day is 86,400 seconds. The converter follows that convention."}
        ]
    },
    "age-calculator": {
        "deep_dive": """Age is the calendar difference from the birth date to today: full years, then the remaining months, then the remaining days. Total days alive is the count of midnights between the two dates. Hours are that count times 24. The heartbeat line uses 75 beats per minute, so heartbeats = days × 24 × 60 × 75.

Worked example. Someone born on 2000-01-01, measured on 2026-01-01, is 26 years, 0 months, and 0 days. The span is 9,497 days if you count the 26 years including the seven leap days from 2000 through 2024 (2000, 2004, 2008, 2012, 2016, 2020, 2024). 26 × 365 = 9,490, plus 7 is 9,497. Hours are 227,928. The heartbeat estimate is 9,497 × 24 × 60 × 75 = 1,025,676,000 beats, about 1.03 billion. Next birthday is the following 1 January.""",
        "use_cases": [
            "<strong>Born 1 January 2000, as of 1 January 2026:</strong> 26 years and 9,497 days.",
            "<strong>Heartbeats:</strong> Those 9,497 days at 75 bpm estimate about 1.03 billion beats."
        ],
        "extra_faqs": [
            {"q": "Does the year count on the birthday itself?", "a": "On the anniversary the year count increases and the remaining months and days are zero."},
            {"q": "Is 75 bpm a medical measurement?", "a": "No. It is a fixed average so the lifetime figure is comparable. A resting rate of 60 bpm would be 20% lower."}
        ]
    },
    "date-difference-calculator": {
        "deep_dive": """Calendar days are the number of midnights from the start date to the end date. Business days count Monday through Friday only. Saturday and Sunday are skipped. Public holidays are not skipped, because the page does not have a holiday calendar.

Worked example. Friday 2 January 2026 through Friday 16 January 2026 is 14 calendar days. The page counts weekdays on the start date and on every following day except the end date. Those dates are 2, 5, 6, 7, 8, 9, 12, 13, 14, and 15 January, which is 10 business days. The 16th is not included. The two weekends inside the span are four days. Two dates that are the same day are 0.""",
        "use_cases": [
            "<strong>2 January through 16 January 2026:</strong> 14 calendar days and 10 business days. The end date is not counted.",
            "<strong>The same start and end:</strong> The difference is 0 days."
        ],
        "extra_faqs": [
            {"q": "Are holidays removed from business days?", "a": "No. Only Saturday and Sunday are excluded."},
            {"q": "What if the end date is earlier?", "a": "Swap the dates. A duration is the absolute span, and the page expects the start first."}
        ]
    },
    "ppi-calculator": {
        "deep_dive": """PPI is the diagonal pixel count divided by the diagonal size in inches. Diagonal pixels = sqrt(width² + height²). A 1920×1080 screen has a diagonal of sqrt(1920² + 1080²) = 2202.9 pixels. Dot pitch in millimeters is 25.4 / PPI.

Worked example. A 24-inch 1920×1080 monitor is 2202.9 / 24 = 91.8 PPI. A 6.1-inch 1170×2532 phone is sqrt(1170² + 2532²) = 2789.1 pixels, then 2789.1 / 6.1 = 457 PPI. Megapixels are width × height / 1,000,000, so 1920×1080 is 2.07 MP. Apple's loose 'Retina' line was about 220 PPI for a laptop and about 300 PPI for a phone, because the viewing distance is different.""",
        "use_cases": [
            "<strong>A 24-inch 1080p monitor:</strong> 91.8 PPI.",
            "<strong>A 6.1-inch 1170×2532 phone:</strong> about 457 PPI."
        ],
        "extra_faqs": [
            {"q": "Is PPI the same as DPI?", "a": "On a screen, people use them for the same idea: pixels along one inch. Print DPI is dots of ink, which this page does not measure."},
            {"q": "Does window size change the result?", "a": "No. Enter the panel's pixel width, pixel height, and diagonal. The browser window is a different measurement."}
        ]
    },
    "gpa-calculator": {
        "deep_dive": """Unweighted GPA on a 4.0 scale assigns A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0. Plus and minus steps are usually 0.3, so A− is 3.7 and B+ is 3.3. An A+ stays 4.0 on a scale that caps at 4.0. The average is the sum of (grade points × credits) divided by total credits. A course with more credits moves the average more.

Worked example. English, 3 credits, A (4.0) contributes 12 points. Calculus, 4 credits, B+ (3.3) contributes 13.2 points. History, 3 credits, A− (3.7) contributes 11.1 points. Total points 36.3 over 10 credits is a GPA of 3.63. Dropping the B+ and keeping the two A-range courses would raise it, because the 4-credit course was the low grade.""",
        "use_cases": [
            "<strong>3 credits of A, 4 of B+, 3 of A−:</strong> 36.3 points over 10 credits = 3.63.",
            "<strong>A single failed 4-credit course:</strong> It adds 0 points and still adds 4 to the credit total, so it pulls harder than a failed 1-credit course."
        ],
        "spec_table": {
            "headers": ["Letter", "Points on a 4.0 cap"],
            "rows": [
                ["A+", "4.0"],
                ["A", "4.0"],
                ["A-", "3.7"],
                ["B+", "3.3"],
                ["B", "3.0"],
                ["B-", "2.7"],
                ["C", "2.0"],
                ["D", "1.0"],
                ["F", "0.0"]
            ]
        },
        "extra_faqs": [
            {"q": "How is a weighted GPA different?", "a": "A weighted scale gives extra points for honors or AP, so an A can be 5.0. This page uses the 4.0 letter values above."},
            {"q": "Do pass/fail courses belong here?", "a": "Only if your school assigns points. A pass that is excluded from GPA should be left out of the list."}
        ]
    },
    "roman-numeral-converter": {
        "deep_dive": """Roman numerals add symbols from left to right, except when a smaller symbol sits before a larger one, in which case you subtract. I is 1, V is 5, X is 10, L is 50, C is 100, D is 500, M is 1000. The subtractive pairs used here are IV, IX, XL, XC, CD, and CM. Standard form does not repeat a symbol four times, and it does not go past 3,999 (MMMCMXCIX) without a bar over the numeral.

Worked example. 2026 is MMXXVI: 1000 + 1000 + 10 + 10 + 5 + 1. 1994 is MCMXCIV: 1000 + (1000−100) + (100−10) + (5−1). 4 is IV, not IIII. 9 is IX. Decoding MCMXCIV walks the same pairs and returns 1994.""",
        "use_cases": [
            "<strong>2026:</strong> MMXXVI.",
            "<strong>1994:</strong> MCMXCIV."
        ],
        "spec_table": {
            "headers": ["Value", "Numeral", "Value", "Numeral"],
            "rows": [
                ["1", "I", "10", "X"],
                ["4", "IV", "40", "XL"],
                ["5", "V", "50", "L"],
                ["9", "IX", "90", "XC"],
                ["100", "C", "400", "CD"],
                ["500", "D", "900", "CM"],
                ["1000", "M", "3999", "MMMCMXCIX"]
            ]
        },
        "extra_faqs": [
            {"q": "Why does 3999 stop the converter?", "a": "4,000 in classical notation needs a bar over M, which is not the ASCII letters this page reads and writes."},
            {"q": "Is IIII ever correct?", "a": "Clock faces often use IIII. Standard additive notation uses IV, and that is what this page writes."}
        ]
    },
    "random-number-generator": {
        "deep_dive": """Numbers come from crypto.getRandomValues, not Math.random. The page maps those bytes into the inclusive integer range you set. Asking for several numbers can keep duplicates or reject them. Sorting is optional and happens after generation.

Worked example. A range of 1 to 6 is one fair die: each face has probability 1/6. Five draws with duplicates allowed can return 3, 3, 6, 1, 3. The same request with unique values on cannot repeat 3, and it can return at most 6 numbers. A range of 10 to 10 always returns 10. Inclusive means both ends can appear, so 1 to 10 really has 10 possible results, not 9.""",
        "use_cases": [
            "<strong>One die:</strong> Integers from 1 through 6, each face equally likely.",
            "<strong>A lottery draw:</strong> Turn unique on so the same number is not drawn twice."
        ],
        "extra_faqs": [
            {"q": "Can the result be predicted from the clock?", "a": "No. crypto.getRandomValues uses the browser's cryptographic generator, not the current time."},
            {"q": "What is the largest list?", "a": "The control caps the count at 100 numbers per click."}
        ]
    },
    "dice-coin-roller": {
        "deep_dive": """A coin flip is two outcomes, heads or tails, each 1/2. A die with F faces returns an integer from 1 through F. The set here is d4, d6, d8, d10, d12, d20, and d100. A natural 20 is the face 20 on a d20. A natural 1 is the face 1. The page reports the face. It does not add ability modifiers from a game.

Worked example. One d20 has a 5% chance of a natural 20 and a 5% chance of a natural 1. Two coins are not this control: each click flips one coin. A d100 is 1 through 100, not two d10s glued together, though the probabilities match a percentile roll.""",
        "use_cases": [
            "<strong>A d20:</strong> Each face from 1 to 20 has probability 1/20.",
            "<strong>A coin:</strong> One flip, heads or tails, probability 1/2 each."
        ],
        "extra_faqs": [
            {"q": "Does the roller add a modifier?", "a": "No. If your game needs 1d20+5, add 5 to the face yourself."},
            {"q": "Are the rolls stored?", "a": "Only on screen until you roll again or leave the page."}
        ]
    },
    "running-pace-calculator": {
        "deep_dive": """Pace is finish time divided by distance. The presets are 5 km, 10 km, a half marathon at 21.0975 km, and a marathon at 42.195 km. A mile is 1.609344 km, so a per-mile pace is slower than the per-kilometer pace for the same finish.

Worked example. A 25:00 5K is 1,500 seconds over 5 km, which is 300 seconds per km, or 5:00 per km. In miles that distance is 3.1069 miles, so the pace is 1,500 / 3.1069 = 482.8 seconds per mile, or 8:03 per mile. A 4:00:00 marathon is 14,400 seconds over 42.195 km, which is 5:41 per km and about 9:09 per mile.""",
        "use_cases": [
            "<strong>A 25:00 5K:</strong> 5:00 per km, or 8:03 per mile.",
            "<strong>A 4:00 marathon:</strong> 5:41 per km."
        ],
        "spec_table": {
            "headers": ["Race", "Distance"],
            "rows": [
                ["5K", "5 km, 3.107 mi"],
                ["10K", "10 km, 6.214 mi"],
                ["Half marathon", "21.0975 km, 13.109 mi"],
                ["Marathon", "42.195 km, 26.219 mi"]
            ]
        },
        "extra_faqs": [
            {"q": "Why is the half marathon 21.0975 and not 21.1?", "a": "It is half of 42.195 km. Rounding to 21.1 changes the pace by a fraction of a second."},
            {"q": "Does this include hills or stops?", "a": "No. It is time divided by distance. A hilly course needs the same average pace to hit the same finish time."}
        ]
    },
    "fuel-cost-calculator": {
        "deep_dive": """Gallons used = distance in miles / miles per gallon. Cost = gallons × price per gallon. A round trip doubles the distance before that division. Splitting by passengers divides the cost, not the gallons.

Worked example. 360 miles in a car that gets 30 mpg uses 12 gallons. At $3.49 a gallon the fuel costs $41.88. A round trip is 720 miles, 24 gallons, and $83.76. Three passengers sharing the one-way cost pay $13.96 each. The page uses US gallons and miles. A liter-based car needs the consumption converted first: 30 mpg is about 7.84 L/100 km.""",
        "use_cases": [
            "<strong>360 miles at 30 mpg and $3.49:</strong> 12 gallons, $41.88.",
            "<strong>The same trip out and back:</strong> 24 gallons, $83.76."
        ],
        "extra_faqs": [
            {"q": "Does this include food, tolls, or the return trip?", "a": "It includes fuel only. Turn on the round-trip control to double the distance."},
            {"q": "What is 30 mpg in liters per 100 km?", "a": "About 7.84 L/100 km. The calculator itself takes miles, mpg, and a price per gallon."}
        ]
    },
    "base-converter": {
        "deep_dive": """The same integer is shown in base 2, 8, 10, and 16. Hex digits above 9 are A through F. Editing any box rewrites the others. The page is for whole numbers, not fractions.

Worked example. Decimal 255 is binary 11111111, octal 377, and hex FF. Decimal 10 is binary 1010, octal 12, and hex A. A chmod mode such as 755 octal is decimal 493 and hex 0x1ED, but permission digits are easier to read in octal because each digit is exactly three bits. Leading zeros do not change the value: hex 00FF is still 255.""",
        "use_cases": [
            "<strong>255:</strong> Binary 11111111, octal 377, hex FF.",
            "<strong>10:</strong> Binary 1010, octal 12, hex A."
        ],
        "spec_table": {
            "headers": ["Decimal", "Binary", "Octal", "Hex"],
            "rows": [
                ["8", "1000", "10", "8"],
                ["10", "1010", "12", "A"],
                ["16", "10000", "20", "10"],
                ["255", "11111111", "377", "FF"]
            ]
        },
        "extra_faqs": [
            {"q": "Why does octal stop at 7?", "a": "A base-8 digit only has symbols 0 through 7. The digit 8 is not a legal octal character."},
            {"q": "Can I convert a negative number?", "a": "Enter a non-negative integer. Two's-complement bit patterns depend on a width this page does not ask for."}
        ]
    },
    "matrix-determinant-calculator": {
        "deep_dive": """The determinant is a single number computed from a square matrix. For a 2×2 matrix [[a, b], [c, d]] it is ad − bc. For a 3×3 matrix it is a(ei − fh) − b(di − fg) + c(dh − eg), using the usual layout [[a, b, c], [d, e, f], [g, h, i]]. A determinant of 0 means the matrix is singular and has no inverse.

Worked example. [[4, 7], [2, 6]] has determinant 4×6 − 7×2 = 24 − 14 = 10. [[1, 2], [2, 4]] has determinant 4 − 4 = 0, so those rows are multiples and the matrix cannot be inverted. The 3×3 identity has determinant 1.""",
        "use_cases": [
            "<strong>[[4, 7], [2, 6]]:</strong> Determinant 10.",
            "<strong>[[1, 2], [2, 4]]:</strong> Determinant 0. No inverse."
        ],
        "extra_faqs": [
            {"q": "What does a negative determinant mean?", "a": "The linear map flips orientation. The matrix can still be inverted. Only zero means it cannot."},
            {"q": "Does row order matter?", "a": "Swapping two rows multiplies the determinant by −1. The page uses the numbers in the cells as you typed them."}
        ]
    },
}
