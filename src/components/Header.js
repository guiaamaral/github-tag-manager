import React from 'react';
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import githubLogo from '../static/github.png';

export default function Header(props) {
  let history = useHistory();
  return (
    <AppBar color="secondary" position="fixed">
      <Toolbar>
        <Grid
          justify="space-between"
          container 
          spacing={0}
        >
          <Grid item>
            <img src={githubLogo} alt="GitHub" className="logo-appBar" />
          </Grid>
          {props.button === true &&
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/adicionar-usuario')}
              >
                Adicionar novo
              </Button>
            </Grid>
          }
        </Grid>
      </Toolbar>
    </AppBar>
  );
}