import React, { FC, memo } from 'react';
import Moment from 'moment';
import PlannerNoItemDaysStub from '../PlannerNoItemDaysStub';
type PlannerListBottomNoItemsProps = {
  plannerList: any;
};
const PlannerListBottomNoItems: FC<PlannerListBottomNoItemsProps> = ({ plannerList }) => {
  const format = 'dddd, MMM DD';
  return (
    <>
      {Moment().diff(Moment(plannerList[plannerList.length - 1]?.date, 'MMMM DD, YYYY'), 'days') > 0 && (
        <>
          {Moment().diff(Moment(plannerList[plannerList.length - 1]?.date, 'MMMM DD, YYYY'), 'days') >= 3 && (
            <PlannerNoItemDaysStub
              date={`${Moment(plannerList[plannerList.length - 1]?.date)
                .add(1, 'days')
                .format(format)} - ${Moment().add(-1, 'days').format(format)}`}
            />
          )}
          {Moment().diff(Moment(plannerList[plannerList.length - 1]?.date), 'days') === 2 && (
            <PlannerNoItemDaysStub
              date={Moment(plannerList[plannerList.length - 1]?.date, 'MMMM DD, YYYY')
                .add(1, 'days')
                .format(format)}
            />
          )}

          <PlannerNoItemDaysStub isAddTodayId date={Moment().format(format)} />
        </>
      )}
    </>
  );
};

export default memo(PlannerListBottomNoItems);
