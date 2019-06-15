import React from 'react';

/*
Import styling
*/
import snake from '../assets/images/snake.svg';
import logIn from '../assets/images/logIn.svg';
import './Page.scss';

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
                <header className="header" role="header">
                    <div className="container">
                        <img className="logo" src={snake} alt="logo"/>
                        <h1>Snek the museum</h1>
                        <a href="/login">
                            <img className="log-in" src={logIn} alt="log in"/>
                        </a>
                    </div>
                </header>
                <main className="main" role="main">
                    <div className="container">
                        <h2>Nieuws</h2>
                        { children }
                    </div>
                </main>
                <footer className="footer" role="footer">
                    <p>&copy; snek the museum, 2019</p>
                </footer>
            </div>
        )
    }
}
 
export default PageLayout;