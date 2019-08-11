/*const literalsList: Array<String> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

enum tokenType {
    Literal,
    Identifier
}

interface Token {
    token: String;
    type: tokenType;
}*/

module.exports.parse = (time) => {
    // THIS IS THE ORIGINAL PARSER CODE BUT IT DOES NOT WORK SO SCROLL DOWN FOR WORKING PARSER THAT USES REGEX
    /*let tokens = [],
        token = '',
        _tokenType;

    const chars = time.split('');

    chars.forEach((char) => {
        if (token === '') {
            if (literalsList.includes(char)) {
                _tokenType = tokenType.Literal;
            } else {
                _tokenType = tokenType.Identifier;
            }
            token += char;
        } else {
            if (literalsList.includes(char)) {
                if (_tokenType === tokenType.Literal) {
                    token += char;
                    console.log(token);
                } else {
                    tokens.push(new Token(token, tokenType.Identifier));
                    token = char;
                    console.log(token);
                }
            } else {
                if (_tokenType === tokenType.Literal) {
                    tokens.push(new Token(token, tokenType.Literal));
                    token = char;
                    console.log(token);
                } else {
                    token += char;
                    console.log(token);
                }
            }
        }
    });

    console.log(tokens);

    let literals = 0;

    let timeParsed = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    const hourIdentifiers = ['hours', 'hour', 'hrs', 'hr', 'h'];
    const minuteIdentifiers = ['minutes', 'minute', 'mins', 'min', 'm'];
    const secondIdentifiers = ['seconds', 'second', 'secs', 'sec', 's'];

    tokens.forEach((tkn) => {
        if ((tkn.type = tokenType.Literal)) {
            const parsedLiteral = parseInt(tkn.token);

            console.log(tokens[literals + 1]);

            if (hourIdentifiers.includes(tokens[literals + 1].token)) {
                timeParsed.hours = parsedLiteral;
            }

            if (minuteIdentifiers.includes(tokens[literals + 1].token)) {
                timeParsed.minutes = parsedLiteral;
            }

            if (secondIdentifiers.includes(tokens[literals + 1].token)) {
                timeParsed.seconds = parsedLiteral;
            }

            literals++;
        }
    });*/

    let timeParsed = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    const yearREGEX = /[0-9]+( )?(years|year|yrs|yr|y)/g;
    const monthREGEX = /[0-9]+( )?(months|month|mth|mt)/g;
    const weekREGEX = /[0-9]+( )?(weeks|week|wks|wk|w)/g;
    const dayREGEX = /[0-9]+( )?(days|day|d)/g;
    const hourREGEX = /[0-9]+( )?(hours|hour|hrs|hr|h)/g;
    const minuteREGEX = /^[0-9]+( )?(minutes|minute|mins|min|m)$/g;
    const secondREGEX = /[0-9]+( )?(seconds|second|secs|sec|s)/g;

    let yearMatch = time.match(yearREGEX);
    let monthMatch = time.match(monthREGEX);
    let weekMatch = time.match(weekREGEX);
    let dayMatch = time.match(dayREGEX);
    let hourMatch = time.match(hourREGEX);
    let minuteMatch = time.match(minuteREGEX);
    let secondMatch = time.match(secondREGEX);

    yearMatch = yearMatch ? yearMatch : [];
    monthMatch = monthMatch ? monthMatch : [];
    weekMatch = weekMatch ? weekMatch : [];
    dayMatch = dayMatch ? dayMatch : [];
    hourMatch = hourMatch ? hourMatch : [];
    minuteMatch = minuteMatch ? minuteMatch : [];
    secondMatch = secondMatch ? secondMatch : [];

    if (hourMatch.length > 1 || minuteMatch.length > 1 || secondMatch.length > 1 || dayMatch.length > 1 || weekMatch.length > 1 || monthMatch.length > 1 || yearMatch.length > 1) {
        throw new Error('Invalid syntax');
    }

    const numREGEX = /[0-9]+/g;

    try {
        timeParsed.years = parseInt(yearMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.months = parseInt(monthMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.weeks = parseInt(weekMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.days = parseInt(dayMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.hours = parseInt(hourMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.minutes = parseInt(minuteMatch[0].match(numREGEX)[0]);
    } catch {}

    try {
        timeParsed.seconds = parseInt(secondMatch[0].match(numREGEX)[0]);
    } catch {}

    return timeParsed;
};
