import {useRef, useState, useEffect, useId} from "react";
import {Header, Segment, Icon, Button} from "semantic-ui-react";
import {Helmet} from "react-helmet";

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
           /* PDF2Text(file).then(doc => {
                setFileProcessing(false);
            });*/
			const fdata = new FormData();
			fdata.append("file", file);
			fetch("http://localhost:3001/api/parsePDF", {
				body : fdata,
				method : "POST",
			})
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
