import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import Header from '../components/Header';
import UserElem from '../components/UserElem';

class AllUsers extends Component {
  render() {
    const { users } = this.props;
    return (
      <Container style={{ backgroundColor: '#f5f5f5', height: 'calc(100vh - 68px)' }}>
        <Header button={true} />
        <Grid
          container
          spacing={2}
          style={{ marginTop: 64, paddingTop: 24 }}
        >
          <Grid container spacing={2} alignContent="flex-start">
            {users.length > 0
              ? users.map(user => <UserElem key={user.id} data={user} /> )
              : <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  css={{ height: 'calc(100vh - 68px)', width: '100%'}}
                >
                  <InfoIcon fontSize="large"  color="disabled"/>
                  <Typography>Ainda não existe nenhum usuário, clique em "Adicionar novo" para iniciar.</Typography>
                </Box>
            }
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(state => state)(AllUsers);