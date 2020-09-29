import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@material-ui/styles';
import { Button, Card, CardContent, Chip, Dialog, DialogTitle, DialogContent, Grid, IconButton, InputAdornment, Link, Paper, TextField, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import LanguageIcon from '@material-ui/icons/Language';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/Star';
import { addTag, addStarredTag, updateStarredTag } from '../actions';

const YellowStarIcon = styled(StarIcon)({
  color: '#FFC700'
});

class StarredElem extends Component {
  state = {
    modal: false,
    repo: [],
    title: '',
    tag: '',
    orderedTags: [],
    selected: [],
    id: null
  }

  componentDidMount() {
    const { tags } = this.props;
    const orderedTags = tags.sort().map((term, index) => ({
      key: index,
      label: term
    }));
    this.setState({ orderedTags: orderedTags })
  }

  onChange = event => {
    this.setState({ tag: event.target.value })
  }

  onBlur = term => {
    const { dispatch } = this.props;
    const { selected } = this.state;
    selected.push(term);
    dispatch(addTag(term))
    this.setState({ selected: selected, tag: '' })
  }

  handleModal = (title, repoid) => {
    const { modal } = this.state;
    const tempId = repoid;
    this.setState({ modal: !modal, title: title, id: tempId });
  };

  handleModalEdit = (title, repoid, tags) => {
    const { modal } = this.state;
    const tempId = repoid;
    this.setState({ modal: !modal, title: title, id: tempId, selected: tags });
  };

  addToSelect = term => {
    const { selected, orderedTags } = this.state;
    const terms = selected;
    terms.push(term);
    const removedTag = orderedTags.filter(item => item.label !== term)
    this.setState({ orderedTags: removedTag, selected: terms })
  }

  deleteFromSelect = term => {
    const { selected } = this.state;
    const terms = selected.filter(select => select !== term);
    this.setState({ selected: terms })
  }

  addTags = (term, id) => {
    const { dispatch } = this.props;
    term.map(item => {
      dispatch(addStarredTag(id, item));
      return true
    });
    this.setState({ modal: false })
  }

  updateTags = (terms, id) => {
    const { dispatch } = this.props;
    dispatch(updateStarredTag(id, terms));
    this.setState({ modal: false })
  }

  render() {
    const { modal, selected, title, orderedTags, tag } = this.state;
    const { repo } = this.props;
    const updated_at = (new Date() - Date.parse(repo.pushed_at)) / (1000*3600*24);
    return (
      <Grid item xs={12} sm={12} md={12}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={10} sm={11}>
                <Link href={repo.html_url} target="_blank">
                  <Typography variant="h2">{repo.name} <KeyboardArrowRightIcon /></Typography>
                </Link>
                <Typography>{repo.description}</Typography>
                {repo.tags.length > 0
                  ? <div>
                    {repo.tags.map(item => <Chip
                      key={item}
                      style={{ marginLeft: 4 }}
                      size="small"
                      label={`#${item}`}
                    />)}
                    <Chip
                      style={{ backgroundColor: 'rgba(0, 23, 255, 0.08)', color: '#0017FF', marginLeft: 4 }}
                      size="small"
                      label="Editar tags"
                      onClick={() => this.handleModalEdit('edit', repo.repoid, repo.tags)}
                      onDelete={() => this.handleModalEdit('edit', repo.repoid, repo.tags)}
                      deleteIcon={<EditIcon />}
                    />
                  </div>
                  : <Chip
                      style={{ backgroundColor: 'rgba(0, 23, 255, 0.08)', color: '#0017FF' }} 
                      size="small"
                      label="Adicionar tags"
                      onClick={() => this.handleModal('add', repo.repoid)}
                      onDelete={() => this.handleModal('add', repo.repoid)}
                      deleteIcon={<AddCircleOutlineIcon />}
                    />
                }
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton>
                  <YellowStarIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="body2"><LanguageIcon fontSize="small" color="disabled" /> {repo.language ? repo.language : '-'}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2"><AccessTimeIcon fontSize="small" color="disabled" /> Atualizado a {updated_at >= 2 ? `${Math.trunc(updated_at)} dias atrás` : updated_at >= 1 && updated_at < 2 ? `1 dia atrás` : 'menos de 1 dia'}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2"><StarIcon fontSize="small" color="disabled" /> {repo.stargazers_count}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Dialog
          open={modal}
          fullWidth
          maxWidth='sm'
          onClose={this.handleModal}
        >
          <DialogTitle>
            <Typography variant="h2">{title === 'add' ? 'Adicionar tags' : 'Editar tags'}</Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Buscar"
              onChange={this.onChange}
              onBlur={() => this.onBlur(tag)}
              value={tag}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                )
              }}
            />
            <Paper
              elevation={0}
              component="div"
              style={{
                marginTop: 8,
                marginBottom: 24,
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16
              }}
            >
              {selected.length > 0 &&
                selected.map(item => 
                  <Chip
                    style={{ margin: 2 }}
                    size="small"
                    key={item}
                    label={item}
                    onDelete={() => this.deleteFromSelect(item)}
                  />
                )
              }
              <Typography variant="body2" style={{ marginTop: 4, marginBottom: 8 }}>Sugestões</Typography>
              {orderedTags.map(item =>
                <Chip
                  style={{ margin: 2 }}
                  size="small"
                  key={item.key}
                  label={item.label}
                  onDelete={() => this.addToSelect(item.label)}
                  deleteIcon={<AddCircleOutlineIcon />}
                />
              )}
            </Paper>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => title === 'add'
                ? this.addTags(selected, this.state.id)
                : this.updateTags(selected, this.state.id)
              }
            >
              Salvar
            </Button>
            <Button
              fullWidth
              onClick={this.handleModal}
            >
              Cancelar
            </Button>
          </DialogContent>
        </Dialog>
      </Grid>
    );
  }
}

export default connect(state => state)(StarredElem);