import React, { Component } from 'react';
import { Input, Menu, Grid, GridColumn } from 'semantic-ui-react';
import { Link } from '../routes';
import Wallet from './wallet';

class MenuComponent extends Component {

  render() {

    return (
      <>
      <Grid className='margin-top'>
        <Grid.Column width={13}>
          <Menu>
            <Link route="/">
              <a className='item'>Home</a>
            </Link>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Grid.Column>
        <Grid.Column width={3}>
        <Wallet />
        </Grid.Column>
      </Grid>
      </>
    )
  }
};

export default MenuComponent;
