import {Segment, TextArea, Form, Button} from "semantic-ui-react"
import {Helmet} from "react-helmet";
import { useState } from "react";

function test(text : string) {
    console.log(text);
    fetch("http://localhost:3001/api/parseText", {
        headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
        },
        body: text,
        method: "POST",
    });
}

const TextConversion = () => {
    const [text, setText] = useState<string | number |undefined>("");
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
                    <Button onClick={(e) => test(text)} primary>Extraire</Button>
                </Segment>
            </Segment>
        </>
    )
}

export default TextConversion