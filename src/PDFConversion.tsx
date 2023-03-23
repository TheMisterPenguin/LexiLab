import {useRef, useState, useEffect, useId} from "react";
import {Header, Segment, Icon, Button} from "semantic-ui-react";
import {Helmet} from "react-helmet";

type PDFContent = {
	filename: String;
	pages: Array<String>;
};

async function PDF2Text(file: File) {
	const document: PDFContent = {filename: "", pages: []};
	document.filename = file.name;
	// On récupère le contenu du fichier
	const buffer = await file.arrayBuffer();
	// On récupère le contenu du document PDF
	// @ts-ignore
	const pdf = await pdfjsLib.getDocument(buffer).promise;
	console.log(pdf.numPages);
	// On lit toutes les pages
	for (let i = 1; i < pdf.numPages; i++) {
		console.log(i);
		let page = await pdf.getPage(i);
		let contenu = await page.getTextContent();
		document.pages[i] += contenu.items
			.map((s: any) => {
				return s.str;
			})
			.join(" ");
	}
	console.log(document);
    return document;
}

const PDFConversion = () => {
	const inputRef = useRef(null);
    const [file, setFile] = useState<File | undefined>(undefined);
	const [displayFileName, setDisplayFileName] = useState<String | undefined>("Dépot de document PDF");
	const [iconColor, setIconColor] = useState<"black" | "red">("black");
    const [processingFile, setFileProcessing] = useState<boolean>(false);


    // Traitement du fichier
    useEffect(() => {
        if (file) {
            setDisplayFileName(file.name);
            setIconColor("red");
            setFileProcessing(true);
            PDF2Text(file).then(doc => {
                setFileProcessing(false);
            });
        }
    }, [file]);

	return (
		<>
			<Helmet>
				<title>PDF - LexiLab</title>
			</Helmet>
			<Segment>
				<Segment placeholder loading={processingFile}>
					<Header icon>
						<Icon name="file pdf outline" color={iconColor} />
						{displayFileName}
					</Header>
					{/* @ts-ignore*/}
					<Button disabled={processingFile} onClick={() => inputRef.current?.click()} color="black">
						<input ref={inputRef} type="file" style={{display: "none"}} accept="application/pdf" onChange={e => {if(e.target.files != undefined) setFile(e.target.files[0])}} />
						Sélection
					</Button>
				</Segment>
			</Segment>
		</>
	);
};

export default PDFConversion;