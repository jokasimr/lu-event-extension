const scrapeEvent = () => {

    const title = document.querySelector('.event-title__heading > h1').innerText;
    const url = window.location.href;
    const description = document.querySelector('.event-text').innerText;

    const info = document.querySelector('#lth_lucalInfoBox').innerText;

    const startString = document.querySelector('.calendarDate').innerText;
    const endTimeString = document.querySelector('.endDate .eventTime').innerText;

    const date = s => s.replaceAll(/[-:]/g, '');
    const start = date(startString);
    const end = date(startString.slice(0, 11) + endTimeString);

    const place = info.match(/[Pp]lats[^\n]*\n*(.*)\n/)?.[1];
    const zoomNumber = info.match(/[Zz]oom[^\d]*([\d ]*)/)?.[1].replaceAll(' ', '');
    const zoomPassword = info.match(/pwd=([0-9A-Za-z]*)/)?.[1].replaceAll(' ', '');
    const zoomUrl = `https://lu-se.zoom.us/j/${zoomNumber}` + (zoomPassword ? `?pwd=${zoomPassword}` : '');

    const details =
        (zoomNumber ? `<a href="${zoomUrl}">${zoomUrl}</a>\n` : '') +
        `<a href="${url}">${url}</a>`+
        `\n\n` +
        `${description}`;

    return {title, place, details, start, end};
};


const addToCalenderUrl = ({title, place, details, start, end}) => {
    return encodeURI(
        `https://www.google.com/calendar/render?` +
        `action=TEMPLATE&text=${title}&` +
        `details=${details}&location=${place}&`+
        `dates=${start}/${end}&ctz=Stockholm/Europe`
    );
};


document.body.onload = (event) => {
    const button = document.createElement('button');
    button.innerText = 'Add to Google Calendar';
    button.onclick = e => {
        e.preventDefault();
        window.open(addToCalenderUrl(scrapeEvent()));
    };
    document.querySelector('#lth_lucalInfoBox').appendChild(button);
};
