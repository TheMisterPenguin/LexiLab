import React, { useState } from 'react';
import './App.css';
import { Card, Image, Segment, Form, Button, Loader } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

function MovieCard(props: { movie: { title: string, image: string, description: string } }) {
  const { movie } = props;
  return (
    <Card>
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
  const [movies, setMovies] = useState<{ title: string, image: string, description: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    const apiKey = 'k_ej4w28sa';
    const url = `https://imdb-api.com/fr/API/SearchTitle/${apiKey}/${searchTerm}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
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

      <Card.Group className="movie-list">
        {movies.map(movie => (
          <MovieCard movie={{ title: movie.title, image: movie.image, description: movie.description }} />
        ))}
      </Card.Group>
    </>
  );
}

export default SearchMovies;
