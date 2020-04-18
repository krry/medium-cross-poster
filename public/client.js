const $$ = s => Array.from(document.querySelectorAll(s));
const $ = s => document.querySelector(s);
const feed = $('#feed-url');
const results = $('#results');

const title = $('#title');
const content = $('#content');
const url = $('#url');


$('body').onchange = e => {
  if (e.target.nodeName === 'INPUT' && e.target.name === 'post') {
    const item = JSON.parse(decodeURIComponent(e.target.parentNode.parentNode.dataset.item));

    console.log(item);

    title.value = item.title.trim();
    content.value = item.content.trim();
    url.value = item.link.trim();
  }
}

$('#feed-address form').onsubmit = e => {
  e.preventDefault();

  fetch('https://rss2json.glitch.me', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ url: feed.value }),
  }).then(res => res.json()).then(res => {
    render(res.item);
  }).catch(e => console.error(e));
}

$('#post form').onsubmit = e => {
  e.preventDefault();
  fetch('/draft', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      title: title.value,
      content: content.value,
      url: url.value,
      token: $('#token').value,
      pubId: $('#pubId').value,
    }),
  }).then(res => res.json()).then(res => {
    console.log(res);
  }).catch(e => console.error(e));

}

const render = items => {
  const html = items.slice(0, 10).map((item, i) => `<p data-id="${i}" data-item="${encodeURIComponent(JSON.stringify(item))}"><label><input name="post" type="radio"> ${item.title}</label></p>`).join('\n');
  results.innerHTML = html;
}
