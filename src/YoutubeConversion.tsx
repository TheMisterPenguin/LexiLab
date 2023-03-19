import {useRef, useState, useEffect, useId} from "react";
import { Segment, Form, Input, Button, Image } from 'semantic-ui-react';
import {Helmet} from "react-helmet";
import * as cheerio from 'cheerio';
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
    const [processingVideo, setVideoProcessing] = useState<boolean>(false);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
    const [videoTitle, setVideoTitle] = useState("");

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
            try {
                const response = await fetch(`https://api.allorigins.win/get?url=${url}`);
                const html = await response.text().then((text) => {
                    const $ = cheerio.load(text);
                    const title = $('title').text();
                    console.log(title);
                    setVideoTitle(title);
                });
                //const $ = cheerio.load(html);
                //const title = $('title').text();
                //setVideoTitle(title);

                setVideoId(getVideoId(url));
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <Helmet>
                <title>Youtube - LexiLab</title>
            </Helmet>

            <Segment>
                <Form>
                    <Form.Field>
                        <label>Saisir votre lien youtube :</label>
                        <Input type="url" onChange={InputChange} focus placeholder='Colle le lien de la vidéo ici...'/>
                    </Form.Field>
                    <div id="video">
                        <Image  src={thumbnail} style={{ width: "200px", height: "auto" }}  />
                        <h4>{videoTitle}</h4>
                    </div>
                </Form>

                <Segment basic textAlign="center">
                    <Button primary onClick={() => {extractVideo();}} >Extraire</Button>
                </Segment>

            </Segment>
        </>
    )
}

export default YoutubeConversion;