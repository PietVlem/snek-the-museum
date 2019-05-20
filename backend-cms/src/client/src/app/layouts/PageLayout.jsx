import React from 'react';

/*
Import styling
*/
//import logo from '../assets/images/logo.svg';
import './Page.scss';
import { storage } from 'firebase';

class PageLayout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firebaseImage: null,
        }
    }


    render() {
        const { children, classes } = this.props;

        return (
            <div className="page">
                <header role="header">
                    HEADER
                </header>
                <main className="main" role="main">
                    { children }
                </main>
                <footer className="footer" role="footer">
                    FOOTER
                </footer>
            </div>
        )
    }
}
 
export default PageLayout;