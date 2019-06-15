/*
Import external libraries
*/
import React, { Component } from 'react';
import Parser from 'html-react-parser';
import classNames from 'classnames';

/*
Styling
*/
import './PostDetail.scss'

class PostDetail extends Component {
    bgImage(image){
        const style = {
            backgroundImage: `url(${image})`,
            width: '100%',
            height: '0',
            paddingBottom: '50%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }
        return style;
    }

    render() {
        const { data: post } = this.props;

        return (
            <React.Fragment>
                {post ? (
                    <article key={ post.id } className={classNames("post--large")}>
                        <div className="image" style={this.bgImage(post.image)}></div>
                        <h1 className="post__title">{ post.title }</h1>
                        <div className="post__synopsis">{ post.synopsis }</div>
                        <div className="post__body">{Parser(post.body)}</div>
                    </article>
                ) : '<p>LOADING</p>'}
            </React.Fragment>
        );
    }
}

export default (PostDetail);