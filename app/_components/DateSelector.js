"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, dateArr) {
  return (
    range.from &&
    range.to &&
    dateArr.some((date) =>
      isWithinInterval(date, {
        start: range.from,
        end: range.to,
      })
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  const { range, setRange, resetRange } = useReservation();

  const [numCols, setNumCols] = useState(2);

  const { discount, regularPrice } = cabin;
  const { minimumBookingLength, maxBookinglength } = settings;

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const numNights = differenceInDays(displayRange.to, displayRange.from);

  const cabinPrice = numNights * (regularPrice - discount);

  function handleSetterRange(newRange) {
    if (!newRange || !newRange.from) {
      setRange({ from: undefined, to: undefined });
    } else {
      setRange(newRange);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1184) {
        setNumCols(2);
      } else if (width >= 1018) {
        setNumCols(1);
      } else if (width >= 768) {
        setNumCols(2);
      } else {
        setNumCols(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        captionLayout="dropdown"
        mode="range"
        numberOfMonths={numCols}
        selected={displayRange}
        onSelect={handleSetterRange}
        min={minimumBookingLength + 1}
        max={maxBookinglength}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-4 sm:px-8 bg-accent-500 text-primary-800 min-h-[72px]">
        <div className="flex items-baseline gap-3 sm:gap-6">
          <p className="flex gap-2 items-baseline flex-wrap">
            {discount > 0 ? (
              <>
                <span className="text-lg sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}

            <span>/night</span>
          </p>

          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-lg sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-sm sm:text-lg font-bold uppercase">
                  Total
                </span>
                {"   "}
                <span className="text-md sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 sm:px-4 sm:py-2 px-2 py-1 text-xs sm:text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
