import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Avatar, Box, Card, CardContent, Chip, Container, Grid, IconButton, InputBase, Link, Paper, Popper, Typography } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import BusinessIcon from '@material-ui/icons/Business';
import FilterListIcon from '@material-ui/icons/FilterList';
import InfoIcon from '@material-ui/icons/Info';
import LinkIcon from '@material-ui/icons/Link';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import StarredElem from '../components/StarredElem';

class SingleUser extends Component {
  state = {
    anchorEl: null,
    data: {},
    starred: [],
    search: '',
    show: false,
    myTags: [],
    tag: []
  }
  
  componentDidMount() {
    const { starred, users, tags } = this.props;
    const id = parseInt(this.props.history.location.pathname.split('/')[2])
    const data = users.filter(user => user.id === id)[0]
    const userStarred = starred.filter(star => star.id === id)
    const myTags = tags.map( tag => ({ text: tag, value: tag }))
    this.setState({ data: data, starred: userStarred, myTags: myTags })
  }

  onChange = (key, event) => {
    const el = {}
    el[key] = event.target.value
    this.setState(el)
  }

  handleElem = (event) => {
    this.setState({show: true, anchorEl: event.currentTarget})
  }

  handleAddTag = (term) => {
    const { tag } = this.state;
    tag.push(term)
    this.setState({ tag: tag }, () => console.log(tag))
  }

  handleDeleteTag = (term) => {
    const { tag } = this.state;
    const newTags = _.remove(tag, (n) => {
      return n !== term
    })
    this.setState({ tag: newTags })
  }

  render() {
    const { data, search, starred, show, myTags, tag } = this.state;
    const starredFilter = starred.filter(repo => search === '' ? repo : repo.tags.join().toLowerCase().includes(search) && repo)
    
    const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
      <Chip
        style={{marginLeft: 4}}
        key={key}
        label={chip}
        onDelete={handleDelete}
        size="small"
      />
    );

    return (
      <Container style={{ backgroundColor: '#f5f5f5', height: 'calc(100vh - 68px)' }}>
      <Header button={false} />
      <Grid
        container
        spacing={4}
        style={{ marginTop: 68, paddingTop: 16 }}
      >
        <Grid item xs={12} sm={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card>
                <Box p={2} style={{
                  backgroundColor: 'black',
                  minHeight: '60px',
                }}>
                  <IconButton
                    style={{ zIndex: 9999 }}
                    color='secondary'
                    onClick={() => this.props.history.push('/usuarios')}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
                <CardContent style={{ marginTop: '-77px' }}>
                  <Avatar style={{ border: '5px solid #fff', position: 'relative', left: 'calc(50% - 55px)', width: '110px', height: '110px', marginBottom: 16 }} alt={`Foto de ${data.login}`} src={data.avatar_url} />
                  <Typography variant="h2">{data.name}</Typography>
                  <Typography>@{data.login}</Typography>
                  <Typography>Seguidores {data.followers}</Typography>
                  <Typography>Seguindo {data.following}</Typography>
                  <Typography>Favoritos {starred.length}{starred.length === 100 && '+'}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardContent>
                  <Typography variant="h2">Sobre</Typography>
                  {data.bio &&
                    <Grid item>
                      <Typography>{data.bio}</Typography>
                    </Grid>
                  }
                  {data.company &&
                    <Grid item>
                      <Typography variant="body2"><BusinessIcon fontSize="small" /> {data.company}</Typography>
                    </Grid>
                  }
                  {data.location &&
                    <Grid item>
                      <Typography variant="body2"><RoomIcon fontSize="small" /> {data.location}</Typography>
                    </Grid>
                  }
                  {data.blog &&
                    <Grid item>
                      <Link variant="body2" href={data.blog}><LinkIcon fontSize="small" /> {data.blog}</Link>
                    </Grid>
                  }
                </CardContent>
              </Card>
            </Grid>
            {data.higlight &&
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h2">Destaque</Typography>
                    <Grid item>
                      <Typography><BookmarksIcon fontSize="small" /> {data.blog}</Typography>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                    <InputBase
                      onChange={(event) => this.onChange('search',event)}
                      value={search}
                      placeholder="Buscar um repositório"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper>
                    <IconButton
                      onClick={() => this.setState({show: !show})}>
                      <FilterListIcon />
                    </IconButton>
                    <ChipInput
                      className="inputChip"
                      disableUnderline
                      fullWidthInput
                      placeholder="Filtrar por tag"
                      style={{ marginTop: 5, width: 'calc(100% - 52px)'}}
                      value={tag}
                      chipRenderer={chipRenderer}
                      onBlur={() => this.setState({show: false})}
                      onAdd={(tag) => this.handleAddTag(tag)}
                      onUpdateInput={(event) => this.handleElem(event)}
                      onDelete={(tag) => this.handleDeleteTag(tag)}
                    />
                  </Paper>
                  <Popper
                    anchorEl={this.state.anchorEl}
                    open={show}>
                    <Paper
                      component="div"
                      style={{
                        width: '40%',
                        float: 'right',
                        marginLeft: '-36px',
                        marginTop: 20,
                        paddingTop: 8,
                        paddingBottom: 8,
                        paddingLeft: 16,
                        paddingRight: 16
                      }}
                    >
                      <Typography variant="body2" style={{ marginTop: 4, marginBottom: 8 }}>Sugestões</Typography>
                      {myTags.map((term, index) =>
                        <Chip
                          size="small"
                          style={{ margin: 2 }}
                          key={index}
                          label={term.text}
                          onDelete={() => this.handleAddTag(term.text)}
                          deleteIcon={<AddCircleOutlineIcon />}
                        />
                      )}
                    </Paper>
                  </Popper>
                </Grid>
              </Grid>
            </Grid>
            {starredFilter.length > 0
              ? starredFilter.map(repo => <Grid  key={repo.repoid} item xs={12} sm={12}>
                <StarredElem repo={repo} />
              </Grid>)
              : <Grid item xs={12} sm={12}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  css={{ marginTop: 36, width: '100%'}}
                >
                  <InfoIcon fontSize="large"  color="disabled"/>
                  <Typography>Não exite nenhum repositório com a tag <em>{search}</em>.</Typography>
                </Box>
            </Grid>
            }
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
  }
}

export default connect(state=> state)(SingleUser);