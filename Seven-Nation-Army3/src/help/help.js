
import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Video from "../common/components/Video";
import "../styles/Help.scss";
import {Container, Nav, NavbarBrand, NavbarToggler, Button} from "reactstrap";
import manual from '../media/UserManual.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default class HelpPage extends Component {
   state = {numPages: null, pageNumber: 1,};

    onDocumentLoadSuccess = ({numPages}) => {
            this.setState({numPages});
    }
    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <Container>
            <Video />
            <Nav className="navbar navbar-expand-lg">
            <NavbarBrand href="/#/Settings">Seven Nation Army</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        </Nav>
            <Container centered id={".pdfViewer"}>
                <nav>
                    <Button style={{marginBottom: "5pt",marginRight: "5pt"}} onClick={this.goToPrevPage}>Prev</Button>
                    <Button style={{marginBottom: "5pt"}} onClick={this.goToNextPage}>Next</Button>
                </nav>

                <div style={{ width: 600 }}>
                    <Document
                        file={manual}
                        onLoadSuccess={this.onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} width={600} />
                    </Document>
                </div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </Container>
            </Container>
        );
    }
}


