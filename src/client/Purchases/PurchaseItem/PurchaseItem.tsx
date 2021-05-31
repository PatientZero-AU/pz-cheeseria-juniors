import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Types
import { PurchaseType } from '../../App';
// Styles
import { Wrapper } from './PurchaseItem.styles';
import CartItem from '../../Cart/CartItem/CartItem';

type Props = {
    item: PurchaseType;
};

const PurchaseItem: React.FC<Props> = ({ item }) => (
    <Wrapper className='purchase-item' data-cy={`recent-purchase-item-${item.dateTime}`}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <h3>{item.dateTime}</h3>
                <div className='information'>
                    <p>Price: ${item.totalPrice.toFixed(2)}</p>
                    <p>Total Items: {item.totalItems}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div className='cheeses'>
                    {item.cheeses.map(cheese => (
                        <CartItem
                            key={cheese.id}
                            item={cheese}
                        />
                    ))}
                </div>
            </AccordionDetails>
        </Accordion>
    </Wrapper>
);

export default PurchaseItem;
