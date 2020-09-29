import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar, Card, CardContent, Grid, IconButton, Link, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import BusinessIcon from '@material-ui/icons/Business';
import RoomIcon from '@material-ui/icons/Room';
import StarIcon from '@material-ui/icons/Star';
import { deleteUser, deleteStarred } from '../actions'

class UserElem extends Component {
  deleteUser = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteUser(id))
    const starred = JSON.parse(localStorage.getItem('@github-tag-manager/starred'))
    starred.filter(repo => repo.id === id).map(role => dispatch(deleteStarred(id)))
  }

  render() {
    const { data, starred } = this.props;
    const userStarred = starred.filter(star => star.id === data.id)

    return (
      <Grid item xs={12} sm={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={2} sm={2} md={1}>
                <Avatar style={{width: '84px', height: '84px'}} alt={`Foto de ${data.login}`} src={data.avatar_url} />
              </Grid>
              <Grid item xs={9} sm={9} md={10}>
                <Link
                  color="primary"
                  underline="hover"
                  variant="h2"
                  href={`/usuarios/${data.id}`}
                >
                  {data.name} <KeyboardArrowRightIcon />
                </Link>
                <Typography>@{data.login}</Typography>
              </Grid>
              <Grid item xs={1} sm={1} md={1}>
                <IconButton onClick={() => this.deleteUser(data.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {data.company &&
                <Grid item>
                  <Typography variant="body2"><BusinessIcon fontSize="small" color="disabled" /> {data.company}</Typography>
                </Grid>
              }
              {data.location &&
                <Grid item>
                  <Typography variant="body2"><RoomIcon fontSize="small" color="disabled" /> {data.location}</Typography>
                </Grid>
              }
              {userStarred.length > 0 &&
                <Grid item>
                  <Typography variant="body2"><StarIcon fontSize="small" color="disabled" /> {userStarred.length}{userStarred.length === 100 && '+'}</Typography>
                </Grid>
              }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default connect(state => state)(UserElem);