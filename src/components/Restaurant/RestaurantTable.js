import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import RestaurantTableBody from './RestaurantTableBody';

// This table is used for coupon, sucursal & restaurant.
const RestaurantTable = props => (
  <Table collapsing celled basic="very" size="large" className="center">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          {(() => {
            if (props.type === 'sucursal') {
              return 'Sucursal';
            } else if (props.type === 'restaurant') {
              return 'Restaurant';
            } else {
              return 'Cupón';
            }
          })()}
        </Table.HeaderCell>
        {(() => {
          if (props.type === 'cupon') {
            // add cantidad and usar
            return (
              <>
                <Table.HeaderCell>Cantidad</Table.HeaderCell>
                <Table.HeaderCell>Usar</Table.HeaderCell>
              </>
            );
          }
        })()}
        <Table.HeaderCell>Borrar</Table.HeaderCell>
        <Table.HeaderCell>Editar</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <RestaurantTableBody {...props} />
  </Table>
);

RestaurantTable.propTypes = {
  type: PropTypes.oneOf(['restaurant', 'sucursal', 'cupon']),
};

export default RestaurantTable;
