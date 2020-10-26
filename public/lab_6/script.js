function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

function getRandomIntInclusive(min, max) {
  min1 = Math.ceil(min);
  max1 = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      const countrieslist = range(10);
      const countriesliist = countries.map(() => {
        const num = getRandomIntInclusive(0, 243);
        return fromServer[num];
      });

      const revcountrieslist = countriesliist.sort((a, b) => sortFunction(b, a, 'name'));
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $("form").prepend(ol);

      revcountrieslist.forEach((el, i) => {
        res.json(countries);
        $(li).append('<input type = "checkbox" value = ${el.code} id = ${el.code} />');
        $(li).append('<label for = ${el.code}> ${el.name} </label>');
        $(li).append(country);
      });
    })
    .catch((err) => console.log(err));
});