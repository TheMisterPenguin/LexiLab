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
    const [movieError, setMovieError] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [afficher, setAfficher] = useState<string | null>(null);
    const [image, setImage] = useState<string | ''>('');
    const [searchBar, setSearchBar] = useState<string | null>(null);


    //Récupérer le contenu de l'input
    const InputChange = (e : any) => {
        setMovieTitle(e.target.value );
        setMovieError('');
    }
    
    const fetchMovieConversion = async () => {
        setFetching(true);
        movieTitle.replaceAll(" ", "+");

        getSearchedMovies(movieTitle).then((res) => {
            if(res === null)
                setMovieError("Erreur lors de la récupération des films");
            else {
                setMovies(res);
            }
            setFetching(false);
        });
    }

    //Récupérer l'id de film après un clique
    const handleMovie = (id: string, image: string) => {
        setFetching(true);
        setSearchBar("non");

        setImage(image); //récupére image
        setIdFile(id); //récupére le id file
        console.log(id);

        setAfficher('ok');

        setSelectedId(id);
        setMovieError('');

        getDownload(idFile).then((res) => {
            if(res === null){
                setMovieError("Erreur lors de la récupération des sous titres");
                setAfficher(null);
                setSearchBar(null);

            }
            else{
                setSubtitle(res);
                console.log(res);
                if(res.length === 0){
                    setAfficher(null);
                }
            }
            setFetching(false);
        });
    }

    return (
        <>
            <Helmet>
                <title>Movie - LexiLab</title>
            </Helmet>

            {searchBar ===  null &&
                <Segment>
                    <Form>
                        <Form.Field>
                            <label>Saisir votre film :</label>
                            <Input value={movieTitle} onChange={ InputChange } placeholder='Rechercher...' />
                        </Form.Field>
                    </Form>

                    <Segment basic textAlign="center">
                        <Button loading={fetching} disabled={fetching} onClick={() => {fetchMovieConversion(); }} primary>Extraire</Button>
                    </Segment>
                </Segment>
            }

            {afficher === null ? 
                <Grid columns={4}>
                    {movies.map((movie) => (
                        <Grid.Column key={movie.id}>
                            <Segment basic textAlign="center">
                                <Card value = {idFile} onClick={() => handleMovie(movie.idFile, movie.image)}>
                                    {movie.idFile === selectedId && movieError !== '' && (
                                        <div className='ui pointing red basic label'>
                                            {movieError}
                                        </div>
                                    )}

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
                :
                <Segment>
                    {selectedId === null && subtitle.length === 0 ? <></> :
                        <Grid width={10} columns={2}>
                            <Grid.Column>
                            <Image  src={image}/>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment>
                                    <Form>
                                        <Form.Field>
                                            <label>Saisir votre film :</label>
                                            <Input value={movieTitle} onChange={ InputChange } placeholder='Rechercher...' />
                                        </Form.Field>
                                    </Form>

                                    <Segment basic textAlign="center">
                                        <Button loading={fetching} disabled={fetching} onClick={() => {fetchMovieConversion(); }} primary>Extraire</Button>
                                    </Segment>
                                </Segment>
                            </Grid.Column>
                            <ExtractWordGrid props={subtitle as any} />
                        </Grid>
                    }
                </Segment>
            }
        </>
    )
}

export default MovieConversion;