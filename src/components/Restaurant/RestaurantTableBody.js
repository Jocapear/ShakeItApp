import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';

const RestaurantTableBody = ({ type, restaurants, removeRestaurant }) => (
  <Table.Body>
    {restaurants.map(res => (
      <Table.Row key={res.ID}>
        <Table.Cell>
          <Link to={`/show/${res.ID}`}>{res.Nombre}</Link>
        </Table.Cell>
        <Table.Cell key={`delete-${res.ID}`}>
          <Button
            onClick={() => {
              if (window.confirm('¿Quiéres borrar esta sucursal?')) {
                removeRestaurant(res.ID);
              }
            }}
          >
            Borrar
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${type === 'sucursal' ? `:id/${res.ID}` : res.ID}`}>
            Editar
          </Link>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
);

export default RestaurantTableBody;
