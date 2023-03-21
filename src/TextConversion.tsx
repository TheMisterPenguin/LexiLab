import {Segment, TextArea, Form, Button, Card, Table, TableCell, Checkbox} from "semantic-ui-react"
import {Helmet} from "react-helmet";
import { useState } from "react";
import WordCard from "./WordCard";

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

    function sortByWord() {
        setWords([]);
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.mot.localeCompare(b.mot) * (sortAscending ? 1 : -1)));
        sortAscending = !sortAscending;
    }

    function sortByLevel() {
        setWords([]);
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.niveau.localeCompare(b.niveau) * (sortAscending ? 1 : -1)));
        sortAscending = !sortAscending;
    }

    function sortByType() {
        setWords([]);
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.type.localeCompare(b.type) * (sortAscending ? 1 : -1)));
        sortAscending = !sortAscending;
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
                <Table celled  structured sortable striped>
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell textAlign="center" style={{ backgroundColor: '#FFB155' }}><Checkbox /></Table.HeaderCell>
                            <Table.HeaderCell textAlign="center"  onClick={() => sortByWord()} style={{ backgroundColor: '#FFB155'}}>Mots</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" onClick={() => sortByLevel()} style={{ backgroundColor: '#FFB155' }}>Niveau</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" onClick={() => sortByType()} style={{ backgroundColor: '#FFB155' }}>Type</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {words.map((word) => (
                            <Table.Row>
                                <Table.Cell textAlign="center" collapsing><Checkbox /></Table.Cell>
                                <Table.Cell textAlign="center">{word.mot}</Table.Cell>
                                <Table.Cell textAlign="center"> {word.niveau}</Table.Cell>
                                <Table.Cell textAlign="center">{word.type === "" ? "N/A" : word.type}</Table.Cell>

                            </Table.Row>
                            
                        ))}
                    </Table.Body>
                </Table>
            }
            
        </>
    )
}

export default TextConversion