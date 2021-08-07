import express from 'express';

const app = express();
const PORT = process.argv[2];

// Set view engine
app.set('view engine', 'ejs');

app.get('/fruit', (request, response) => {
  // Obtain data to inject into EJS template
  const data = {
    fruit: {
      family: 'Musaceae',
      name: 'banana',
    },
  };
  // Return HTML to client, merging "index" template with supplied data.
  response.render('fruit', data.fruit);
});

app.get('/fruits/:name', (request, response) => {
  // Obtain data to inject into EJS template
  const data = {
    fruits: [
      {
        family: 'Musaceae',
        name: 'banana',
      },
      {
        family: 'Rosaceae',
        name: 'apple',
      },
      {
        family: 'Rosaceae',
        name: 'pear',
      },
      {
        family: 'Malvaceae',
        name: 'durian',
      },
      {
        family: 'Myrtaceae',
        name: 'guava',
      },
      {
        family: 'Rutaceae',
        name: 'lemon',
      },
    ],
  };
  const idx = data.fruits.findIndex(
    (fruit) => fruit.name.toLowerCase() === request.params.name,
  );

  if (idx > -1) {
    const fruit = data.fruits[idx];
    // Return HTML to client, merging "index" template with supplied data.
    response.render('fruit', fruit);
  } else {
    response.status(404).send('Sorry, fruit not found.');
  }
});

app.listen(PORT);
