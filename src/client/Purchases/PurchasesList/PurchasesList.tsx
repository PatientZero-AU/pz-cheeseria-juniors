import React from 'react';
// Types
import { PurchaseType } from '../../App';
import PurchaseItem from '../PurchaseItem/PurchaseItem';
// Styles
import { Wrapper } from './PurchasesList.styles';

type Props = {
    items: PurchaseType[] | undefined;
};

const PurchasesList: React.FC<Props> = ({ items }) => (
    <Wrapper data-cy='recent-purchases-drawer'>
        <h2>Your Purchases</h2>
        {items?.length === 0 ? <p data-cy='no-recent-purchases-message'>There are no purchases.</p> : null}
        {items?.map(item => (
            <PurchaseItem key={item.id} item={item} />
        ))}
    </Wrapper>
);

export default PurchasesList;
