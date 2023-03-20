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

function sendId(id : string) {
    fetch("http://localhost:3001/api/parseYoutubeVideo", {
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        },
        body: id,
        method: "POST",
    }).then((res) => {
        console.log(res);
    });
}

const YoutubeConversion = () => {
    const [url, setUrl] = useState<string>("");
    const [videoId, setVideoId] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);
    const [urlError, setUrlError] = useState('');
    const [subtitleError, setSubtitleError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchTranscript(url : string) {
        YoutubeTranscript.fetchTranscript(url).then((res) => {
            const parser = res.map((item) => item.text).join(' ');
            console.log(parser);
        })
    }

    useEffect(() => {
        if (videoId != null)
            setThumbnail(`https://img.youtube.com/vi/${videoId}/0.jpg`);
        else
            setThumbnail(null);
    }, [videoId]);

    const InputChange = (e: any) => {
        setUrl(e.target.value);
    }

    function extractVideo(){
        //setIsLoading(true);
        const videoId = getVideoId(url);
        setVideoId(videoId);
        
        if (videoId == null)
            setUrlError("L'URL est invalide !");
        else{
            sendId(videoId);
            setUrlError('');
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
                                    <Form.Field error={urlError ? { content: "Please enter a value", pointing: "below" } : false}>
                                        <label>Saisir votre lien youtube :</label>
                                        <Input onChange={InputChange} focus placeholder='Colle le lien de la vidéo ici...' error={urlError !== ''}/>
                                        {urlError !== '' && (
                                            <div className='ui pointing red basic label'>
                                                {urlError}
                                            </div>
                                        )}
                                    </Form.Field>
                                    <Segment basic>
                                        {isLoading ? (<Loader active inline="centered" />) : (<Button primary onClick={() => {extractVideo();}} >Extraire</Button>)}
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