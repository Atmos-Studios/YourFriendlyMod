module.exports.convert = (ms) => {
    var milliseconds = parseInt((ms % 1000) / 100),
        seconds = Math.floor((ms / 1000) % 60),
        minutes = Math.floor((ms / (1000 * 60)) % 60),
        hours = Math.floor((ms / (1000 * 60 * 60)) % 24),
        days = Math.floor(ms / (1000 * 60 * 60 * 24));

    let time = '';

    if (days > 0) {
        time += days + ' days ';
    }

    if (hours > 0) {
        time += hours + ' hours ';
    }

    if (minutes > 0) {
        time += minutes + ' minutes';
    } else if (minutes <= 0 && hours <= 0 && days <= 0) {
        time += 'less than one minute';
    }

    return time;
};
