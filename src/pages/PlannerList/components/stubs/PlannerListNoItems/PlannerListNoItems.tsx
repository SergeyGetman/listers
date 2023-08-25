/* eslint-disable prettier/prettier */
import React, { FC, memo, useMemo } from 'react';
import Moment from 'moment';
import PlannerNoItemDaysStub from '../PlannerNoItemDaysStub';
type PlannerListNoItemsProps = {
  prevDate: string;
  currentDate: string;
};
const PlannerListNoItems: FC<PlannerListNoItemsProps> = ({ prevDate, currentDate }) => {
  const format = 'dddd, MMM DD';
  const prevDayDate = Moment(prevDate, 'MMMM DD, YYYY').hour(0).minutes(0).seconds(0);

  const currentDayDate = Moment(currentDate, 'MMMM DD, YYYY').hour(0).minutes(0).seconds(0);

  const dayDiff = useMemo(() => {
    return Math.abs(prevDayDate.diff(currentDayDate, 'days', false));
  }, [currentDayDate, prevDayDate]);

  const todayDate = Moment().hour(0).minutes(0).seconds(0);

  const isToday = useMemo(() => {
    return todayDate.isBetween(Moment(prevDate).add(1, 'days').format('MMMM DD, YYYY'), currentDate);
  }, [todayDate, currentDate, prevDate]);

  if (dayDiff > 3) {
    if (isToday) {
      if (Moment(currentDate, 'MMMM DD, YYYY').add(-1, 'days').format(format) === Moment().format(format)) {
        return (
          <>
            <PlannerNoItemDaysStub
              date={`${Moment(prevDate).add(1, 'days').format(format)} - ${currentDayDate
                .add(-2, 'days')
                .format(format)}`}
            />

            <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment().format(format)} />
          </>
        );
      }

      if (Moment(prevDate).add(+1, 'days').format(format) === Moment().format(format)) {
        return (
          <>
            <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment().format(format)} />

            <PlannerNoItemDaysStub
              date={`${Moment(prevDate).add(2, 'days').format(format)} - ${currentDayDate
                .add(-1, 'days')
                .format(format)}`}
            />
          </>
        );
      }

      return (
        <>
          <PlannerNoItemDaysStub
            date={
              Moment(prevDayDate, format).add(1, 'days').format(format) ===
              Moment().add(-1, 'days').format(format)
                ? Moment(prevDayDate, format).add(1, 'days').format(format)
                : `${prevDayDate.add(1, 'days').format(format)} - ${Moment().add(-1, 'days').format(format)}`
            }
          />

          <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment().format(format)} />

          <PlannerNoItemDaysStub
            date={
              Moment().add(1, 'days').format(format) ===
              Moment(currentDayDate, format).add(-1, 'days').format(format)
                ? Moment().add(1, 'days').format(format)
                : `${Moment().add(1, 'days').format(format)} - ${currentDayDate
                    .add(-1, 'days')
                    .format(format)}`
            }
          />
        </>
      );
    }

    return (
      <PlannerNoItemDaysStub
        date={`${Moment(prevDate).add(1, 'days').format(format)} - ${currentDayDate
          .add(-1, 'days')
          .format(format)}`}
      />
    );
  }

  if (dayDiff === 3) {
    if (isToday) {
      if (Moment(currentDate).add(-1, 'days').format(format) === Moment().format(format)) {
        return (
          <>
            <PlannerNoItemDaysStub date={Moment(prevDate).add(1, 'days').format(format)} />

            <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment().format(format)} />
          </>
        );
      }
      if (Moment(prevDate).add(+1, 'days').format(format) === Moment().format(format)) {
        return (
          <>
            <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment().format(format)} />

            <PlannerNoItemDaysStub date={Moment(prevDate).add(2, 'days').format(format)} />
          </>
        );
      }
    }
    return (
      <PlannerNoItemDaysStub
        date={`${Moment(prevDate).add(1, 'days').format(format)} - ${currentDayDate
          .add(-1, 'days')
          .format(`${format}`)}`}
      />
    );
  }

  if (dayDiff === 2) {
    return (
      <PlannerNoItemDaysStub isAddTodayId={isToday} date={Moment(prevDate).add(1, 'days').format(format)} />
    );
  }
  return <></>;
};

export default memo(PlannerListNoItems);
