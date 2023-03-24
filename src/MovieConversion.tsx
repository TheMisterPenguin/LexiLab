import { Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header, Dimmer, Loader } from 'semantic-ui-react'
import { Helmet } from "react-helmet";
import { useState } from "react"
import ExtractWordGrid from "./ExtractWordGrid";


type Movie = {
    id: number;
    age: number;
    title: string;
    image: string;
    idFile: string;
};

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

async function getDownload(id : string){
    const res = await fetch("http://localhost:3001/api/movieDownload", {
        headers: {"Content-Type": "text/plain",},
        body: id,
        method: "POST",
    })

    if(res.status !== 200) // si la requête n'a pas abouti
        return null;
    else
        return await res.json();
}

function MovieConversion() {
    const [fetching, setFetching] = useState(false);
    const [movieTitle, setMovieTitle] = useState<string>("");
    let [movies, setMovies] = useState<Movie[]>([]);
    const [idFile, setIdFile] = useState<string>("");
    const [subtitle, setSubtitle] = useState<{mot: string, niveau: string, type: string, traduction: string}[]>([]);


    //Récupérer le contenu de l'input
    const InputChange = (e : any) => {
        setMovieTitle(e.target.value );
    }
    
    const fetchMovieConversion = async () => {
        setFetching(true);
        movieTitle.replaceAll(" ", "+");

        getSearchedMovies(movieTitle).then((res) => {
            if(res === null)
                console.log("Erreur lors de la récupération des films");
            else {
                setMovies(res);
            }
            setFetching(false);
        });
    }

    //Récupérer l'id de film après un clique
    const handleMovie = (id: string) => {
        setIdFile(id);
        console.log(id);

        getDownload(idFile).then((res) => {
            if(res === null){
                console.log("Erreur lors de la récupération des sous titres");
            }
            else{
                setSubtitle(res);
                console.log(res);
            }

        });
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
                        <Input value={movieTitle} onChange={ InputChange } placeholder='Rechercher...' />
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
                            </Card>
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid>
            {subtitle.length === 0 ? <></> :
                <ExtractWordGrid props={subtitle as any} />
            }
        </>
    )
}

export default MovieConversion;