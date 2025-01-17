exports.escapeHTML = function (content) {
    const matchHtmlRegExp = /["'&<>]/;
    const str = content;
    const match = matchHtmlRegExp.exec(str);

    if (!match) {
        return str;
    }
    let escape;
    let html = '';
    let lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escape = '&quot;';
                break;
            case 38: // &
                escape = '&amp;';
                break;
            case 39: // '
                escape = '&#x27;'; // modified from escape-html; used to be '&#39'
                break;
            case 60: // <
                escape = '&lt;';
                break;
            case 62: // >
                escape = '&gt;';
                break;
            default:
                continue;
        }

        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
};

exports.escapeDoubleCurlyBrace = function(val) {
    return val.split('{{').join('<span v-pre>{{</span>').split('}}').join('<span v-pre>}}</span>');
};

