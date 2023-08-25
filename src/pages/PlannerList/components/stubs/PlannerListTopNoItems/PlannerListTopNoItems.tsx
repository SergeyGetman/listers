import React, { FC, memo } from 'react';
import Moment from 'moment';
import PlannerNoItemDaysStub from '../PlannerNoItemDaysStub';
type PlannerListTopNoItemsProps = {
  plannerCurrentMinDate: string;
};
const PlannerListTopNoItems: FC<PlannerListTopNoItemsProps> = ({ plannerCurrentMinDate }) => {
  return (
    <>
      {new Date(`${Moment(plannerCurrentMinDate).format('MMMM DD, YYYY')} 00:00:00`) >
        new Date(`${Moment().format('MMMM DD, YYYY')} 00:00:00`) && (
        <>
          <PlannerNoItemDaysStub isAddTodayId date={Moment().format('dddd, MMM DD')} />

          {Moment(plannerCurrentMinDate).diff(Moment(), 'days') >= 2 && (
            <PlannerNoItemDaysStub
              date={`${Moment().add(1, 'days').format('dddd, MMM DD')} - 
          ${Moment(plannerCurrentMinDate).add(-1, 'days').format('dddd, MMM DD')}`}
            />
          )}
          {Moment(plannerCurrentMinDate).diff(Moment(), 'days') === 1 && (
            <PlannerNoItemDaysStub date={Moment().add(1, 'days').format('dddd, MMM DD')} />
          )}
        </>
      )}
    </>
  );
};

export default memo(PlannerListTopNoItems);
