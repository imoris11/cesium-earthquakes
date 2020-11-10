
import React from 'react'; 
import moment from 'moment';

export const Card = ({ item }) => (
    <div className="card">
    <div className='card-body'>
      <p className='place'>{item.properties.place}</p>
    </div>
    <div className='card-footer'>
      <p>Updated: {moment(item.properties.updated).format('LL') }</p>
      <p>Mag: {item.properties.mag}</p>
      <a rel="noreferrer" target="_blank" href={item.properties.detail}>View Json</a>
    </div>
  </div>
)

export default Card;