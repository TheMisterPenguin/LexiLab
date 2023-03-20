import {useState, useEffect} from "react";
import { Segment, Form, Input, Button, Image, Grid,Loader } from 'semantic-ui-react';
import {Helmet} from "react-helmet";
import YoutubeTranscript from 'youtube-transcript';


/**
 * récupère l'id de la vidéo youtube grâce à son lien
 * @param url le lien de la vidéo youtube
 * @returns null si le lien n'est pas valide, sinon l'id de la vidéo
 */
function getVideoId(url : string) {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/)?([^\s&]+)/;
    const match = url.match(regex);
    if (match && match[1])
      return match[1];
    else
      return null;
}


const YoutubeConversion = () => {
    const [url, setUrl] = useState<string>('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);


    // actualiation de la miniature de la vidéo youtube
    async function updateThumbnail() {
        if (videoId !== null) {
          const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
          setThumbnail(thumbnailUrl);
        }
    }

    async function fetchTranscript() {
        const resultat = await YoutubeTranscript.fetchTranscript(url).then((res) => {
            const parser = res.map((item) => item.text).join(' ');
            console.log(parser)
        });
    }

    useEffect(() => {
          updateThumbnail();
        }, [videoId]);

    const InputChange = (e: any) => {
        setUrl(e.target.value);
    }

    async function extractVideo(){
        if (url !== '') {
            setIsLoading(true);
            setVideoId(getVideoId(url));
        }
    }

    return (
        <>
            <Helmet>
                <title>Youtube - LexiLab</title>
            </Helmet>
            <Segment>
                <Grid columns={videoId === null ? 1 : 2}>  
                    <Grid.Row verticalAlign="middle">
                       {videoId === null ? <></> : <Grid.Column width={7}>
                            <Image  src={thumbnail} width={300}  />
                        </Grid.Column>}
    
                        <Grid.Column>
                                <Form>
                                    <Form.Field>
                                        <label>Saisir votre lien youtube :</label>
                                        <Input type="url" onChange={InputChange} focus placeholder='Colle le lien de la vidéo ici...'/>
                                    </Form.Field>
                                    <Segment basic>
                                        {isLoading ? (
                                            <Loader active inline="centered" />
                                        ) : (
                                        <Button primary onClick={() => {extractVideo();}} >Extraire</Button>
                                        )}
                                    </Segment>
                                </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
}

export default YoutubeConversion;