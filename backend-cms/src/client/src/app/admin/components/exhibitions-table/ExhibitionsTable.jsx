/*
External libraries
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Enum from "es6-enum";

/*
Material UI
*/
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IconCreate from '@material-ui/icons/Create';
import IconDelete from '@material-ui/icons/Delete';
import IconDeleteForever from '@material-ui/icons/DeleteForever';
import Paper from '@material-ui/core/Paper';

const MUSEUMACTIONSENUM = Enum('DELETE', 'SOFTDELETE', 'SOFTUNDELETE');

/*
Styles
*/
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
  },
});

class ExhibitionsTable extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    exhibitions: null,
    exhibitionId: null,
    exhibitionAction: null,
    dialogOpen: false,
    dialogTitle: '',
    dialogMessage: ''
  };

  

  handleDialogOpen = (exhibitionId, exhibitionAction) => {
    let title = '';
    let message = '';

    switch(exhibitionAction) {
      case MUSEUMACTIONSENUM.DELETE:
        title = 'Delete from the database?';
        message= `Do you wish permenantly delete the exhibition with id ${exhibitionId}?`;
        break;
      case MUSEUMACTIONSENUM.SOFTDELETE:
        title = 'Soft-delete from the database?';
        message= `Do you wish to soft-delete the exhibition with id ${exhibitionId}?`;
        break;
      case MUSEUMACTIONSENUM.SOFTUNDELETE:
        title = 'Soft-undelete from the database?';
        message= `Do you wish to soft-undelete the exhibition with id ${exhibitionId}?`;
        break;
    }

    this.setState({
      exhibitionId: exhibitionId,
      exhibitionAction: exhibitionAction,
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  };

  handleDialogSubmit = () => {
    let url = '';
    let options = {};

    switch(this.state.exhibitionAction) {
      case MUSEUMACTIONSENUM.DELETE:
        url = `/api/v1/exhibitions/${this.state.exhibitionId}`;
        options = {
          method: 'DELETE'
        }
        break;
      case MUSEUMACTIONSENUM.SOFTDELETE:
        url = `/api/v1/exhibitions/${this.state.exhibitionId}?mode=softdelete`;
        options = {
          method: 'DELETE'
        }
        break;
      case MUSEUMACTIONSENUM.SOFTUNDELETE:
        url = `/api/v1/exhibitions/${this.state.exhibitionId}?mode=softundelete`;
        options = {
          method: 'DELETE'
        }
        break;
    }

    fetch(url, options)
      .then(res => res.json())
      .then(results => {
        if(results.mode && results.mode === 'delete') {
          this.loadExhibitions();
        } else {
          const exhibition = results.exhibition;
          const i = this.state.exhibitions.findIndex((obj, index, array) => {
            return obj._id === exhibition._id;
          });
          const exhibitions = this.state.exhibitions;
          exhibitions[i] = exhibition;
  
          this.setState(prevState => ({
            ...prevState,
            exhibitions: exhibitions
          }));
        }
        }
      );

    this.handleDialogClose();
  }

  componentWillMount() {
    this.loadExhibitions();
  }

  loadExhibitions = () => {
    fetch('/api/v1/exhibitions')
      .then( response => response.json())
      .then( item => this.setState({ exhibitions: item })); 
  }

  render() {
    const { classes } = this.props;
    const { exhibitions } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Museum</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exhibitions && exhibitions.map( (exhibition, index) => (
                <TableRow key={exhibition.id}>
                  <TableCell>{exhibition.name}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <IconButton
                      component={Link} to={ `/admin/exhibitions/${exhibition.id}/edit`}>
                      <IconCreate />
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(exhibition.id, (exhibition.deleted_at)?MUSEUMACTIONSENUM.SOFTUNDELETE:MUSEUMACTIONSENUM.SOFTDELETE)} style={{ opacity: ((exhibition.deleted_at)?0.3:1) }}>
                      <IconDelete/>
                    </IconButton>
                    <IconButton
                      onClick={() => this.handleDialogOpen(exhibition.id, MUSEUMACTIONSENUM.DELETE)}>
                      <IconDeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog
          fullScreen={false}
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.handleDialogSubmit()} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );  
  }
}

export default withStyles(styles)(ExhibitionsTable);
