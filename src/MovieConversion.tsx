import React, { useState } from 'react';
import './App.css';
import { Card, Image, Segment, Form, Button } from 'semantic-ui-react';
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
    const [movies, setMovies] = useState<{title: string, image: string, description: string}[]>([]);
  
    const handleSearch = () => {
      const apiKey = 'k_ej4w28sa';
      const url = `https://imdb-api.com/fr/API/SearchTitle/${apiKey}/${searchTerm}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setMovies(data.results));
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
                    <Button primary onClick={handleSearch}>Extraire</Button>
                </Segment>

            </Segment>
            
            <Card.Group className="movie-list">
                {movies.slice(0, 4).map(movie => (
                <MovieCard movie={{ title: movie.title, image: movie.image, description: movie.description }} />
                ))}
            </Card.Group>
        </>
    )
}

export default SearchMovies;