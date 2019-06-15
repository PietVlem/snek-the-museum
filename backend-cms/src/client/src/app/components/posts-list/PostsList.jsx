/*
Import external libraries
*/
import React, { Component } from 'react';
import classNames from 'classnames';

/*
Styling
*/
import './PostsList.scss'

class PostsLists extends Component {
    readMoreHandler = (ev, id) => {
        ev.preventDefault();
        if (typeof this.props.onReadMore === 'function') {
            this.props.onReadMore(id);
        }
    }

    bgImage(image){
        const style = {
            backgroundImage: `url(${image})`,
            width: '100%',
            height: '0',
            paddingBottom: '65%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        }
        return style;
    }

    render() {
        const { posts } = this.props;

        return (
            <React.Fragment>
                {posts && posts.map((post, index) => (
                    <article key={post.id} className={classNames("post--small")}>
                        <a href="#" onClick={(ev) => this.readMoreHandler(ev, post.id)}>
                            <div>
                                <div className="image" style={ this.bgImage(post.image) }></div>
                                <div className="content">
                                    <h3 className="post__title">{post.title}</h3>
                                    <p className="post__synopsis">{post.synopsis}</p>
                                    <button onClick={(ev) => this.readMoreHandler(ev, post.id)}>Lees meer</button>
                                </div>
                            </div>
                        </a>
                    </article>
                ))}
            </React.Fragment>
        );
    }
}

export default (PostsLists);