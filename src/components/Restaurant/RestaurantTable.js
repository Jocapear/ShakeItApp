import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import RestaurantTableBody from './RestaurantTableBody';

const RestaurantTable = (props) => (
  <Table collapsing celled basic="very" size="large" className="center">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          {props.type === 'sucursal' ? 'Sucursal' : 'Restaurant'}
        </Table.HeaderCell>
        <Table.HeaderCell>Borrar</Table.HeaderCell>
        <Table.HeaderCell>Editar</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <RestaurantTableBody {...props} />
  </Table>
);

RestaurantTable.propTypes = {
  type: PropTypes.oneOf(['restaurant', 'sucursal']),
};

export default RestaurantTable;
