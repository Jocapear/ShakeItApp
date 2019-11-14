import React from 'react';
import { Table } from 'semantic-ui-react';
import RestaurantTableBody from './RestaurantTableBody';

const RestaurantTable = props => (
  <Table collapsing celled basic="very" size="large" className="center">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Restaurant</Table.HeaderCell>
        <Table.HeaderCell>Borrar</Table.HeaderCell>
        <Table.HeaderCell>Editar</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <RestaurantTableBody {...props} />
  </Table>
);

export default RestaurantTable;
