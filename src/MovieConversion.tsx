import React, { useState } from 'react';
import './App.css';
import { Card, Image, Segment, Form, Button, Loader , Grid } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

function MovieCard(props: { movie: {id: string, title: string, image: string, description: string } }) {
  const { movie } = props;
  return (
    <Card key={movie.id}>
      <Image src={movie.image} alt={movie.title} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{movie.title}</Card.Header>
        <Card.Description>{movie.description}</Card.Description>
      </Card.Content>
    </Card>
  );
}

function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState<{ id: string, title: string, image: string, description: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const apiKey = 'k_ej4w28sa';
    const url = `https://imdb-api.com/fr/API/SearchTitle/${apiKey}/${searchTerm}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const movies = data.results;
        const maxMultipleOfThree = Math.floor(movies.length / 3) * 3;
        const topMovies = movies.slice(0, maxMultipleOfThree);
        setMovies(topMovies);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Films / Séries - LexiLab</title>
      </Helmet>
      <Segment>
        <Form>
          <Form.Field>
            <label>Saisir votre film :</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Field>
        </Form>

        <Segment basic textAlign="center">
          {isLoading ? (
            <Loader active inline="centered" />
          ) : (
            <Button primary onClick={handleSearch}>
              Extraire
            </Button>
          )}
        </Segment>
      </Segment>

      <Grid centered>
        <Grid.Column width={14}>
          <Card.Group itemsPerRow={3}>
            {movies.map(movie => (
              movie.image && //Vérifie si l'image existe
              <MovieCard key={movie.id} movie={{ id: movie.id, title: movie.title, image: movie.image, description: movie.description }} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </>
  );

}

export default SearchMovies;
