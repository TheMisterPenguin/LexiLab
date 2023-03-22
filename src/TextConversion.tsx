import {Segment, TextArea, Form, Button, Card, Table, TableCell, Checkbox} from "semantic-ui-react"
import {Helmet} from "react-helmet";
import { useState } from "react";
import WordCard from "./WordCard";
import ExtractWordGrid from "./ExtractWordGrid";

var sortAscending = true;

function test(text : string) {
    console.log(text);
    return fetch("http://localhost:3001/api/parseText", {
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        },
        body: text,
        method: "POST",
    }).then((res) => {
        return res.json();
    })
}

const TextConversion = () => {
    const [text, setText] = useState<string | number |undefined>();
    const [words, setWords] = useState<{
        mot: string,
        niveau: string,
        type: string,
    }[]>([]);

    const [fetching, setFetching] = useState(false);

    

    function getWord(){
        setFetching(true);
        if(text !== ""){
            test(text as string).then((res) => {
                console.log(res);   
                setWords(res);
                setFetching(false);
            });
        }
    }

    return (
        <>
            <Helmet>
				<title>Texte - LexiLab</title>
			</Helmet>
            <Segment>
                <Form>
                <Form.Field>
                    <label>Saisir votre texte :</label>
                    <TextArea onChange={(e, data) => setText(data.value)} rows={6}></TextArea>
                </Form.Field>
                </Form>
                <Segment basic textAlign="center">
                    <Button loading={fetching} onClick={() => getWord()} primary>Extraire</Button>
                </Segment>
            </Segment>
            {words.length === 0 ? <></> :
                <ExtractWordGrid props={words as any} />
            }   
            
        </>
    )
}

export default TextConversion