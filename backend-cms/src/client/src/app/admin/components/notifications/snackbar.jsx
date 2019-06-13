import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    
};

class Snackbardefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            setOpen: false,
        }
    }

    handleClick() {
        this.setState({ open: true })
    }

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    }

    render() {
        return (
            <div>
                {/*<Button onClick={this.handleClick.bind(this)}>Open simple snackbar</Button>*/}
                <Snackbar
                    className={{backgroundColor: '#3b953e'}}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose.bind(this)}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={styles.close}
                            onClick={this.handleClose.bind(this)}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default Snackbardefault;