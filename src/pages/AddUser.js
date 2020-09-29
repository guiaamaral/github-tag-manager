import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, CircularProgress, Container, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import githubLogo from '../static/github.png';
import manWithLaptop from '../static/man-with-laptop.png';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { fetchUser, fetchStarred } from '../utils/API';
import { addUser, addStarred } from '../actions'

class AddUser extends Component {
  state = {
    username: '',
    goBack: false,
    loading: false
  }

  componentDidMount() {
    if (this.props.history.location.pathname === '/adicionar-usuario') {
      this.setState({goBack: true})
    }
  }

  preventDefault = e => {
    e.preventDefault()
  }

  onChange = event => {
    this.setState({username: event.target.value})
  }

  onSubmit = async () => {
    const { dispatch } = this.props;
    this.setState({ loading: true })
    const users = localStorage.getItem('@github-tag-manager/users') !== null
      ? JSON.parse(localStorage.getItem('@github-tag-manager/users'))
      : []
    const starreds = localStorage.getItem('@github-tag-manager/starred') !== null
      ? JSON.parse(localStorage.getItem('@github-tag-manager/starred'))
      : []

    const user = await fetchUser(this.state.username);
    const userFinal = {
      id: user.id,
      name: user.name,
      login: user.login,
      followers: user.followers,
      following: user.following,
      company: user.company,
      blog: user.blog,
      location: user.location,
      bio: user.bio,
      avatar_url: user.avatar_url
    }
    users.push(userFinal)
    dispatch(addUser(userFinal))

    const starred = await fetchStarred(this.state.username);
    const starredFinal = starred.map(repo => ({
      id: user.id,
      html_url: repo.html_url,
      repoid: repo.id,
      name: repo.name,
      language: repo.language,
      pushed_at: repo.pushed_at,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      tags: []
    }))
    starredFinal.map(repo => {
      starreds.push(repo)
      dispatch(addStarred(repo))
      return true
    })
    this.props.history.push('/usuarios');
  }

  
  render() {
    const { goBack, username, loading } = this.state;

    return (
      <Container disableGutters={true}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={5} style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              m={4}
            >
              {goBack && <IconButton onClick={() => this.props.history.goBack()}><ArrowBackIcon /></IconButton>}
              <img src={githubLogo} alt="GitHub" className="logo-home"/>
            </Box>
            <Box
              display="flex"
              flex="2"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              m={4}
            >
              <Typography variant="h5">Buscar usuário</Typography>
              <Typography variant="subtitle2" style={{ color: '#999', marginBottom: 16 }}>Crie sua conta através do seu usuário do GitHub</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="@username"
                onChange={this.onChange}
                value={username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle color="disabled" />
                    </InputAdornment>
                  )
                }}
              />
              <Button
                fullWidth={true}
                variant="contained"
                color="primary"
                className="btn-register"
                style={{ marginTop: 24 }}
                onClick={this.onSubmit}
              >
                {!loading ? 'Cadastrar' : <CircularProgress size={22} color='secondary' />}
              </Button>
            </Box>
            <Box
              display="flex"
              flex="1"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="body2"
                gutterBottom
              >
                Temos de <Link href="#" onClick={this.preventDefault}>política</Link> e <Link href="#" onClick={this.preventDefault}>privacidade</Link>.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} style={{ backgroundColor: 'black', display: 'flex', alignItems: 'center'}}>
            <Box
              textAlign="center"
              m={4}
            >
              <img src={manWithLaptop} alt="Homem com laptop" style={{ width: '70%' }} />
              <Typography variant="h1" className="home-title" style={{ color: 'white' }}>Gerencie e adicione <strong>tags</strong> aos seus <strong>repositórios</strong> favoritos.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(state => state)(AddUser);