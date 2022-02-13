import React from 'react';
import { Input, Menu, Grid, GridColumn } from 'semantic-ui-react';
import Link from 'next/link';
import Wallet from './wallet';

const MenuComponent = () => {
    return (
      <>
      <Grid doubling stackable className='margin-top'>
        <Grid.Column width={13}>
          <Menu>
            <Link href="/">
              <a className='item'>Home</a>
            </Link>
          </Menu>
        </Grid.Column>
        <Grid.Column width={3}>
          <Wallet />
        </Grid.Column>
      </Grid>
      </>
    )
};

export default MenuComponent;
