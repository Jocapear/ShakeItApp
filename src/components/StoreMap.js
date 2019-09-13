import React, { useRef } from 'react';
import { string } from 'prop-types';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/StoreMap.css';

import icon from '../images/store_icon_color.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [38, 38],
  shadowSize: [38, 38],
  iconAnchor: [19, 38],
  shadowAnchor: [5, 38],
  popupAnchor: [0, -38],
});

L.Marker.prototype.options.icon = DefaultIcon;

const StoreMap = ({ attribution, url }) => {
  const map = useRef(null);

  return (
    <Map
      boundOptions={{ padding: [100, 100] }}
      center={[20.7326234, -103.4297673]}
      zoom={15}
      ref={map}
    >
      <TileLayer url={url} attribution={attribution} />
      <Marker position={[20.7326234, -103.4297673]}>
        <Popup>
          <b style={{ fontWeight: 'bold' }}>AppleBee's</b>
        </Popup>
      </Marker>
    </Map>
  );
};

StoreMap.propTypes = {
  url: string,
  attribution: string,
};

StoreMap.defaultProps = {
  url:
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
};

export default StoreMap;
