import {Segment, Grid, Form, Input, Button, Card, Icon, Image, Container, Header,  Dimmer, Loader} from 'semantic-ui-react'
import {Helmet} from "react-helmet";
import {useEffect, useState} from "react"

type Movie = {
    id: number;
    rating: number;
    language: string;
    age: number;
    title: string;
    image: string;
    idFile: string;
};
  
type MovieData = {
    inputMovie: string;
    movieResults: Movie[];
};

//Fonction qui vérifie si l'image n'a pas d'erreur
async function imageValide(url: string): Promise<number> {
    try {
        const response = await fetch(url);
  
        if (response.status === 200) {
            console.log('Le lien d\'image est valide et affichable.');
            return 200;
        }
        else {
            console.log('Le lien d\'image est invalide ou n\'est pas affichable.');
        }
    }
    catch (error) {
        console.error('Erreur de validation du lien d\'image:', error);
    }
    return -1; //ou une autre valeur que vous souhaitez retourner si le code de statut n'est pas 200
}

function MovieConversion() {
    const [isLoading, setIsLoading] = useState(false);

    const [movieData, setMovieData] = useState<MovieData>({
        inputMovie: "",
        movieResults: [], // Tableau vide pour stocker les résultats des films
    });    

    //Récupérer le contenu de l'input
    const InputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMovieData({ ...movieData, inputMovie: event.target.value });
    };

    const fetchMovieConversion = async () => {
        setIsLoading(true);

        const api = "5fYLrNmowziPVwKwhYS7TjE8goD4E7IU";
        const enTete= new Headers({
            "Accept": "application/json",    
        });
        enTete.append("api-key", api);

        var nomFilm = (movieData.inputMovie);
        nomFilm = nomFilm.replaceAll(" ", "+");

        var requete = new Request("https://api.opensubtitles.com/api/v1/subtitles?query="+nomFilm, {
            method: 'GET',
            headers: enTete,
        });
        var reponse = await fetch(requete);
        var donnee = await reponse.json();

        //Mettre le premier caractère en majuscule
        var st = movieData.inputMovie;
        nomFilm = movieData.inputMovie.charAt(0).toUpperCase() + st.slice(1);
        var compteur = 0;
        const results: Movie[] = []; // Créer un nouveau tableau pour stocker les résultats des films
        for(const res of donnee.data){
            if(res.attributes.related_links != null){

                var idFilm = res.id;

                var note = res.attributes.ratings;

                var langue = res.attributes.language.toUpperCase();

                var annee = res.attributes.feature_details.year;

                var titre = res.attributes.feature_details.title;

                    
                for(const lien of res.attributes.related_links){
                    var lienImage = lien.img_url;
                }

                for(const file of res.attributes.files){
                    var idFile = file.file_id;
                }

                // Ajouter les résultats de chaque film au tableau
                results.push({
                    id: idFilm,
                    language: langue,
                    rating: note,
                    age: annee,
                    title: titre,
                    image: lienImage,
                    idFile: idFile
                });
            }
        }

        setMovieData({
            ...movieData,
            movieResults: results // Mettre à jour le tableau avec les résultats des films
        });

        setIsLoading(false);
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
                        <Input value={movieData.inputMovie} onChange={InputChange} placeholder='Rechercher...' />
                    </Form.Field>
                </Form>

                <Segment basic textAlign="center">
                    {isLoading ? (
                        <Loader active inline="centered" />
                        ) : (
                        <Button primary onClick={() => {fetchMovieConversion();}}>Extraire</Button>
                    )}
                </Segment>

            </Segment>

            
                <Grid columns={4}>
                {movieData.movieResults.map((movie) => (
                    <Grid.Column  key={movie.id}>
                        <Segment basic textAlign="center">
                            <Card>
                                <Image src={movie.image} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{movie.title}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{movie.age}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {movie.language}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <a>
                                        <Icon name='edit' />
                                        {movie.rating}
                                    </a>
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