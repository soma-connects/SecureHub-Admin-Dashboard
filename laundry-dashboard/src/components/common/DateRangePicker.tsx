import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, subDays } from 'date-fns';
import { clsx } from 'clsx';

interface DateRangePickerProps {
    onChange?: (range: { start: Date; end: Date }) => void;
}

type PresetRange = '7days' | '30days' | 'month' | 'custom';

export function DateRangePicker({ onChange }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState<PresetRange>('7days');
    const [dateRange, setDateRange] = useState<{ start: Date; end: Date }>({
        start: subDays(new Date(), 7),
        end: new Date()
    });

    const presets: { label: string; value: PresetRange; days?: number }[] = [
        { label: 'Last 7 days', value: '7days', days: 7 },
        { label: 'Last 30 days', value: '30days', days: 30 },
        { label: 'This Month', value: 'month' },
    ];

    const handlePresetChange = (preset: PresetRange, days?: number) => {
        let start = new Date();
        const end = new Date();

        if (preset === '7days' || preset === '30days') {
            start = subDays(end, days || 7);
        } else if (preset === 'month') {
            start = new Date(end.getFullYear(), end.getMonth(), 1);
        }

        setSelectedRange(preset);
        setDateRange({ start, end });
        onChange?.({ start, end });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-300 text-sm font-medium hover:bg-slate-800 transition-colors"
            >
                <Calendar className="w-4 h-4 text-violet-400" />
                <span>{format(dateRange.start, 'MMM d')} - {format(dateRange.end, 'MMM d')}</span>
                <ChevronDown className={clsx("w-4 h-4 text-slate-500 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl py-2 z-50">
                        {presets.map((preset) => (
                            <button
                                key={preset.value}
                                onClick={() => handlePresetChange(preset.value, preset.days)}
                                className={clsx(
                                    "w-full text-left px-4 py-2 text-sm transition-colors",
                                    selectedRange === preset.value
                                        ? "text-violet-400 bg-violet-500/10"
                                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                                )}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
