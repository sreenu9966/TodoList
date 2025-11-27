import React from 'react';
import { items } from '../../assets/items';
import ItemDisplay from './ItemDisplay';

const ListItems = () => {
  return (
    <div className='items-list'>
         <p>ItemDisplay</p>

      {items.map((item, index) => (
       <ItemDisplay key={index} id={item.id} albumId={item.albumId} thumbsImage={item.thumbnailUrl} title={item.title} url={item.url} />
      ))}
    </div>
  );
};

export default ListItems;
