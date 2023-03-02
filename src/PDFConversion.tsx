import {useRef, useState} from "react";
import {Header, Segment, Icon, Button} from "semantic-ui-react";
import * as PDF from "pdfjs-dist";
import {Helmet} from "react-helmet";

type PDFContent = {
	filename: String;
	pages: Array<String>;
};

function PDF2Text(file: File) {
    PDF.GlobalWorkerOptions.workerSrc = "../node_modules/pdfjs-dist/build/pdf.worker.js";

	const document: PDFContent = {filename: "", pages: []};
	document.filename = file.name;
	const convert = async (): Promise<void> => {
		// On récupère le contenu du fichier
		const buffer = await file.arrayBuffer();
		// On récupère le contenu du document PDF
		const pdf = await PDF.getDocument(buffer).promise;
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
		return;
	};
	convert().then(() => {
		console.log(document);
	});
}

const PDFConversion = () => {
	const inputRef = useRef(null);
	const [iconColor, setIconColor] = useState<"black" | "red">("black");
	const [displayFileName, setDisplayFileName] = useState<String | undefined>("Dépot de document PDF");
	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target?.files?.item(0);
		if (file) {
			setDisplayFileName(file?.name);
			setIconColor("red");
			PDF2Text(file);
		}
	};

	return (
		<>
			<Helmet>
				<title>PDF - LexiLab</title>
			</Helmet>
			<Segment>
				<Segment placeholder>
					<Header icon>
						<Icon name="file pdf outline" color={iconColor} />
						{displayFileName}
					</Header>
					{/* @ts-ignore*/}
					<Button onClick={() => inputRef.current?.click()} color="black">
						<input ref={inputRef} type="file" style={{display: "none"}} accept="application/pdf" onChange={handleFileUpload} />
						Sélection
					</Button>
				</Segment>
			</Segment>
		</>
	);
};

export default PDFConversion;
