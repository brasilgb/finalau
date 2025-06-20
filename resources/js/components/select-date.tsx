import { CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import moment from "moment"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { useRemember } from "@inertiajs/react"
import { useAppContext } from "@/contexts/AppContext"

export function FilterDate() {
    const { selectedDate, setSelectedDate } = useAppContext();
    const [calendarOpen, setCalendarOpen] = useState(false);
    
    return (
        <>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !selectedDate && "text-muted-foreground"
                        )}
                    >
                        {selectedDate ? (
                            moment(selectedDate).format("DD/MM/YYYY")
                        ) : (
                            <span>{moment(selectedDate).format("DD/MM/YYYY")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        locale={ptBR}
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        onDayClick={() => setCalendarOpen(false)}
                        initialFocus
                        defaultMonth={selectedDate ? new Date(selectedDate) : new Date()}
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}