import React, { useState } from "react";

import { DateRange } from "react-day-picker";
import { format, getMonth, getYear } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
  maxDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholderText = "Selecione a data",
  dateFormat = "dd/MM/yyyy",
}) => {
  const [date, setDate] = useState<Date | null>(selected);

  const handleDateChange = (range: DateRange | undefined) => {
    const date = range ? range.from : null;
    setDate(date || null);
    onChange(date || null);
  };

  const handleMonthChange = (month: string) => {
    if (date) {
      const newDate = new Date(date.setMonth(months.indexOf(month)));
      setDate(newDate);
      onChange(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    if (date) {
      const newDate = new Date(date.setFullYear(parseInt(year)));
      setDate(newDate);
      onChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button
          type="button"
          className="w-full text-left bg-black border border-gray-900 rounded-md p-2"
        >
          {date ? format(date, dateFormat) : placeholderText}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date || new Date())]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date || new Date()).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 100 },
                (_, i) => getYear(new Date()) - i
              ).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar selected={date || undefined} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
};
