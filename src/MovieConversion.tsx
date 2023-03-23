import { Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header, Dimmer, Loader } from 'semantic-ui-react'
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react"

type Movie = {
    id: number;
    rating: number;
    age: number;
    title: string;
    image: string;
    idFile: number;
};

//Fonction qui vérifie si l'image est exploitable
async function imageValide(url: string){
    try {
        fetch(url, { method: 'HEAD' }).then((response) => {
            return response.ok;
        });
    }
    catch (error) {
        return false;
    }
}

async function getSearchedMovies(movieTitle : string) {
    const res = await fetch("http://localhost:3001/api/getSearchedMovies", {
        headers: {"Content-Type": "text/plain",},
        body: movieTitle,
        method: "POST",
    })
    if(res.status !== 200) // si la requête n'a pas abouti
        return null;
    else
        return await res.json();
}

function getSortedMovies(movies : Movie[]) {
    console.log(movies);
    //Supprime les objets qui ont les mêmes titres
    var uniqueMovies = movies.filter(
        (item, index, array) => array.findIndex((obj) => obj.title === item.title) === index );
    
    console.log(movies);
    //Vérifie si l'image est exploitable(différents de 404), et ajouter le film dans le tableau
    uniqueMovies.filter((movie) => {
        return imageValide(movie.image);
    });

    console.log(uniqueMovies);
    return uniqueMovies;
}

function MovieConversion() {
    const [fetching, setFetching] = useState(false);
    const [movieTitle, setMovieTitle] = useState<string>("");
    let [movies, setMovies] = useState<Movie[]>([]);
    const [idFile, setIdFile] = useState<number>(0);

    //Récupérer le contenu de l'input
    const InputChange = (e : any) => {
        setMovieTitle(e.target.value );
    }

    const handleMovie = (id: number) => {
        setIdFile(id);
    }
    
    const fetchMovieConversion = async () => {
        setFetching(true);
        movieTitle.replaceAll(" ", "+");

        getSearchedMovies(movieTitle).then((res) => {
            if(res === null)
                console.log("Erreur lors de la récupération des films");
            else {
                setMovies(res);
                console.log(movies);
            }
        
        });
        setFetching(false);
    }
    

    return (
        <>
            <Helmet>
                <title>Movie - LexiLab</title>
            </Helmet>

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre film :</label>
                        <Input value={movieTitle} onChange={InputChange} placeholder='Rechercher...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    {fetching ? (
                        <Loader active inline="centered" />
                    ) : (
                        <Button primary onClick={() => { fetchMovieConversion(); }}>Extraire</Button>
                    )}
                </Segment>
            </Segment>

            <Grid columns={3}>
                {movies.map((movie) => (
                    <Grid.Column key={movie.id}>
                        <Segment basic textAlign="center">
                            <Card value = {idFile} onClick={() => handleMovie(movie.idFile)}>
                                <Image src={movie.image} />
                                <Card.Content>
                                    <Card.Header>{movie.title}</Card.Header>
                                    <Card.Meta>
                                        <span className="date">{movie.age}</span>
                                    </Card.Meta>
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon name="edit" />{movie.rating}
                                </Card.Content>
                            </Card>
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid>
        </>
    )
}

export default MovieConversion;