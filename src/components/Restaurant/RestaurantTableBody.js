import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';

const RestaurantTableBody = ({
  type,
  restaurants,
  removeRestaurant,
  couponUse,
}) => (
  <Table.Body>
    {restaurants.map(res => (
      <Table.Row key={res.ID}>
        <Table.Cell>
          {type === 'cupon' ? (
            res.Promo
          ) : (
            <Link to={`/show/${res.ID}`}>{res.Nombre}</Link>
          )}
        </Table.Cell>
        {type === 'cupon' && <Table.Cell>{res.Cantidad}</Table.Cell>}
        {type === 'cupon' && (
          <Table.Cell>
            <Button
              onClick={() => {
                couponUse(res.ID, res.Cantidad);
              }}
            >
              Usar
            </Button>
          </Table.Cell>
        )}
        <Table.Cell key={`delete-${res.ID}`}>
          <Button
            onClick={() => {
              if (window.confirm(`¿Quiéres borrar este ${type}?`)) {
                removeRestaurant(res.ID);
              }
            }}
          >
            Borrar
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Link
            to={`/edit/${
              type === 'sucursal'
                ? `:id/${res.ID}`
                : type === 'cupon'
                ? `:res/:id/res.ID`
                : res.ID
            }`}
          >
            Editar
          </Link>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
);

export default RestaurantTableBody;
