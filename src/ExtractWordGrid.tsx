import {Table, Checkbox} from "semantic-ui-react"
import { useEffect, useState } from "react";

var sortAscending = true;

type word = {
	mot: string,
    niveau: string,
    type: string,
    traduction: string,
};

function ExtractWordGrid({props}:{props : word[]} ) {
    
    const [words, setWords] = useState<word[]>(props);

    useEffect(() => {}, []);

    function sortByWord() {
        setWords([])
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.mot.localeCompare(b.mot) * (sortAscending ? 1 : -1)))
        sortAscending = !sortAscending;
    }

    function sortByLevel() {
        setWords([])
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.niveau.localeCompare(b.niveau) * (sortAscending ? 1 : -1)))
        sortAscending = !sortAscending;
    }

    function sortByType() {
        setWords([])
        console.log("Sorting ...")
        console.log([...words])
        setWords([...words].sort((a, b) => a.type.localeCompare(b.type) * (sortAscending ? 1 : -1)))
        sortAscending = !sortAscending;
    }

    return (
        <>
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

export default ExtractWordGrid