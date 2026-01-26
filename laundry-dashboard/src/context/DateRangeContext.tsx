import { createContext, useContext, useState, type ReactNode } from 'react';
import { subDays } from 'date-fns';

interface DateRange {
    start: Date;
    end: Date;
}

interface DateRangeContextType {
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export function DateRangeProvider({ children }: { children: ReactNode }) {
    const [dateRange, setDateRange] = useState<DateRange>({
        start: subDays(new Date(), 7),
        end: new Date()
    });

    return (
        <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
            {children}
        </DateRangeContext.Provider>
    );
}

export function useDateRange() {
    const context = useContext(DateRangeContext);
    if (context === undefined) {
        throw new Error('useDateRange must be used within a DateRangeProvider');
    }
    return context;
}
