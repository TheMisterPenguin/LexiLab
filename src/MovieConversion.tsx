import { Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header, Dimmer, Loader } from 'semantic-ui-react'
import { Helmet } from "react-helmet";
import { useState } from "react"
import ExtractWordGrid from "./ExtractWordGrid";

// type Movie
type Movie = {
    id: number;
    age: number;
    title: string;
    image: string;
    idFile: string;
};

//Récupérer les films qui correspondent à la recherche
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

//Récupérer les sous-titres du film sélectionné
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
    const [fetching, setFetching] = useState(false); // true si on est en train de récupérer les mots de la vidéo
    const [movieTitle, setMovieTitle] = useState<string>(""); // titre du film
    let [movies, setMovies] = useState<Movie[]>([]);  // les films qui correspondent à la recherche
    const [subtitle, setSubtitle] = useState<{mot: string, niveau: string, type: string, traduction: string}[]>([]); // sous-titres du film sélectionné
    const [movieError, setMovieError] = useState(''); 
    const [selectedId, setSelectedId] = useState<string | null>(null); // l'id du film sélectionné
    const [afficher, setAfficher] = useState<string | null>(null); // afficher ou non le bouton de téléchargement
    const [image, setImage] = useState<string | ''>(''); // image du film sélectionné
    const [searchBar, setSearchBar] = useState<string | null>(null); // afficher ou non la barre de recherche


    //Récupérer le contenu de l'input
    const InputChange = (e : any) => {
        setMovieTitle(e.target.value );
        setMovieError('');
    }
    
    //Récupérer les films qui correspondent à la recherche
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
        setImage(image); //récupére l'image
        setAfficher('ok');
        setSelectedId(id);
        setMovieError('');

        // Récupérer les sous-titres du film sélectionné
        getDownload(id).then((res) => {
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
                                <Card value = {movie.idFile} onClick={() => handleMovie(movie.idFile, movie.image)}>
                                    {movie.idFile === selectedId && movieError !== '' && (
                                        <div className='ui pointing red basic label'>
                                            {movieError}
                                        </div>
                                    )}

                                    <Image src={movie.image} alt={movie.title} />

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
                <>
                    <Segment>
                        {selectedId === null ? <></> :
                            <Grid columns={2}>
                                <Grid.Row verticalAlign='middle'>
                                    <Grid.Column width={6}>
                                        <Image  src={image} alt={movieTitle}/>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Form>
                                            <Form.Field>
                                                <label>Saisir votre film :</label>
                                                <Input value={movieTitle} onChange={ InputChange } placeholder='Rechercher...' />
                                            </Form.Field>
                                            <Segment basic textAlign="center">
                                                <Button loading={fetching} disabled={fetching} onClick={() => {fetchMovieConversion(); }} primary>Extraire</Button>
                                            </Segment>
                                        </Form>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        }
                    </Segment>
                    {subtitle.length === 0 ? <></> :
                        <ExtractWordGrid props={subtitle as any} />
                    }
                </>
            }
        </>
    )
}

export default MovieConversion;