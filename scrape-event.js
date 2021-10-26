const scrapeEvent = () => {

    const title = document.querySelector('#page_title h1').innerText;
    const url = window.location.href;
    const description = document.getElementsByName('calCont')[0].innerText;

    const startString = document.querySelector('.calendarDate').innerText;
    const endTimeString = document.querySelector('.endDate .eventTime').innerText;

    const date = s => s.replaceAll(/[-:]/g, '');
    const start = date(startString);
    const end = date(startString.slice(0, 11) + endTimeString);

    const place = description.match(/[Pp]lats: (.*)\n/)?.[1];
    const zoomNumber = place.match(/[Zz]oom[^\d]*([\d ]*)/)?.[1].replaceAll(' ', '');
    const zoomUrl = `https://lu-se.zoom.us/j/${zoomNumber}`;

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


document.querySelector('.saveToCalUrl').onclick = e => {
    e.preventDefault();
    window.open(addToCalenderUrl(scrapeEvent()));
};
