'use client';

import { CustomContentGenerator, EventContentArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

export interface ICalendarProps {
    events: { title: string; start: Date; end: Date }[];
}

export function Calendar({ events }: ICalendarProps) {
    return (
        <FullCalendar
            height="100%"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            eventContent={ContentEvent}
        />
    );
}

export function ContentEvent(info: CustomContentGenerator<EventContentArg>) {
    return (
        <>
            <div className="fc-daygrid-event-dot" />
            <div className="fc-event-time">{info.timeText}</div>
            <div className="fc-event-title">{info.event.title}</div>
        </>
    );
}
