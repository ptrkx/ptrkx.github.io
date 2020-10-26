// const { forEach } = require("cypress/types/lodash");

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
      let tempdouble = false;
      const countrieslist2 = countrieslist.map(() => {
        let num = getRandomIntInclusive(0, 243);
        countrieslist.forEach((element, i) => {
          if (element === num) {
            tempdouble = true;
          }
        });

        if (tempdouble === true) {
          num = getRandomIntInclusive(0, 243);
        }
        return fromServer[num];
      });

      const revcountrieslist = countrieslist2.sort((a, b) => sortFunction(b, a, 'name'));
      const odlist = document.createElement('ol');
      odlist.className = 'flex-inner';
      $('form').prepend(odlist);

      revcountrieslist.forEach((country, i) => {
        const country1 = document.createElement('li');
        $(country1).append(`<input type="checkbox" value=${country.code} id=${country.code} />`);
        $(country1).append(`<label for=${country.code}> ${country.name} </label>`);
        $(odlist).append(country1);
      });
    })
   // .catch((err) => console.log(err));
});